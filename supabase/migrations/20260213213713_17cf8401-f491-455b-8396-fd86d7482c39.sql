
-- Fix security definer view - recreate with SECURITY INVOKER
DROP VIEW IF EXISTS public.files_public;

CREATE VIEW public.files_public
WITH (security_invoker = true)
AS
SELECT
  id,
  name,
  file_type,
  file_size,
  language,
  module,
  category,
  sub_category,
  topic,
  region,
  professor,
  is_visible,
  created_at,
  updated_at
FROM public.files
WHERE is_visible = true;

GRANT SELECT ON public.files_public TO anon, authenticated;
