import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModuleCard from "@/components/ModuleCard";
import { modules } from "@/data/modules";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scrollbar-cyber">
      <Navbar />
      <HeroSection />

      <section className="container mx-auto px-4 pb-20 relative">
        <div className="text-center mb-8">
          <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Modules
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} module={mod} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
