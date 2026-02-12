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
    async (action: string, options?: { method?: string; body?: any; formData?: FormData }) => {
      const pwd = getPassword();
      const url = `${getBaseUrl()}?action=${action}`;
      const headers: Record<string, string> = {
        "x-admin-password": pwd,
        apikey: getApiKey(),
      };

      const fetchOptions: RequestInit = {
        method: options?.method || "POST",
        headers,
      };

      if (options?.formData) {
        fetchOptions.body = options.formData;
      } else if (options?.body) {
        headers["Content-Type"] = "application/json";
        fetchOptions.headers = headers;
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

  const uploadFile = useCallback(
    async (file: File, metadata: Record<string, string>) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("metadata", JSON.stringify(metadata));
      return adminFetch("upload", { formData });
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