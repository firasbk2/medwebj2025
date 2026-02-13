import { GraduationCap, BookOpen, FileText, Video, Globe } from "lucide-react";
import { useMemo } from "react";

/* Neural synapse node */
const SynapseNode = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <div
    className="absolute rounded-full animate-synapse"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle, hsl(192 100% 60% / 0.6), hsl(192 100% 50% / 0) 70%)`,
      animationDelay: `${delay}s`,
      animationDuration: `${6 + delay * 2}s`,
    }}
  />
);

/* Micro-organism floating shape */
const MicroOrganism = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <div
    className="absolute animate-micro"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      animationDelay: `${delay}s`,
      animationDuration: `${10 + delay * 3}s`,
    }}
  >
    <svg viewBox="0 0 40 40" className="w-full h-full">
      <ellipse cx="20" cy="20" rx="16" ry="12" fill="none"
        stroke="hsl(192 100% 50% / 0.12)" strokeWidth="0.5"
        style={{ filter: 'blur(0.5px)' }} />
      <circle cx="20" cy="20" r="3" fill="hsl(192 100% 55% / 0.15)" />
      <circle cx="14" cy="18" r="1.5" fill="hsl(200 90% 55% / 0.1)" />
      <circle cx="26" cy="22" r="1" fill="hsl(185 100% 55% / 0.1)" />
    </svg>
  </div>
);

const HeroSection = () => {
  /* Generate synapse connections */
  const synapses = useMemo(() => {
    const nodes: { x: string; y: string; size: number; delay: number }[] = [];
    for (let i = 0; i < 15; i++) {
      nodes.push({
        x: `${5 + (i * 7.3) % 90}%`,
        y: `${8 + (i * 11.7) % 80}%`,
        size: 4 + (i % 5) * 3,
        delay: i * 0.6,
      });
    }
    return nodes;
  }, []);

  const microOrganisms = useMemo(() => {
    const items: { x: string; y: string; size: number; delay: number }[] = [];
    for (let i = 0; i < 8; i++) {
      items.push({
        x: `${3 + (i * 13.1) % 92}%`,
        y: `${5 + (i * 14.3) % 88}%`,
        size: 30 + (i % 4) * 15,
        delay: i * 1.2,
      });
    }
    return items;
  }, []);

  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Deep sea gradient background */}
      <div className="absolute inset-0 animated-gradient-deepsea" />

      {/* Marine depth orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] -top-64 -left-64 orb-float"
        style={{ background: 'radial-gradient(circle, hsl(192 100% 50% / 0.05), transparent)' }} />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] -bottom-48 -right-48 orb-float-reverse"
        style={{ background: 'radial-gradient(circle, hsl(210 80% 20% / 0.1), transparent)' }} />
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orb-pulse"
        style={{ background: 'radial-gradient(circle, hsl(200 90% 55% / 0.04), transparent)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Neural synapse network */}
      <div className="absolute inset-0 overflow-hidden">
        {synapses.map((node, i) => (
          <SynapseNode key={`syn-${i}`} {...node} />
        ))}
        {/* Connecting lines between synapses (SVG) */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }}>
          {synapses.slice(0, 10).map((node, i) => {
            const next = synapses[(i + 3) % synapses.length];
            return (
              <line
                key={`line-${i}`}
                x1={node.x} y1={node.y}
                x2={next.x} y2={next.y}
                stroke="hsl(192 100% 55%)"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>

      {/* Floating micro-organisms */}
      <div className="absolute inset-0 overflow-hidden">
        {microOrganisms.map((org, i) => (
          <MicroOrganism key={`micro-${i}`} {...org} />
        ))}
      </div>

      {/* Rising particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full particle-rise"
            style={{
              left: `${5 + (i * 4.7) % 90}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 4) * 2}s`,
              background: `hsl(192 100% 55% / 0.4)`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon with glow */}
          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center opacity-0 animate-slide-up glass-crystal glow-ambient">
              <GraduationCap className="w-10 h-10 text-primary" />
              {/* Pulse rings */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    border: '1px solid hsl(192 100% 50% / 0.15)',
                    animation: `pulseRing ${3 + i}s ease-out infinite`,
                    animationDelay: `${i * 1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 opacity-0 animate-slide-up stagger-1">
            <span className="text-foreground">Étudiants en Médecine </span>
            <span className="text-primary" style={{ textShadow: '0 0 30px hsl(192 100% 50% / 0.3)' }}>Béjaia</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto mb-10 opacity-0 animate-slide-up stagger-2 leading-relaxed">
            Tous vos cours, TD, TP et animations — organisés par module et accessibles en un clic.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2.5 opacity-0 animate-slide-up stagger-3">
            {[
              { icon: BookOpen, label: "9 Modules" },
              { icon: Globe, label: "FR / EN" },
              { icon: FileText, label: "PDF & Diapos" },
              { icon: Video, label: "Vidéos" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-crystal text-xs text-muted-foreground neon-edge-pulse"
                style={{ animationDelay: `${Math.random() * 2}s` }}>
                <Icon className="w-3 h-3 text-primary" />
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
