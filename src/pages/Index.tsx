import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModuleCard from "@/components/ModuleCard";
import { modules } from "@/data/modules";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scrollbar-cyber">
      <Navbar />
      <HeroSection />

      <section className="container mx-auto px-6 py-20 relative">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to right, hsl(192 100% 50% / 0.3), transparent)' }} />
          <h2 className="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            Explorez les Modules
          </h2>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, hsl(192 100% 50% / 0.1))' }} />
        </div>
        
        {/* Module grid - 3 columns with varying sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} module={mod} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center" style={{ borderColor: 'hsl(192 100% 50% / 0.06)' }}>
        <p className="text-xs text-muted-foreground">
          © 2025 MédBéjaia — Faculté de Médecine, Université de Béjaia
        </p>
      </footer>
    </div>
  );
};

export default Index;
