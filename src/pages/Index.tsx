import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModuleCard from "@/components/ModuleCard";
import { modules } from "@/data/modules";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scrollbar-cyber">
      <Navbar />
      <HeroSection />

      <section className="container mx-auto px-4 pb-20">
        <h2 className="font-display text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-6 text-center">
          Browse Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} module={mod} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
