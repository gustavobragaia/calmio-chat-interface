import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  backPath?: string; 
}

const PageHeader = ({ title, backPath }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="flex items-center p-4 sticky top-0 bg-background z-10">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleBack} 
        className="mr-2"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
};

export default PageHeader;