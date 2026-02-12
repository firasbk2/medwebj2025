import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Upload, Trash2, Eye, EyeOff, BarChart3, Files, HardDrive,
  Loader2, LogOut, Lock, Edit3, X, Check, CloudUpload, Stethoscope,
  FileText, Film, FileImage, Search, RefreshCw
} from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { modules, type ModuleCategory } from "@/data/modules";
import type { FileRecord } from "@/types/files";
import { useToast } from "@/hooks/use-toast";

const typeIcons: Record<string, typeof FileText> = {
  pdf: FileText, pptx: FileText, ppt: FileText, docx: FileText, doc: FileText,
  mp4: Film, jpg: FileImage, jpeg: FileImage, png: FileImage,
};

// Extract all selectable paths from a module's tree
function getModulePaths(tree: ModuleCategory[], prefix: string[] = []): string[][] {
  const paths: string[][] = [];
  for (const node of tree) {
    const current = [...prefix, node.label];
    if (node.isFileLevel) {
      paths.push(current);
    }
    if (node.children) {
      paths.push(...getModulePaths(node.children, current));
    }
  }
  return paths;
}

// Get children at a given depth for a module tree
function getOptionsAtDepth(tree: ModuleCategory[], selections: string[]): string[] {
  let nodes = tree;
  for (const sel of selections) {
    const found = nodes.find(n => n.label === sel);
    if (!found || !found.children) return [];
    nodes = found.children;
  }
  return nodes.map(n => n.label);
}

function isFileLevel(tree: ModuleCategory[], selections: string[]): boolean {
  let nodes = tree;
  for (let i = 0; i < selections.length; i++) {
    const found = nodes.find(n => n.label === selections[i]);
    if (!found) return false;
    if (found.isFileLevel) return true;
    if (!found.children) return false;
    nodes = found.children;
  }
  return false;
}

