import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  onSelect: (lang: "en" | "fr") => void;
}

const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 opacity-0 animate-fade-in-scale">
      <div className="w-16 h-16 rounded-2xl glass neon-border flex items-center justify-center mb-8 float-animation">
        <Globe className="w-8 h-8 text-primary" />
      </div>
      <h2 className="font-display text-xl font-bold mb-2 text-foreground">
        Choose Language
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Choisissez votre langue
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => onSelect("en")}
          className="glass neon-border hover-lift px-8 py-4 flex flex-col items-center gap-2 group"
        >
          <span className="text-2xl">🇬🇧</span>
          <span className="font-display text-xs font-semibold tracking-wider text-foreground group-hover:text-primary transition-colors">
            ENGLISH
          </span>
        </button>
        <button
          onClick={() => onSelect("fr")}
          className="glass neon-border hover-lift px-8 py-4 flex flex-col items-center gap-2 group"
        >
          <span className="text-2xl">🇫🇷</span>
          <span className="font-display text-xs font-semibold tracking-wider text-foreground group-hover:text-primary transition-colors">
            FRANÇAIS
          </span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
