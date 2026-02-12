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
        <h3 className="font-display text-sm font-semibold tracking-wider text-muted-foreground mb-4 uppercase">
          {title}
        </h3>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => onSelect(cat)}
            className={`glass hover-lift p-4 flex items-center gap-3 text-left group opacity-0 animate-slide-up stagger-${i + 1}`}
            style={{ border: '1px solid hsl(var(--primary) / 0.15)' }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--neon-pink) / 0.05))',
                border: '1px solid hsl(var(--primary) / 0.2)',
              }}>
              <Folder className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {cat.label}
              </span>
              {cat.children && (
                <p className="text-xs text-muted-foreground mt-0.5">{cat.children.length} items</p>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
