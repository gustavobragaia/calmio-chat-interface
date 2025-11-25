import { cn } from "@/lib/utils";

interface ChatMessageProps {
  text?: string;
  isBot?: boolean;
  isTyping?: boolean;
}


const ChatMessage = ({ text, isBot = false, isTyping = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "px-6 py-4 rounded-[24px] max-w-[85%] shadow-sm",
        isBot
          ? "bg-calmio-bot-bubble text-foreground mr-auto"
          : "bg-calmio-user-bubble text-foreground ml-auto"
      )}
    >
      {isTyping ? (
        <div className="flex items-center gap-1 h-[18px]">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce [animation-delay:-0.2s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce [animation-delay:-0.1s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" />
        </div>
      ) : (
        <p className="text-[15px] leading-relaxed whitespace-pre-line">{text}</p>
      )}
    </div>
  );
};

export default ChatMessage;
