import { Link } from "react-router-dom";
import type { ModuleConfig } from "@/data/modules";

interface ModuleCardProps {
  module: ModuleConfig;
  index: number;
}

const ModuleCard = ({ module, index }: ModuleCardProps) => {
  const Icon = module.icon;

  return (
    <Link
      to={`/module/${module.id}`}
      className="group block opacity-0 animate-slide-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative overflow-hidden rounded-xl aspect-square flex flex-col items-center justify-center text-center p-4 bg-card border border-border/50 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-primary/12 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <h3 className="text-xs font-semibold tracking-wide mb-1 text-foreground group-hover:text-primary transition-colors duration-200">
          {module.nameFr}
        </h3>
        <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2 px-1">
          {module.descriptionFr}
        </p>
      </div>
    </Link>
  );
};

export default ModuleCard;
