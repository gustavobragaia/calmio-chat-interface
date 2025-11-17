import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useNavigate } from "react-router-dom";

const Stretching = () => {
  const navigate = useNavigate();

  // Carrega do localStorage ou começa com 10 minutos
  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem("stretching_timer");
    return saved ? parseInt(saved, 10) : 10 * 60;
  });

  // Atualiza timer a cada segundo
  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  // Salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("stretching_timer", seconds.toString());
  }, [seconds]);

  // Formata para 00:00
  const formatTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Alongamento" />

      <main className="m-32 py-12 px-5 max-w-64 mx-auto text-center space-y-6 border-2 border-black outline outline-4 outline-black/20 rounded-3xl shadow-md">
        <h2 className="text-xl font-semibold text-foreground">
          Timer de Alongamento
        </h2>

        <div className="flex justify-center">
          <div className="w-48 h-48 rounded-full border-8 border-calmio-chat-yellow flex items-center justify-center">
            <span className="text-6xl font-bold text-calmio-chat-yellow">
              {formatTime()}
            </span>
          </div>
        </div>

        {seconds === 0 && (
          <Button
            className="w-full bg-calmio-complete-green hover:bg-calmio-complete-green/90 text-foreground rounded-full h-12 text-base font-semibold"
            onClick={() => {
              localStorage.removeItem("stretching_timer"); // limpa ao terminar
              navigate("/");
            }}
          >
            Concluir
          </Button>
        )}
      </main>
    </div>
  );
};

export default Stretching;
