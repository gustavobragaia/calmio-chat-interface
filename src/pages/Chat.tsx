import ChatHeader from "@/components/ChatHeader"; // 👈 agora é o header correto
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import EmergencyModal from "@/components/EmergencyModal";
import { useState } from "react";
import { useAuth } from "@/auth/useAuth";

const Chat = () => {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  const { user } = useAuth();
  const username = user ?? "visitante";

  const messages = [
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
        </div>
      </main>

      <ChatInput />

      {/* Modal de emergência */}
      <EmergencyModal
        open={emergencyModalOpen}
        onOpenChange={setEmergencyModalOpen}
      />
    </div>
  );
};

export default Chat;
