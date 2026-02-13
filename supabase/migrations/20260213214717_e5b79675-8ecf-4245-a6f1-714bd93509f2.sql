
-- Remove the public SELECT policy that exposes file_path
DROP POLICY IF EXISTS "Anyone can view visible files" ON public.files;

-- Replace with a policy that blocks all public reads
-- (public access goes through files_public view instead)
CREATE POLICY "No public reads - use files_public view"
ON public.files
FOR SELECT
USING (false);
