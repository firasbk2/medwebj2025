import { GraduationCap, BookOpen, FileText, Video, Globe, Heart, Stethoscope, Pill, Activity, Microscope, Syringe } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingIcon = ({ icon: Icon, delay, x, y, size = 20, duration = 8 }: { icon: any; delay: number; x: string; y: string; size?: number; duration?: number }) => (
  <div
    className="absolute text-primary/15 animate-pulse"
    style={{
      left: x,
      top: y,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    <Icon style={{ width: size, height: size }} />
  </div>
);

const PulseRing = ({ delay, size }: { delay: number; size: number }) => (
  <div
    className="absolute rounded-full border border-primary/10"
    style={{
      width: size,
      height: size,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      animation: `pulseRing 4s ease-out ${delay}s infinite`,
    }}
  />
);

const DNAHelix = () => {
  const [dots, setDots] = useState<{ id: number; y: number; side: 'left' | 'right' }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      y: i * 30,
      side: (i % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
    }));
    setDots(generated);
  }, []);

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.07] hidden lg:block">
      <svg width="40" height="360" viewBox="0 0 40 360">
        {dots.map((dot) => (
          <g key={dot.id}>
            <circle
              cx={dot.side === 'left' ? 8 : 32}
              cy={dot.y}
              r="3"
              fill="hsl(185 100% 50%)"
              className="animate-pulse"
              style={{ animationDelay: `${dot.id * 0.3}s` }}
            />
            {dot.id % 2 === 0 && dot.id < 11 && (
              <line
                x1="8" y1={dot.y}
                x2="32" y2={dot.y + 30}
                stroke="hsl(185 100% 50%)"
                strokeWidth="1"
                opacity="0.5"
              />
            )}
            {dot.id % 2 === 1 && dot.id < 11 && (
              <line
                x1="32" y1={dot.y}
                x2="8" y2={dot.y + 30}
                stroke="hsl(185 100% 50%)"
                strokeWidth="1"
                opacity="0.5"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

const HeartbeatLine = () => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 opacity-[0.08] overflow-hidden">
    <svg viewBox="0 0 400 60" className="w-full animate-shimmer" style={{ animationDuration: '3s' }}>
      <polyline
        points="0,30 60,30 80,30 100,10 115,50 130,20 145,40 160,30 400,30"
        fill="none"
        stroke="hsl(185 100% 50%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Floating medical icons */}
      <FloatingIcon icon={Heart} delay={0} x="8%" y="20%" size={22} duration={6} />
      <FloatingIcon icon={Stethoscope} delay={1.5} x="85%" y="15%" size={24} duration={7} />
      <FloatingIcon icon={Pill} delay={0.8} x="12%" y="70%" size={18} duration={8} />
      <FloatingIcon icon={Activity} delay={2} x="90%" y="65%" size={20} duration={6} />
      <FloatingIcon icon={Microscope} delay={1} x="75%" y="80%" size={22} duration={9} />
      <FloatingIcon icon={Syringe} delay={2.5} x="20%" y="85%" size={16} duration={7} />

      {/* DNA Helix decoration */}
      <DNAHelix />

      {/* Heartbeat line */}
      <HeartbeatLine />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Pulse rings behind icon */}
          <div className="relative flex justify-center mb-6">
            <PulseRing delay={0} size={80} />
            <PulseRing delay={1} size={110} />
            <PulseRing delay={2} size={140} />
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center opacity-0 animate-slide-up relative z-10">
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
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/50 text-xs text-muted-foreground hover:border-primary/30 hover:text-primary transition-all duration-300">
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
