import { GraduationCap, BookOpen, FileText, Video, Globe } from "lucide-react";
import heroDna from "@/assets/hero-dna.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background">
      {/* DNA image on the right */}
      <div className="absolute right-0 top-0 w-[55%] h-full">
        <img
          src={heroDna}
          alt="DNA double helix"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Fade from left */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.7) 30%, transparent 70%)'
        }} />
      </div>

      {/* Top/bottom fades */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 30%, transparent 85%, hsl(var(--background) / 0.6) 100%)'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 opacity-0 animate-slide-up glass-crystal neon-edge-pulse"
            style={{ animationDelay: '0s' }}>
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wider">FACULTÉ DE MÉDECINE — BÉJAIA</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 opacity-0 animate-slide-up stagger-1 leading-[1.1]">
            <span className="text-foreground">Votre Portail</span>
            <br />
            <span className="text-foreground">d'Études </span>
            <span className="text-primary" style={{ textShadow: '0 0 40px hsl(192 100% 50% / 0.4)' }}>Médicales</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-md mb-10 opacity-0 animate-slide-up stagger-2 leading-relaxed">
            Accédez à tous vos cours, TD, TP et animations — organisés par module, disponibles en français et en anglais.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 opacity-0 animate-slide-up stagger-3">
            {[
              { icon: BookOpen, value: "9", label: "Modules" },
              { icon: Globe, value: "2", label: "Langues" },
              { icon: FileText, value: "PDF", label: "& Diapos" },
              { icon: Video, value: "HD", label: "Vidéos" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-crystal"
                  style={{ border: '1px solid hsl(var(--primary) / 0.1)' }}>
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{
        background: 'linear-gradient(to top, hsl(var(--background)), transparent)'
      }} />
    </section>
  );
};

export default HeroSection;
