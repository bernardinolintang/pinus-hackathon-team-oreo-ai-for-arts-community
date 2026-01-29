import type { ArtistProfileResponse } from "@/types/artist";
import { getArtistProfileMock } from "@/data/artistProfileMock";

const API_BASE = "/api";

export async function fetchArtistProfile(
  artistId: string,
  currentUserId?: string | null
): Promise<ArtistProfileResponse> {
  // In development or when no real API, use mock so artist profiles (e.g. Elena Vance) always load
  const useMockOnly = import.meta.env.DEV || !import.meta.env.VITE_API_URL;
  if (useMockOnly) {
    const mock = getArtistProfileMock(artistId, currentUserId);
    if (mock) return mock;
    throw new Error(`Artist not found: ${artistId}`);
  }

  const params = new URLSearchParams();
  if (currentUserId) params.set("currentUserId", currentUserId);
  const qs = params.toString();
  const url = `${API_BASE}/artists/${encodeURIComponent(artistId)}${qs ? `?${qs}` : ""}`;

  try {
    const res = await fetch(url);
    if (res.ok) return res.json() as Promise<ArtistProfileResponse>;
    const mock = getArtistProfileMock(artistId, currentUserId);
    if (mock) return mock;
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? `Failed to fetch artist: ${res.status}`);
  } catch (e) {
    const mock = getArtistProfileMock(artistId, currentUserId);
    if (mock) return mock;
    throw e;
  }
}
