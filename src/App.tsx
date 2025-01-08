import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import Navigation from "./components/Navigation";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Checklist from "./pages/Checklist";
import Guide from "./pages/Guide";
import Community from "./pages/Community";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Index />
                    <Navigation />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/checklist"
              element={
                <ProtectedRoute>
                  <>
                    <Checklist />
                    <Navigation />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/guide"
              element={
                <ProtectedRoute>
                  <>
                    <Guide />
                    <Navigation />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <>
                    <Community />
                    <Navigation />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <>
                    <Messages />
                    <Navigation />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;