import { BookOpen, GraduationCap, Languages } from "lucide-react";

interface LanguageSelectorProps {
  onSelect: (lang: "en" | "fr") => void;
}

const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 opacity-0 animate-fade-in-scale">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
        <Languages className="w-7 h-7 text-primary" />
      </div>
      <h2 className="text-lg font-bold mb-1 text-foreground">
        Choisissez la langue
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Sélectionnez la langue des documents
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => onSelect("en")}
          className="px-8 py-5 flex flex-col items-center gap-3 group rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-200 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-semibold tracking-wider text-foreground group-hover:text-primary transition-colors">
            ENGLISH
          </span>
        </button>
        <button
          onClick={() => onSelect("fr")}
          className="px-8 py-5 flex flex-col items-center gap-3 group rounded-xl bg-card border border-border/50 hover:border-accent/30 hover:bg-card/80 transition-all duration-200 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-accent" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-semibold tracking-wider text-foreground group-hover:text-accent transition-colors">
            FRANÇAIS
          </span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
