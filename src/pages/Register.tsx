import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem("calmio_users") || "[]");

    if (users.some((u) => u.username === username)) {
      alert("Este usuário já existe!");
      return;
    }

    const novoUsuario: User = { username, password };

    const updatedUsers = [...users, novoUsuario];

    localStorage.setItem("calmio_users", JSON.stringify(updatedUsers));

    alert("Conta criada com sucesso!");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Criar conta</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Digite seu usuário"
          className="border p-2 rounded w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          className="border p-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <button className="bg-green-500 text-white w-full py-2 rounded">
          Criar conta
        </button>
      </form>
    </div>
  );
};

export default Register;
