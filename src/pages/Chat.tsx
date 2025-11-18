import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import EmergencyModal from "@/components/EmergencyModal";
import { useState, useEffect } from "react";
import { useAuth } from "@/auth/useAuth";
import { getGeminiReply } from "@/services/googleGemini";
import { useSearchParams } from "react-router-dom";
import {
  createConversation,
  appendMessagesToConversation,
  getConversationById,
} from "@/services/conversationStorage";

type Message = {
  text: string;
  isBot: boolean;
};

const Chat = () => {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { user } = useAuth();
  const username = user ?? "visitante";
  const [searchParams] = useSearchParams();

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fromUrl = searchParams.get("conversationId");

    // Se veio um ID pela URL, tenta carregar essa conversa
    if (fromUrl) {
      const existing = getConversationById(fromUrl);
      if (existing) {
        setConversationId(existing.id);
        setMessages(
          existing.messages.map((m) => ({
            text: m.text,
            isBot: m.isBot,
          }))
        );
        return;
      }
    }

    // Caso contrário, cria uma nova conversa com as mensagens iniciais
    const initialMessages: Message[] = [
      {
        text: `Olá ${username}! Eu sou o chatbot do Calmio e estou aqui para te ajudar com suas emoções.
Isso não é uma terapia, apenas uma IA treinada com supervisão de psicólogos.
Nosso aplicativo não substitui um profissional.`,
        isBot: true,
      },
      {
        text: "Como você está se sentindo hoje?",
        isBot: true,
      },
    ];

    setMessages(initialMessages);
    const conv = createConversation(initialMessages);
    setConversationId(conv.id);
  }, [searchParams, username]);

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      text: trimmed,
      isBot: false,
    };

    // Atualiza UI
    setMessages((prev) => [...prev, userMsg]);

    // Persiste no histórico, se já tivermos um ID de conversa
    if (conversationId) {
      appendMessagesToConversation(conversationId, [userMsg]);
    }

    setIsLoading(true);

    try {
      const reply = await getGeminiReply(trimmed);

      const botMsg: Message = {
        text: reply,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMsg]);

      if (conversationId) {
        appendMessagesToConversation(conversationId, [botMsg]);
      }
    } catch (error) {
      console.error("Erro ao chamar o Gemini:", error);

      const errorMsg: Message = {
        text:
          "Desculpa, tive um problema para responder agora. Podemos tentar de novo em alguns instantes?",
        isBot: true,
      };

      setMessages((prev) => [...prev, errorMsg]);

      if (conversationId) {
        appendMessagesToConversation(conversationId, [errorMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header correto do chat */}
      <ChatHeader onHelpClick={() => setEmergencyModalOpen(true)} />

      <main className="flex-1 overflow-y-auto px-5 py-8 pb-32 space-y-6">
        <div className="max-w-2xl mx-auto space-y-5">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              text={message.text}
              isBot={message.isBot}
            />
          ))}

          {isLoading && (
            <ChatMessage
              isBot={true}
              isTyping={true} // aqueles três pontinhos
            />
          )}
        </div>
      </main>

      {/* Passa o handler para o input */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />

      {/* Modal de emergência */}
      <EmergencyModal
        open={emergencyModalOpen}
        onOpenChange={setEmergencyModalOpen}
      />
    </div>
  );
};

export default Chat;