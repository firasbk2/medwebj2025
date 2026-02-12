import { Link } from "react-router-dom";
import type { ModuleConfig } from "@/data/modules";

interface ModuleCardProps {
  module: ModuleConfig;
  index: number;
}

const gradients = [
  "from-purple-600/20 to-pink-600/10 hover:from-purple-600/30 hover:to-pink-600/20",
  "from-pink-600/20 to-orange-500/10 hover:from-pink-600/30 hover:to-orange-500/20",
  "from-cyan-500/20 to-blue-600/10 hover:from-cyan-500/30 hover:to-blue-600/20",
  "from-green-500/20 to-cyan-500/10 hover:from-green-500/30 hover:to-cyan-500/20",
];

const glowColors = [
  "group-hover:shadow-[0_0_40px_hsl(270_100%_65%/0.2)]",
  "group-hover:shadow-[0_0_40px_hsl(330_100%_60%/0.2)]",
  "group-hover:shadow-[0_0_40px_hsl(185_100%_55%/0.2)]",
  "group-hover:shadow-[0_0_40px_hsl(150_100%_50%/0.2)]",
];

const iconColors = [
  "text-purple-400 group-hover:text-purple-300",
  "text-pink-400 group-hover:text-pink-300",
  "text-cyan-400 group-hover:text-cyan-300",
  "text-green-400 group-hover:text-green-300",
];

const borderColors = [
  "border-purple-500/20 hover:border-purple-500/40",
  "border-pink-500/20 hover:border-pink-500/40",
  "border-cyan-500/20 hover:border-cyan-500/40",
  "border-green-500/20 hover:border-green-500/40",
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
            background: 'linear-gradient(105deg, transparent 40%, hsla(270, 100%, 65%, 0.06) 45%, hsla(270, 100%, 65%, 0.1) 50%, hsla(270, 100%, 65%, 0.06) 55%, transparent 60%)',
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
