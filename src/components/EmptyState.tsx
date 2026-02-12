import { FolderOpen, Stethoscope } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-in-scale">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center pulse-glow"
          style={{ border: '1px solid hsl(var(--primary) / 0.2)' }}>
          <FolderOpen className="w-12 h-12 text-primary/50" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl glass flex items-center justify-center"
          style={{ border: '1px solid hsl(var(--neon-pink) / 0.3)', boxShadow: '0 0 15px hsl(var(--neon-pink) / 0.15)' }}>
          <Stethoscope className="w-5 h-5 text-accent/60" />
        </div>
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground/80 mb-2">
        No Resources Yet
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
        This section is waiting for resources. Check back soon — new content is on its way! 🩺
      </p>
    </div>
  );
};

export default EmptyState;
