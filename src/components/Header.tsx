import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Bell, User, LogOut, Settings, Bookmark, Menu, ShieldCheck, Palette, ArrowLeft, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SearchDialog from "@/components/SearchDialog";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import AuthDialog from "@/components/AuthDialog";
import i18n from "@/i18n";
import { SUPPORTED_LANGUAGES } from "@/i18n";

const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const currentLang = (["en", "zh", "id"] as const).find((l) => i18n.language?.startsWith(l)) || "en";
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  // Check if we're on login/signup pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/signup/artist";

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (!user) {
      e.preventDefault();
      setAuthDialogOpen(true);
    }
  };

  // Keyboard shortcuts: Cmd/Ctrl + K search, Cmd/Ctrl + Shift + H home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "H") {
        e.preventDefault();
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  // Minimal header for auth pages
  if (isAuthPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <div className="w-8 h-8 rounded-full gradient-trust" />
            <span className="font-serif text-lg sm:text-xl font-semibold">{t("common.appName")}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Select value={currentLang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[100px] sm:w-[120px] h-9 border-border" aria-label="Language">
                <Languages className="w-4 h-4 mr-1 shrink-0" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map(({ code, label }) => (
                  <SelectItem key={code} value={code}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="default"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 font-medium shadow-sm hover:shadow-md transition-shadow shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">{t("common.back")}</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <div className="w-8 h-8 rounded-full gradient-trust" />
            <span className="font-serif text-lg sm:text-xl font-semibold">{t("common.appName")}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              to="/discover" 
              onClick={(e) => handleNavClick(e, "/discover")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {t("nav.discover")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link 
              to="/artists" 
              onClick={(e) => handleNavClick(e, "/artists")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {t("nav.artists")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link 
              to="/collections" 
              onClick={(e) => handleNavClick(e, "/collections")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {t("nav.collections")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link 
              to="/trending" 
              onClick={(e) => handleNavClick(e, "/trending")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {t("nav.trending")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            {user && user.artistApplicationStatus !== "approved" && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="ml-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/artist/register" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  {t("nav.becomeArtist")}
                </Link>
              </Button>
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Select value={currentLang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[90px] sm:w-[110px] h-9 border-border" aria-label="Language">
                <Languages className="w-4 h-4 mr-1 shrink-0 hidden sm:inline" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map(({ code, label }) => (
                  <SelectItem key={code} value={code}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Mobile: Become an Artist button (visible when logged in) */}
            {user && user.artistApplicationStatus !== "approved" && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="md:hidden border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/artist/register" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Become an Artist</span>
                </Link>
              </Button>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search artworks</TooltipContent>
            </Tooltip>
            
            {user ? (
              <NotificationsDropdown />
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      // Show message to sign in
                      alert("Please sign in to view notifications");
                    }}
                  >
                    <Bell className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Sign in to view notifications</TooltipContent>
              </Tooltip>
            )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t("nav.profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="cursor-pointer">
                    <Bookmark className="mr-2 h-4 w-4" />
                    {t("nav.favorites")}
                  </Link>
                </DropdownMenuItem>
                {user.artistApplicationStatus !== "approved" && (
                  <DropdownMenuItem asChild>
                    <Link to="/artist/register" className="cursor-pointer">
                      <Palette className="mr-2 h-4 w-4" />
                      {t("nav.becomeArtist")}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("nav.settings")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/moderation" className="cursor-pointer">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    {t("nav.moderation")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("common.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild size="sm" className="text-sm">
                <Link to="/login">{t("common.signIn")}</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/signup">{t("common.signUp")}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,300px)] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>{t("common.menu")}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  to="/discover"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      setAuthDialogOpen(true);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {t("nav.discover")}
                </Link>
                <Link
                  to="/artists"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      setAuthDialogOpen(true);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {t("nav.artists")}
                </Link>
                <Link
                  to="/collections"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      setAuthDialogOpen(true);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Collections
                </Link>
                <Link
                  to="/trending"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      setAuthDialogOpen(true);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {t("nav.trending")}
                </Link>
                {user && (
                  <>
                    <div className="border-t my-2" />
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {t("nav.profile")}
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {t("nav.favorites")}
                    </Link>
                    {user.artistApplicationStatus !== "approved" && (
                      <Link
                        to="/artist/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center gap-2"
                      >
                        <Palette className="w-4 h-4" />
                        {t("nav.becomeArtist")}
                      </Link>
                    )}
                    <Link
                      to="/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {t("nav.settings")}
                    </Link>
                    <Link
                      to="/moderation"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {t("nav.moderation")}
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="justify-start text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t("common.logout")}
                    </Button>
                  </>
                )}
                {!user && (
                  <>
                    <div className="border-t my-2" />
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>{t("common.signIn")}</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>{t("common.signUp")}</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      
      {/* Auth Dialog */}
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} defaultTab="login" />
    </header>
    </TooltipProvider>
  );
};

export default Header;
