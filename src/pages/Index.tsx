import HomeHeader from "@/components/HomeHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { useAuth } from "@/auth/useAuth";

const Index = () => {
  const { user } = useAuth();
  const username = user ?? "visitante";

  const messages = [
    {
      text: `Olá ${username}. Eu sou o chatbot do Calmio e estou aqui para te ajudar com suas emoções.
Isso não é uma terapia, apenas uma IA treinada com a supervisão de psicólogos.
Nosso aplicativo não substitui um profissional.`,
      isBot: true,
    },
    {
      text: "Como você está se sentindo hoje?",
      isBot: true,
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-background">

      {/* 🔥 Agora com HomeHeader */}
      <HomeHeader />

      <main className="flex-1 overflow-y-auto px-5 py-8 pb-32 space-y-6">
        <div className="max-w-2xl mx-auto space-y-5">
          {messages.map((message, index) => (
            <ChatMessage key={index} text={message.text} isBot={message.isBot} />
          ))}
        </div>
      </main>

      <ChatInput />
    </div>
  );
};

export default Index;
