import { Search, X, GraduationCap, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchFiles } from "@/hooks/useFiles";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: results } = useSearchFiles(searchQuery);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl"
      style={{
        background: 'hsl(220 40% 2% / 0.85)',
        borderBottom: '1px solid hsl(192 100% 50% / 0.06)',
        boxShadow: '0 4px 30px hsl(192 100% 50% / 0.03)',
      }}
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, hsl(192 100% 50% / 0.1), hsl(210 80% 20% / 0.15))',
              border: '1px solid hsl(192 100% 50% / 0.1)',
            }}
          >
            <GraduationCap className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground">
            Méd<span className="text-primary" style={{ textShadow: '0 0 20px hsl(192 100% 50% / 0.3)' }}>Béjaia</span>
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
                className="px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 w-48 sm:w-64 rounded-lg"
                style={{
                  background: 'hsl(215 45% 6% / 0.9)',
                  border: '1px solid hsl(192 100% 50% / 0.1)',
                }}
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>

              {searchQuery.length >= 2 && results && results.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-8 glass-crystal p-1.5 max-h-64 overflow-y-auto z-50 glow-ambient">
                  {results.map((file) => {
                    const handleClick = async () => {
                      try {
                        const res = await fetch(
                          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin?action=file-url&id=${file.id}`,
                          { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
                        );
                        if (!res.ok) return;
                        const data = await res.json();
                        if (data.url) window.open(data.url, "_blank", "noopener,noreferrer");
                      } catch {}
                    };
                    return (
                      <button key={file.id} onClick={handleClick}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors w-full text-left">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.module} · {file.category}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
              style={{ border: '1px solid hsl(192 100% 50% / 0.06)' }}
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <Link to="/admin"
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            style={{ border: '1px solid hsl(192 100% 50% / 0.06)' }}
            title="Admin">
            <Shield className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