const AdminDashboard = () => {
  const { isAuthenticated, loading, login, logout, uploadFile, deleteFile, toggleVisibility, getStats, listFiles, updateFile } = useAdmin();
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [stats, setStats] = useState({ totalFiles: 0, totalSize: 0, moduleCount: 0 });
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<FileRecord>>({});
  const [searchFilter, setSearchFilter] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadLanguage, setUploadLanguage] = useState("fr");
  const [uploadModuleId, setUploadModuleId] = useState("anatomy");
  const [pathSelections, setPathSelections] = useState<string[]>([]);

  const selectedModule = useMemo(() => modules.find(m => m.id === uploadModuleId), [uploadModuleId]);
  const moduleTree = selectedModule?.tree || [];

  // Build cascading dropdown levels
  const dropdownLevels = useMemo(() => {
    const levels: { label: string; options: string[] }[] = [];
    const depthLabels = ["Type", "Sous-type", "Région / Sujet", "Thème", "Détail"];
    
    let depth = 0;
    let currentSelections: string[] = [];
    
    while (depth < 5) {
      const opts = getOptionsAtDepth(moduleTree, currentSelections);
      if (opts.length === 0) break;
      levels.push({ label: depthLabels[depth] || `Level ${depth + 1}`, options: opts });
      
      if (depth < pathSelections.length) {
        currentSelections = [...currentSelections, pathSelections[depth]];
        // Check if this selection is a file level - stop adding more levels
        if (isFileLevel(moduleTree, currentSelections)) break;
        depth++;
      } else {
        break;
      }
    }
    
    return levels;
  }, [moduleTree, pathSelections]);

  // Derive upload metadata from selections
  const uploadMeta = useMemo(() => {
    const meta: Record<string, string> = {
      language: uploadLanguage,
      module: uploadModuleId,
      category: "",
      sub_category: "",
      topic: "",
      region: "",
      professor: "",
    };

    const modId = uploadModuleId;
    const p = pathSelections;

    if (modId === "anatomy") {
      if (p[0]) meta.category = p[0].toLowerCase();
      if (p[1]) meta.sub_category = p[1].toLowerCase();
      if (p[2]) meta.region = p[2];
      if (p[3]) meta.topic = p[3];
    } else if (modId === "biochimie") {
      if (p[0]) meta.category = p[0].toLowerCase();
      if (p[1]) meta.sub_category = p[1].toLowerCase();
      if (p[2]) meta.topic = p[2];
    } else if (modId === "biophysique") {
      if (p[0]) meta.category = p[0].toLowerCase();
      if (p[1]) meta.topic = p[1];
    } else if (modId === "biostatistique") {
      if (p[0]) meta.professor = p[0];
      if (p[1]) meta.category = p[1].toLowerCase();
    } else if (modId === "physiologie") {
      if (p[0]) meta.category = p[0].toLowerCase();
    } else {
      // chimie-g, chimie-o, histology
      if (p[0]) meta.category = p[0].toLowerCase();
    }

    return meta;
  }, [uploadLanguage, uploadModuleId, pathSelections]);

  const handlePathSelect = (depth: number, value: string) => {
    setPathSelections(prev => {
      const next = prev.slice(0, depth);
      next[depth] = value;
      return next;
    });
  };

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const [fileData, statData] = await Promise.all([listFiles(), getStats()]);
      setFiles(Array.isArray(fileData) ? fileData : []);
      setStats(statData);
    } catch { /* ignore */ }
    setRefreshing(false);
  }, [listFiles, getStats]);

  useEffect(() => { if (isAuthenticated) refresh(); }, [isAuthenticated, refresh]);

  // Reset path when module changes
  useEffect(() => { setPathSelections([]); }, [uploadModuleId]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(password);
    if (!ok) toast({ title: "كلمة السر خاطئة", variant: "destructive" });
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => setUploadProgress(p => Math.min(p + Math.random() * 15, 90)), 200);
    try {
      await uploadFile(selectedFile, uploadMeta);
      setUploadProgress(100);
      toast({ title: "✅ تم رفع الملف بنجاح!" });
      setSelectedFile(null);
      refresh();
    } catch (err: any) {
      toast({ title: "فشل الرفع", description: err.message, variant: "destructive" });
    }
    clearInterval(interval);
    setTimeout(() => { setUploading(false); setUploadProgress(0); }, 500);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`حذف "${name}"؟`)) return;
    try { await deleteFile(id); toast({ title: "تم حذف الملف" }); refresh(); }
    catch (err: any) { toast({ title: "فشل الحذف", description: err.message, variant: "destructive" }); }
  };

  const handleToggle = async (id: string, visible: boolean) => {
    try { await toggleVisibility(id, visible); refresh(); }
    catch { toast({ title: "فشل التحديث", variant: "destructive" }); }
  };

  const handleEdit = (file: FileRecord) => {
    setEditingFile(file.id);
    setEditData({ name: file.name, category: file.category, sub_category: file.sub_category, topic: file.topic, region: file.region, professor: file.professor });
  };

  const handleSaveEdit = async () => {
    if (!editingFile) return;
    try { await updateFile(editingFile, editData); toast({ title: "✅ تم تحديث الملف" }); setEditingFile(null); refresh(); }
    catch (err: any) { toast({ title: "فشل التحديث", description: err.message, variant: "destructive" }); }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const filteredFiles = files.filter(f =>
    !searchFilter || f.name.toLowerCase().includes(searchFilter.toLowerCase()) || f.module.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // ─── LOGIN SCREEN ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(240 20% 4%)' }}>
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(var(--neon-cyan) / 0.08) 0%, transparent 60%)' }} />
        <form onSubmit={handleLogin} className="relative p-10 w-full max-w-md animate-fade-in-scale rounded-2xl"
          style={{ background: 'linear-gradient(135deg, hsl(240 20% 8% / 0.95), hsl(240 20% 5% / 0.95))', border: '1px solid hsl(var(--neon-cyan) / 0.25)', boxShadow: '0 0 60px hsl(var(--neon-cyan) / 0.08), inset 0 1px 0 hsl(var(--neon-cyan) / 0.1)' }}>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, hsl(var(--neon-cyan) / 0.15), hsl(var(--neon-blue) / 0.1))', border: '2px solid hsl(var(--neon-cyan) / 0.4)', boxShadow: '0 0 30px hsl(var(--neon-cyan) / 0.3)' }}>
                <Stethoscope className="w-10 h-10 text-neon-cyan" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'hsl(var(--neon-cyan))', boxShadow: '0 0 20px hsl(var(--neon-cyan) / 0.6)' }}>
                <Lock className="w-4 h-4" style={{ color: 'hsl(240 20% 5%)' }} />
              </div>
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-1">Command Center</h2>
          <p className="text-sm text-center mb-8" style={{ color: 'hsl(var(--neon-cyan) / 0.6)' }}>Admin Access Required</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password"
            className="w-full px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none mb-5 rounded-xl transition-all"
            style={{ background: 'hsl(240 20% 7%)', border: '1px solid hsl(var(--neon-cyan) / 0.2)', boxShadow: 'inset 0 2px 4px hsl(240 20% 3% / 0.5)' }}
          />
          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-display text-sm font-bold tracking-wider transition-all duration-300 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, hsl(var(--neon-cyan)), hsl(var(--neon-blue)))', color: 'hsl(240 20% 5%)', boxShadow: '0 0 30px hsl(var(--neon-cyan) / 0.4)' }}>
            {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</span> : "ENTER DASHBOARD"}
          </button>
        </form>
      </div>
    );
  }

  // ─── DASHBOARD ───
  return (
    <div className="min-h-screen scrollbar-cyber" style={{ background: 'hsl(240 20% 4%)' }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 20%, hsl(var(--neon-cyan) / 0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, hsl(var(--neon-blue) / 0.03) 0%, transparent 50%)' }} />
      <div className="fixed inset-0 grid-bg opacity-8 pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-50" style={{ background: 'hsl(240 20% 5% / 0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid hsl(var(--neon-cyan) / 0.1)' }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-9 h-9 rounded-lg flex items-center justify-center hover:scale-110 transition-all text-muted-foreground hover:text-neon-cyan"
              style={{ background: 'hsl(240 20% 8%)', border: '1px solid hsl(var(--neon-cyan) / 0.2)' }}>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'hsl(var(--neon-cyan) / 0.1)', border: '1px solid hsl(var(--neon-cyan) / 0.3)', boxShadow: '0 0 10px hsl(var(--neon-cyan) / 0.15)' }}>
                <Stethoscope className="w-4 h-4 text-neon-cyan" />
              </div>
              <h1 className="font-display text-sm font-bold tracking-wider text-foreground">
                ADMIN <span className="text-neon-cyan">PANEL</span>
              </h1>
            </div>
          </div>
          <button onClick={() => { logout(); window.location.href = "/"; }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all hover:bg-destructive/10"
            style={{ color: 'hsl(var(--neon-pink))' }}>
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Files, label: "Total Files", value: stats.totalFiles, color: "var(--neon-cyan)" },
            { icon: BarChart3, label: "Modules", value: stats.moduleCount, color: "var(--neon-green)" },
            { icon: HardDrive, label: "Storage", value: `${(stats.totalSize / (1024 * 1024)).toFixed(1)} MB`, color: "var(--neon-blue)" },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <div key={label} className={`p-5 rounded-2xl opacity-0 animate-slide-up stagger-${i + 1}`}
              style={{ background: 'hsl(240 20% 7%)', border: `1px solid hsl(${color} / 0.2)`, boxShadow: `0 0 20px hsl(${color} / 0.05)` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `hsl(${color} / 0.1)`, border: `1px solid hsl(${color} / 0.3)`, boxShadow: `0 0 10px hsl(${color} / 0.15)` }}>
                  <Icon className="w-4 h-4" style={{ color: `hsl(${color})` }} />
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="font-display text-2xl font-bold" style={{ color: `hsl(${color})` }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="p-6 mb-8 rounded-2xl opacity-0 animate-slide-up stagger-4"
          style={{ background: 'hsl(240 20% 6%)', border: '1px solid hsl(var(--neon-cyan) / 0.12)', boxShadow: '0 0 30px hsl(var(--neon-cyan) / 0.03)' }}>
          <h2 className="font-display text-sm font-semibold tracking-wider mb-5 flex items-center gap-2" style={{ color: 'hsl(var(--neon-cyan))' }}>
            <CloudUpload className="w-5 h-5" /> UPLOAD FILE
          </h2>

          {/* Drag & Drop */}
          <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 mb-5"
            style={{
              border: `2px dashed hsl(var(--neon-cyan) / ${dragOver ? '0.6' : '0.15'})`,
              background: dragOver ? 'hsl(var(--neon-cyan) / 0.03)' : 'hsl(240 20% 5%)',
              boxShadow: dragOver ? '0 0 30px hsl(var(--neon-cyan) / 0.1)' : 'none',
            }}>
            <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.pptx,.ppt,.docx,.doc,.mp4,.mov,.jpg,.jpeg,.png,.webp"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
            <CloudUpload className={`w-12 h-12 mx-auto mb-3 transition-all duration-300 ${dragOver ? 'text-neon-cyan scale-110' : 'text-muted-foreground'}`} />
            {selectedFile ? (
              <div>
                <p className="text-sm font-semibold text-neon-cyan">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-foreground/80 font-medium">Drag & drop a file here</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, PPTX, DOCX, MP4, JPG, PNG</p>
              </div>
            )}
          </div>

          {/* Progress */}
          {uploading && (
            <div className="mb-5">
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'hsl(240 20% 10%)' }}>
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%`, background: 'linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-blue)))', boxShadow: '0 0 10px hsl(var(--neon-cyan) / 0.5)' }} />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">{Math.round(uploadProgress)}%</p>
            </div>
          )}

          {/* Smart Selectors */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NeonSelect label="🌐 Langue" value={uploadLanguage} onChange={setUploadLanguage}
              options={[{ value: "en", label: "🇬🇧 English" }, { value: "fr", label: "🇫🇷 Français" }]} />
            <NeonSelect label="📚 Module" value={uploadModuleId} onChange={setUploadModuleId}
              options={modules.map(m => ({ value: m.id, label: m.nameFr }))} />

            {dropdownLevels.map((level, i) => (
              <NeonSelect key={`${uploadModuleId}-${i}`} label={`📂 ${level.label}`}
                value={pathSelections[i] || ""}
                onChange={(v) => handlePathSelect(i, v)}
                options={level.options.map(o => ({ value: o, label: o }))}
                placeholder="— Choisir —"
              />
            ))}
          </div>

          <button onClick={handleUpload} disabled={!selectedFile || uploading}
            className="mt-5 w-full py-4 rounded-xl font-display text-sm font-bold tracking-wider transition-all duration-300 disabled:opacity-30 flex items-center justify-center gap-2"
            style={{
              background: selectedFile ? 'linear-gradient(135deg, hsl(var(--neon-cyan)), hsl(var(--neon-blue)))' : 'hsl(240 20% 10%)',
              color: selectedFile ? 'hsl(240 20% 5%)' : 'hsl(240 10% 40%)',
              boxShadow: selectedFile ? '0 0 30px hsl(var(--neon-cyan) / 0.3)' : 'none',
            }}>
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Upload File</>}
          </button>
        </div>

        {/* File Management */}
        <div className="p-6 rounded-2xl opacity-0 animate-slide-up stagger-5"
          style={{ background: 'hsl(240 20% 6%)', border: '1px solid hsl(var(--neon-cyan) / 0.12)' }}>
          <div className="flex items-center justify-between mb-5 gap-3">
            <h2 className="font-display text-sm font-semibold tracking-wider flex items-center gap-2" style={{ color: 'hsl(var(--neon-cyan))' }}>
              <Files className="w-5 h-5" /> ALL FILES
              <span className="text-xs font-normal ml-1" style={{ color: 'hsl(var(--neon-cyan) / 0.5)' }}>({files.length})</span>
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} placeholder="Filter..."
                  className="pl-8 pr-3 py-2 text-xs rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none w-36"
                  style={{ background: 'hsl(240 20% 8%)', border: '1px solid hsl(var(--neon-cyan) / 0.15)' }} />
              </div>
              <button onClick={refresh} disabled={refreshing}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-neon-cyan transition-all"
                style={{ background: 'hsl(240 20% 8%)', border: '1px solid hsl(var(--neon-cyan) / 0.15)' }}>
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {filteredFiles.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">No files found.</p>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => {
                const FileIcon = typeIcons[file.file_type] || FileText;
                const isEditing = editingFile === file.id;
                return (
                  <div key={file.id} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group"
                    style={{ background: 'hsl(240 20% 7%)', border: '1px solid hsl(240 15% 12%)' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(var(--neon-cyan) / 0.08)', border: '1px solid hsl(var(--neon-cyan) / 0.15)' }}>
                      <FileIcon className="w-5 h-5 text-neon-cyan" />
                    </div>
                    {isEditing ? (
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input value={editData.name || ""} onChange={e => setEditData(p => ({ ...p, name: e.target.value }))}
                          className="col-span-2 px-3 py-1.5 text-sm rounded-lg text-foreground" style={{ background: 'hsl(240 20% 9%)', border: '1px solid hsl(var(--neon-cyan) / 0.3)' }} placeholder="Name" />
                        <input value={editData.category || ""} onChange={e => setEditData(p => ({ ...p, category: e.target.value }))}
                          className="px-3 py-1.5 text-xs rounded-lg text-foreground" style={{ background: 'hsl(240 20% 9%)', border: '1px solid hsl(240 15% 15%)' }} placeholder="Category" />
                        <input value={editData.topic || ""} onChange={e => setEditData(p => ({ ...p, topic: e.target.value }))}
                          className="px-3 py-1.5 text-xs rounded-lg text-foreground" style={{ background: 'hsl(240 20% 9%)', border: '1px solid hsl(240 15% 15%)' }} placeholder="Topic" />
                      </div>
                    ) : (
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.module} · {file.language.toUpperCase()} · {file.category}
                          {file.sub_category ? ` · ${file.sub_category}` : ""}
                          {file.topic ? ` · ${file.topic}` : ""}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      {isEditing ? (
                        <>
                          <button onClick={handleSaveEdit} className="p-2 rounded-lg text-neon-green hover:bg-neon-green/10 transition-colors"><Check className="w-4 h-4" /></button>
                          <button onClick={() => setEditingFile(null)} className="p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"><X className="w-4 h-4" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(file)} className="p-2 rounded-lg text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 transition-colors opacity-0 group-hover:opacity-100"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => handleToggle(file.id, !file.is_visible)}
                            className={`p-2 rounded-lg transition-colors ${file.is_visible ? 'text-neon-cyan hover:bg-neon-cyan/10' : 'text-muted-foreground hover:bg-secondary'}`}>
                            {file.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button onClick={() => handleDelete(file.id, file.name)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-neon-pink hover:bg-neon-pink/10 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Neon Select ───
const NeonSelect = ({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string;
}) => (
  <div>
    <label className="text-xs mb-1.5 block font-medium" style={{ color: 'hsl(var(--neon-cyan) / 0.7)' }}>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 text-sm rounded-xl text-foreground focus:outline-none transition-all"
      style={{ background: 'hsl(240 20% 8%)', border: '1px solid hsl(var(--neon-cyan) / 0.15)', boxShadow: 'inset 0 1px 3px hsl(240 20% 3% / 0.5)' }}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

export default AdminDashboard;