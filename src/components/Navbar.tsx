import { Search, X, Stethoscope, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchFiles } from "@/hooks/useFiles";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: results } = useSearchFiles(searchQuery);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong" style={{ borderRadius: 0 }}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ 
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.08))',
              border: '1px solid hsl(var(--primary) / 0.3)',
            }}>
            <Stethoscope className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-sm font-bold tracking-wider text-foreground hidden sm:block">
            MED<span className="text-primary">BEJAIA</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {searchOpen ? (
            <div className="relative flex items-center gap-2 animate-fade-in-scale">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="glass px-4 py-2 text-sm bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 w-48 sm:w-72"
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-muted-foreground hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>

              {searchQuery.length >= 2 && results && results.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-8 glass p-2 max-h-64 overflow-y-auto z-50">
                  {results.map((file) => {
                    const storageUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/medical-resources/${file.file_path}`;
                    return (
                      <a key={file.id} href={storageUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-primary/10 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.module} · {file.category}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary/15 transition-all duration-300 text-muted-foreground hover:text-primary hover:scale-110">
              <Search className="w-4 h-4" />
            </button>
          )}

          <Link to="/admin"
            className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-accent/15 transition-all duration-300 text-muted-foreground hover:text-accent hover:scale-110"
            title="Admin">
            <Shield className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
