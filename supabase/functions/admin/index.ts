import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-password, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const ADMIN_PASSWORD = 'med1'

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
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
    // Client sends metadata, we return a signed URL for direct upload
    if (action === 'get-upload-url') {
      const { fileName, fileType, metadata } = await req.json()
      if (!fileName || !metadata) throw new Error('Missing fileName or metadata')

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

    // ─── CONFIRM UPLOAD (register in DB after direct upload) ───
    if (action === 'confirm-upload') {
      const { fileName, filePath, fileSize, fileType, metadata } = await req.json()

      const ext = fileName.split('.').pop()?.toLowerCase() || ''

      const { data, error } = await supabase
        .from('files')
        .insert({
          name: fileName,
          file_path: filePath,
          file_type: ext,
          file_size: fileSize || 0,
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
      const { id } = await req.json()

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
      const { id, is_visible } = await req.json()
      const { error } = await supabase
        .from('files')
        .update({ is_visible })
        .eq('id', id)
      if (error) throw error
      return jsonResponse({ success: true })
    }

    // ─── UPDATE FILE ───
    if (action === 'update') {
      const { id, ...updates } = await req.json()
      const { error } = await supabase
        .from('files')
        .update(updates)
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
    return jsonResponse({ error: (error as Error).message }, 500)
  }
})
