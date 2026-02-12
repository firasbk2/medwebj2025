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
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div
        className="relative overflow-hidden rounded-2xl p-5 h-full transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03]"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.03))',
          border: '1px solid hsl(var(--primary) / 0.15)',
          boxShadow: '0 0 0 hsl(var(--primary) / 0)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = '1px solid hsl(var(--primary) / 0.5)';
          e.currentTarget.style.boxShadow = '0 0 35px hsl(var(--primary) / 0.2), inset 0 0 20px hsl(var(--primary) / 0.03)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = '1px solid hsl(var(--primary) / 0.15)';
          e.currentTarget.style.boxShadow = '0 0 0 hsl(var(--primary) / 0)';
        }}
      >
        {/* Corner glow */}
        <div
          className="absolute -top-8 -right-8 w-28 h-28 opacity-30 group-hover:opacity-60 transition-opacity duration-700 blur-2xl"
          style={{ background: 'hsl(var(--primary))' }}
        />
        <div
          className="absolute -bottom-8 -left-8 w-24 h-24 opacity-10 group-hover:opacity-30 transition-opacity duration-700 blur-2xl"
          style={{ background: 'hsl(var(--primary))' }}
        />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.06) 45%, hsl(var(--primary) / 0.1) 50%, hsl(var(--primary) / 0.06) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite',
          }}
        />

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 transition-all duration-700"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)' }}
        />
        
        <div className="relative flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05))',
              border: '1px solid hsl(var(--primary) / 0.25)',
              boxShadow: '0 0 15px hsl(var(--primary) / 0.1)',
              borderRadius: '12px',
            }}
          >
            <Icon className="w-7 h-7 text-primary group-hover:drop-shadow-lg transition-all duration-300" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 pt-1">
            <h3 className="font-display text-sm font-bold tracking-wide mb-1.5 text-foreground group-hover:text-primary transition-colors duration-300">
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
