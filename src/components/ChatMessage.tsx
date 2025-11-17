import { cn } from "@/lib/utils";

interface ChatMessageProps {
  text: string;
  isBot?: boolean;
}

const ChatMessage = ({ text, isBot = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "px-6 py-4 rounded-[24px] max-w-[85%] shadow-sm",
        isBot
          ? "bg-calmio-bot-bubble text-foreground mr-auto"
          : "bg-calmio-user-bubble text-foreground ml-auto"
      )}
    >
      <p className="text-[15px] leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
};

export default ChatMessage;
