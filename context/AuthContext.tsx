"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { OpenAPI } from "@/api/core/OpenAPI";
import { DefaultService } from "@/api/services/DefaultService";
import { UserOutSchema } from "@/api/models/UserOutSchema";
import { setupAxiosInterceptors } from "@/lib/axios-setup";
import { toast } from "sonner";

// Initialize API for the Browser
OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = "include";

interface AuthContextType {
  user: UserOutSchema | null;
  isLoading: boolean;
  login: (access?: string, refresh?: string, userData?: UserOutSchema, redirectTo?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserOutSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const login = (
    _access?: string,
    _refresh?: string,
    userData?: UserOutSchema,
    redirectTo?: string
  ) => {
    // Pure HttpOnly cookie session: no tokens stored in client storage
    if (userData) {
      setUser(userData);
    } else {
      DefaultService.userApiGetMe().then(setUser).catch(console.error);
    }

    toast.success("Welcome back!");
    const safeTarget =
      redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
        ? redirectTo
        : "/";
    router.push(safeTarget);
  };

  const logout = useCallback(async () => {
    try {
      await axios.post(`${OpenAPI.BASE}/api/auth/logout`, {}, { withCredentials: true });
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      toast.info("Logged out successfully");
      router.push("/auth");
    }
  }, [router]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // With HttpOnly cookies, calling /api/auth/me checks if the session cookie is valid
        const userData = await DefaultService.userApiGetMe();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    const interceptorId = setupAxiosInterceptors(() => {
      setUser(null);
    });

    return () => {
      axios.interceptors.response.eject(interceptorId);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
