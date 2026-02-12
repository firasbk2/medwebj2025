import { Globe, Languages } from "lucide-react";

interface LanguageSelectorProps {
  onSelect: (lang: "en" | "fr") => void;
}

const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 opacity-0 animate-fade-in-scale">
      <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mb-8 float-animation"
        style={{ 
          border: '1px solid hsl(var(--primary) / 0.3)',
          boxShadow: '0 0 30px hsl(var(--primary) / 0.15)',
        }}>
        <Languages className="w-10 h-10 text-primary" />
      </div>
      <h2 className="font-display text-xl font-bold mb-2 text-foreground">
        Choose Language
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Choisissez votre langue
      </p>
      <div className="flex gap-5">
        <button
          onClick={() => onSelect("en")}
          className="glass hover-lift px-10 py-5 flex flex-col items-center gap-3 group rounded-2xl"
          style={{ border: '1px solid hsl(var(--neon-cyan) / 0.2)' }}
        >
          <span className="text-3xl group-hover:scale-125 transition-transform duration-300">🇬🇧</span>
          <span className="font-display text-xs font-semibold tracking-wider text-foreground group-hover:text-neon-cyan transition-colors">
            ENGLISH
          </span>
        </button>
        <button
          onClick={() => onSelect("fr")}
          className="glass hover-lift px-10 py-5 flex flex-col items-center gap-3 group rounded-2xl"
          style={{ border: '1px solid hsl(var(--neon-pink) / 0.2)' }}
        >
          <span className="text-3xl group-hover:scale-125 transition-transform duration-300">🇫🇷</span>
          <span className="font-display text-xs font-semibold tracking-wider text-foreground group-hover:text-accent transition-colors">
            FRANÇAIS
          </span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
