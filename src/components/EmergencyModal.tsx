import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


const EmergencyModal = ({ open, onOpenChange }: EmergencyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-calmio-bot-bubble border-none max-w-md rounded-[30px] p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Parece que você não está bem...
          </h2>
          <p className="text-foreground">Gostaria de falar com alguém?</p>
        </div>

        <div className="space-y-3">
          {/* Botão Contato de segurança */}
          <button className="w-full flex items-center gap-4 bg-calmio-header rounded-full px-5 py-4 hover:bg-calmio-header/90 transition-colors">
            <div className="bg-calmio-chat-yellow rounded-full p-3 shrink-0">
              <Phone className="h-5 w-5 text-foreground" />
            </div>
            <div className="text-left">
              <span className="text-foreground">Ligar para meu </span>
              <span className="font-bold text-foreground">contato de segurança</span>
            </div>
          </button>

          {/* Botão CVV */}
          <button className="w-full flex items-center gap-4 bg-calmio-header rounded-full px-5 py-4 hover:bg-calmio-header/90 transition-colors">
            <div className="bg-calmio-chat-yellow rounded-full p-3 shrink-0">
              <Heart className="h-5 w-5 text-foreground" />
            </div>
            <div className="text-left">
              <span className="text-foreground">Ligar para o </span>
              <span className="font-bold text-foreground">Centro de Valorização da Vida</span>
            </div>
          </button>
        </div>

        {/* Botão Cancelar */}
        <Button
          variant="outline"
          className="w-full bg-card hover:bg-card/90 rounded-full h-12 shadow-sm"
          onClick={() => onOpenChange(false)}
        >
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyModal;
