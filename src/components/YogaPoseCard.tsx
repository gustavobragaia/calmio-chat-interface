import { ChevronRight, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface YogaPoseCardProps {
  title: string;
  description: string;
  completed?: boolean;
  onClick?: () => void;
}

const YogaPoseCard = ({ title, description, completed = false, onClick }: YogaPoseCardProps) => {
  return (
    <Card
      className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow bg-card"
      onClick={onClick}
    >
      <Avatar className="h-14 w-14">
        <AvatarFallback className="bg-muted/40 text-2xl">🧘</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
      </div>
      
      {completed ? (
        <CheckCircle className="h-6 w-6 text-calmio-complete-green" />
      ) : (
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      )}
    </Card>
  );
};

export default YogaPoseCard;
