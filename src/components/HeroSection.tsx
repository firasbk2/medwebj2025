import { Stethoscope, Dna, HeartPulse, Activity, Zap, Brain } from "lucide-react";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${8 + Math.random() * 12}s`,
  size: Math.random() * 4 + 2,
  color: ["var(--neon-cyan)", "var(--neon-blue)", "var(--neon-green)", "var(--neon-cyan)"][i % 4],
}));

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden min-h-[80vh] flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: `hsl(${p.color})`,
            boxShadow: `0 0 ${p.size * 4}px hsl(${p.color} / 0.6)`,
            animation: `particle ${p.duration} ${p.delay} linear infinite`,
          }}
        />
      ))}

      {/* Orbiting elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-20">
        <div className="absolute inset-0 animate-rotate-glow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-pink" style={{ boxShadow: '0 0 20px hsl(330 100% 60% / 0.8)' }} />
        </div>
        <div className="absolute inset-0 animate-rotate-glow" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neon-cyan" style={{ boxShadow: '0 0 15px hsl(185 100% 55% / 0.8)' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 3D Stethoscope Icon */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-8 rounded-full opacity-30 animate-rotate-glow"
                style={{ background: 'conic-gradient(from 0deg, hsl(185 100% 55%), hsl(220 100% 60%), hsl(150 100% 50%), hsl(185 100% 55%))' }}
              />
              <div className="absolute -inset-7 rounded-full bg-background" />
              
              {/* Stethoscope container */}
              <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center neon-glow"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--neon-cyan) / 0.2), hsl(var(--neon-blue) / 0.15))',
                  border: '2px solid hsl(var(--neon-cyan) / 0.4)',
                }}>
                <Stethoscope className="w-14 h-14 text-primary drop-shadow-lg" strokeWidth={1.5} />
              </div>

              {/* Floating mini icons */}
              <div className="absolute -top-4 -right-6 float-animation" style={{ animationDelay: '0s' }}>
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center" style={{ boxShadow: '0 0 20px hsl(330 100% 60% / 0.3)' }}>
                  <HeartPulse className="w-5 h-5 text-accent animate-heartbeat" />
                </div>
              </div>
              <div className="absolute -bottom-3 -left-8 float-animation" style={{ animationDelay: '1.5s' }}>
                <div className="w-9 h-9 rounded-xl glass flex items-center justify-center" style={{ boxShadow: '0 0 15px hsl(185 100% 55% / 0.3)' }}>
                  <Dna className="w-4 h-4 text-neon-cyan" />
                </div>
              </div>
              <div className="absolute top-1/2 -right-12 float-animation" style={{ animationDelay: '3s' }}>
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center" style={{ boxShadow: '0 0 15px hsl(150 100% 50% / 0.3)' }}>
                  <Brain className="w-4 h-4 text-neon-green" />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 opacity-0 animate-slide-up">
            <span className="text-foreground">Med Students</span>
            <br />
            <span className="neon-text" style={{ color: 'hsl(var(--neon-cyan))' }}>
              Bejaia
            </span>
            {" "}
            <span className="neon-text" style={{ color: 'hsl(var(--neon-blue))' }}>
              University
            </span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-0 animate-slide-up stagger-2 leading-relaxed">
            Your futuristic hub for medical resources. Access courses, slides, practicals & more — organized by module.
          </p>

          {/* Status badges */}
          <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-slide-up stagger-3">
            {[
              { icon: Zap, label: "8 Modules", color: "var(--neon-cyan)" },
              { icon: Activity, label: "EN / FR", color: "var(--neon-blue)" },
              { icon: HeartPulse, label: "PDF, Slides, Videos", color: "var(--neon-green)" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
                <div className="w-2 h-2 rounded-full pulse-glow" style={{ background: `hsl(${color})`, boxShadow: `0 0 10px hsl(${color} / 0.6)` }} />
                <span className="text-foreground/80">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
