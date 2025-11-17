import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react";

interface Hábito {
  id: number;
  titulo: string;
  concluido: boolean;
}

const Routine = () => {
  // Estado inicial com os padrões que você pediu
  const [habitos, setHabitos] = useState<Hábito[]>([
    { id: 1, titulo: "Beber 2L de Água", concluido: false },
    { id: 2, titulo: "Atividade Física", concluido: false },
    { id: 3, titulo: "Estudo", concluido: false },
  ]);

  const [novoHabito, setNovoHabito] = useState("");

  // --- A FÓRMULA MÁGICA ---
  const total = habitos.length;
  const concluidos = habitos.filter((h) => h.concluido).length;
  const porcentagem = total === 0 ? 0 : Math.round((concluidos / total) * 100);

  // Funções de interação
  const toggleHabito = (id: number) => {
    setHabitos(habitos.map(h => 
      h.id === id ? { ...h, concluido: !h.concluido } : h
    ));
  };

  const deletarHabito = (id: number) => {
    setHabitos(habitos.filter(h => h.id !== id));
  };

  const adicionarHabito = () => {
    if (novoHabito.trim() === "") return;
    
    const novoItem = {
      id: Date.now(), // Gera um ID único baseado no tempo
      titulo: novoHabito,
      concluido: false
    };
    
    setHabitos([...habitos, novoItem]);
    setNovoHabito(""); // Limpa o input
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Minha Rotina" backPath="/home" />

      <main className="px-5 py-6 max-w-2xl mx-auto space-y-8">
        
        {/* 1. GRÁFICO DE PROGRESSO CIRCULAR */}
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="relative w-40 h-40">
            {/* Círculo de fundo (cinza) */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-100"
              />
              {/* Círculo de progresso (verde) */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={440} // Circunferência aprox (2 * pi * r)
                strokeDashoffset={440 - (440 * porcentagem) / 100}
                className="text-calmio-complete-green transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Texto no meio */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-foreground">
              <span className="text-3xl font-bold">{porcentagem}%</span>
              <span className="text-sm text-muted-foreground font-medium">Concluído</span>
            </div>
          </div>
          
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Você completou {concluidos} de {total} hábitos hoje.
          </p>
        </div>

        {/* 2. LISTA DE HÁBITOS */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Checklist Diário</h2>
          
          {habitos.map((habito) => (
            <div 
              key={habito.id} 
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                habito.concluido 
                  ? "bg-calmio-complete-green/20 border-calmio-complete-green/30" 
                  : "bg-white border-gray-100"
              }`}
            >
              <div 
                className="flex items-center gap-3 cursor-pointer flex-1"
                onClick={() => toggleHabito(habito.id)}
              >
                {habito.concluido ? (
                  <CheckCircle2 className="text-calmio-complete-green h-6 w-6" />
                ) : (
                  <Circle className="text-gray-300 h-6 w-6" />
                )}
                <span className={`font-medium ${habito.concluido ? "line-through text-gray-500" : "text-foreground"}`}>
                  {habito.titulo}
                </span>
              </div>

              <button 
                onClick={() => deletarHabito(habito.id)}
                className="text-gray-400 hover:text-red-400 p-2"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* 3. ADICIONAR NOVO */}
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Adicionar novo hábito</h3>
          <div className="flex gap-2">
            <Input 
              placeholder="Ex: Ler 10 páginas..." 
              value={novoHabito}
              onChange={(e) => setNovoHabito(e.target.value)}
              className="bg-white rounded-xl border-gray-200"
              onKeyDown={(e) => e.key === "Enter" && adicionarHabito()}
            />
            <Button 
              onClick={adicionarHabito}
              className="bg-foreground text-background rounded-xl w-12 p-0"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Routine;