
-- Recreate view as security definer (owner privileges) so it works
-- despite the blocked SELECT on files table.
-- The view itself safely filters: is_visible = true AND excludes file_path.
DROP VIEW IF EXISTS public.files_public;

CREATE VIEW public.files_public
WITH (security_invoker = false)
AS
SELECT
  id, name, file_type, file_size, language, module,
  category, sub_category, topic, region, professor,
  is_visible, created_at, updated_at
FROM public.files
WHERE is_visible = true;

GRANT SELECT ON public.files_public TO anon, authenticated;
