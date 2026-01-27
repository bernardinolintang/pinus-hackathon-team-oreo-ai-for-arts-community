import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import ArtistProfile from "./pages/ArtistProfile";
import ArtworkDetail from "./pages/ArtworkDetail";
import Artists from "./pages/Artists";
import Community from "./pages/Community";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Trending from "./pages/Trending";
import Guidelines from "./pages/Guidelines";
import Trust from "./pages/Trust";
import Moderation from "./pages/Moderation";
import FAQ from "./pages/FAQ";
import Principles from "./pages/Principles";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:id" element={<ArtistProfile />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/moderation" element={<Moderation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/principles" element={<Principles />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
