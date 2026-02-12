import { Link } from "react-router-dom";
import type { ModuleConfig } from "@/data/modules";

interface ModuleCardProps {
  module: ModuleConfig;
  index: number;
}

const themes = [
  { // Anatomy - warm coral
    gradient: "from-rose-500/20 via-orange-500/10 to-amber-500/5",
    hoverGradient: "hover:from-rose-500/30 hover:via-orange-500/20 hover:to-amber-500/15",
    border: "border-rose-500/20 hover:border-rose-400/50",
    glow: "group-hover:shadow-[0_0_50px_hsl(350_80%_55%/0.3)]",
    icon: "text-rose-400 group-hover:text-rose-300",
    iconBg: "from-rose-500/20 to-orange-500/10",
    iconBorder: "border-rose-500/30",
    accent: "hsl(350, 80%, 55%)",
  },
  { // Biochimie - vivid purple
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/5",
    hoverGradient: "hover:from-violet-500/30 hover:via-purple-500/20 hover:to-fuchsia-500/15",
    border: "border-violet-500/20 hover:border-violet-400/50",
    glow: "group-hover:shadow-[0_0_50px_hsl(270_80%_60%/0.3)]",
    icon: "text-violet-400 group-hover:text-violet-300",
    iconBg: "from-violet-500/20 to-purple-500/10",
    iconBorder: "border-violet-500/30",
    accent: "hsl(270, 80%, 60%)",
  },
  { // Biophysique - electric green
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/5",
    hoverGradient: "hover:from-emerald-500/30 hover:via-green-500/20 hover:to-teal-500/15",
    border: "border-emerald-500/20 hover:border-emerald-400/50",
    glow: "group-hover:shadow-[0_0_50px_hsl(160_80%_50%/0.3)]",
    icon: "text-emerald-400 group-hover:text-emerald-300",
    iconBg: "from-emerald-500/20 to-green-500/10",
    iconBorder: "border-emerald-500/30",
    accent: "hsl(160, 80%, 50%)",
  },
  { // Biostatistique - ocean blue
    gradient: "from-blue-500/20 via-sky-500/10 to-cyan-500/5",
    hoverGradient: "hover:from-blue-500/30 hover:via-sky-500/20 hover:to-cyan-500/15",
    border: "border-blue-500/20 hover:border-blue-400/50",
    glow: "group-hover:shadow-[0_0_50px_hsl(210_80%_55%/0.3)]",
    icon: "text-blue-400 group-hover:text-blue-300",
    iconBg: "from-blue-500/20 to-sky-500/10",
    iconBorder: "border-blue-500/30",
    accent: "hsl(210, 80%, 55%)",
  },
  { // Chimie G - warm amber
    gradient: "from-amber-500/20 via-yellow-500/10 to-orange-500/5",
    hoverGradient: "hover:from-amber-500/30 hover:via-yellow-500/20 hover:to-orange-500/15",
    border: "border-amber-500/20 hover:border-amber-400/50",
    glow: "group-hover:shadow-[0_0_50px_hsl(40_80%_55%/0.3)]",
    icon: "text-amber-400 group-hover:text-amber-300",
    iconBg: "from-amber-500/20 to-yellow-500/10",
    iconBorder: "border-amber-500/30",
    accent: "hsl(40, 80%, 55%)",
  },
  { // Chimie O - hot pink
    gradient: "from-pink-500/20 via-fuchsia-500/10 to-rose-500/5",
    hoverGradient: "hover:from-pink-500/30 hover:via-fuchsia-500/20 hover:to-rose-500/15",
    border: "border-pink-500/20 hover:border-pink-400/50",
    glow: "group-hover:shadow-[0_0_50px_hsl(330_80%_55%/0.3)]",
    icon: "text-pink-400 group-hover:text-pink-300",
    iconBg: "from-pink-500/20 to-fuchsia-500/10",
    iconBorder: "border-pink-500/30",
    accent: "hsl(330, 80%, 55%)",
  },
  { // Histology - teal
    gradient: "from-teal-500/20 via-cyan-500/10 to-sky-500/5",
    hoverGradient: "hover:from-teal-500/30 hover:via-cyan-500/20 hover:to-sky-500/15",
    border: "border-teal-500/20 hover:border-teal-400/50",
    glow: "group-hover:shadow-[0_0_50px_hsl(180_70%_50%/0.3)]",
    icon: "text-teal-400 group-hover:text-teal-300",
    iconBg: "from-teal-500/20 to-cyan-500/10",
    iconBorder: "border-teal-500/30",
    accent: "hsl(180, 70%, 50%)",
  },
  { // Cytologie - indigo
    gradient: "from-indigo-500/20 via-blue-500/10 to-violet-500/5",
    hoverGradient: "hover:from-indigo-500/30 hover:via-blue-500/20 hover:to-violet-500/15",
    border: "border-indigo-500/20 hover:border-indigo-400/50",
    glow: "group-hover:shadow-[0_0_50px_hsl(240_70%_60%/0.3)]",
    icon: "text-indigo-400 group-hover:text-indigo-300",
    iconBg: "from-indigo-500/20 to-blue-500/10",
    iconBorder: "border-indigo-500/30",
    accent: "hsl(240, 70%, 60%)",
  },
  { // Physiologie - red/crimson
    gradient: "from-red-500/20 via-rose-500/10 to-pink-500/5",
    hoverGradient: "hover:from-red-500/30 hover:via-rose-500/20 hover:to-pink-500/15",
    border: "border-red-500/20 hover:border-red-400/50",
    glow: "group-hover:shadow-[0_0_50px_hsl(0_70%_55%/0.3)]",
    icon: "text-red-400 group-hover:text-red-300",
    iconBg: "from-red-500/20 to-rose-500/10",
    iconBorder: "border-red-500/30",
    accent: "hsl(0, 70%, 55%)",
  },
];

const ModuleCard = ({ module, index }: ModuleCardProps) => {
  const Icon = module.icon;
  const t = themes[index % themes.length];

  return (
    <Link
      to={`/module/${module.id}`}
      className={`group block opacity-0 animate-slide-up`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${t.gradient} ${t.hoverGradient} ${t.border} ${t.glow} p-5 h-full transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03]`}
      >
        {/* Animated corner accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${t.accent}, transparent 70%)`,
          }}
        />
        
        {/* Shimmer sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${t.accent.replace(')', ' / 0.08)')} 45%, ${t.accent.replace(')', ' / 0.12)')} 50%, ${t.accent.replace(')', ' / 0.08)')} 55%, transparent 60%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite',
          }}
        />

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 transition-all duration-700"
          style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }}
        />
        
        <div className="relative flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${t.iconBg} border ${t.iconBorder} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
            style={{ boxShadow: `0 0 20px ${t.accent.replace(')', ' / 0.15)')}` }}
          >
            <Icon className={`w-7 h-7 ${t.icon} transition-all duration-300 group-hover:drop-shadow-lg`} strokeWidth={1.5} />
          </div>
          <div className="min-w-0 pt-1">
            <h3 className="font-display text-sm font-bold tracking-wide mb-1.5 text-foreground group-hover:text-white transition-colors">
              {module.nameFr}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground/60 transition-colors line-clamp-2">
              {module.descriptionFr}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
