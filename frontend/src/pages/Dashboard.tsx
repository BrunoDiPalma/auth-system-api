import { useEffect, useState } from "react";
import { getMe } from "../services/userService";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService";
import type { User } from "../types/user";
import type { Task } from "../types/task";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  async function handleCreateTask() {
    if (!newTask.trim()) {
      toast.error("Digite uma tarefa!");
      return;
    }

    if (newTask.trim().length < 3) {
      toast.error("A tarefa deve possuir pelo menos 3 caracteres!");
      return;
    }

    try {
      const createdTask = await createTask(newTask);

      setTasks((prev) => [...prev, createdTask]);
      toast.success("Tarefa adicionada com sucesso!");

      setNewTask("");
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Erro ao criar tarefa";

      toast.error(message);
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await deleteTask(id);

      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Tarefa excluída!");
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Erro ao criar tarefa";

      toast.error(message);
    }
  }

  async function handleUpdateTask(id: string) {
    try {
      const updatedTask = await updateTask(id, editedTitle);

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );

      toast.success("Tarefa atualizada!");

      setEditingTaskId(null);
      setEditedTitle("");
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Erro ao atualizar tarefa";

      toast.error(message);
    }
  }

  useEffect(() => {
    if (editingTaskId) {
      editInputRef.current?.focus();
    }
  }, [editingTaskId]);

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
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateTask();
            }
          }}
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={handleCreateTask}
          className="border rounded px-2 color bg-green-400 hover:bg-green-500 font-bold cursor-pointer"
        >
          Adicionar tarefa
        </button>
      </div>

      <div className="border rounded-lg p-6 w-120 ">
        <h2 className="text-xl font-bold mb-4 text-center">Minhas tarefas</h2>

        {tasks.length === 0 ? (
          <p>Nenhuma tarefa cadastrada.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex gap-2">
                <div className="border rounded p-1 flex-1 hover:bg-gray-300 wrap-break-words">
                  {editingTaskId === task.id ? (
                    <input
                      ref={editInputRef}
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateTask(task.id);
                        }

                        if (e.key === "Escape") {
                          setEditingTaskId(null);
                          setEditedTitle("");
                        }
                      }}
                      className="w-full outline-none"
                    />
                  ) : (
                    <span>{task.titulo}</span>
                  )}
                </div>

                {editingTaskId === task.id ? (
                  <button
                    onClick={() => handleUpdateTask(task.id)}
                    className="border rounded px-4 bg-blue-500 hover:bg-blue-600 font-bold cursor-pointer"
                  >
                    Salvar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditedTitle(task.titulo);
                    }}
                    className="border rounded px-4 bg-yellow-400 hover:bg-yellow-500 font-bold cursor-pointer"
                  >
                    Editar
                  </button>
                )}

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="border rounded px-4 bg-red-500 hover:bg-red-600 font-bold cursor-pointer"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
