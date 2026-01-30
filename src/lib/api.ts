// Lovable Cloud API service
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.lovable.dev";
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true" || !import.meta.env.VITE_API_URL;

export type UserRole = "user" | "artist";
export type ArtistApplicationStatus = "pending" | "approved" | "rejected";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  role?: UserRole;
  artistApplicationStatus?: ArtistApplicationStatus;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  registerAsArtist?: boolean;
}

export interface ArtistApplication {
  userId: string;
  email: string;
  name: string;
  appliedAt: string;
  status: ArtistApplicationStatus;
}

export interface ArtistPortfolioSubmission {
  specialty: string;
  bio: string;
  location: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  portfolioItems: Array<{
    title: string;
    imageUrl: string;
    description?: string;
    year?: string;
    medium?: string;
  }>;
}

const getAuthToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

const setAuthToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

const removeAuthToken = (): void => {
  localStorage.removeItem("auth_token");
};

// Mock API for development - state is persisted to localStorage so your session survives refresh
const MOCK_STATE_KEY = "atelier_mock_state";

type MockUser = {
  email: string;
  password: string;
  name: string;
  id: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  role?: UserRole;
  artistApplicationStatus?: ArtistApplicationStatus;
};
type MockComment = { id: string; artworkId: string; userId: string; userName: string; userAvatar?: string; text: string; createdAt: string };
export interface MockArtistArtwork {
  id: string;
  artistId: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

interface PersistedMockState {
  users: MockUser[];
  tokenToUserId: Record<string, string>;
  followedArtists: Record<string, string[]>;
  favoriteArtworks: Record<string, string[]>;
  likedArtworks: Record<string, string[]>;
  comments: Record<string, MockComment[]>;
  artistArtworks: Record<string, MockArtistArtwork[]>;
}

const mockApi = {
  users: new Map<string, MockUser>(),
  tokens: new Map<string, string>(),
  followedArtists: new Map<string, Set<string>>(),
  favoriteArtworks: new Map<string, Set<string>>(),
  likedArtworks: new Map<string, Set<string>>(),
  comments: new Map<string, MockComment[]>(),
  artistArtworks: new Map<string, MockArtistArtwork[]>(),
};

function saveMockState(): void {
  try {
    const state: PersistedMockState = {
      users: Array.from(mockApi.users.values()),
      tokenToUserId: Object.fromEntries(mockApi.tokens),
      followedArtists: Object.fromEntries(
        Array.from(mockApi.followedArtists.entries()).map(([k, v]) => [k, Array.from(v)])
      ),
      favoriteArtworks: Object.fromEntries(
        Array.from(mockApi.favoriteArtworks.entries()).map(([k, v]) => [k, Array.from(v)])
      ),
      likedArtworks: Object.fromEntries(
        Array.from(mockApi.likedArtworks.entries()).map(([k, v]) => [k, Array.from(v)])
      ),
      comments: Object.fromEntries(mockApi.comments),
      artistArtworks: Object.fromEntries(
        Array.from(mockApi.artistArtworks.entries()).map(([k, v]) => [k, v])
      ),
    };
    localStorage.setItem(MOCK_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Failed to persist mock auth state:", e);
  }
}

function loadMockState(): void {
  try {
    const raw = localStorage.getItem(MOCK_STATE_KEY);
    if (!raw) return;
    const state: PersistedMockState = JSON.parse(raw);
    mockApi.users.clear();
    state.users.forEach((u) => mockApi.users.set(u.email, u));
    mockApi.tokens.clear();
    Object.entries(state.tokenToUserId || {}).forEach(([token, id]) => mockApi.tokens.set(token, id));
    mockApi.followedArtists.clear();
    Object.entries(state.followedArtists || {}).forEach(([id, arr]) =>
      mockApi.followedArtists.set(id, new Set(arr))
    );
    mockApi.favoriteArtworks.clear();
    Object.entries(state.favoriteArtworks || {}).forEach(([id, arr]) =>
      mockApi.favoriteArtworks.set(id, new Set(arr))
    );
    mockApi.likedArtworks.clear();
    Object.entries(state.likedArtworks || {}).forEach(([id, arr]) =>
      mockApi.likedArtworks.set(id, new Set(arr))
    );
    mockApi.comments.clear();
    Object.entries(state.comments || {}).forEach(([artworkId, arr]) =>
      mockApi.comments.set(artworkId, arr)
    );
    mockApi.artistArtworks.clear();
    Object.entries(state.artistArtworks || {}).forEach(([userId, arr]) =>
      mockApi.artistArtworks.set(userId, arr)
    );
  } catch (e) {
    console.warn("Failed to load mock auth state:", e);
  }
}

export const MODERATOR_EMAIL = "denxifenn@gmail.com";

// Restore mock state on load so existing auth_token is recognized
loadMockState();

const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  // Use mock API in development if real API fails or is not configured
  if (USE_MOCK_API) {
    return mockApiRequest<T>(endpoint, options);
  }

  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "An error occurred" }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Fallback to mock API if real API fails (network error, CORS, etc.)
    if (error instanceof TypeError && (error.message.includes("fetch") || error.message.includes("Failed to fetch"))) {
      console.warn("API request failed, using mock API for development:", error.message);
      try {
        return await mockApiRequest<T>(endpoint, options);
      } catch (mockError) {
        throw new Error("Unable to connect to server. Please check your internet connection or try again later.");
      }
    }
    throw error;
  }
};

