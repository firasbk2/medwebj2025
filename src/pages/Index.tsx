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
        <div className="text-center mb-10">
          <h2 className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Modules
          </h2>
        </div>
        
        {/* Asymmetrical staggered grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-auto">
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              className={`${
                // Stagger: offset certain items for asymmetry
                i % 5 === 1 ? 'lg:mt-6' :
                i % 5 === 3 ? 'lg:mt-10' :
                i % 5 === 4 ? 'lg:mt-3' : ''
              }`}
            >
              <ModuleCard module={mod} index={i} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
