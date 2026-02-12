import { FileText, FileImage, Film, Download, Eye } from "lucide-react";
import type { FileRecord } from "@/types/files";

const typeIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  pptx: FileText,
  ppt: FileText,
  docx: FileText,
  doc: FileText,
  mp4: Film,
  swf: Film,
  jpg: FileImage,
  jpeg: FileImage,
  png: FileImage,
};

const typeColors: Record<string, string> = {
  pdf: "text-red-400",
  pptx: "text-orange-400",
  ppt: "text-orange-400",
  docx: "text-blue-400",
  doc: "text-blue-400",
  mp4: "text-purple-400",
  swf: "text-yellow-400",
  jpg: "text-green-400",
  jpeg: "text-green-400",
  png: "text-green-400",
};

interface FileCardProps {
  file: FileRecord;
}

const FileCard = ({ file }: FileCardProps) => {
  const Icon = typeIcons[file.file_type] || FileText;
  const color = typeColors[file.file_type] || "text-primary";
  const storageUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/medical-resources/${file.file_path}`;

  const isVideo = file.file_type === "mp4";

  return (
    <div className="glass neon-border p-4 hover-lift group">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground uppercase mt-0.5">
            {file.file_type} · {(file.file_size / 1024).toFixed(0)} KB
          </p>
        </div>
      </div>

      {isVideo && (
        <div className="mt-3 rounded-lg overflow-hidden bg-secondary/30">
          <video controls className="w-full max-h-48" preload="metadata">
            <source src={storageUrl} type="video/mp4" />
          </video>
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <a
          href={storageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          Preview
        </a>
        <a
          href={storageUrl}
          download={file.name}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </a>
      </div>
    </div>
  );
};

export default FileCard;
