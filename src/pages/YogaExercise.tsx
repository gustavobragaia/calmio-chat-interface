import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";

const YogaExercise = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleComplete = () => {
    navigate("/yoga");
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Pose ave do paraíso" />
      
      <main className="px-5 py-8 space-y-6 max-w-2xl mx-auto">
        {/* Ilustração da pose */}
        <div className="flex justify-center">
          <Avatar className="h-48 w-48">
            <AvatarFallback className="bg-muted/40 text-8xl">🧘</AvatarFallback>
          </Avatar>
        </div>

        {/* Descrição */}
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">
            A Pose Ave do Paraíso é uma postura avançada de yoga que combina equilíbrio, 
            força e flexibilidade. Esta pose trabalha profundamente os músculos das pernas, 
            core e braços, enquanto melhora a concentração e a estabilidade mental.
          </p>

          <p className="text-foreground leading-relaxed">
            Esta postura é inspirada na elegância e beleza da ave do paraíso, 
            exigindo paciência e prática regular para ser executada com segurança.
          </p>
        </div>

        {/* Passos */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Como executar:</h2>
          
          <ol className="space-y-3 list-decimal list-inside text-foreground">
            <li className="leading-relaxed">
              Comece em pé, com os pés juntos e coluna ereta. 
              Concentre-se na sua respiração e encontre seu centro de equilíbrio.
            </li>
            <li className="leading-relaxed">
              Dobre o joelho direito e leve a perna para cima, 
              segurando o pé com ambas as mãos por trás das costas.
            </li>
            <li className="leading-relaxed">
              Lentamente, estenda a perna direita para o lado, 
              mantendo o equilíbrio na perna esquerda.
            </li>
            <li className="leading-relaxed">
              Abra o braço esquerdo para o lado, criando uma linha 
              diagonal do braço até a perna estendida.
            </li>
            <li className="leading-relaxed">
              Mantenha a posição por 5-10 respirações profundas, 
              focando no equilíbrio e na estabilidade.
            </li>
            <li className="leading-relaxed">
              Retorne lentamente à posição inicial e repita do outro lado.
            </li>
          </ol>
        </div>

        {/* Botão de conclusão */}
        <div className="pt-4">
          <Button 
            className="w-full bg-calmio-complete-green hover:bg-calmio-complete-green/90 text-foreground rounded-full h-12 text-base font-semibold"
            onClick={handleComplete}
          >
            Concluir
          </Button>
        </div>
      </main>
    </div>
  );
};

export default YogaExercise;
