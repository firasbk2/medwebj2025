import { ChevronRight, Home, Folder } from "lucide-react";

interface BreadcrumbNavProps {
  items: string[];
  onNavigate: (index: number) => void;
}

const BreadcrumbNav = ({ items, onNavigate }: BreadcrumbNavProps) => {
  return (
    <nav className="flex items-center gap-1.5 text-sm flex-wrap mb-6 px-4 py-3 glass rounded-xl" style={{ border: '1px solid hsl(var(--primary) / 0.1)' }}>
      <button
        onClick={() => onNavigate(-1)}
        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 hover:scale-110"
      >
        <Home className="w-3.5 h-3.5" />
      </button>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
          {index === items.length - 1 ? (
            <span className="text-primary font-medium flex items-center gap-1">
              <Folder className="w-3 h-3" />
              {item}
            </span>
          ) : (
            <button
              onClick={() => onNavigate(index)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item}
            </button>
          )}
        </span>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;
