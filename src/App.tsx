import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import YogaList from "./pages/YogaList";
import YogaExercise from "./pages/YogaExercise";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";  // 👈 ADICIONE ISSO

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* ROTAS DE AUTENTICAÇÃO */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* 👈 NOVO */}

          {/* SUAS ROTAS NORMAIS */}
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/yoga" element={<YogaList />} />
          <Route path="/yoga/:id" element={<YogaExercise />} />

          {/* CATCH-ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
