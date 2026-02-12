import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import LanguageSelector from "@/components/LanguageSelector";
import CategorySelector from "@/components/CategorySelector";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import FileList from "@/components/FileList";
import { modules, type ModuleCategory } from "@/data/modules";

const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Module not found</p>
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
    <div className="min-h-screen bg-background scrollbar-cyber">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-20 max-w-3xl">
        {/* Module Header */}
        <div className="flex items-center gap-4 mb-8 opacity-0 animate-slide-up">
          <Link
            to="/"
            className="w-9 h-9 rounded-lg glass neon-border flex items-center justify-center hover:neon-glow-sm transition-all text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl glass neon-border flex items-center justify-center">
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
