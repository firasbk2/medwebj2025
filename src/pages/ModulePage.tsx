import { useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import LanguageSelector from "@/components/LanguageSelector";
import CategorySelector from "@/components/CategorySelector";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import FileList from "@/components/FileList";
import { modules, type ModuleCategory } from "@/data/modules";

const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const moduleConfig = modules.find((m) => m.id === moduleId);

  const [language, setLanguage] = useState<"en" | "fr" | null>(null);
  const [path, setPath] = useState<ModuleCategory[]>([]);

  const handleLanguageSelect = useCallback((lang: "en" | "fr") => {
    setLanguage(lang);
    setPath([]);
  }, []);

  const handleCategorySelect = useCallback((cat: ModuleCategory) => {
    setPath((prev) => [...prev, cat]);
  }, []);

  const handleBack = useCallback(() => {
    if (path.length > 0) {
      setPath((prev) => prev.slice(0, -1));
    } else if (language) {
      setLanguage(null);
    } else {
      navigate("/");
    }
  }, [path, language, navigate]);

  const handleBreadcrumbNavigate = useCallback(
    (index: number) => {
      if (index === -1) {
        setLanguage(null);
        setPath([]);
      } else {
        setPath((prev) => prev.slice(0, index + 1));
      }
    },
    []
  );

  if (!moduleConfig) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground font-display">Module not found</p>
        <Link to="/" className="flex items-center gap-2 text-primary hover:underline text-sm">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const Icon = moduleConfig.icon;
  const currentNode = path.length > 0 ? path[path.length - 1] : null;
  const showFiles = currentNode?.isFileLevel;
  const childCategories = currentNode?.children ?? (language ? moduleConfig.tree : []);

  const breadcrumbItems = [
    language === "en" ? moduleConfig.name : moduleConfig.nameFr,
    ...(language ? [language === "en" ? "English" : "Français"] : []),
    ...path.map((p) => p.label),
  ];

  return (
    <div className="min-h-screen scrollbar-cyber" style={{ background: 'linear-gradient(180deg, #050505 0%, #0A0F1E 50%, #050510 100%)' }}>
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-20 max-w-3xl">
        {/* Module Header */}
        <div className="flex items-center gap-4 mb-8 opacity-0 animate-slide-up">
          {/* Back button - goes up one level or to home */}
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:neon-glow-sm transition-all text-muted-foreground hover:text-primary group"
            style={{ border: '1px solid hsl(var(--primary) / 0.2)' }}
            title={path.length > 0 ? "Go back" : language ? "Change language" : "Back to home"}
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Home button */}
          <Link
            to="/"
            className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:neon-glow-sm transition-all text-muted-foreground hover:text-primary group"
            style={{ border: '1px solid hsl(var(--primary) / 0.2)' }}
            title="Back to home"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--neon-pink) / 0.1))',
                border: '1px solid hsl(var(--primary) / 0.3)',
              }}>
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">
                {language === "fr" ? moduleConfig.nameFr : moduleConfig.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                {language === "fr" ? moduleConfig.descriptionFr : moduleConfig.description}
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        {language && (
          <BreadcrumbNav
            items={breadcrumbItems}
            onNavigate={(index) => {
              if (index <= 0) {
                handleBreadcrumbNavigate(-1);
              } else if (index === 1) {
                setPath([]);
              } else {
                handleBreadcrumbNavigate(index - 2);
              }
            }}
          />
        )}

        {/* Content */}
        {!language ? (
          <LanguageSelector onSelect={handleLanguageSelect} />
        ) : showFiles ? (
          <FileList
            module={moduleConfig.id}
            language={language}
            path={path.map((p) => p.label)}
          />
        ) : childCategories.length > 0 ? (
          <CategorySelector
            categories={childCategories}
            onSelect={handleCategorySelect}
            title="Select a category"
          />
        ) : (
          <FileList
            module={moduleConfig.id}
            language={language}
            path={path.map((p) => p.label)}
          />
        )}
      </div>
    </div>
  );
};

export default ModulePage;
