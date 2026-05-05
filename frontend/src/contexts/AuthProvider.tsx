import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../api/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("authToken");
  });

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  async function login(email: string, senha: string) {
    const response = await api.post("/login", { email, senha });

    const responseToken = response.data.token;

    setToken(responseToken);
    localStorage.setItem("authToken", responseToken);

    api.defaults.headers.common["Authorization"] = `Bearer ${responseToken}`;
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("authToken");

    delete api.defaults.headers.common["Authorization"];
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
