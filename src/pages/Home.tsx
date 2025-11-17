import HomeHeader from "@/components/HomeHeader";
import InfoCard from "@/components/InfoCard";
import ExerciseCard from "@/components/ExerciseCard";
import FloatingChatButton from "@/components/FloatingChatButton";
import { TrendingUp, Clock, Activity, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <HomeHeader />
      
      <main className="px-5 py-6 space-y-6 max-w-2xl mx-auto">
        {/* Cards principais */}
        <div className="space-y-4">
          <InfoCard
            icon={TrendingUp}
            title="Construindo uma rotina"
            subtitle="Veja seu progresso"
          />
          <InfoCard
            icon={Clock}
            title="Diário de conversas"
            subtitle="Veja seu histórico"
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
              title="Alongamento relaxante"
              duration="10min – 30min"
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
    </div>
  );
};

export default Home;
