
-- Create files table for all uploaded resources
CREATE TABLE public.files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- pdf, pptx, docx, mp4, jpg, png
  file_size BIGINT DEFAULT 0,
  language TEXT NOT NULL CHECK (language IN ('en', 'fr')),
  module TEXT NOT NULL,
  category TEXT NOT NULL, -- cours, td, tp, animations
  sub_category TEXT, -- e.g. diapos, polycopies
  topic TEXT, -- e.g. lipides, myologie, optique
  region TEXT, -- e.g. membre_superieur, membre_inferieur (for anatomy)
  professor TEXT, -- for biostatistique
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Everyone can read visible files
CREATE POLICY "Anyone can view visible files"
  ON public.files FOR SELECT
  USING (is_visible = true);

-- Create storage bucket for medical resources
INSERT INTO storage.buckets (id, name, public) VALUES ('medical-resources', 'medical-resources', true);

-- Storage policies
CREATE POLICY "Anyone can view medical resources"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'medical-resources');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_files_updated_at
  BEFORE UPDATE ON public.files
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
