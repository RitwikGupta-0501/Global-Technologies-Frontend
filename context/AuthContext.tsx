"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OpenAPI } from "@/api/core/OpenAPI";
import { DefaultService } from "@/api/services/DefaultService";
import { UserOutSchema } from "@/api/models/UserOutSchema";
import { setupAxiosInterceptors } from "@/lib/axios-setup";
import { toast } from "sonner";

// Initialize API for the Browser
OpenAPI.BASE = "http://127.0.0.1:8000";

interface AuthContextType {
  user: UserOutSchema | null;
  isLoading: boolean;
  login: (access: string, refresh: string, user?: UserOutSchema) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserOutSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const login = (access: string, refresh: string, userData?: UserOutSchema) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    OpenAPI.TOKEN = access;

    if (userData) {
      setUser(userData);
    } else {
      // If we don't have user data yet, fetch it
      DefaultService.userApiGetMe().then(setUser).catch(console.error);
    }

    toast.success("Welcome back!");
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    OpenAPI.TOKEN = undefined;
    setUser(null);
    toast.info("Logged out successfully");
    router.push("/auth");
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        OpenAPI.TOKEN = token;
        try {
          // Fetch user details using the generated service
          const userData = await DefaultService.userApiGetMe();
          setUser(userData);
        } catch (error) {
          console.error("Session expired", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    // We pass the logout function so the interceptor can call it
    // if the refresh token fails.
    setupAxiosInterceptors(() => {
      // We can't use the 'logout' const from the scope directly
      // if it depends on state that might change, but here it's fine.
      // However, to be safe, we just clear storage and redirect.
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      OpenAPI.TOKEN = undefined;
      setUser(null);
      window.location.href = "/auth"; // Force redirect
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
