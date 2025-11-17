import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"; // Ou o ícone que você usa
import { useNavigate } from "react-router-dom";

// 1. Adicione o backPath na interface (o ? significa que é opcional)
interface PageHeaderProps {
  title: string;
  backPath?: string; 
}

// 2. Receba o backPath nas props
const PageHeader = ({ title, backPath }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      // Se tiver um caminho específico (ex: ir pra home), vai pra ele
      navigate(backPath);
    } else {
      // Se não, apenas volta uma casa no histórico (comportamento padrão)
      navigate(-1);
    }
  };

  return (
    <header className="flex items-center p-4 sticky top-0 bg-background z-10">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleBack} // Usa nossa nova função
        className="mr-2"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
};

export default PageHeader;