import { useEffect, useState } from "react";
import { getMe } from "../services/userService";
import type { User } from "../types/user";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };

    void fetchUser();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {user ? (
        <>
          <p>Nome: {user.nome}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Carregando usuário...</p>
      )}
    </div>
  );
}
