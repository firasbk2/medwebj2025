import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbNavProps {
  items: string[];
  onNavigate: (index: number) => void;
}

const BreadcrumbNav = ({ items, onNavigate }: BreadcrumbNavProps) => {
  return (
    <nav className="flex items-center gap-1 text-sm flex-wrap mb-6">
      <button
        onClick={() => onNavigate(-1)}
        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
      >
        <Home className="w-3.5 h-3.5" />
      </button>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
          {index === items.length - 1 ? (
            <span className="text-primary font-medium">{item}</span>
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
