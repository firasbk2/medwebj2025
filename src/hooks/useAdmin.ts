import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { FileRecord } from "@/types/files";

const STORAGE_KEY = "med-admin-auth";

export const useAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  });
  const [loading, setLoading] = useState(false);

  const getPassword = () => sessionStorage.getItem("med-admin-pwd") || "";

  const login = useCallback(async (password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin", {
        headers: { "x-admin-password": password },
        body: null,
      });
      // Simple check: if we get 401 it's wrong
      if (error) {
        // Try stats as a validation call
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin?action=stats`,
          {
            headers: {
              "x-admin-password": password,
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
          }
        );
        if (!res.ok) return false;
      }
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
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin?action=${action}`;
      const headers: Record<string, string> = {
        "x-admin-password": pwd,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
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

  const getStats = useCallback(
    () =>
      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin?action=stats`,
        {
          headers: {
            "x-admin-password": getPassword(),
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      ).then((r) => r.json()),
    []
  );

  const listFiles = useCallback(
    () =>
      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin?action=list`,
        {
          headers: {
            "x-admin-password": getPassword(),
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      ).then((r) => r.json()),
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
    getStats,
    listFiles,
  };
};
