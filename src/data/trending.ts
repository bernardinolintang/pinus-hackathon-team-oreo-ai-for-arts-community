export type Timeframe = "today" | "week" | "month";

export interface TrendingArtwork {
  id: string;
  timeframe: Timeframe;
  image: string;
  title: string;
  artistName: string;
  artistAvatar: string;
  endorsementReason: string;
  peersCount: number;
  heartsCount: number;
  trustLevel: "High Trust" | "Medium Trust";
  changePercent: number;
}

export interface TrendingArtist {
  id: string;
  timeframe: Timeframe;
  name: string;
  avatar: string;
  specialty: string;
  trendReason: string;
  followersCount: number;
  endorsementsCount: number;
}

export interface TrendingKeyword {
  id: string;
  timeframe: Timeframe;
  keyword: string;
  artworkCount: number;
  changePercent: number;
}

export const trendingArtworks: TrendingArtwork[] = [
  {
    id: "tw-1",
    timeframe: "week",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600",
    title: "Morning Light Through Glass",
    artistName: "Elena Voss",
    artistAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    endorsementReason: "Endorsed by 12 established artists this week",
    peersCount: 127,
    heartsCount: 342,
    trustLevel: "High Trust",
    changePercent: 156,
  },
  {
    id: "tw-2",
    timeframe: "week",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600",
    title: "Urban Geometry #7",
    artistName: "Marcus Chen",
    artistAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    endorsementReason: "Featured in 3 peer-curated collections",
    peersCount: 98,
    heartsCount: 287,
    trustLevel: "High Trust",
    changePercent: 89,
  },
  {
    id: "tw-3",
    timeframe: "week",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600",
    title: "Solitude in Blue",
    artistName: "Sofia Laurent",
    artistAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    endorsementReason: "Strong engagement from your trusted network",
    peersCount: 156,
    heartsCount: 412,
    trustLevel: "High Trust",
    changePercent: 234,
  },
  {
    id: "tw-4",
    timeframe: "week",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600",
    title: "Forest Meditation",
    artistName: "James Okonkwo",
    artistAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    endorsementReason: "Rising appreciation from nature art community",
    peersCount: 73,
    heartsCount: 198,
    trustLevel: "Medium Trust",
    changePercent: 67,
  },
  {
    id: "tw-5",
    timeframe: "week",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f2d1?w=600",
    title: "Digital Dreams",
    artistName: "Kai Nakamura",
    artistAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    endorsementReason: "Breakthrough piece from emerging digital artist",
    peersCount: 89,
    heartsCount: 256,
    trustLevel: "Medium Trust",
    changePercent: 112,
  },
  {
    id: "tw-6",
    timeframe: "week",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",
    title: "Portrait Study #23",
    artistName: "Anna Petrov",
    artistAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    endorsementReason: "Praised for technical mastery by portrait specialists",
    peersCount: 112,
    heartsCount: 289,
    trustLevel: "High Trust",
    changePercent: 95,
  },
  // Sample items for "today" and "month" timeframes
  {
    id: "td-1",
    timeframe: "today",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600",
    title: "Morning Light Through Glass",
    artistName: "Elena Voss",
    artistAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    endorsementReason: "Endorsed by 12 established artists this week",
    peersCount: 127,
    heartsCount: 342,
    trustLevel: "High Trust",
    changePercent: 156,
  },
  {
    id: "tm-1",
    timeframe: "month",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600",
    title: "Solitude in Blue",
    artistName: "Sofia Laurent",
    artistAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    endorsementReason: "Strong engagement from your trusted network",
    peersCount: 156,
    heartsCount: 412,
    trustLevel: "High Trust",
    changePercent: 234,
  },
];

export const trendingArtists: TrendingArtist[] = [
  {
    id: "ta-1",
    timeframe: "week",
    name: "Elena Voss",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    specialty: "Landscape & Light",
    trendReason: "Top trending artist this week with 3 endorsed works",
    followersCount: 3420,
    endorsementsCount: 89,
  },
  {
    id: "ta-2",
    timeframe: "week",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    specialty: "Urban & Abstract",
    trendReason: "Featured in 5 peer-curated collections",
    followersCount: 2891,
    endorsementsCount: 76,
  },
  {
    id: "ta-3",
    timeframe: "week",
    name: "Sofia Laurent",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    specialty: "Abstract Expressionism",
    trendReason: "Strong engagement from verified community",
    followersCount: 2156,
    endorsementsCount: 124,
  },
  {
    id: "ta-4",
    timeframe: "today",
    name: "Elena Voss",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    specialty: "Landscape & Light",
    trendReason: "Top trending artist today",
    followersCount: 3420,
    endorsementsCount: 89,
  },
  {
    id: "ta-5",
    timeframe: "month",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    specialty: "Urban & Abstract",
    trendReason: "Featured in 5 peer-curated collections this month",
    followersCount: 2891,
    endorsementsCount: 76,
  },
];

export const trendingKeywords: TrendingKeyword[] = [
  { id: "tk-1", timeframe: "week", keyword: "abstract", artworkCount: 124, changePercent: 45 },
  { id: "tk-2", timeframe: "week", keyword: "nature", artworkCount: 98, changePercent: 62 },
  { id: "tk-3", timeframe: "week", keyword: "digital", artworkCount: 87, changePercent: 89 },
  { id: "tk-4", timeframe: "week", keyword: "portrait", artworkCount: 76, changePercent: 34 },
  { id: "tk-5", timeframe: "week", keyword: "minimal", artworkCount: 65, changePercent: 56 },
  { id: "tk-6", timeframe: "week", keyword: "urban", artworkCount: 54, changePercent: 41 },
  { id: "tk-7", timeframe: "today", keyword: "abstract", artworkCount: 45, changePercent: 120 },
  { id: "tk-8", timeframe: "month", keyword: "digital", artworkCount: 156, changePercent: 78 },
];
