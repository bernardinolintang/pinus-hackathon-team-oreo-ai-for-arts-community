import type { ArtistProfileResponse } from "@/types/artist";
import { artists } from "./artists";

const slugToNumeric: Record<string, number> = {
  "elena-vance": 1,
  "marcus-chen": 2,
  "yuki-tanaka": 3,
  "sarah-williams": 4,
};

export function getArtistProfileMock(
  artistId: string,
  _currentUserId?: string | null
): ArtistProfileResponse | null {
  const slug = artistId.trim().toLowerCase().replace(/\s+/g, "-");
  const a = artists.find((x) => x.id === artistId || x.id === slug || x.id.toLowerCase() === slug);
  if (!a) return null;
  const numericId = slugToNumeric[a.id] ?? 0;
  const peerFollowCount = 4;
  const curatorNames = ["Sarah Williams", "Marcus Chen"];
  const styleKeyword = a.specialty.split(/[&,]/)[0]?.trim() ?? "contemporary";
  const year = a.joinedDate.includes("2021")
    ? "2021"
    : a.joinedDate.includes("2022")
      ? "2022"
      : a.joinedDate.includes("2024")
        ? "2024"
        : "2020";

  const trustSignals: string[] = [
    `You have ${peerFollowCount} trusted peers who also follow this artist.`,
    `This artist is followed by several curators you admire, including ${curatorNames.join(" and ")}.`,
    `Their work in ${styleKeyword} is highly appreciated by other artists in the community.`,
    `A long-standing member, active since ${year}.`,
  ];

  const artworks = a.portfolio.map((p, i) => ({
    id: numericId * 100 + i + 1,
    thumbnailUrl: p.image,
    title: p.title,
    socialIndicator: p.peerLikes > 0 ? "Liked by a peer" : null,
  }));

  const otherArtists = artists.filter((x) => x.id !== a.id);
  const followerPreview = a.followerAvatars.slice(0, 5).map((url, i) => {
    const o = otherArtists[i];
    return {
      id: (o?.id ?? `f-${i}`) as string,
      name: o?.name ?? ["Alex Cole", "Jordan Lee", "Sam Kim", "Riley Park", "Morgan Blake"][i] ?? "Follower",
      avatarUrl: url,
      isFollowedByCurrentUser: i < 2,
    };
  });

  return {
    id: numericId,
    name: a.name,
    avatarUrl: a.avatar,
    isVerified: true,
    followerCount: a.followers,
    artworkCount: a.portfolio.length,
    isFollowedByCurrentUser: false,
    bio: a.bio,
    websiteUrl: a.website,
    socialLinks: a.socialLinks
      ? [
          ...(a.socialLinks.instagram
            ? [{ platform: "instagram" as const, url: `https://instagram.com/${a.socialLinks.instagram}` }]
            : []),
          ...(a.socialLinks.twitter
            ? [{ platform: "twitter" as const, url: `https://twitter.com/${a.socialLinks.twitter}` }]
            : []),
        ]
      : undefined,
    trustSignals,
    artworks,
    followerPreview,
  };
}
