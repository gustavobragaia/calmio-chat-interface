import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react";

const Stretching = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Chave única no localStorage para cada usuário
  const timerKey = `stretching_timer_${user?.id ?? user ?? "guest"}`;

  const INITIAL_TIME = 10 * 60; // 10 minutos

  const [isActive, setIsActive] = useState(false);

  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem(timerKey);
    return saved ? parseInt(saved, 10) : INITIAL_TIME;
  });

  // Timer play/pause
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  // Salva o timer no localStorage
  useEffect(() => {
    localStorage.setItem(timerKey, seconds.toString());
  }, [seconds, timerKey]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(INITIAL_TIME);
  };

  const formatTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background pb-8 flex flex-col">
      <Header title="Alongamento" />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-10 max-w-md mx-auto w-full">
        
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Hora de Relaxar
          </h2>
          <p className="text-muted-foreground">
            Alongue-se e respire fundo.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute w-64 h-64 rounded-full border-4 border-gray-100"></div>

          <div
            className={`w-56 h-56 rounded-full border-8 flex items-center justify-center shadow-sm bg-white z-10 transition-colors duration-500 ${
              isActive ? "border-[#FACC15]" : "border-gray-200"
            }`}
          >
            <span className="text-6xl font-bold text-foreground tabular-nums tracking-tight">
              {formatTime()}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center w-full space-y-6">
          {seconds === 0 ? (
            // ====== Tela de Conclusão ======
            <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center text-[#FACC15] font-bold text-xl flex items-center justify-center gap-2">
                <CheckCircle2 className="h-6 w-6" />
                Concluído!
              </div>

              <Button
                className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-black rounded-2xl h-14 text-lg font-bold shadow-lg shadow-yellow-100"
                onClick={() => {
                  localStorage.removeItem(timerKey);
                  navigate("/home");
                }}
              >
                Finalizar Sessão
              </Button>
            </div>
          ) : (
            // ====== Botões do Timer ======
            <div className="flex items-center gap-6">
              
              {/* Botão Reset */}
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-500"
                onClick={resetTimer}
                disabled={seconds === INITIAL_TIME}
              >
                <RotateCcw className="h-6 w-6" />
              </Button>

              {/* Botão Play/Pause */}
              <Button
                className={`h-16 w-16 rounded-full shadow-xl transition-all duration-300 ${
                  isActive
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-[#FACC15] text-black hover:bg-[#EAB308]"
                }`}
                onClick={toggleTimer}
              >
                {isActive ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>

            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default Stretching;
