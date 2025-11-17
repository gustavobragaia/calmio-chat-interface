import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface DailyFeelingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const emojis = ["😣", "🙁", "😐", "🙂", "😄"];

const DailyFeelingModal = ({ open, onOpenChange }: DailyFeelingModalProps) => {
  const [feeling, setFeeling] = useState([2]);
  const [thoughts, setThoughts] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
  className="bg-calmio-bot-bubble border-none max-w-lg rounded-[30px] p-8 space-y-8 [&>button]:hidden"
>


        {/* Título */}
        <div className="flex items-center justify-between">
  <h2 className="text-2xl font-bold text-foreground mx-auto">
    Como você se sente hoje?
  </h2>

  <Button
    variant="ghost"
    size="icon"
    className="rounded-full hover:bg-background/50 ml-4"
    onClick={() => onOpenChange(false)}
  >
    <X className="h-6 w-6" />
  </Button>
</div>


        {/* Linha de emojis */}
        <div className="flex justify-between px-2">
          {emojis.map((emoji, index) => (
            <span
              key={index}
              className={`text-4xl transition-transform ${
                feeling[0] === index ? "scale-125" : "scale-100 opacity-60"
              }`}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Slider */}
        <div className="px-2">
          <Slider
            value={feeling}
            onValueChange={setFeeling}
            max={4}
            step={1}
            className="w-full"
          />
        </div>

        {/* Campo de texto */}
        <div className="space-y-3">
          <div className="relative">
            <Textarea
              placeholder="Escreva aqui o que está passando pela sua mente"
              className="min-h-[150px] bg-card rounded-3xl p-4 resize-none border-none shadow-sm"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
            />
            <div className="absolute bottom-4 right-4 text-muted-foreground">
              <FileText className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Botão enviar */}
        <Button
          className="w-full bg-calmio-chat-yellow hover:bg-calmio-chat-yellow/90 text-foreground rounded-full h-12 font-semibold"
          onClick={() => {
            // Aqui você pode salvar os dados
            console.log("Feeling:", feeling[0], "Thoughts:", thoughts);
            onOpenChange(false);
          }}
        >
          Enviar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DailyFeelingModal;
