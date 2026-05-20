import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      await login(email.trim(), senha.trim());
      navigate("/dashboard");
      alert("Login realizado com sucesso!");
    } catch {
      alert("E-mail ou senha inválidos");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 p-6 border rounded-lg w-80"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type={mostrarSenha ? "text" : "password"}
          placeholder="Digita sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="button"
          onClick={() => setMostrarSenha(!mostrarSenha)}
          className="text-sm text-blue-500 cursor-pointer"
        >
          {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Entrar
        </button>

        <p>
          Não possui cadastro?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Crie sua conta
          </Link>
        </p>
      </form>
    </div>
  );
}
