import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, KeyboardEvent } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};


const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background p-5">
      <div className="max-w-2xl mx-auto">
        <div className="bg-input rounded-[28px] shadow-lg border border-border flex items-center px-5 py-3 gap-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Responda ou diga 'ajuda'"
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground text-[15px]"
            disabled={disabled}
          />
          <Button
            onClick={handleSend}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-muted shrink-0"
            disabled={disabled}
          >
            <Send className="h-5 w-5 text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
