import { GraduationCap, BookOpen, FileText, Video, Globe } from "lucide-react";
import heroMedical from "@/assets/hero-medical.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Full background medical image */}
      <div className="absolute inset-0">
        <img
          src={heroMedical}
          alt="Medical science background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, hsl(220 40% 2% / 0.92) 0%, hsl(220 40% 2% / 0.6) 50%, hsl(220 40% 2% / 0.4) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, hsl(220 40% 2% / 0.95) 0%, transparent 40%, transparent 80%, hsl(220 40% 2% / 0.7) 100%)'
        }} />
      </div>

      {/* Ambient glow effects */}
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] top-20 left-10 orb-float"
        style={{ background: 'radial-gradient(circle, hsl(192 100% 50% / 0.08), transparent)' }} />
      <div className="absolute w-[300px] h-[300px] rounded-full blur-[100px] bottom-20 right-20 orb-float-reverse"
        style={{ background: 'radial-gradient(circle, hsl(210 80% 40% / 0.06), transparent)' }} />

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
                  style={{ border: '1px solid hsl(192 100% 50% / 0.1)' }}>
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
        background: 'linear-gradient(to top, hsl(220 40% 2%), transparent)'
      }} />
    </section>
  );
};

export default HeroSection;
