import { createContext } from "react";

type AuthContextType = {
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);