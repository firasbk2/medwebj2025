import { FolderOpen } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-in-scale">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
        <FolderOpen className="w-8 h-8 text-primary/50" />
      </div>
      <h3 className="text-lg font-semibold text-foreground/80 mb-2">
        Aucune ressource
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
        Cette section attend des ressources. Revenez bientôt — du nouveau contenu arrive ! 📚
      </p>
    </div>
  );
};

export default EmptyState;
