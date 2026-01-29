import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { SkipLink } from "@/components/SkipLink";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Artists from "./pages/Artists";
import Community from "./pages/Community";
import ArtistProfile from "./pages/ArtistProfile";
import ArtworkDetail from "./pages/ArtworkDetail";
import Trending from "./pages/Trending";
import Guidelines from "./pages/Guidelines";
import Trust from "./pages/Trust";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./pages/About"));
const Collections = lazy(() => import("./pages/Collections"));
const CollectionDetail = lazy(() => import("./pages/CollectionDetail"));
const Moderation = lazy(() => import("./pages/Moderation"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Principles = lazy(() => import("./pages/Principles"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const SignupArtist = lazy(() => import("./pages/SignupArtist"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const ArtistDashboard = lazy(() => import("./pages/ArtistDashboard"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Notifications = lazy(() => import("./pages/Notifications"));

const queryClient = new QueryClient();

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" aria-label="Loading">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="atelier-theme">
      <BrowserRouter>
        <AuthProvider>
          <ErrorBoundary>
          <TooltipProvider>
          <SkipLink />
          <ScrollProgress />
          <ScrollToTop />
          <BackToTop />
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:id" element={<ArtistProfile />} />
            <Route path="/artworks/:id" element={<ArtworkDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<Suspense fallback={<PageFallback />}><About /></Suspense>} />
            <Route path="/collections" element={<Suspense fallback={<PageFallback />}><Collections /></Suspense>} />
            <Route path="/collections/:id" element={<Suspense fallback={<PageFallback />}><CollectionDetail /></Suspense>} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/moderation" element={<Suspense fallback={<PageFallback />}><Moderation /></Suspense>} />
            <Route path="/faq" element={<Suspense fallback={<PageFallback />}><FAQ /></Suspense>} />
            <Route path="/principles" element={<Suspense fallback={<PageFallback />}><Principles /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<PageFallback />}><Privacy /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<PageFallback />}><Contact /></Suspense>} />
            <Route path="/terms" element={<Suspense fallback={<PageFallback />}><Terms /></Suspense>} />
            <Route path="/cookies" element={<Suspense fallback={<PageFallback />}><Cookies /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<PageFallback />}><Settings /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<PageFallback />}><Login /></Suspense>} />
            <Route path="/signup" element={<Suspense fallback={<PageFallback />}><Signup /></Suspense>} />
            <Route path="/signup/artist" element={<Suspense fallback={<PageFallback />}><SignupArtist /></Suspense>} />
            <Route path="/profile" element={<Suspense fallback={<PageFallback />}><Profile /></Suspense>} />
            <Route path="/profile/edit" element={<Suspense fallback={<PageFallback />}><EditProfile /></Suspense>} />
            <Route path="/artist/dashboard" element={<Suspense fallback={<PageFallback />}><ArtistDashboard /></Suspense>} />
            <Route path="/favorites" element={<Suspense fallback={<PageFallback />}><Favorites /></Suspense>} />
            <Route path="/notifications" element={<Suspense fallback={<PageFallback />}><Notifications /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </TooltipProvider>
          </ErrorBoundary>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
