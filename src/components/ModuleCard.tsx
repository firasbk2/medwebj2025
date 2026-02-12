import { Link } from "react-router-dom";
import type { ModuleConfig } from "@/data/modules";

interface ModuleCardProps {
  module: ModuleConfig;
  index: number;
}

const colorMap: Record<string, string> = {
  primary: "text-primary border-primary/20 hover:border-primary/40",
  "neon-purple": "text-neon-purple border-neon-purple/20 hover:border-neon-purple/40",
  "neon-green": "text-neon-green border-neon-green/20 hover:border-neon-green/40",
  "neon-cyan": "text-neon-cyan border-neon-cyan/20 hover:border-neon-cyan/40",
};

const glowMap: Record<string, string> = {
  primary: "group-hover:shadow-[0_0_30px_hsl(185_100%_50%/0.15)]",
  "neon-purple": "group-hover:shadow-[0_0_30px_hsl(280_80%_60%/0.15)]",
  "neon-green": "group-hover:shadow-[0_0_30px_hsl(150_80%_50%/0.15)]",
  "neon-cyan": "group-hover:shadow-[0_0_30px_hsl(185_100%_50%/0.15)]",
};

const ModuleCard = ({ module, index }: ModuleCardProps) => {
  const Icon = module.icon;

  return (
    <Link
      to={`/module/${module.id}`}
      className={`group block opacity-0 animate-slide-up stagger-${index + 1}`}
    >
      <div
        className={`glass hover-lift p-6 h-full ${colorMap[module.color]} ${glowMap[module.color]} transition-all duration-300`}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-sm font-semibold tracking-wide mb-1 text-foreground">
              {module.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {module.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
