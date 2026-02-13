import { Link } from "react-router-dom";
import type { ModuleConfig } from "@/data/modules";

// Module image mapping
import cardAnatomy from "@/assets/card-anatomy.jpg";
import cardBiochem from "@/assets/card-biochem.jpg";
import cardBiophys from "@/assets/card-biophys.jpg";
import cardBiostat from "@/assets/card-biostat.jpg";
import cardChemistry from "@/assets/card-chemistry.jpg";
import cardOrgchem from "@/assets/card-orgchem.jpg";
import cardHistology from "@/assets/card-histology.jpg";
import cardCytology from "@/assets/card-cytology.jpg";
import cardPhysiology from "@/assets/card-physiology.jpg";

const moduleImages: Record<string, string> = {
  anatomy: cardAnatomy,
  biochimie: cardBiochem,
  biophysique: cardBiophys,
  biostatistique: cardBiostat,
  "chimie-g": cardChemistry,
  "chimie-o": cardOrgchem,
  histology: cardHistology,
  cytologie: cardCytology,
  physiologie: cardPhysiology,
};

interface ModuleCardProps {
  module: ModuleConfig;
  index: number;
}

const ModuleCard = ({ module, index }: ModuleCardProps) => {
  const Icon = module.icon;
  const image = moduleImages[module.id];

  return (
    <Link
      to={`/module/${module.id}`}
      className="group block opacity-0 animate-slide-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative overflow-hidden rounded-2xl h-72 transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, hsl(210 50% 15% / 0.4), hsl(215 45% 8% / 0.6))',
          backdropFilter: 'blur(20px)',
          border: '1px solid hsl(200 80% 50% / 0.15)',
          boxShadow: '0 8px 32px hsl(200 80% 40% / 0.08), inset 0 1px 0 hsl(200 80% 70% / 0.08)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 60px hsl(200 80% 50% / 0.15), inset 0 1px 0 hsl(200 80% 70% / 0.12)';
          e.currentTarget.style.borderColor = 'hsl(200 80% 50% / 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 32px hsl(200 80% 40% / 0.08), inset 0 1px 0 hsl(200 80% 70% / 0.08)';
          e.currentTarget.style.borderColor = 'hsl(200 80% 50% / 0.15)';
        }}
      >
        {/* Background image - positioned to the right */}
        {image && (
          <div className="absolute right-0 top-0 w-[60%] h-full">
            <img
              src={image}
              alt={module.nameFr}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient fade from left */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to right, hsl(210 50% 10% / 0.95) 0%, hsl(210 50% 10% / 0.4) 60%, transparent 100%)',
            }} />
          </div>
        )}

        {/* Top glass shine */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{
          background: 'linear-gradient(to right, transparent, hsl(200 80% 70% / 0.2), transparent)',
        }} />

        {/* Content - left aligned like reference */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 w-fit"
            style={{
              background: 'hsl(200 80% 50% / 0.12)',
              border: '1px solid hsl(200 80% 50% / 0.2)',
            }}>
            <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
              {module.id.replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 leading-tight">
            {module.nameFr}
          </h3>

          {/* Accent line */}
          <div className="w-12 h-0.5 rounded-full mb-3 transition-all duration-300 group-hover:w-20"
            style={{ background: 'linear-gradient(to right, hsl(200 80% 50% / 0.6), hsl(192 100% 50% / 0.3))' }} />

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-[70%]">
            {module.descriptionFr}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
