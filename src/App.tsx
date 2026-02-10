import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Archives from "./pages/Archives";
import Writeups from "./pages/Writeups";
import Research from "./pages/Research";
import About from "./pages/About";
import ArticleDetail from "./pages/ArticleDetail";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFadeOut(true), 2000);
    const hideTimer = window.setTimeout(() => setShowLoader(false), 2400);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showLoader && (
            <div className={`global-loader ${fadeOut ? "global-loader--fade" : ""}`}>
              <div className="loader">
                <div id="first">
                  <div id="second">
                    <div id="third" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/writeups" element={<Writeups />} />
          <Route path="/research" element={<Research />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
