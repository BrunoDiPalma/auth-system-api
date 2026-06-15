import { useEffect, useState } from "react";
import { getMe } from "../services/userService";
import { getTasks } from "../services/taskService";
import type { User } from "../types/user";
import type { Task } from "../types/task";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);

        const userTasks = await getTasks();
        setTasks(userTasks);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };

    void fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 gap-6">
      <div className="border rounded-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Usuário</h2>

        {user ? (
          <>
            <p>Nome: {user.nome}</p>
            <p>Email: {user.email}</p>
          </>
        ) : (
          <p>Carregando usuário...</p>
        )}
      </div>

      <div className="border rounded-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Minhas tarefas</h2>

        {tasks.length === 0 ? (
          <p>Nenhuma tarefa cadastrada.</p>
        ) : (
          <ul className="flex flex-col gap-2 cursor-pointer hover:bg-gray-100 transition">
            {tasks.map((task) => (
              <li key={task.id} className="border rounded p-2">
                {task.titulo}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
