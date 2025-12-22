"use client";

import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { AuthContext } from "@/app/context/auth-context";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!Cookies.get("email")
  );

  const [userEmail, setUserEmail] = useState<string | null>(
    Cookies.get("email") || null
  );

  const login = (email: string) => {
    Cookies.set("email", email, { expires: 1 });
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    Cookies.remove("email");
    setIsAuthenticated(false);
    setUserEmail(null);
    toast.error("Logout successful...", {
      description: `Come back later`,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
