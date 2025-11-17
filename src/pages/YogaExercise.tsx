import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";

interface YogaPoseData {
  title: string;
  description: string;
  details: string;
  steps: string[];
}
// 1. Criamos um objeto com os dados de cada exercício
const exercisesData: Record<string, YogaPoseData> = {
  "1": {
    title: "Pose braços de águia",
    description: "Garudasana, ou Pose da Águia, exige foco e força. Ela ajuda a soltar as articulações dos ombros e quadril.",
    details: "Esta postura melhora o senso de equilíbrio e fortalece as panturrilhas e tornozelos, além de alongar a parte superior das costas.",
    steps: [
      "Fique em pé em Tadasana (postura da montanha).",
      "Dobre levemente os joelhos, levante o pé esquerdo e cruze-o sobre o direito.",
      "Estenda os braços para frente e cruze o braço direito sobre o esquerdo.",
      "Dobre os cotovelos e tente juntar as palmas das mãos.",
      "Mantenha a coluna ereta e o olhar fixo em um ponto.",
      "Segure por 5 respirações e troque os lados."
    ]
  },
  "2": {
    title: "Pose ave do paraíso",
    description: "A Pose Ave do Paraíso é uma postura avançada de yoga que combina equilíbrio, força e flexibilidade. Esta pose trabalha profundamente os músculos das pernas, core e braços.",
    details: "Esta postura é inspirada na elegância e beleza da ave do paraíso, exigindo paciência e prática regular para ser executada com segurança.",
    steps: [
      "Comece em pé, com os pés juntos e coluna ereta.",
      "Dobre o joelho direito e leve a perna para cima, segurando o pé com ambas as mãos por trás das costas.",
      "Lentamente, estenda a perna direita para o lado, mantendo o equilíbrio na perna esquerda.",
      "Abra o braço esquerdo para o lado, criando uma linha diagonal.",
      "Mantenha a posição por 5-10 respirações profundas.",
      "Retorne lentamente à posição inicial e repita do outro lado."
    ]
  },
  "3": {
    title: "Pose da Árvore",
    description: "A Vrksasana, ou Pose da Árvore, traz estabilidade e enraizamento. Ela nos ensina a manter a calma e o equilíbrio mesmo quando o mundo ao redor parece instável.",
    details: "Além de fortalecer as pernas e o core, esta postura ajuda a limpar a mente, exigindo foco total no momento presente para não cair.",
    steps: [
      "Comece em pé na postura da montanha (Tadasana), com os pés firmes no chão.",
      "Transfira o peso para a perna esquerda e levante o pé direito.",
      "Apoie a planta do pé direito na parte interna da coxa esquerda (ou na panturrilha, nunca no joelho).",
      "Junte as palmas das mãos em frente ao peito em posição de prece.",
      "Fixe o olhar em um ponto imóvel à sua frente para manter o equilíbrio.",
      "Respire profundamente por 5 a 10 ciclos e depois troque o lado."
    ]
  }
};

const YogaExercise = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 2. Buscamos o exercício atual baseado no ID da URL
  // Se o id for undefined ou não existir, usamos um fallback (opcional)
  const exercise = id ? exercisesData[id] : null;

  const handleComplete = () => {
    navigate("/yoga");
  };

  // Tratamento de erro simples se não achar o ID
  if (!exercise) return <div className="p-8">Exercício não encontrado.</div>;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* 3. Trocamos o texto fixo pelas variáveis do objeto 'exercise' */}
      <PageHeader title={exercise.title} />
      
      <main className="px-5 py-8 space-y-6 max-w-2xl mx-auto">
        <div className="flex justify-center">
          <Avatar className="h-48 w-48">
            <AvatarFallback className="bg-muted/40 text-8xl">🧘</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">
            {exercise.description}
          </p>

          <p className="text-foreground leading-relaxed">
            {exercise.details}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Como executar:</h2>
          
          <ol className="space-y-3 list-decimal list-inside text-foreground">
            {/* 4. Fazemos um map para renderizar os passos dinamicamente */}
            {exercise.steps.map((step: string, index: number) => (
              <li key={index} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>

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

export default YogaExercise