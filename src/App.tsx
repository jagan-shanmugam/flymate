import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Checklist from "./pages/Checklist";
import Guide from "./pages/Guide";
import Community from "./pages/Community";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/community" element={<Community />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
          <Navigation />
        </div>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;