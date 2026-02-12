import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Trash2, Eye, EyeOff, BarChart3, Files, HardDrive, Loader2, LogOut, Lock } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { modules } from "@/data/modules";
import type { FileRecord } from "@/types/files";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { isAuthenticated, loading, login, logout, uploadFile, deleteFile, toggleVisibility, getStats, listFiles } = useAdmin();
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [stats, setStats] = useState({ totalFiles: 0, totalSize: 0, moduleCount: 0 });
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  // Upload form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMeta, setUploadMeta] = useState({
    language: "en",
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
    } catch {
      // ignore
    }
    setRefreshing(false);
  }, [listFiles, getStats]);

  useEffect(() => {
    if (isAuthenticated) refresh();
  }, [isAuthenticated, refresh]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(password);
    if (!ok) toast({ title: "Wrong password", variant: "destructive" });
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      await uploadFile(selectedFile, uploadMeta);
      toast({ title: "File uploaded successfully!" });
      setSelectedFile(null);
      refresh();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    }
    setUploading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await deleteFile(id);
      toast({ title: "File deleted" });
      refresh();
    } catch (err: any) {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    }
  };

  const handleToggle = async (id: string, visible: boolean) => {
    try {
      await toggleVisibility(id, visible);
      refresh();
    } catch (err: any) {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <form onSubmit={handleLogin} className="glass neon-border p-8 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl glass neon-border flex items-center justify-center pulse-glow">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="font-display text-lg font-bold text-foreground text-center mb-2">Admin Access</h2>
          <p className="text-xs text-muted-foreground text-center mb-6">Enter admin password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full glass neon-border px-4 py-3 text-sm bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 mb-4 rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background scrollbar-cyber">
      {/* Header */}
      <div className="glass-strong border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-9 h-9 rounded-lg glass neon-border flex items-center justify-center hover:neon-glow-sm transition-all text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-bold tracking-wider text-foreground">
              ADMIN <span className="text-primary">DASHBOARD</span>
            </h1>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Files, label: "Total Files", value: stats.totalFiles },
            { icon: BarChart3, label: "Modules", value: stats.moduleCount },
            { icon: HardDrive, label: "Storage", value: `${(stats.totalSize / (1024 * 1024)).toFixed(1)} MB` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass neon-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="glass neon-border p-6 mb-8">
          <h2 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            UPLOAD FILE
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* File input */}
            <div className="sm:col-span-2">
              <label className="block w-full border-2 border-dashed border-primary/20 rounded-xl p-6 text-center cursor-pointer hover:border-primary/40 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.pptx,.ppt,.docx,.doc,.mp4,.jpg,.jpeg,.png"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                {selectedFile ? (
                  <p className="text-sm text-primary">{selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Drag & drop or click to select a file</p>
                )}
              </label>
            </div>

            <Select label="Language" value={uploadMeta.language} onChange={(v) => setUploadMeta((p) => ({ ...p, language: v }))} options={[{ value: "en", label: "English" }, { value: "fr", label: "Français" }]} />
            <Select label="Module" value={uploadMeta.module} onChange={(v) => setUploadMeta((p) => ({ ...p, module: v }))} options={modules.map((m) => ({ value: m.id, label: m.name }))} />
            <Select label="Category" value={uploadMeta.category} onChange={(v) => setUploadMeta((p) => ({ ...p, category: v }))} options={[
              { value: "cours", label: "Cours" },
              { value: "td", label: "TD" },
              { value: "tp", label: "TP" },
              { value: "animations", label: "Animations" },
            ]} />
            <TextInput label="Sub-category" value={uploadMeta.sub_category} onChange={(v) => setUploadMeta((p) => ({ ...p, sub_category: v }))} placeholder="e.g. diapos, polycopiés" />
            <TextInput label="Topic" value={uploadMeta.topic} onChange={(v) => setUploadMeta((p) => ({ ...p, topic: v }))} placeholder="e.g. Les Lipides, Optique" />
            <TextInput label="Region" value={uploadMeta.region} onChange={(v) => setUploadMeta((p) => ({ ...p, region: v }))} placeholder="e.g. Membre Supérieur" />
            <TextInput label="Professor" value={uploadMeta.professor} onChange={(v) => setUploadMeta((p) => ({ ...p, professor: v }))} placeholder="e.g. Pr. Boukheris" />
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="mt-4 w-full py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Upload File</>}
          </button>
        </div>

        {/* File List */}
        <div className="glass neon-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold tracking-wider text-foreground">ALL FILES</h2>
            <button onClick={refresh} disabled={refreshing} className="text-xs text-primary hover:underline">
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {files.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No files uploaded yet.</p>
          ) : (
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.module} · {file.language.toUpperCase()} · {file.category}
                      {file.topic ? ` · ${file.topic}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(file.id, !file.is_visible)}
                    className={`p-2 rounded-lg transition-colors ${file.is_visible ? "text-primary hover:bg-primary/10" : "text-muted-foreground hover:bg-secondary"}`}
                    title={file.is_visible ? "Hide file" : "Show file"}
                  >
                    {file.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(file.id, file.name)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Tiny helper components
const Select = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full glass neon-border px-3 py-2 text-sm bg-secondary/50 text-foreground rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50">
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const TextInput = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full glass neon-border px-3 py-2 text-sm bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50" />
  </div>
);

export default AdminDashboard;
