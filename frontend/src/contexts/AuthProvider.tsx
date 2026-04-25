import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../api/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  async function login(email: string, senha: string) {
    const response = await api.post("/login", { email, senha });
    const token = response.data.token;
    setToken(token);
  }

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
}