import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getConversations, Conversation } from "@/services/conversationStorage";
import { getDailyFeelings, DailyFeeling } from "@/services/dailyFeelingStorage";
import HomeHeader from "@/components/HomeHeader"; // ou outro header que você preferir

function formatDateTime(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time };
}

const History = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [dailyFeelings, setDailyFeelings] = useState<DailyFeeling[]>([]);
  const navigate = useNavigate();
  const [expandedDateKey, setExpandedDateKey] = useState<string | null>(null);

  useEffect(() => {
    const convs = getConversations();
    setConversations(convs);

    const feelings = getDailyFeelings();
    setDailyFeelings(feelings);
  }, []);

  const sections = useMemo(() => {
    type Section = {
      dateKey: string; // "YYYY-MM-DD"
      conversations: Conversation[];
      feeling?: DailyFeeling;
    };

    const map = new Map<string, Section>();

    // Agrupa conversas por dia (usando updatedAt)
    conversations.forEach((conv) => {
      const dateKey = conv.updatedAt.slice(0, 10); // YYYY-MM-DD
      if (!map.has(dateKey)) {
        map.set(dateKey, { dateKey, conversations: [] });
      }
      map.get(dateKey)!.conversations.push(conv);
    });

    // Associa sentimentos diários ao mesmo dia
    dailyFeelings.forEach((feeling) => {
      const dateKey = feeling.date; // já está em "YYYY-MM-DD"
      if (!map.has(dateKey)) {
        map.set(dateKey, { dateKey, conversations: [], feeling });
      } else {
        map.get(dateKey)!.feeling = feeling;
      }
    });

    // Ordena do mais recente para o mais antigo
    return Array.from(map.values()).sort((a, b) =>
      a.dateKey < b.dateKey ? 1 : -1
    );
  }, [conversations, dailyFeelings]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <HomeHeader onHelpClick={() => {}} />

      <main className="px-5 py-6 space-y-4 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-foreground mb-2">
          Diário de conversas
        </h1>
        {sections.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Você ainda não tem conversas registradas.
          </p>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => {
              // usa meia-noite só para formatar a data
              const { date } = formatDateTime(section.dateKey + "T00:00:00");

              return (
                <div key={section.dateKey} className="space-y-2">
                  {/* Cabeçalho do dia */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {date}
                      </span>
                      {section.feeling && (
                        <span className="text-xs text-muted-foreground">
                          Como você se sentia: {section.feeling.mood}
                        </span>
                      )}
                    </div>
                    {section.feeling?.note && (
                      <button
                        type="button"
                        className="text-xs text-primary underline-offset-2 hover:underline"
                        onClick={() =>
                          setExpandedDateKey((prev) =>
                            prev === section.dateKey ? null : section.dateKey
                          )
                        }
                      >
                        {expandedDateKey === section.dateKey
                          ? "Esconder comentário"
                          : "Ver comentário"}
                      </button>
                    )}
                  </div>
                  {section.feeling?.note &&
                    expandedDateKey === section.dateKey && (
                      <div className="text-xs text-muted-foreground bg-card/60 rounded-2xl px-3 py-2">
                        {section.feeling.note}
                      </div>
                    )}
                  {/* Conversas do dia */}
                  <div className="space-y-2">
                    {section.conversations.map((conv) => {
                      const { time } = formatDateTime(conv.updatedAt);
                      const lastMsg =
                        conv.messages[conv.messages.length - 1]?.text ??
                        "Sem mensagens";

                      return (
                        <button
                          key={conv.id}
                          onClick={() =>
                            navigate(`/chat?conversationId=${conv.id}`)
                          }
                          className="w-full text-left rounded-2xl border border-border bg-card hover:bg-muted transition-colors px-4 py-3 space-y-1"
                        >
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{time}</span>
                          </div>
                          <p className="text-[15px] line-clamp-2">
                            {lastMsg}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;