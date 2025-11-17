import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, CheckCircle2, Circle, AlertTriangle, PartyPopper, Trophy } from "lucide-react";

interface Hábito {
  id: number;
  titulo: string;
  concluido: boolean;
}

const habitosIniciais: Hábito[] = [
  { id: 1, titulo: "Beber 2L de Água", concluido: false },
  { id: 2, titulo: "Atividade Física", concluido: false },
  { id: 3, titulo: "Estudo", concluido: false },
];

const Routine = () => {
  const [habitos, setHabitos] = useState<Hábito[]>(() => {
    const salvos = localStorage.getItem("calmio_rotina_user");
    return salvos ? JSON.parse(salvos) : habitosIniciais;
  });

  const [novoHabito, setNovoHabito] = useState("");
  
  // Estado para deletar (modal de perigo)
  const [itemParaDeletar, setItemParaDeletar] = useState<number | null>(null);
  
  // NOVO: Estado para celebração (modal de festa)
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    localStorage.setItem("calmio_rotina_user", JSON.stringify(habitos));
  }, [habitos]);

  const total = habitos.length;
  const concluidos = habitos.filter((h) => h.concluido).length;
  const porcentagem = total === 0 ? 0 : Math.round((concluidos / total) * 100);

  // --- LÓGICA ATUALIZADA AQUI ---
  const toggleHabito = (id: number) => {
    // 1. Criamos a nova lista
    const novosHabitos = habitos.map(h => 
      h.id === id ? { ...h, concluido: !h.concluido } : h
    );
    
    // 2. Atualizamos o estado
    setHabitos(novosHabitos);

    // 3. Verificamos se TUDO foi concluído AGORA
    const todosConcluidos = novosHabitos.every(h => h.concluido);
    const clicadoEstavaIncompleto = !habitos.find(h => h.id === id)?.concluido;

    // Se completou tudo E a ação atual foi de "marcar" (não desmarcar)
    if (todosConcluidos && novosHabitos.length > 0 && clicadoEstavaIncompleto) {
      setShowCelebration(true);
    }
  };

  const solicitarExclusao = (id: number) => {
    setItemParaDeletar(id);
  };

  const confirmarExclusao = () => {
    if (itemParaDeletar !== null) {
      setHabitos(habitos.filter(h => h.id !== itemParaDeletar));
      setItemParaDeletar(null);
    }
  };

  const adicionarHabito = () => {
    if (novoHabito.trim() === "") return;
    
    const novoItem = {
      id: Date.now(),
      titulo: novoHabito,
      concluido: false
    };
    
    setHabitos([...habitos, novoItem]);
    setNovoHabito("");
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <PageHeader title="Minha Rotina" backPath="/home" />

      <main className="px-5 py-6 max-w-2xl mx-auto space-y-8">
        
        {/* GRÁFICO */}
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * porcentagem) / 100} className="text-[#FACC15] transition-all duration-1000 ease-out" strokeLinecap="round" />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-foreground">
              <span className="text-3xl font-bold">{porcentagem}%</span>
              <span className="text-sm text-muted-foreground font-medium">Concluído</span>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">Você completou {concluidos} de {total} hábitos hoje.</p>
        </div>

        {/* LISTA */}
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Checklist Diário</h2>
          
          {habitos.map((habito) => (
            <div 
              key={habito.id} 
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                habito.concluido ? "bg-[#FACC15]/20 border-[#FACC15]/50" : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleHabito(habito.id)}>
                {habito.concluido ? <CheckCircle2 className="text-[#FACC15] h-6 w-6" /> : <Circle className="text-gray-300 h-6 w-6" />}
                <span className={`font-medium ${habito.concluido ? "line-through text-gray-500" : "text-foreground"}`}>
                  {habito.titulo}
                </span>
              </div>

              <button 
                onClick={() => solicitarExclusao(habito.id)} 
                className="text-gray-400 hover:text-red-400 p-2 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* INPUT */}
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
            <Button onClick={adicionarHabito} className="bg-foreground text-background rounded-xl w-12 p-0">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>

      </main>

      {/* 1. MODAL DE EXCLUSÃO (PERIGO) */}
      {itemParaDeletar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-red-100 p-3 rounded-full mb-1">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Excluir hábito?</h3>
              <p className="text-sm text-muted-foreground">Você tem certeza?</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl h-12 border-gray-200" onClick={() => setItemParaDeletar(null)}>Cancelar</Button>
              <Button className="flex-1 rounded-xl h-12 bg-red-500 hover:bg-red-600 text-white" onClick={confirmarExclusao}>Excluir</Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL DE CELEBRAÇÃO (SUCESSO) - NOVO! 🎉 */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xs space-y-6 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
            
            {/* Efeito de fundo amarelado suave */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FACC15]" />

            <div className="flex flex-col items-center text-center space-y-4">
              {/* Ícone animado */}
              <div className="bg-yellow-100 p-4 rounded-full mb-2 animate-bounce">
                <Trophy className="h-8 w-8 text-[#FACC15]" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Parabéns!</h3>
                <p className="text-muted-foreground">
                  Você concluiu 100% da sua rotina de hoje. Continue cuidando de você! 💛
                </p>
              </div>
            </div>
            
            <Button 
              className="w-full rounded-xl h-12 bg-[#FACC15] hover:bg-[#EAB308] text-black font-bold text-lg shadow-lg shadow-yellow-200"
              onClick={() => setShowCelebration(false)}
            >
              <PartyPopper className="mr-2 h-5 w-5" />
              Continuar
            </Button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Routine;