// Mock API implementation
const mockApiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  const userId = token ? mockApi.tokens.get(token) : null;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Auth endpoints
  if (endpoint === "/auth/signup" && options.method === "POST") {
    const data = JSON.parse(options.body as string);
    
    // Check if user already exists
    if (mockApi.users.has(data.email)) {
      throw new Error("An account with this email already exists");
    }
    
    const id = `user_${Date.now()}`;
    const registerAsArtist = !!data.registerAsArtist;
    const user: MockUser = {
      id,
      email: data.email,
      password: data.password,
      name: data.name,
      avatar: undefined,
      bio: undefined,
      createdAt: new Date().toISOString(),
      role: registerAsArtist ? "user" : "user",
      artistApplicationStatus: registerAsArtist ? "pending" : undefined,
    };
    mockApi.users.set(data.email, user);
    const authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    mockApi.tokens.set(authToken, id);
    mockApi.followedArtists.set(id, new Set());
    mockApi.favoriteArtworks.set(id, new Set());
    mockApi.likedArtworks.set(id, new Set());
    if (registerAsArtist) mockApi.artistArtworks.set(id, []);
    saveMockState();
    return {
      user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar, bio: user.bio, createdAt: user.createdAt, role: user.role, artistApplicationStatus: user.artistApplicationStatus },
      token: authToken,
    } as T;
  }

  if (endpoint === "/auth/login" && options.method === "POST") {
    const data = JSON.parse(options.body as string);
    const user = mockApi.users.get(data.email);
    if (!user || user.password !== data.password) {
      throw new Error("Invalid email or password");
    }
    const authToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    mockApi.tokens.set(authToken, user.id);
    saveMockState();
    return {
      user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar, bio: user.bio, createdAt: user.createdAt, role: user.role, artistApplicationStatus: user.artistApplicationStatus },
      token: authToken,
    } as T;
  }

  if (endpoint === "/auth/me" && userId) {
    const user = Array.from(mockApi.users.values()).find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    return { id: user.id, email: user.email, name: user.name, avatar: user.avatar, bio: user.bio, createdAt: user.createdAt, role: user.role, artistApplicationStatus: user.artistApplicationStatus } as T;
  }

  // User endpoints
  if (endpoint.startsWith("/users/follow/") && options.method === "POST" && userId) {
    const artistId = endpoint.split("/").pop()!;
    const followed = mockApi.followedArtists.get(userId) || new Set();
    followed.add(artistId);
    mockApi.followedArtists.set(userId, followed);
    saveMockState();
    return undefined as T;
  }

  if (endpoint.startsWith("/users/unfollow/") && options.method === "DELETE" && userId) {
    const artistId = endpoint.split("/").pop()!;
    const followed = mockApi.followedArtists.get(userId);
    followed?.delete(artistId);
    saveMockState();
    return undefined as T;
  }

  if (endpoint === "/users/following" && userId) {
    const followed = mockApi.followedArtists.get(userId) || new Set();
    return Array.from(followed) as T;
  }

  if (endpoint === "/users/favorites" && options.method === "POST" && userId) {
    const data = JSON.parse(options.body as string);
    const favorites = mockApi.favoriteArtworks.get(userId) || new Set();
    favorites.add(data.artworkId);
    mockApi.favoriteArtworks.set(userId, favorites);
    saveMockState();
    return undefined as T;
  }

  if (endpoint.startsWith("/users/favorites/") && options.method === "DELETE" && userId) {
    const artworkId = endpoint.split("/").pop()!;
    const favorites = mockApi.favoriteArtworks.get(userId);
    favorites?.delete(artworkId);
    saveMockState();
    return undefined as T;
  }

  if (endpoint === "/users/favorites" && userId) {
    const favorites = mockApi.favoriteArtworks.get(userId) || new Set();
    return Array.from(favorites).map((artworkId) => ({ artworkId, artistId: "unknown" })) as T;
  }

  if (endpoint === "/users/likes" && userId) {
    const likes = mockApi.likedArtworks.get(userId) || new Set();
    return Array.from(likes) as T;
  }

  if (endpoint === "/users/profile" && options.method === "PATCH" && userId) {
    const data = JSON.parse(options.body as string);
    const user = Array.from(mockApi.users.values()).find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    Object.assign(user, data);
    saveMockState();
    return { id: user.id, email: user.email, name: user.name, avatar: user.avatar, bio: user.bio, createdAt: user.createdAt, role: user.role, artistApplicationStatus: user.artistApplicationStatus } as T;
  }

  // Artist portfolio submission
  if (endpoint === "/users/artist-application" && options.method === "POST" && userId) {
    const data = JSON.parse(options.body as string);
    const user = Array.from(mockApi.users.values()).find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    
    // Set artist application status to pending
    user.artistApplicationStatus = "pending";
    // Store portfolio data (in real app, this would be stored separately)
    // For now, we'll just mark the user as having submitted
    saveMockState();
    return undefined as T;
  }

  // Moderator: list pending artist applications (only denxifenn@gmail.com)
  if (endpoint === "/moderation/artist-applications" && options.method === "GET" && userId) {
    const currentUser = Array.from(mockApi.users.values()).find((u) => u.id === userId);
    if (!currentUser || currentUser.email !== MODERATOR_EMAIL) {
      throw new Error("Forbidden");
    }
    const pending = Array.from(mockApi.users.values())
      .filter((u) => u.artistApplicationStatus === "pending")
      .map((u) => ({ userId: u.id, email: u.email, name: u.name, appliedAt: u.createdAt, status: u.artistApplicationStatus } as ArtistApplication));
    return pending as T;
  }

  // Moderator: approve artist application
  if (endpoint.startsWith("/moderation/artist-applications/") && endpoint.endsWith("/approve") && options.method === "POST" && userId) {
    const currentUser = Array.from(mockApi.users.values()).find((u) => u.id === userId);
    if (!currentUser || currentUser.email !== MODERATOR_EMAIL) {
      throw new Error("Forbidden");
    }
    const targetUserId = endpoint.split("/")[3];
    const target = Array.from(mockApi.users.values()).find((u) => u.id === targetUserId);
    if (!target || target.artistApplicationStatus !== "pending") {
      throw new Error("Application not found or already processed");
    }
    target.role = "artist";
    target.artistApplicationStatus = "approved";
    if (!mockApi.artistArtworks.has(targetUserId)) mockApi.artistArtworks.set(targetUserId, []);
    saveMockState();
    return undefined as T;
  }

  // Moderator: reject artist application
  if (endpoint.startsWith("/moderation/artist-applications/") && endpoint.endsWith("/reject") && options.method === "POST" && userId) {
    const currentUser = Array.from(mockApi.users.values()).find((u) => u.id === userId);
    if (!currentUser || currentUser.email !== MODERATOR_EMAIL) {
      throw new Error("Forbidden");
    }
    const targetUserId = endpoint.split("/")[3];
    const target = Array.from(mockApi.users.values()).find((u) => u.id === targetUserId);
    if (!target || target.artistApplicationStatus !== "pending") {
      throw new Error("Application not found or already processed");
    }
    target.artistApplicationStatus = "rejected";
    saveMockState();
    return undefined as T;
  }

  // Artist: create artwork (only artists)
  if (endpoint === "/artworks" && options.method === "POST" && userId) {
    const currentUser = Array.from(mockApi.users.values()).find((u) => u.id === userId);
    if (!currentUser || currentUser.role !== "artist") {
      throw new Error("Only approved artists can post artworks");
    }
    const data = JSON.parse(options.body as string);
    const id = `artist_artwork_${userId}_${Date.now()}`;
    const artwork: MockArtistArtwork = {
      id,
      artistId: userId,
      title: data.title || "Untitled",
      description: data.description || "",
      imageUrl: data.imageUrl || "",
      createdAt: new Date().toISOString(),
    };
    const list = mockApi.artistArtworks.get(userId) || [];
    list.push(artwork);
    mockApi.artistArtworks.set(userId, list);
    saveMockState();
    return artwork as T;
  }

  // Artist: list my artworks
  if (endpoint === "/users/me/artworks" && options.method === "GET" && userId) {
    const list = mockApi.artistArtworks.get(userId) || [];
    return list as T;
  }

  // Get likers for an artwork (for artist viewing their own artwork)
  if (endpoint.startsWith("/artworks/") && endpoint.endsWith("/likers") && userId) {
    const artworkId = endpoint.split("/")[2];
    const likers: { userId: string; name: string; email: string }[] = [];
    mockApi.likedArtworks.forEach((artworkIds, uid) => {
      if (artworkIds.has(artworkId)) {
        const u = Array.from(mockApi.users.values()).find((x) => x.id === uid);
        if (u) likers.push({ userId: u.id, name: u.name, email: u.email });
      }
    });
    return likers as T;
  }

  // Get single artwork by id (for artist-created artworks)
  if (endpoint.startsWith("/artworks/") && options.method === "GET" && !endpoint.includes("/like") && !endpoint.includes("/comments") && !endpoint.endsWith("/likers")) {
    const artworkId = endpoint.split("/")[2];
    if (artworkId?.startsWith("artist_artwork_")) {
      for (const [, list] of mockApi.artistArtworks) {
        const found = list.find((a) => a.id === artworkId);
        if (found) return found as T;
      }
      throw new Error("Artwork not found");
    }
  }

  if (endpoint === "/users/account" && options.method === "DELETE" && userId) {
    const user = Array.from(mockApi.users.values()).find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    mockApi.users.delete(user.email);
    Array.from(mockApi.tokens.entries())
      .filter(([, id]) => id === userId)
      .forEach(([t]) => mockApi.tokens.delete(t));
    mockApi.followedArtists.delete(userId);
    mockApi.favoriteArtworks.delete(userId);
    mockApi.likedArtworks.delete(userId);
    saveMockState();
    return undefined as T;
  }

  // Artwork endpoints
  if (endpoint.startsWith("/artworks/") && endpoint.endsWith("/like") && options.method === "POST" && userId) {
    const artworkId = endpoint.split("/")[2];
    const likes = mockApi.likedArtworks.get(userId) || new Set();
    likes.add(artworkId);
    mockApi.likedArtworks.set(userId, likes);
    saveMockState();
    return undefined as T;
  }

  if (endpoint.startsWith("/artworks/") && endpoint.endsWith("/like") && options.method === "DELETE" && userId) {
    const artworkId = endpoint.split("/")[2];
    const likes = mockApi.likedArtworks.get(userId);
    likes?.delete(artworkId);
    saveMockState();
    return undefined as T;
  }

  if (endpoint.startsWith("/artworks/") && endpoint.endsWith("/comments") && options.method === "POST" && userId) {
    const artworkId = endpoint.split("/")[2];
    const data = JSON.parse(options.body as string);
    const user = Array.from(mockApi.users.values()).find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    const comments = mockApi.comments.get(artworkId) || [];
    const comment = {
      id: `comment_${Date.now()}`,
      artworkId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      text: data.text,
      createdAt: new Date().toISOString(),
    };
    comments.push(comment);
    mockApi.comments.set(artworkId, comments);
    saveMockState();
    return comment as T;
  }

  if (endpoint.startsWith("/artworks/") && endpoint.includes("/comments") && !endpoint.includes("/comments/") && userId) {
    const artworkId = endpoint.split("/")[2];
    const comments = mockApi.comments.get(artworkId) || [];
    return comments as T;
  }

  if (endpoint.includes("/comments/") && options.method === "DELETE" && userId) {
    const parts = endpoint.split("/");
    const artworkId = parts[2];
    const commentId = parts[4];
    const comments = mockApi.comments.get(artworkId) || [];
    const filtered = comments.filter((c) => c.id !== commentId);
    mockApi.comments.set(artworkId, filtered);
    saveMockState();
    return undefined as T;
  }

  throw new Error(`Mock API: Endpoint ${endpoint} not implemented`);
};

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setAuthToken(response.token);
    return response;
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setAuthToken(response.token);
    return response;
  },

  logout: (): void => {
    const token = getAuthToken();
    removeAuthToken();
    if (USE_MOCK_API && token) {
      mockApi.tokens.delete(token);
      saveMockState();
    }
  },

  getCurrentUser: async (): Promise<User> => {
    return apiRequest<User>("/auth/me");
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiRequest<User>("/users/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deleteAccount: async (): Promise<void> => {
    await apiRequest<void>("/users/account", { method: "DELETE" });
    removeAuthToken();
  },
};

