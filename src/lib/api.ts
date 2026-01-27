// Lovable Cloud API service
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.lovable.dev";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
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

const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
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
    removeAuthToken();
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
};

