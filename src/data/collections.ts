export interface CollectionCurator {
  name: string;
  avatar: string;
  verified?: boolean;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  theme: string;
  mood: string;
  coverImage: string;
  artworkCount: number;
  followersCount: number;
  peerEndorsements: number;
  createdAt: string;
  curator: CollectionCurator;
}

export const themes = [
  "Digital",
  "Nature",
  "Abstract",
  "Urban",
  "Portrait",
  "Minimal",
];

export const moods = [
  "Innovative",
  "Contemplative",
  "Bold",
  "Dreamy",
  "Introspective",
  "Serene",
];

export const collections: Collection[] = [
  {
    id: "digital-frontiers",
    title: "Digital Frontiers",
    description: "Where technology meets creativity. A journey through digital art that pushes boundaries.",
    theme: "Digital",
    mood: "Innovative",
    coverImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f2d1?w=800",
    artworkCount: 35,
    followersCount: 2891,
    peerEndorsements: 89,
    createdAt: "2025-01-15",
    curator: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      verified: true,
    },
  },
  {
    id: "whispers-of-nature",
    title: "Whispers of Nature",
    description: "Organic forms and natural beauty. Art that speaks to the soul of the wilderness.",
    theme: "Nature",
    mood: "Contemplative",
    coverImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
    artworkCount: 31,
    followersCount: 2156,
    peerEndorsements: 124,
    createdAt: "2025-01-10",
    curator: {
      name: "Maya Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      verified: true,
    },
  },
  {
    id: "abstract-horizons",
    title: "Abstract Horizons",
    description: "Bold shapes and vibrant colors. Abstract art that challenges perception.",
    theme: "Abstract",
    mood: "Bold",
    coverImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    artworkCount: 27,
    followersCount: 3420,
    peerEndorsements: 156,
    createdAt: "2025-01-08",
    curator: {
      name: "Jordan Blake",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      verified: true,
    },
  },
  {
    id: "urban-dreams",
    title: "Urban Dreams",
    description: "Cityscapes and street life. The poetry of concrete and neon.",
    theme: "Urban",
    mood: "Dreamy",
    coverImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800",
    artworkCount: 42,
    followersCount: 1890,
    peerEndorsements: 67,
    createdAt: "2025-01-12",
    curator: {
      name: "Sam Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      verified: true,
    },
  },
  {
    id: "human-condition",
    title: "The Human Condition",
    description: "Portraits and figures that explore identity, emotion, and connection.",
    theme: "Portrait",
    mood: "Introspective",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    artworkCount: 28,
    followersCount: 2567,
    peerEndorsements: 98,
    createdAt: "2025-01-05",
    curator: {
      name: "Elena Vance",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      verified: true,
    },
  },
  {
    id: "quiet-moments",
    title: "Quiet Moments",
    description: "Minimal and meditative. Art that finds beauty in stillness.",
    theme: "Minimal",
    mood: "Serene",
    coverImage: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800",
    artworkCount: 24,
    followersCount: 1789,
    peerEndorsements: 112,
    createdAt: "2025-01-18",
    curator: {
      name: "Noah Wells",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      verified: true,
    },
  },
];
