import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const confirmarSenhaRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      const mensagem = "As senhas não coincidem!";

      setErro(mensagem);

      toast.error(mensagem);

      confirmarSenhaRef.current?.focus();

      return;
    }

    try {
      setLoading(true);

      await register(nome.trim(), email.trim(), senha.trim());

      setErro("");

      toast.success("Conta criada com sucesso!");

      navigate("/login");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;

      const mensagem = err.response?.data?.message || "Erro ao criar conta";

      setErro(mensagem);

      toast.error(mensagem);

      if (mensagem.includes("Nome")) {
        nomeRef.current?.focus();
      }

      if (mensagem.includes("e-mail")) {
        emailRef.current?.focus();
      }

      if (mensagem.includes("Senha")) {
        senhaRef.current?.focus();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 p-6 border rounded-lg w-80"
      >
        <h1 className="text-xl font-bold text-center">Criar conta</h1>

        <input
          type="text"
          autoComplete="name"
          ref={nomeRef}
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            setErro("");
          }}
          onBlur={() => setNome(nome.trim())}
          className="border p-2 rounded"
        />

        <input
          type="email"
          autoComplete="email"
          ref={emailRef}
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErro("");
          }}
          onBlur={() => setEmail(email.trim())}
          className="border p-2 rounded"
        />

        <input
          type={mostrarSenha ? "text" : "password"}
          autoComplete="new-password"
          ref={senhaRef}
          placeholder="Digita sua senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErro("");
          }}
          onCopy={(e) => {
            if (!mostrarSenha) {
              e.preventDefault();
            }
          }}
          className="border p-2 rounded"
        />

        <button
          type="button"
          onClick={() => setMostrarSenha(!mostrarSenha)}
          onCopy={(e) => {
            if (!mostrarSenha) {
              e.preventDefault();
            }
          }}
          className="text-sm text-blue-500 cursor-pointer"
        >
          {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
        </button>

        <input
          type="password"
          autoComplete="new-password"
          ref={confirmarSenhaRef}
          placeholder="Confirme sua senha"
          value={confirmarSenha}
          onChange={(e) => {
            setConfirmarSenha(e.target.value);
            setErro("");
          }}
          className="border p-2 rounded"
        />

        {erro && (
          <span className="text-red-500 text-sm font-bold text-center">
            {erro}
          </span>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
        >
          {loading ? "Criando conta..." : "Registrar"}
        </button>

        <p className="text-sm text-center">
          Já possui cadastro?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
