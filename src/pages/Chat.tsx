import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import EmergencyModal from "@/components/EmergencyModal";
import { useState } from "react";

const Chat = () => {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const messages = [
    {
      text: "Olá Lucas. Eu sou o chatbot do Calmio e estou aqui para te ajudar com suas emoções.\nIsso não é uma terapia, apenas uma IA treinada com a supervisão de psicólogos.\nNosso aplicativo não menospreza a importância de um profissional.",
      isBot: true,
    },
    {
      text: "Como você está se sentindo hoje?",
      isBot: true,
    },
    {
      text: "Estou me sentindo ansioso, pois a prova de IHC está chegando e eu não me sinto preparado, embora tenha estudado bastante.",
      isBot: false,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader onHelpClick={() => setEmergencyModalOpen(true)} />
      
      <main className="flex-1 overflow-y-auto px-5 py-8 pb-32 space-y-6">
        <div className="max-w-2xl mx-auto space-y-5">
          {messages.map((message, index) => (
            <ChatMessage key={index} text={message.text} isBot={message.isBot} />
          ))}
        </div>
      </main>

      <ChatInput />

      {/* Modal de Emergência */}
      <EmergencyModal 
        open={emergencyModalOpen} 
        onOpenChange={setEmergencyModalOpen} 
      />
    </div>
  );
};

export default Chat;
