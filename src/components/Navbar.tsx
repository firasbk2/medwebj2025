import { Search, Menu, X, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-primary/10 neon-border flex items-center justify-center group-hover:neon-glow-sm transition-all duration-300">
            <Stethoscope className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-sm font-bold tracking-wider text-foreground hidden sm:block">
            MED<span className="text-primary">BEJAIA</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {searchOpen ? (
            <div className="flex items-center gap-2 animate-fade-in-scale">
              <input
                type="text"
                placeholder="Search resources..."
                className="glass neon-border px-4 py-2 text-sm bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 w-48 sm:w-72"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/10 hover:neon-glow-sm transition-all duration-300 text-muted-foreground hover:text-primary"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 text-muted-foreground hover:text-primary sm:hidden"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
