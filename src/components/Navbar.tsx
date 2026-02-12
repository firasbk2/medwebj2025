import { Search, X, GraduationCap, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchFiles } from "@/hooks/useFiles";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: results } = useSearchFiles(searchQuery);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground">
            Med<span className="text-primary">Bejaia</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="relative flex items-center gap-2 animate-fade-in-scale">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 w-48 sm:w-64 rounded-lg bg-secondary border border-border"
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>

              {searchQuery.length >= 2 && results && results.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-8 bg-card border border-border rounded-xl p-1.5 max-h-64 overflow-y-auto z-50 shadow-xl">
                  {results.map((file) => {
                    const storageUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/medical-resources/${file.file_path}`;
                    return (
                      <a key={file.id} href={storageUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
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
              className="w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4" />
            </button>
          )}

          <Link to="/admin"
            className="w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            title="Admin">
            <Shield className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
