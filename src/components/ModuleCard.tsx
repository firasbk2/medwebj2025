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
        className="relative overflow-hidden rounded-2xl flex flex-col items-center justify-center text-center p-5 glass-crystal neon-edge-pulse glow-ambient transition-all duration-500 hover:-translate-y-2"
        style={{
          aspectRatio: '1',
          animationDelay: `${index * 0.5}s`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 12px 60px hsl(192 100% 50% / 0.15), 0 0 80px hsl(192 100% 50% / 0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '';
        }}
      >
        {/* Frosted texture overlay */}
        <div className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, hsl(192 100% 80% / 0.03) 0%, transparent 50%, hsl(200 90% 55% / 0.02) 100%)',
          }}
        />

        {/* Ray tracing light reflection */}
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle, hsl(192 100% 60% / 0.06), transparent 60%)',
          }}
        />

        {/* Icon */}
        <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
          style={{
            background: 'linear-gradient(135deg, hsl(192 100% 50% / 0.08), hsl(210 80% 20% / 0.15))',
            border: '1px solid hsl(192 100% 50% / 0.12)',
          }}
        >
          <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <h3 className="relative z-10 text-xs font-semibold tracking-wide mb-1 text-foreground group-hover:text-primary transition-colors duration-300">
          {module.nameFr}
        </h3>
        <p className="relative z-10 text-[10px] text-muted-foreground leading-relaxed line-clamp-2 px-1">
          {module.descriptionFr}
        </p>
      </div>
    </Link>
  );
};

export default ModuleCard;
