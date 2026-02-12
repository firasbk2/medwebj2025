import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl glass neon-border flex items-center justify-center mx-auto mb-6 pulse-glow">
          <AlertTriangle className="w-10 h-10 text-accent" />
        </div>
        <h1 className="font-display text-5xl font-black text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
