import { useState, useCallback } from "react";

const STORAGE_KEY = "med-admin-auth";

const getBaseUrl = () => `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin`;
const getApiKey = () => import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const useAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  });
  const [loading, setLoading] = useState(false);

  const getPassword = () => sessionStorage.getItem("med-admin-pwd") || "";

  const login = useCallback(async (password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}?action=stats`, {
        headers: {
          "x-admin-password": password,
          apikey: getApiKey(),
        },
      });
      if (!res.ok) return false;
      sessionStorage.setItem(STORAGE_KEY, "true");
      sessionStorage.setItem("med-admin-pwd", password);
      setIsAuthenticated(true);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem("med-admin-pwd");
    setIsAuthenticated(false);
  }, []);

  const adminFetch = useCallback(
    async (action: string, options?: { method?: string; body?: any }) => {
      const pwd = getPassword();
      const url = `${getBaseUrl()}?action=${action}`;
      const headers: Record<string, string> = {
        "x-admin-password": pwd,
        apikey: getApiKey(),
        "Content-Type": "application/json",
      };

      const fetchOptions: RequestInit = {
        method: options?.method || "POST",
        headers,
      };

      if (options?.body) {
        fetchOptions.body = JSON.stringify(options.body);
      }

      const res = await fetch(url, fetchOptions);
      if (!res.ok) {
        if (res.status === 401) {
          logout();
          throw new Error("Session expired");
        }
        const err = await res.json();
        throw new Error(err.error || "Request failed");
      }
      return res.json();
    },
    [logout]
  );

  // Two-step upload: get signed URL → upload directly to storage → confirm in DB
  const uploadFile = useCallback(
    async (file: File, metadata: Record<string, string>) => {
      // Step 1: Get signed upload URL from edge function
      const { signedUrl, filePath } = await adminFetch("get-upload-url", {
        body: {
          fileName: file.name,
          fileType: file.type,
          metadata,
        },
      });

      // Step 2: Upload file directly to storage using signed URL
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(`Upload failed: ${errText}`);
      }

      // Step 3: Confirm upload in database
      return adminFetch("confirm-upload", {
        body: {
          fileName: file.name,
          filePath,
          fileSize: file.size,
          fileType: file.type,
          metadata,
        },
      });
    },
    [adminFetch]
  );

  const deleteFile = useCallback(
    (id: string) => adminFetch("delete", { body: { id } }),
    [adminFetch]
  );

  const toggleVisibility = useCallback(
    (id: string, is_visible: boolean) =>
      adminFetch("toggle-visibility", { body: { id, is_visible } }),
    [adminFetch]
  );

  const updateFile = useCallback(
    (id: string, updates: Record<string, any>) =>
      adminFetch("update", { body: { id, ...updates } }),
    [adminFetch]
  );

  const getStats = useCallback(
    () =>
      fetch(`${getBaseUrl()}?action=stats`, {
        headers: {
          "x-admin-password": getPassword(),
          apikey: getApiKey(),
        },
      }).then((r) => r.json()),
    []
  );

  const listFiles = useCallback(
    () =>
      fetch(`${getBaseUrl()}?action=list`, {
        headers: {
          "x-admin-password": getPassword(),
          apikey: getApiKey(),
        },
      }).then((r) => r.json()),
    []
  );

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    uploadFile,
    deleteFile,
    toggleVisibility,
    updateFile,
    getStats,
    listFiles,
  };
};
