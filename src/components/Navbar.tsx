import { Search, X, Stethoscope, Shield } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchFiles } from "@/hooks/useFiles";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data: results } = useSearchFiles(searchQuery);

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
            <div className="relative flex items-center gap-2 animate-fade-in-scale">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="glass neon-border px-4 py-2 text-sm bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 w-48 sm:w-72 rounded-lg"
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-muted-foreground hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>

              {/* Search results dropdown */}
              {searchQuery.length >= 2 && results && results.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-8 glass neon-border rounded-xl p-2 max-h-64 overflow-y-auto z-50">
                  {results.map((file) => {
                    const storageUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/medical-resources/${file.file_path}`;
                    return (
                      <a
                        key={file.id}
                        href={storageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-colors"
                      >
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
              className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/10 hover:neon-glow-sm transition-all duration-300 text-muted-foreground hover:text-primary"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <Link
            to="/admin"
            className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 text-muted-foreground hover:text-primary"
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
