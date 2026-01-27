import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, User, LogOut, Settings, Heart, UserCircle, ImageIcon } from "lucide-react";
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
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { artists } from "@/data/artists";

// Get all artworks from artists' portfolios
const allArtworks = artists.flatMap((artist) =>
  artist.portfolio.map((item) => ({
    id: item.id,
    title: item.title,
    artistId: artist.id,
    artistName: artist.name,
    keywords: item.keywords,
  }))
);

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const results = useMemo(() => {
    if (!searchQuery.trim()) {
      return { artists: [], artworks: [] };
    }

    const q = searchQuery.toLowerCase().trim();

    const matchedArtists = artists.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.specialty.toLowerCase().includes(q) ||
        a.bio.toLowerCase().includes(q)
    );

    const matchedArtworks = allArtworks.filter(
      (aw) =>
        aw.title.toLowerCase().includes(q) ||
        aw.artistName.toLowerCase().includes(q) ||
        aw.keywords.some((k) => k.toLowerCase().includes(q))
    );

    return {
      artists: matchedArtists.slice(0, 5),
      artworks: matchedArtworks.slice(0, 5),
    };
  }, [searchQuery]);

  const handleSelect = (path: string) => {
    setOpen(false);
    setSearchQuery("");
    navigate(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-trust" />
            <span className="font-serif text-xl font-semibold">Atelier</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/discover" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Discover
            </Link>
            <Link to="/artists" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Artists
            </Link>
            <Link to="/community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
            <Link to="/collections" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Collections
            </Link>
            <Link to="/trending" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Trending
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            
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
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search artists, artworks, keywords..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {results.artists.length > 0 && (
            <CommandGroup heading="Artists">
              {results.artists.map((artist) => (
                <CommandItem
                  key={artist.id}
                  onSelect={() => handleSelect(`/artists/${artist.id}`)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{artist.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{artist.specialty}</p>
                  </div>
                  <UserCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {results.artworks.length > 0 && (
            <CommandGroup heading="Artworks">
              {results.artworks.map((artwork) => (
                <CommandItem
                  key={`${artwork.artistId}-${artwork.id}`}
                  onSelect={() => handleSelect(`/artworks/${artwork.id}`)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <ImageIcon className="w-8 h-8 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{artwork.title}</p>
                    <p className="text-xs text-muted-foreground truncate">by {artwork.artistName}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Header;
