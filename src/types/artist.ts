/** API types for Artist Profile Page (GET /api/artists/:artistId) */

export interface ArtistProfileArtwork {
  id: number;
  thumbnailUrl: string;
  title?: string;
  socialIndicator: string | null;
}

export interface ArtistProfileResponse {
  id: number;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  followerCount: number;
  artworkCount: number;
  isFollowedByCurrentUser: boolean;
  bio: string;
  websiteUrl?: string;
  socialLinks?: { platform: string; url: string }[];
  trustSignals: string[];
  artworks: ArtistProfileArtwork[];
  /** Optional: followers to show in popover (prioritise users current user also follows). id used for /artists/:id links. */
  followerPreview?: { id: number | string; name: string; avatarUrl: string; isFollowedByCurrentUser?: boolean }[];
}
