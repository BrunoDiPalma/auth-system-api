import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../api/api";
import type { User } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("authToken");
  });

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMe() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (error) {
        console.log("Erro ao buscar usuário:", error);

        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
        delete api.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    }

    getMe();
  }, [token]);

  async function login(email: string, senha: string) {
    const response = await api.post("/users/login", { email, senha });

    const responseToken = response.data.token;

    setToken(responseToken);
    localStorage.setItem("authToken", responseToken);

    api.defaults.headers.common["Authorization"] = `Bearer ${responseToken}`;
  }

  async function register(nome: string, email: string, senha: string) {
    await api.post("/users/register", { nome, email, senha });
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("authToken");

    delete api.defaults.headers.common["Authorization"];
  }

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
