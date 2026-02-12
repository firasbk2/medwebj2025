import { Link } from "react-router-dom";
import type { ModuleConfig } from "@/data/modules";

interface ModuleCardProps {
  module: ModuleConfig;
  index: number;
}

// Each card gets a unique accent from the palette
const cardAccents = [
  { from: "185 100% 55%", to: "270 100% 65%" },  // cyan → purple
  { from: "270 100% 65%", to: "330 100% 60%" },  // purple → pink
  { from: "150 100% 50%", to: "185 100% 55%" },  // green → cyan
  { from: "220 100% 60%", to: "270 100% 65%" },  // blue → purple
  { from: "185 100% 55%", to: "150 100% 50%" },  // cyan → green
  { from: "330 100% 60%", to: "270 100% 65%" },  // pink → purple
  { from: "150 100% 50%", to: "220 100% 60%" },  // green → blue
  { from: "270 100% 65%", to: "185 100% 55%" },  // purple → cyan
  { from: "220 100% 60%", to: "150 100% 50%" },  // blue → green
];

const ModuleCard = ({ module, index }: ModuleCardProps) => {
  const Icon = module.icon;
  const accent = cardAccents[index % cardAccents.length];

  return (
    <Link
      to={`/module/${module.id}`}
      className="group block opacity-0 animate-slide-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div
        className="relative overflow-hidden rounded-2xl aspect-square flex flex-col items-center justify-center text-center p-5 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03]"
        style={{
          background: 'rgba(10, 15, 30, 0.5)',
          backdropFilter: 'blur(30px)',
          border: '1px solid transparent',
          borderImage: `linear-gradient(135deg, hsl(${accent.from} / 0.25), hsl(${accent.to} / 0.15)) 1`,
          boxShadow: `0 0 0 hsl(${accent.from} / 0)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderImage = `linear-gradient(135deg, hsl(${accent.from} / 0.6), hsl(${accent.to} / 0.4)) 1`;
          e.currentTarget.style.boxShadow = `0 0 40px hsl(${accent.from} / 0.2), 0 0 80px hsl(${accent.to} / 0.08), inset 0 0 30px hsl(${accent.from} / 0.04)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderImage = `linear-gradient(135deg, hsl(${accent.from} / 0.25), hsl(${accent.to} / 0.15)) 1`;
          e.currentTarget.style.boxShadow = `0 0 0 hsl(${accent.from} / 0)`;
        }}
      >
        {/* Colored glow orbs */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 opacity-20 group-hover:opacity-50 transition-opacity duration-700 blur-3xl"
          style={{ background: `hsl(${accent.from})` }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-28 h-28 opacity-10 group-hover:opacity-30 transition-opacity duration-700 blur-3xl"
          style={{ background: `hsl(${accent.to})` }}
        />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(105deg, transparent 40%, hsl(${accent.from} / 0.06) 45%, hsl(${accent.from} / 0.1) 50%, hsl(${accent.from} / 0.06) 55%, transparent 60%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite',
          }}
        />

        {/* Bottom gradient line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 transition-all duration-700"
          style={{ background: `linear-gradient(90deg, transparent, hsl(${accent.from}), hsl(${accent.to}), transparent)` }}
        />

        {/* Icon */}
        <div className="relative mb-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, hsl(${accent.from} / 0.15), hsl(${accent.to} / 0.08))`,
              border: `1px solid hsl(${accent.from} / 0.3)`,
              boxShadow: `0 0 20px hsl(${accent.from} / 0.12)`,
            }}
          >
            <Icon className="w-8 h-8 text-primary group-hover:drop-shadow-lg transition-all duration-300" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <div className="relative">
          <h3 className="font-display text-xs font-bold tracking-wide mb-1.5 text-foreground group-hover:text-primary transition-colors duration-300">
            {module.nameFr}
          </h3>
          <p className="text-[10px] text-muted-foreground leading-relaxed group-hover:text-foreground/60 transition-colors line-clamp-2 px-1">
            {module.descriptionFr}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
