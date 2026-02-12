import { GraduationCap, BookOpen, FileText, Video, Globe } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Floating orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px] -top-48 -left-48 orb-float" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[80px] -bottom-32 -right-32 orb-float-reverse" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/[0.03] blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orb-pulse" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-primary/30 particle-rise"
            style={{
              left: `${5 + (i * 4.7) % 90}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center opacity-0 animate-slide-up">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 opacity-0 animate-slide-up stagger-1">
            <span className="text-foreground">Étudiants en Médecine </span>
            <span className="text-primary">Béjaia</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto mb-8 opacity-0 animate-slide-up stagger-2 leading-relaxed">
            Tous vos cours, TD, TP et animations — organisés par module et accessibles en un clic.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 opacity-0 animate-slide-up stagger-3">
            {[
              { icon: BookOpen, label: "9 Modules" },
              { icon: Globe, label: "FR / EN" },
              { icon: FileText, label: "PDF & Diapos" },
              { icon: Video, label: "Vidéos" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/50 text-xs text-muted-foreground">
                <Icon className="w-3 h-3" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
