import { useState } from "react";
import { useAuth } from "@/auth/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // pega dados cadastrados
    const savedUser = localStorage.getItem("registeredUser");
    const savedPass = localStorage.getItem("registeredPassword");

    // valida login
    if (username === savedUser && password === savedPass) {
      login(username);       // salva nome no AuthContext
      navigate("/");         // envia para home
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuário"
          className="border p-2 rounded w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Entrar
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => navigate("/register")}
        >
          Não tem conta? Cadastre-se
        </button>
      </div>
    </div>
  );
};

export default Login;
