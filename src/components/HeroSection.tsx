import { HeartPulse, Dna, Activity } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 dna-pattern" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Floating icons */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="float-animation" style={{ animationDelay: "0s" }}>
              <div className="w-12 h-12 rounded-xl glass neon-border flex items-center justify-center">
                <Dna className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="float-animation" style={{ animationDelay: "1s" }}>
              <div className="w-14 h-14 rounded-xl glass neon-border flex items-center justify-center pulse-glow">
                <HeartPulse className="w-7 h-7 text-primary animate-heartbeat" />
              </div>
            </div>
            <div className="float-animation" style={{ animationDelay: "2s" }}>
              <div className="w-12 h-12 rounded-xl glass neon-border flex items-center justify-center">
                <Activity className="w-6 h-6 text-neon-purple" />
              </div>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight mb-4 opacity-0 animate-slide-up">
            <span className="text-foreground">Med Students</span>
            <br />
            <span className="text-primary neon-text">Bejaia University</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-8 opacity-0 animate-slide-up stagger-2">
            Your centralized hub for medical resources. Access courses, slides, practicals, and more — organized by module.
          </p>

          <div className="flex justify-center gap-6 text-xs text-muted-foreground opacity-0 animate-slide-up stagger-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
              <span>8 Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-purple" />
              <span>EN / FR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green" />
              <span>PDF, Slides, Videos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
