import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi, userApi, type User } from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  isFollowing: (artistId: string) => boolean;
  toggleFollow: (artistId: string) => Promise<void>;
  isFavorite: (artworkId: string) => boolean;
  toggleFavorite: (artworkId: string, artistId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [followedArtists, setFollowedArtists] = useState<Set<string>>(new Set());
  const [favoriteArtworks, setFavoriteArtworks] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const currentUser = await authApi.getCurrentUser();
          setUser(currentUser);
          
          // Load followed artists
          const following = await userApi.getFollowedArtists();
          setFollowedArtists(new Set(following));
          
          // Load favorite artworks
          const favorites = await userApi.getFavoriteArtworks();
          setFavoriteArtworks(new Set(favorites.map(f => f.artworkId)));
        } catch (error) {
          console.error("Failed to load user:", error);
          authApi.logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    setUser(response.user);
    
    // Load user data
    const following = await userApi.getFollowedArtists();
    setFollowedArtists(new Set(following));
    
    const favorites = await userApi.getFavoriteArtworks();
    setFavoriteArtworks(new Set(favorites.map(f => f.artworkId)));
    
    navigate("/");
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await authApi.signup({ email, password, name });
    setUser(response.user);
    navigate("/");
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    setFollowedArtists(new Set());
    setFavoriteArtworks(new Set());
    navigate("/");
  };

  const updateUser = async (data: Partial<User>) => {
    const updatedUser = await authApi.updateProfile(data);
    setUser(updatedUser);
  };

  const isFollowing = (artistId: string) => {
    return followedArtists.has(artistId);
  };

  const toggleFollow = async (artistId: string) => {
    try {
      if (isFollowing(artistId)) {
        await userApi.unfollowArtist(artistId);
        setFollowedArtists((prev) => {
          const next = new Set(prev);
          next.delete(artistId);
          return next;
        });
      } else {
        await userApi.followArtist(artistId);
        setFollowedArtists((prev) => new Set(prev).add(artistId));
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error);
      throw error;
    }
  };

  const isFavorite = (artworkId: string) => {
    return favoriteArtworks.has(artworkId);
  };

  const toggleFavorite = async (artworkId: string, artistId: string) => {
    try {
      if (isFavorite(artworkId)) {
        await userApi.unsaveArtwork(artworkId);
        setFavoriteArtworks((prev) => {
          const next = new Set(prev);
          next.delete(artworkId);
          return next;
        });
      } else {
        await userApi.saveArtwork(artworkId, artistId);
        setFavoriteArtworks((prev) => new Set(prev).add(artworkId));
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateUser,
        isFollowing,
        toggleFollow,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

