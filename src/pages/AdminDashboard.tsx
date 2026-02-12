import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Upload, Trash2, Eye, EyeOff, BarChart3, Files, HardDrive,
  Loader2, LogOut, Lock, Edit3, X, Check, CloudUpload, Stethoscope,
  FileText, Film, FileImage, Search, RefreshCw
} from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { modules } from "@/data/modules";
import type { FileRecord } from "@/types/files";
import { useToast } from "@/hooks/use-toast";

const typeIcons: Record<string, typeof FileText> = {
  pdf: FileText, pptx: FileText, ppt: FileText, docx: FileText, doc: FileText,
  mp4: Film, jpg: FileImage, jpeg: FileImage, png: FileImage,
};

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
  const [uploadMeta, setUploadMeta] = useState({
    language: "fr",
    module: "anatomy",
    category: "cours",
    sub_category: "",
    topic: "",
    region: "",
    professor: "",
  });

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const [fileData, statData] = await Promise.all([listFiles(), getStats()]);
      setFiles(Array.isArray(fileData) ? fileData : []);
      setStats(statData);
    } catch { /* ignore */ }
    setRefreshing(false);
  }, [listFiles, getStats]);

  useEffect(() => {
    if (isAuthenticated) refresh();
  }, [isAuthenticated, refresh]);

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
    try {
      await deleteFile(id);
      toast({ title: "تم حذف الملف" });
      refresh();
    } catch (err: any) {
      toast({ title: "فشل الحذف", description: err.message, variant: "destructive" });
    }
  };

  const handleToggle = async (id: string, visible: boolean) => {
    try {
      await toggleVisibility(id, visible);
      refresh();
    } catch { toast({ title: "فشل التحديث", variant: "destructive" }); }
  };

  const handleEdit = (file: FileRecord) => {
    setEditingFile(file.id);
    setEditData({ name: file.name, category: file.category, sub_category: file.sub_category, topic: file.topic, region: file.region, professor: file.professor });
  };

  const handleSaveEdit = async () => {
    if (!editingFile) return;
    try {
      await updateFile(editingFile, editData);
      toast({ title: "✅ تم تحديث الملف" });
      setEditingFile(null);
      refresh();
    } catch (err: any) {
      toast({ title: "فشل التحديث", description: err.message, variant: "destructive" });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const filteredFiles = files.filter(f =>
    !searchFilter || f.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    f.module.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center gradient-mesh">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <form onSubmit={handleLogin} className="relative glass-strong p-10 w-full max-w-md animate-fade-in-scale" style={{ border: '1px solid hsl(var(--primary) / 0.3)' }}>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center neon-glow"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--neon-pink) / 0.15))', border: '2px solid hsl(var(--primary) / 0.4)' }}>
                <Stethoscope className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center pulse-glow"
                style={{ background: 'hsl(var(--primary))', boxShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}>
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-1">Command Center</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">Admin Access Required</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-5 py-4 text-sm bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-5 rounded-xl"
            style={{ border: '1px solid hsl(var(--primary) / 0.2)' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-display text-sm font-bold tracking-wider transition-all duration-300 disabled:opacity-50 neon-glow"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--neon-pink)))', color: 'white' }}
          >
            {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</span> : "ENTER DASHBOARD"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background scrollbar-cyber">
      {/* Animated background */}
      <div className="fixed inset-0 gradient-mesh opacity-50 pointer-events-none" />
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="glass-strong sticky top-0 z-50" style={{ borderRadius: 0, borderBottom: '1px solid hsl(var(--primary) / 0.1)' }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-9 h-9 rounded-lg flex items-center justify-center hover:scale-110 transition-all text-muted-foreground hover:text-primary"
              style={{ background: 'hsl(var(--secondary) / 0.5)', border: '1px solid hsl(var(--primary) / 0.2)' }}>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--neon-pink) / 0.1))', border: '1px solid hsl(var(--primary) / 0.3)' }}>
                <Stethoscope className="w-4 h-4 text-primary" />
              </div>
              <h1 className="font-display text-sm font-bold tracking-wider text-foreground">
                ADMIN <span className="text-primary">PANEL</span>
              </h1>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Files, label: "Total Files", value: stats.totalFiles, color: "var(--primary)" },
            { icon: BarChart3, label: "Modules", value: stats.moduleCount, color: "var(--neon-cyan)" },
            { icon: HardDrive, label: "Storage", value: `${(stats.totalSize / (1024 * 1024)).toFixed(1)} MB`, color: "var(--neon-green)" },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <div key={label} className={`glass-strong p-5 opacity-0 animate-slide-up stagger-${i + 1}`}
              style={{ border: `1px solid hsl(${color} / 0.2)` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `hsl(${color} / 0.15)`, border: `1px solid hsl(${color} / 0.3)` }}>
                  <Icon className="w-4 h-4" style={{ color: `hsl(${color})` }} />
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="glass-strong p-6 mb-8 opacity-0 animate-slide-up stagger-4" style={{ border: '1px solid hsl(var(--primary) / 0.15)' }}>
          <h2 className="font-display text-sm font-semibold tracking-wider text-foreground mb-5 flex items-center gap-2">
            <CloudUpload className="w-5 h-5 text-primary" />
            UPLOAD FILE
          </h2>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 mb-5 ${
              dragOver ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-primary/20 hover:border-primary/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.pptx,.ppt,.docx,.doc,.mp4,.mov,.jpg,.jpeg,.png,.webp"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            <CloudUpload className={`w-12 h-12 mx-auto mb-3 transition-all duration-300 ${dragOver ? 'text-primary scale-110' : 'text-muted-foreground'}`} />
            {selectedFile ? (
              <div>
                <p className="text-sm text-primary font-semibold">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-foreground/80 font-medium">Drag & drop a file here</p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse · PDF, PPTX, DOCX, MP4, JPG, PNG</p>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mb-5">
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300 neon-glow"
                  style={{ width: `${uploadProgress}%`, background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--neon-pink)))' }} />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">{Math.round(uploadProgress)}% uploading...</p>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AdminSelect label="Language" value={uploadMeta.language} onChange={(v) => setUploadMeta(p => ({ ...p, language: v }))}
              options={[{ value: "en", label: "🇬🇧 English" }, { value: "fr", label: "🇫🇷 Français" }]} />
            <AdminSelect label="Module" value={uploadMeta.module} onChange={(v) => setUploadMeta(p => ({ ...p, module: v }))}
              options={modules.map(m => ({ value: m.id, label: m.nameFr }))} />
            <AdminSelect label="Category" value={uploadMeta.category} onChange={(v) => setUploadMeta(p => ({ ...p, category: v }))}
              options={[
                { value: "cours", label: "Cours" }, { value: "td", label: "TD" },
                { value: "tp", label: "TP" }, { value: "animations", label: "Animations" },
              ]} />
            <AdminInput label="Sub-category" value={uploadMeta.sub_category} onChange={(v) => setUploadMeta(p => ({ ...p, sub_category: v }))} placeholder="e.g. diapos, polycopiés" />
            <AdminInput label="Topic" value={uploadMeta.topic} onChange={(v) => setUploadMeta(p => ({ ...p, topic: v }))} placeholder="e.g. Les Lipides, Optique" />
            <AdminInput label="Region" value={uploadMeta.region} onChange={(v) => setUploadMeta(p => ({ ...p, region: v }))} placeholder="e.g. Membre Supérieur" />
            <AdminInput label="Professor" value={uploadMeta.professor} onChange={(v) => setUploadMeta(p => ({ ...p, professor: v }))} placeholder="e.g. Pr. Boukheris" />
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="mt-5 w-full py-4 rounded-xl font-display text-sm font-bold tracking-wider transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--neon-pink)))', color: 'white', boxShadow: selectedFile ? '0 0 30px hsl(var(--primary) / 0.3)' : 'none' }}
          >
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Upload File</>}
          </button>
        </div>

        {/* File Management */}
        <div className="glass-strong p-6 opacity-0 animate-slide-up stagger-5" style={{ border: '1px solid hsl(var(--primary) / 0.15)' }}>
          <div className="flex items-center justify-between mb-5 gap-3">
            <h2 className="font-display text-sm font-semibold tracking-wider text-foreground flex items-center gap-2">
              <Files className="w-5 h-5 text-primary" />
              ALL FILES
              <span className="text-xs text-muted-foreground font-normal ml-1">({files.length})</span>
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter..."
                  className="pl-8 pr-3 py-2 text-xs rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 w-36"
                  style={{ border: '1px solid hsl(var(--border))' }}
                />
              </div>
              <button onClick={refresh} disabled={refreshing}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                style={{ border: '1px solid hsl(var(--border))' }}>
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
                  <div key={file.id} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-primary/5 group"
                    style={{ border: '1px solid hsl(var(--border) / 0.5)' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(var(--secondary) / 0.5)' }}>
                      <FileIcon className="w-5 h-5 text-primary" />
                    </div>

                    {isEditing ? (
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input value={editData.name || ""} onChange={e => setEditData(p => ({ ...p, name: e.target.value }))}
                          className="col-span-2 px-3 py-1.5 text-sm rounded-lg bg-secondary/50 text-foreground" style={{ border: '1px solid hsl(var(--primary) / 0.3)' }} placeholder="Name" />
                        <input value={editData.category || ""} onChange={e => setEditData(p => ({ ...p, category: e.target.value }))}
                          className="px-3 py-1.5 text-xs rounded-lg bg-secondary/50 text-foreground" style={{ border: '1px solid hsl(var(--border))' }} placeholder="Category" />
                        <input value={editData.topic || ""} onChange={e => setEditData(p => ({ ...p, topic: e.target.value }))}
                          className="px-3 py-1.5 text-xs rounded-lg bg-secondary/50 text-foreground" style={{ border: '1px solid hsl(var(--border))' }} placeholder="Topic" />
                        <input value={editData.sub_category || ""} onChange={e => setEditData(p => ({ ...p, sub_category: e.target.value }))}
                          className="px-3 py-1.5 text-xs rounded-lg bg-secondary/50 text-foreground" style={{ border: '1px solid hsl(var(--border))' }} placeholder="Sub-category" />
                        <input value={editData.region || ""} onChange={e => setEditData(p => ({ ...p, region: e.target.value }))}
                          className="px-3 py-1.5 text-xs rounded-lg bg-secondary/50 text-foreground" style={{ border: '1px solid hsl(var(--border))' }} placeholder="Region" />
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
                          <button onClick={handleSaveEdit} className="p-2 rounded-lg text-neon-green hover:bg-neon-green/10 transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditingFile(null)} className="p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(file)} className="p-2 rounded-lg text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 transition-colors opacity-0 group-hover:opacity-100">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleToggle(file.id, !file.is_visible)}
                            className={`p-2 rounded-lg transition-colors ${file.is_visible ? 'text-primary hover:bg-primary/10' : 'text-muted-foreground hover:bg-secondary'}`}>
                            {file.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button onClick={() => handleDelete(file.id, file.name)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-4 h-4" />
                          </button>
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

// Helper components
const AdminSelect = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 text-sm rounded-xl bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
      style={{ border: '1px solid hsl(var(--border))' }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const AdminInput = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2.5 text-sm rounded-xl bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
      style={{ border: '1px solid hsl(var(--border))' }} />
  </div>
);

export default AdminDashboard;