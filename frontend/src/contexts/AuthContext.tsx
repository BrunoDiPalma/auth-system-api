import { createContext } from "react";

export type User = {
  id: string;
  nome: string;
  email: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);
