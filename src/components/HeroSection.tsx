import { Stethoscope, Dna, HeartPulse, Activity, Zap, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden min-h-[80vh] flex items-center">
      {/* Radial glows */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 40%, hsl(185 100% 55% / 0.06) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, hsl(270 100% 65% / 0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, hsl(150 100% 50% / 0.03) 0%, transparent 40%)',
      }} />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 3D Stethoscope Icon */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-8 rounded-full opacity-25 animate-rotate-glow"
                style={{ background: 'conic-gradient(from 0deg, hsl(185 100% 55%), hsl(270 100% 65%), hsl(150 100% 50%), hsl(185 100% 55%))' }}
              />
              <div className="absolute -inset-7 rounded-full" style={{ background: '#050505' }} />
              
              {/* Stethoscope container */}
              <div
                className="relative w-28 h-28 rounded-3xl flex items-center justify-center"
                style={{ 
                  background: 'rgba(10, 15, 30, 0.6)',
                  backdropFilter: 'blur(30px)',
                  border: '2px solid',
                  borderImage: 'linear-gradient(135deg, hsl(185 100% 55% / 0.5), hsl(270 100% 65% / 0.3)) 1',
                  boxShadow: '0 0 40px hsl(185 100% 55% / 0.2), 0 0 80px hsl(270 100% 65% / 0.08)',
                }}>
                <Stethoscope className="w-14 h-14 text-primary drop-shadow-lg" strokeWidth={1.5} />
              </div>

              {/* Floating mini icons */}
              <div className="absolute -top-4 -right-6 float-animation" style={{ animationDelay: '0s' }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(10, 15, 30, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsl(330 100% 60% / 0.3)',
                    boxShadow: '0 0 20px hsl(330 100% 60% / 0.2)',
                  }}
                >
                  <HeartPulse className="w-5 h-5 text-accent animate-heartbeat" />
                </div>
              </div>
              <div className="absolute -bottom-3 -left-8 float-animation" style={{ animationDelay: '1.5s' }}>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(10, 15, 30, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsl(185 100% 55% / 0.3)',
                    boxShadow: '0 0 15px hsl(185 100% 55% / 0.2)',
                  }}
                >
                  <Dna className="w-4 h-4 text-neon-cyan" />
                </div>
              </div>
              <div className="absolute top-1/2 -right-12 float-animation" style={{ animationDelay: '3s' }}>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(10, 15, 30, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsl(150 100% 50% / 0.3)',
                    boxShadow: '0 0 15px hsl(150 100% 50% / 0.2)',
                  }}
                >
                  <Brain className="w-4 h-4 text-neon-green" />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 opacity-0 animate-slide-up">
            <span className="text-foreground">Med Students</span>
            <br />
            <span className="text-primary">
              Bejaia
            </span>
            {" "}
            <span style={{ color: 'hsl(var(--neon-blue))' }}>
              University
            </span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-0 animate-slide-up stagger-2 leading-relaxed">
            Your futuristic hub for medical resources. Access courses, slides, practicals & more — organized by module.
          </p>

          {/* Status badges */}
          <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-slide-up stagger-3">
            {[
              { icon: Zap, label: "9 Modules", color: "185 100% 55%" },
              { icon: Activity, label: "EN / FR", color: "270 100% 65%" },
              { icon: HeartPulse, label: "PDF, Slides, Videos", color: "150 100% 50%" },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: 'rgba(10, 15, 30, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid hsl(${color} / 0.2)`,
                  boxShadow: `0 0 15px hsl(${color} / 0.08)`,
                }}
              >
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
