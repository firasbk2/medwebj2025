import { FileText, FileImage, Film, Download, Eye, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";
import type { FileRecord } from "@/types/files";

const typeIcons: Record<string, typeof FileText> = {
  pdf: FileText, pptx: FileText, ppt: FileText, docx: FileText, doc: FileText,
  mp4: Film, swf: Film, jpg: FileImage, jpeg: FileImage, png: FileImage,
};

const typeColors: Record<string, string> = {
  pdf: "text-red-400", pptx: "text-orange-400", ppt: "text-orange-400",
  docx: "text-blue-400", doc: "text-blue-400", mp4: "text-purple-400",
  swf: "text-yellow-400", jpg: "text-green-400", jpeg: "text-green-400", png: "text-green-400",
};

const getFileUrl = async (fileId: string): Promise<string | null> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin?action=file-url&id=${fileId}`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.url || null;
  } catch {
    return null;
  }
};

interface FileCardProps {
  file: FileRecord;
}

const FileCard = ({ file }: FileCardProps) => {
  const Icon = typeIcons[file.file_type] || FileText;
  const color = typeColors[file.file_type] || "text-primary";
  const [loading, setLoading] = useState(false);

  const handleAction = useCallback(async (action: "preview" | "download") => {
    setLoading(true);
    try {
      const url = await getFileUrl(file.id);
      if (!url) return;
      if (action === "preview") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
      }
    } finally {
      setLoading(false);
    }
  }, [file.id, file.name]);

  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 hover:border-primary/20 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground uppercase mt-0.5">
            {file.file_type} · {(file.file_size / 1024).toFixed(0)} KB
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => handleAction("preview")}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/15 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />} Aperçu
        </button>
        <button
          onClick={() => handleAction("download")}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />} Télécharger
        </button>
      </div>
    </div>
  );
};

export default FileCard;
