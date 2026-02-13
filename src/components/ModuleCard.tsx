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
      <div className="relative overflow-hidden rounded-2xl h-64 neon-edge-pulse transition-all duration-500 hover:-translate-y-2"
        style={{ animationDelay: `${index * 0.4}s` }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 16px 60px hsl(192 100% 50% / 0.15), 0 0 80px hsl(192 100% 50% / 0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '';
        }}
      >
        {/* Background image */}
        {image && (
          <img
            src={image}
            alt={module.nameFr}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 transition-all duration-500"
          style={{
            background: 'linear-gradient(to top, hsl(220 40% 2% / 0.95) 0%, hsl(220 40% 2% / 0.5) 50%, hsl(220 40% 2% / 0.3) 100%)',
          }}
        />

        {/* Hover light sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: 'linear-gradient(135deg, hsl(192 100% 50% / 0.05), transparent 60%)' }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 glass-crystal group-hover:scale-110 transition-transform duration-300"
            style={{ border: '1px solid hsl(192 100% 50% / 0.15)' }}>
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
            {module.nameFr}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {module.descriptionFr}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
