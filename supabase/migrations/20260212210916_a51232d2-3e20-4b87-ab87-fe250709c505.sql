
-- Allow everyone to read files from storage (public bucket already, but ensure RLS)
CREATE POLICY "Anyone can read medical resources"
ON storage.objects FOR SELECT
USING (bucket_id = 'medical-resources');

-- Only service role (admin edge function) can upload/delete - no policy needed for authenticated/anon
-- This means only the edge function with service_role_key can upload/delete

-- Update files table: allow anyone (including anon) to SELECT visible files
DROP POLICY IF EXISTS "Anyone can view visible files" ON public.files;

CREATE POLICY "Anyone can view visible files"
ON public.files FOR SELECT
TO anon, authenticated
USING (is_visible = true);
