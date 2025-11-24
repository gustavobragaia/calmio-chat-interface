import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingChatButton = () => {
  const navigate = useNavigate();

  
  return (
    <button
      onClick={() => navigate("/chat")}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-0 bg-calmio-header rounded-full shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
    >
      <div className="bg-calmio-chat-yellow rounded-full p-3">
        <MessageCircle className="h-6 w-6 text-foreground" />
      </div>
      <span className="px-5 pr-6 font-semibold text-foreground">Chat</span>
    </button>
  );
};

export default FloatingChatButton;
