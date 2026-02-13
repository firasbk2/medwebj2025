import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { FileRecord } from "@/types/files";

interface FileFilters {
  module: string;
  language: string;
  category?: string;
  sub_category?: string;
  topic?: string;
  region?: string;
  professor?: string;
  [key: string]: string | undefined;
}

export const useFiles = (filters: FileFilters | null) => {
  return useQuery({
    queryKey: ["files", filters],
    enabled: !!filters,
    queryFn: async () => {
      if (!filters) return [];
      let query = supabase
        .from("files_public" as any)
        .select("*")
        .eq("language", filters.language)
        .eq("module", filters.module);

      if (filters.category) query = query.eq("category", filters.category);
      if (filters.sub_category) query = query.eq("sub_category", filters.sub_category);
      if (filters.topic) query = query.eq("topic", filters.topic);
      if (filters.region) query = query.eq("region", filters.region);
      if (filters.professor) query = query.eq("professor", filters.professor);

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as FileRecord[];
    },
  });
};

export const useSearchFiles = (query: string) => {
  return useQuery({
    queryKey: ["search-files", query],
    enabled: query.length >= 2,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("files_public" as any)
        .select("*")
        .ilike("name", `%${query}%`)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      return (data || []) as unknown as FileRecord[];
    },
  });
};
