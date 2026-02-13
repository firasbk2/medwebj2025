
-- Create a public view that excludes file_path
CREATE VIEW public.files_public AS
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

-- Grant access to the view
GRANT SELECT ON public.files_public TO anon, authenticated;
