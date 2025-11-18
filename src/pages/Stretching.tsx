import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

const Stretching = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const timerKey = `stretching_timer_${user}`;

  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem(timerKey);
    return saved ? parseInt(saved, 10) : 10 * 60;
  });

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (seconds > 0) {
      localStorage.setItem(timerKey, seconds.toString());
    }
  }, [seconds, timerKey]);

  const formatTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header title="Alongamento" />

      <main className="m-32 py-12 px-5 max-w-64 mx-auto text-center space-y-6 border-2 border-black outline outline-4 outline-black/20 rounded-3xl shadow-md">
        
        <h2 className="text-xl font-semibold text-foreground">
          Timer de Alongamento
        </h2>

        {/* Timer circular */}
        <div className="flex justify-center">
          <div className="w-56 h-56 rounded-full border-8 border-calmio-chat-yellow flex items-center justify-center">
            <span className="text-6xl font-bold text-calmio-chat-yellow p-4">
              {formatTime()}
            </span>
          </div>
        </div>

        {seconds === 0 && (
          <Button
            className="w-full bg-calmio-complete-green hover:bg-calmio-complete-green/90 text-foreground rounded-full h-12 text-base font-semibold"
            onClick={() => {
              localStorage.removeItem(timerKey);
              navigate("/home");
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
