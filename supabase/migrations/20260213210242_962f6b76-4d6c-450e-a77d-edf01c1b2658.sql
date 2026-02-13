
-- Deny all INSERT, UPDATE, DELETE for public users (service_role bypasses RLS)
CREATE POLICY "No public inserts" ON public.files FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No public updates" ON public.files FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No public deletes" ON public.files FOR DELETE TO anon, authenticated USING (false);
