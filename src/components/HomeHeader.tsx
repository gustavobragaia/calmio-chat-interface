import { Heart, Menu, User, X, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useAuth } from "@/auth/useAuth";
import { useNavigate } from "react-router-dom";

interface HomeHeaderProps {
  onHelpClick?: () => void;
}


const HomeHeader = ({ onHelpClick }: HomeHeaderProps) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { icon: User, label: "Perfil" },
    { icon: Settings, label: "Configurações" },
    { icon: LogOut, label: "Sair" }, 
  ];

  return (
    <header className="bg-calmio-header px-5 pt-3 pb-4">
      
      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs font-medium text-foreground mb-3">
        <span>{time}</span>

        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-2 bg-foreground rounded-full"></div>
            <div className="w-1 h-2.5 bg-foreground rounded-full"></div>
            <div className="w-1 h-3 bg-foreground rounded-full"></div>
            <div className="w-1 h-3.5 bg-foreground rounded-full"></div>
          </div>

          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            className="ml-1"
          >
            <rect
              x="1"
              y="1"
              width="13"
              height="9"
              rx="2"
              stroke="currentColor"
              strokeWidth="1"
            />
            <rect
              x="14.5"
              y="3.5"
              width="1"
              height="4"
              rx="0.5"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Header principal */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 cursor-pointer">
            <AvatarFallback className="bg-background">
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>

          <span className="font-semibold text-foreground text-base">
            {user ?? "Visitante"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="bg-calmio-help-button hover:bg-calmio-help-button/90 text-foreground rounded-full h-10 px-4 gap-2 font-medium"
            onClick={onHelpClick}
          >
            <Heart className="h-4 w-4 fill-current" />
            <span className="text-sm">Ajuda humana</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div className="mt-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 bg-secondary/60 rounded-3xl px-5 py-3 hover:bg-secondary transition-colors"
              onClick={() => {
                if (item.label === "Sair") {
                  logout();
                  navigate("/login");
                }
              }}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      )}

    </header>
  );
};

export default HomeHeader;
