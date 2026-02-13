import { BookOpen, GraduationCap, Languages } from "lucide-react";

interface LanguageSelectorProps {
  onSelect: (lang: "en" | "fr") => void;
}

const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 opacity-0 animate-fade-in-scale">
      <div className="w-14 h-14 rounded-2xl glass-crystal glow-ambient flex items-center justify-center mb-6">
        <Languages className="w-7 h-7 text-primary" />
      </div>
      <h2 className="text-lg font-bold mb-1 text-foreground">
        Choisissez la langue
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Sélectionnez la langue des documents
      </p>
      <div className="flex gap-6">
        {/* English - Liquid mercury orb */}
        <button
          onClick={() => onSelect("en")}
          className="group flex flex-col items-center gap-4"
        >
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center animate-liquid group-hover:scale-105 transition-transform duration-500"
            style={{
              background: 'linear-gradient(135deg, hsl(215 45% 8% / 0.9), hsl(210 40% 12% / 0.7))',
              border: '1px solid hsl(192 100% 50% / 0.15)',
              boxShadow: '0 8px 40px hsl(192 100% 50% / 0.08), inset 0 2px 20px hsl(192 100% 60% / 0.05)',
            }}
          >
            {/* Mercury reflection */}
            <div className="absolute top-2 left-4 w-6 h-3 rounded-full"
              style={{ background: 'hsl(192 100% 70% / 0.08)', filter: 'blur(3px)' }} />
            <BookOpen className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-semibold tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
            ENGLISH
          </span>
        </button>

        {/* French - Liquid mercury orb */}
        <button
          onClick={() => onSelect("fr")}
          className="group flex flex-col items-center gap-4"
        >
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center animate-liquid group-hover:scale-105 transition-transform duration-500"
            style={{
              background: 'linear-gradient(135deg, hsl(215 45% 8% / 0.9), hsl(200 50% 14% / 0.7))',
              border: '1px solid hsl(200 90% 55% / 0.15)',
              boxShadow: '0 8px 40px hsl(200 90% 55% / 0.08), inset 0 2px 20px hsl(200 90% 60% / 0.05)',
              animationDelay: '0.5s',
            }}
          >
            <div className="absolute top-2 left-4 w-6 h-3 rounded-full"
              style={{ background: 'hsl(200 90% 70% / 0.08)', filter: 'blur(3px)' }} />
            <GraduationCap className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-semibold tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
            FRANÇAIS
          </span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
