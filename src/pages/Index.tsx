import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModuleCard from "@/components/ModuleCard";
import { modules } from "@/data/modules";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scrollbar-cyber">
      <Navbar />
      <HeroSection />

      <section className="container mx-auto px-4 pb-24 relative">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-2">
            Browse Modules
          </h2>
          <div className="w-20 h-0.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)' }} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} module={mod} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
