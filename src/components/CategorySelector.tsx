import { ChevronRight, Folder } from "lucide-react";
import type { ModuleCategory } from "@/data/modules";

interface CategorySelectorProps {
  categories: ModuleCategory[];
  onSelect: (category: ModuleCategory) => void;
  title?: string;
}

const CategorySelector = ({ categories, onSelect, title }: CategorySelectorProps) => {
  return (
    <div className="opacity-0 animate-slide-up">
      {title && (
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          {title}
        </h3>
      )}
      <div className="grid gap-2 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => onSelect(cat)}
            className={`bg-card border border-border/50 hover:border-primary/25 rounded-xl p-4 flex items-center gap-3 text-left group transition-all duration-200 hover:-translate-y-0.5 opacity-0 animate-slide-up stagger-${i + 1}`}
          >
            <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Folder className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {cat.label}
              </span>
              {cat.children && (
                <p className="text-xs text-muted-foreground mt-0.5">{cat.children.length} éléments</p>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
