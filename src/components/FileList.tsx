import { useFiles } from "@/hooks/useFiles";
import FileCard from "./FileCard";
import EmptyState from "./EmptyState";
import { Loader2 } from "lucide-react";

interface FileListProps {
  module: string;
  language: string;
  path: string[]; // breadcrumb path labels to derive filters
}

// Derive filters from navigation path based on module type
function deriveFilters(module: string, language: string, path: string[]) {
  const filters: Record<string, string> = { module, language };

  if (module === "anatomy") {
    // path: [Cours/TP, (Diapos/Polycopiés), (Region), (Topic)]
    if (path[0]) filters.category = path[0].toLowerCase();
    if (path[0]?.toLowerCase() === "tp") return filters;
    if (path[1]) filters.sub_category = path[1].toLowerCase();
    if (path[2]) filters.region = path[2];
    if (path[3]) filters.topic = path[3];
  } else if (module === "biochimie") {
    if (path[0]) filters.category = path[0].toLowerCase();
    if (path[0]?.toLowerCase() === "td") return filters;
    if (path[1]) filters.sub_category = path[1].toLowerCase();
    if (path[2]) filters.topic = path[2];
  } else if (module === "biophysique") {
    if (path[0]) filters.category = path[0].toLowerCase();
    if (["td", "tp"].includes(path[0]?.toLowerCase())) return filters;
    if (path[1]) filters.topic = path[1];
  } else if (module === "biostatistique") {
    if (path[0]) filters.professor = path[0];
    if (path[1]) filters.category = path[1].toLowerCase();
  } else if (module === "physiologie") {
    if (path[0]) filters.topic = path[0];
    if (path[1]) filters.category = path[1].toLowerCase();
  } else if (module === "histology") {
    if (path[0]) filters.category = path[0].toLowerCase();
    if (path[0]?.toLowerCase() === "cours" && path[1]) filters.topic = path[1];
  } else {
    // chimie-g, chimie-o, cytologie
    if (path[0]) filters.category = path[0].toLowerCase();
  }

  return filters;
}

const FileList = ({ module, language, path }: FileListProps) => {
  const filters = deriveFilters(module, language, path) as Parameters<typeof useFiles>[0];
  const { data: files, isLoading } = useFiles(filters);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!files || files.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 opacity-0 animate-slide-up">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
};

export default FileList;