export const userApi = {
  followArtist: async (artistId: string): Promise<void> => {
    return apiRequest<void>(`/users/follow/${artistId}`, {
      method: "POST",
    });
  },

  unfollowArtist: async (artistId: string): Promise<void> => {
    return apiRequest<void>(`/users/unfollow/${artistId}`, {
      method: "DELETE",
    });
  },

  getFollowedArtists: async (): Promise<string[]> => {
    return apiRequest<string[]>("/users/following");
  },

  saveArtwork: async (artworkId: string, artistId: string): Promise<void> => {
    return apiRequest<void>("/users/favorites", {
      method: "POST",
      body: JSON.stringify({ artworkId, artistId }),
    });
  },

  unsaveArtwork: async (artworkId: string): Promise<void> => {
    return apiRequest<void>(`/users/favorites/${artworkId}`, {
      method: "DELETE",
    });
  },

  getFavoriteArtworks: async (): Promise<Array<{ artworkId: string; artistId: string }>> => {
    return apiRequest<Array<{ artworkId: string; artistId: string }>>("/users/favorites");
  },

  likeArtwork: async (artworkId: string): Promise<void> => {
    return apiRequest<void>(`/artworks/${artworkId}/like`, {
      method: "POST",
    });
  },

  unlikeArtwork: async (artworkId: string): Promise<void> => {
    return apiRequest<void>(`/artworks/${artworkId}/like`, {
      method: "DELETE",
    });
  },

  getLikedArtworks: async (): Promise<string[]> => {
    return apiRequest<string[]>("/users/likes");
  },

  getArtworkLikes: async (artworkId: string): Promise<{ count: number; isLiked: boolean }> => {
    return apiRequest<{ count: number; isLiked: boolean }>(`/artworks/${artworkId}/likes`);
  },

  addComment: async (artworkId: string, text: string): Promise<Comment> => {
    return apiRequest<Comment>(`/artworks/${artworkId}/comments`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  },

  getComments: async (artworkId: string): Promise<Comment[]> => {
    return apiRequest<Comment[]>(`/artworks/${artworkId}/comments`);
  },

  deleteComment: async (artworkId: string, commentId: string): Promise<void> => {
    return apiRequest<void>(`/artworks/${artworkId}/comments/${commentId}`, {
      method: "DELETE",
    });
  },

  getMyArtworks: async (): Promise<MockArtistArtwork[]> => {
    return apiRequest<MockArtistArtwork[]>("/users/me/artworks", { method: "GET" });
  },

  createArtwork: async (data: { title: string; description: string; imageUrl: string }): Promise<MockArtistArtwork> => {
    return apiRequest<MockArtistArtwork>("/artworks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getArtworkLikers: async (artworkId: string): Promise<{ userId: string; name: string; email: string }[]> => {
    return apiRequest<{ userId: string; name: string; email: string }[]>(`/artworks/${artworkId}/likers`, { method: "GET" });
  },

  getArtistArtworkById: async (artworkId: string): Promise<MockArtistArtwork | null> => {
    if (!artworkId.startsWith("artist_artwork_")) return null;
    try {
      return await apiRequest<MockArtistArtwork>(`/artworks/${artworkId}`, { method: "GET" });
    } catch {
      return null;
    }
  },

  submitArtistPortfolio: async (data: ArtistPortfolioSubmission): Promise<void> => {
    return apiRequest<void>("/users/artist-application", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export const moderationApi = {
  getArtistApplications: async (): Promise<ArtistApplication[]> => {
    return apiRequest<ArtistApplication[]>("/moderation/artist-applications", { method: "GET" });
  },
  approveArtistApplication: async (userId: string): Promise<void> => {
    return apiRequest<void>(`/moderation/artist-applications/${userId}/approve`, { method: "POST" });
  },
  rejectArtistApplication: async (userId: string): Promise<void> => {
    return apiRequest<void>(`/moderation/artist-applications/${userId}/reject`, { method: "POST" });
  },
};

export interface Comment {
  id: string;
  artworkId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
}

