export interface FileRecord {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  language: string;
  module: string;
  category: string;
  sub_category: string | null;
  topic: string | null;
  region: string | null;
  professor: string | null;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}
