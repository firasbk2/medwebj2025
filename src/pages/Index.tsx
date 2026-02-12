import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModuleCard from "@/components/ModuleCard";
import ParticleBackground from "@/components/ParticleBackground";
import { modules } from "@/data/modules";

const Index = () => {
  return (
    <div className="min-h-screen scrollbar-cyber" style={{ background: 'linear-gradient(180deg, #050505 0%, #0A0F1E 50%, #050510 100%)' }}>
      <ParticleBackground />
      <Navbar />
      <HeroSection />

      <section className="container mx-auto px-4 pb-24 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-2">
            Browse Modules
          </h2>
          <div className="w-20 h-0.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)' }} />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} module={mod} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
