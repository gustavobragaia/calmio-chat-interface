import HomeHeader from "@/components/HomeHeader";
import InfoCard from "@/components/InfoCard";
import ExerciseCard from "@/components/ExerciseCard";
import FloatingChatButton from "@/components/FloatingChatButton";
import EmergencyModal from "@/components/EmergencyModal";
import DailyFeelingModal from "@/components/DailyFeelingModal";
import { TrendingUp, Clock, Activity, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getLastDailyFeelingDate } from "@/services/dailyFeelingStorage";

const Home = () => {
  const navigate = useNavigate();
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [feelingModalOpen, setFeelingModalOpen] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    const last = getLastDailyFeelingDate();

    // Se ainda não registrou o sentimento hoje, abre o modal
    if (last !== today) {
      setFeelingModalOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <HomeHeader onHelpClick={() => setEmergencyModalOpen(true)} />
      
      <main className="px-5 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Cards principais */}
        <div className="space-y-4">
          <InfoCard
            icon={TrendingUp}
            title="Construindo uma rotina"
            subtitle="Veja seu progresso"
            onClick={() => navigate("/rotina")}
          />
          <InfoCard
            icon={Clock}
            title="Diário de conversas"
            subtitle="Veja seu histórico"
            onClick={() => navigate("/historico")}
          />
        </div>

        {/* Exercícios recomendados */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground px-1">
            Exercícios recomendados para você
          </h2>
          
          <div className="space-y-4">
            <ExerciseCard
              icon={Activity}
              title="Alongamento"
              duration="10min"
              onClick={() => navigate("/stretching")}  
            />

            <ExerciseCard
              icon={Heart}
              title="Yoga"
              duration="30min – 90min"
              onClick={() => navigate("/yoga")}
            />
          </div>
        </div>
      </main>

      <FloatingChatButton />

      {/* Modais */}
      <EmergencyModal 
        open={emergencyModalOpen} 
        onOpenChange={setEmergencyModalOpen} 
      />
      <DailyFeelingModal 
        open={feelingModalOpen} 
        onOpenChange={setFeelingModalOpen} 
      />
    </div>
  );
};

export default Home;