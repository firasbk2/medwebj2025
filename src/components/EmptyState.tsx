import { FolderOpen } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-in-scale">
      <div className="w-20 h-20 rounded-2xl glass neon-border flex items-center justify-center mb-6 pulse-glow">
        <FolderOpen className="w-10 h-10 text-primary/60" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground/80 mb-2">
        No Files Yet
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        This section is waiting for resources. Check back soon or contact your admin.
      </p>
    </div>
  );
};

export default EmptyState;
