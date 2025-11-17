import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "@/auth/AuthProvider";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import YogaList from "./pages/YogaList";
import YogaExercise from "./pages/YogaExercise";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* 🔥 ABRIR O SITE → IR PARA /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* PÚBLICAS */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PÁGINAS */}
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/yoga" element={<YogaList />} />
            <Route path="/yoga/:id" element={<YogaExercise />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
