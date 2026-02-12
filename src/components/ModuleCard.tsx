import { Link } from "react-router-dom";
import type { ModuleConfig } from "@/data/modules";

interface ModuleCardProps {
  module: ModuleConfig;
  index: number;
}

const gradients = [
  "from-cyan-500/20 to-blue-600/10 hover:from-cyan-500/30 hover:to-blue-600/20",
  "from-cyan-400/15 to-teal-500/10 hover:from-cyan-400/25 hover:to-teal-500/20",
  "from-sky-500/20 to-cyan-500/10 hover:from-sky-500/30 hover:to-cyan-500/20",
  "from-teal-500/20 to-cyan-400/10 hover:from-teal-500/30 hover:to-cyan-400/20",
];

const glowColors = [
  "group-hover:shadow-[0_0_40px_hsl(185_100%_55%/0.25)]",
  "group-hover:shadow-[0_0_40px_hsl(185_80%_50%/0.2)]",
  "group-hover:shadow-[0_0_40px_hsl(200_100%_55%/0.2)]",
  "group-hover:shadow-[0_0_40px_hsl(170_100%_45%/0.2)]",
];

const iconColors = [
  "text-cyan-400 group-hover:text-cyan-300",
  "text-cyan-300 group-hover:text-cyan-200",
  "text-sky-400 group-hover:text-sky-300",
  "text-teal-400 group-hover:text-teal-300",
];

const borderColors = [
  "border-cyan-500/20 hover:border-cyan-500/40",
  "border-cyan-400/20 hover:border-cyan-400/40",
  "border-sky-500/20 hover:border-sky-500/40",
  "border-teal-500/20 hover:border-teal-500/40",
];

const ModuleCard = ({ module, index }: ModuleCardProps) => {
  const Icon = module.icon;
  const ci = index % 4;

  return (
    <Link
      to={`/module/${module.id}`}
      className={`group block opacity-0 animate-slide-up stagger-${index + 1}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${gradients[ci]} ${borderColors[ci]} ${glowColors[ci]} p-5 h-full transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]`}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, hsla(185, 100%, 55%, 0.06) 45%, hsla(185, 100%, 55%, 0.1) 50%, hsla(185, 100%, 55%, 0.06) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite',
          }}
        />
        
        <div className="relative flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${gradients[ci]} border ${borderColors[ci]} group-hover:scale-110 transition-all duration-500`}>
            <Icon className={`w-7 h-7 ${iconColors[ci]} transition-colors duration-300`} strokeWidth={1.5} />
          </div>
          <div className="min-w-0 pt-1">
            <h3 className="font-display text-sm font-bold tracking-wide mb-1.5 text-foreground group-hover:text-white transition-colors">
              {module.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground/60 transition-colors">
              {module.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
