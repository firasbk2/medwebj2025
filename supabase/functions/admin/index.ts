import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-password, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

// ─── Input Validation Schemas ───
const safeString = z.string().trim().max(255)

const metadataSchema = z.object({
  language: z.string().min(1).max(10),
  module: z.string().min(1).max(100),
  category: z.string().max(100).optional().default(''),
  sub_category: safeString.nullable().optional().default(null),
  topic: safeString.nullable().optional().default(null),
  region: safeString.nullable().optional().default(null),
  professor: safeString.nullable().optional().default(null),
})

const uploadUrlSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileType: z.string().min(1).max(100),
  metadata: metadataSchema,
})

const confirmUploadSchema = z.object({
  fileName: z.string().min(1).max(255),
  filePath: z.string().min(1).max(500),
  fileSize: z.number().int().min(0).max(500_000_000),
  fileType: z.string().min(1).max(100),
  metadata: metadataSchema,
})

const idSchema = z.object({
  id: z.string().uuid(),
})

const toggleVisibilitySchema = z.object({
  id: z.string().uuid(),
  is_visible: z.boolean(),
})

const allowedUpdateFields = ['name', 'category', 'sub_category', 'topic', 'region', 'professor', 'language', 'module', 'is_visible'] as const

const updateSchema = z.object({
  id: z.string().uuid(),
}).catchall(z.unknown()).refine((data) => {
  const keys = Object.keys(data).filter(k => k !== 'id')
  return keys.length > 0 && keys.every(k => (allowedUpdateFields as readonly string[]).includes(k))
}, { message: 'Invalid or disallowed update fields' })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const action = url.searchParams.get('action')

  // ─── PUBLIC: GET FILE URL (no admin auth required) ───
  if (action === 'file-url' && req.method === 'GET') {
    try {
      const fileId = url.searchParams.get('id')
      if (!fileId || !z.string().uuid().safeParse(fileId).success) {
        return jsonResponse({ error: 'Invalid file ID' }, 400)
      }

      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      )

      const { data: file, error } = await supabase
        .from('files')
        .select('file_path, is_visible, name')
        .eq('id', fileId)
        .single()

      if (error || !file || !file.is_visible) {
        return jsonResponse({ error: 'File not found' }, 404)
      }

      const { data: signedData, error: signError } = await supabase.storage
        .from('medical-resources')
        .createSignedUrl(file.file_path, 3600) // 1 hour expiry

      if (signError || !signedData) {
        return jsonResponse({ error: 'Could not generate URL' }, 500)
      }

      return jsonResponse({ url: signedData.signedUrl, name: file.name })
    } catch {
      return jsonResponse({ error: 'Internal server error' }, 500)
    }
  }

  try {
    // Read password from environment variable
    const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD')
    if (!ADMIN_PASSWORD) {
      return jsonResponse({ error: 'Server configuration error' }, 500)
    }

    const password = req.headers.get('x-admin-password')
    if (password !== ADMIN_PASSWORD) {
      return jsonResponse({ error: 'Unauthorized' }, 401)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const url = new URL(req.url)
    const action = url.searchParams.get('action')

    // ─── LIST FILES ───
    if (action === 'list') {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return jsonResponse(data)
    }

    // ─── GET SIGNED UPLOAD URL ───
    if (action === 'get-upload-url') {
      const parsed = uploadUrlSchema.safeParse(await req.json())
      if (!parsed.success) {
        return jsonResponse({ error: 'Invalid input', details: parsed.error.flatten() }, 400)
      }
      const { fileName, metadata } = parsed.data

      const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
      const filePath = `${metadata.module}/${metadata.language}/${Date.now()}_${safeName}`

      const { data, error } = await supabase.storage
        .from('medical-resources')
        .createSignedUploadUrl(filePath)

      if (error) throw error

      return jsonResponse({
        signedUrl: data.signedUrl,
        path: data.path,
        filePath,
        token: data.token,
      })
    }

    // ─── CONFIRM UPLOAD ───
    if (action === 'confirm-upload') {
      const parsed = confirmUploadSchema.safeParse(await req.json())
      if (!parsed.success) {
        return jsonResponse({ error: 'Invalid input', details: parsed.error.flatten() }, 400)
      }
      const { fileName, filePath, fileSize, metadata } = parsed.data

      const ext = fileName.split('.').pop()?.toLowerCase() || ''

      const { data, error } = await supabase
        .from('files')
        .insert({
          name: fileName,
          file_path: filePath,
          file_type: ext,
          file_size: fileSize,
          language: metadata.language,
          module: metadata.module,
          category: metadata.category || '',
          sub_category: metadata.sub_category || null,
          topic: metadata.topic || null,
          region: metadata.region || null,
          professor: metadata.professor || null,
        })
        .select()
        .single()

      if (error) throw error
      return jsonResponse(data)
    }

    // ─── DELETE FILE ───
    if (action === 'delete') {
      const parsed = idSchema.safeParse(await req.json())
      if (!parsed.success) {
        return jsonResponse({ error: 'Invalid input' }, 400)
      }
      const { id } = parsed.data

      const { data: file } = await supabase
        .from('files')
        .select('file_path')
        .eq('id', id)
        .single()

      if (file) {
        await supabase.storage.from('medical-resources').remove([file.file_path])
      }

      const { error } = await supabase.from('files').delete().eq('id', id)
      if (error) throw error
      return jsonResponse({ success: true })
    }

    // ─── TOGGLE VISIBILITY ───
    if (action === 'toggle-visibility') {
      const parsed = toggleVisibilitySchema.safeParse(await req.json())
      if (!parsed.success) {
        return jsonResponse({ error: 'Invalid input' }, 400)
      }
      const { id, is_visible } = parsed.data
      const { error } = await supabase
        .from('files')
        .update({ is_visible })
        .eq('id', id)
      if (error) throw error
      return jsonResponse({ success: true })
    }

    // ─── UPDATE FILE ───
    if (action === 'update') {
      const body = await req.json()
      const parsed = updateSchema.safeParse(body)
      if (!parsed.success) {
        return jsonResponse({ error: 'Invalid input', details: parsed.error.flatten() }, 400)
      }
      const { id, ...updates } = parsed.data as { id: string; [key: string]: unknown }
      
      // Only keep allowed fields
      const safeUpdates: Record<string, unknown> = {}
      for (const key of allowedUpdateFields) {
        if (key in updates) {
          safeUpdates[key] = updates[key]
        }
      }

      const { error } = await supabase
        .from('files')
        .update(safeUpdates)
        .eq('id', id)
      if (error) throw error
      return jsonResponse({ success: true })
    }

    // ─── STATS ───
    if (action === 'stats') {
      const { data: files } = await supabase
        .from('files')
        .select('id, module, file_size')

      const totalFiles = files?.length || 0
      const totalSize = files?.reduce((sum: number, f: any) => sum + (f.file_size || 0), 0) || 0
      const moduleCount = new Set(files?.map((f: any) => f.module)).size

      return jsonResponse({ totalFiles, totalSize, moduleCount })
    }

    return jsonResponse({ error: 'Unknown action' }, 400)
  } catch (error) {
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
})
