import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-password, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const ADMIN_PASSWORD = 'med1'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const url = new URL(req.url)
    const action = url.searchParams.get('action')

    // Validate admin password from header
    const password = req.headers.get('x-admin-password')
    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'list') {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'upload') {
      const formData = await req.formData()
      const file = formData.get('file') as File
      const metadata = JSON.parse(formData.get('metadata') as string)

      if (!file) throw new Error('No file provided')

      const ext = file.name.split('.').pop()?.toLowerCase() || ''
      const filePath = `${metadata.module}/${metadata.language}/${Date.now()}_${file.name}`

      const { error: uploadError } = await supabase.storage
        .from('medical-resources')
        .upload(filePath, file, { contentType: file.type })

      if (uploadError) throw uploadError

      const { data, error: insertError } = await supabase
        .from('files')
        .insert({
          name: file.name,
          file_path: filePath,
          file_type: ext,
          file_size: file.size,
          language: metadata.language,
          module: metadata.module,
          category: metadata.category,
          sub_category: metadata.sub_category || null,
          topic: metadata.topic || null,
          region: metadata.region || null,
          professor: metadata.professor || null,
        })
        .select()
        .single()

      if (insertError) throw insertError
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

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

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'toggle-visibility') {
      const { id, is_visible } = await req.json()
      const { error } = await supabase
        .from('files')
        .update({ is_visible })
        .eq('id', id)

      if (error) throw error
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'update') {
      const { id, ...updates } = await req.json()
      const { error } = await supabase
        .from('files')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'stats') {
      const { data: files } = await supabase
        .from('files')
        .select('id, module, file_size')

      const totalFiles = files?.length || 0
      const totalSize = files?.reduce((sum: number, f: any) => sum + (f.file_size || 0), 0) || 0
      const moduleCount = new Set(files?.map((f: any) => f.module)).size

      return new Response(JSON.stringify({ totalFiles, totalSize, moduleCount }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})