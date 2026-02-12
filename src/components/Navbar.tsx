import { Search, X, Stethoscope, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchFiles } from "@/hooks/useFiles";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: results } = useSearchFiles(searchQuery);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(5, 5, 5, 0.6)',
        backdropFilter: 'blur(30px) saturate(1.5)',
        borderBottom: '1px solid',
        borderImage: 'linear-gradient(90deg, transparent, hsl(185 100% 55% / 0.25), hsl(270 100% 65% / 0.2), transparent) 1',
        borderRadius: 0,
      }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--neon-purple) / 0.1))',
              border: '1px solid hsl(var(--primary) / 0.35)',
              boxShadow: '0 0 15px hsl(var(--primary) / 0.15)',
            }}
          >
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
                className="px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-48 sm:w-72 rounded-xl"
                style={{
                  background: 'rgba(10, 15, 30, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  boxShadow: '0 0 20px hsl(var(--primary) / 0.1), inset 0 0 15px hsl(var(--primary) / 0.03)',
                }}
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-muted-foreground hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>

              {searchQuery.length >= 2 && results && results.length > 0 && (
                <div
                  className="absolute top-full mt-2 left-0 right-8 p-2 max-h-64 overflow-y-auto z-50 rounded-xl"
                  style={{
                    background: 'rgba(10, 15, 30, 0.9)',
                    backdropFilter: 'blur(30px)',
                    border: '1px solid hsl(var(--primary) / 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 220, 255, 0.1)',
                  }}
                >
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
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-primary hover:scale-110"
              style={{
                background: 'rgba(10, 15, 30, 0.6)',
                border: '1px solid hsl(var(--primary) / 0.15)',
              }}
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <Link
            to="/admin"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-accent hover:scale-110"
            style={{
              background: 'rgba(10, 15, 30, 0.6)',
              border: '1px solid hsl(var(--accent) / 0.15)',
            }}
            title="Admin"
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
