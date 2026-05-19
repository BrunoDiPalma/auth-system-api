import { createContext } from "react";

type AuthContextType = {
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  register: (nome: string, email: string, senha: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);
