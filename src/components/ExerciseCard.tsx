import { ChevronRight, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ExerciseCardProps {
  icon: LucideIcon;
  title: string;
  duration: string;
  onClick?: () => void;
}


const ExerciseCard = ({ icon: Icon, title, duration, onClick }: ExerciseCardProps) => {
  return (
    <Card
      className="p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow bg-card"
      onClick={onClick}
    >
      <div className="bg-muted/40 rounded-full p-3">
        <Icon className="h-6 w-6 text-foreground" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-foreground mb-0.5">{title}</h3>
        <p className="text-sm text-muted-foreground">{duration}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Card>
  );
};

export default ExerciseCard;
