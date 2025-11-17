import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // salva usuário no localStorage
    localStorage.setItem("registeredUser", username);
    localStorage.setItem("registeredPassword", password);

    alert("Conta criada com sucesso!");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Criar conta</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Usuário"
          className="border p-2 rounded w-full"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full py-2 rounded">
          Criar conta
        </button>
      </form>
    </div>
  );
};

export default Register;
