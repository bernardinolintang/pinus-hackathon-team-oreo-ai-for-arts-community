export interface Artist {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  specialty: string;
  bio: string;
  reputation: "established" | "rising" | "newcomer";
  followers: number;
  following: number;
  peerEndorsements: number;
  joinedDate: string;
  location: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
  };
  endorsements: Endorsement[];
  portfolio: PortfolioItem[];
  followerAvatars: string[];
}

export interface Endorsement {
  id: string;
  fromArtist: {
    name: string;
    avatar: string;
    reputation: "established" | "rising" | "newcomer";
  };
  message: string;
  date: string;
}

export interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  peerLikes: number;
  totalLikes: number;
  trustScore: "high" | "medium" | "emerging";
  keywords: string[];
}

export const artists: Artist[] = [
  {
    id: "elena-vance",
    name: "Elena Vance",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    coverImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200",
    specialty: "Contemporary Urban Landscapes",
    bio: "I explore the emotional resonance of urban spaces through a lens of solitude and contemplation. My work seeks to capture the quiet moments between the chaos of city life, revealing the poetry hidden in concrete and steel.",
    reputation: "established",
    followers: 2340,
    following: 156,
    peerEndorsements: 47,
    joinedDate: "March 2021",
    location: "New York, USA",
    website: "elenavance.art",
    socialLinks: {
      instagram: "elenavance",
      twitter: "elenavance_art",
    },
    endorsements: [
      {
        id: "e1",
        fromArtist: {
          name: "Marcus Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
          reputation: "rising",
        },
        message: "Elena's understanding of light in urban environments is unparalleled. Her work deeply influenced my own approach to abstraction.",
        date: "2 weeks ago",
      },
      {
        id: "e2",
        fromArtist: {
          name: "Sarah Williams",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
          reputation: "established",
        },
        message: "A true master of emotional storytelling through architectural forms. Every piece invites prolonged contemplation.",
        date: "1 month ago",
      },
      {
        id: "e3",
        fromArtist: {
          name: "Thomas Berg",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
          reputation: "established",
        },
        message: "Consistently innovative while remaining true to her artistic vision. A rare combination in contemporary art.",
        date: "2 months ago",
      },
    ],
    portfolio: [
      {
        id: "p1",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
        title: "Urban Solitude",
        peerLikes: 12,
        totalLikes: 234,
        trustScore: "high",
        keywords: ["urban", "solitude", "contemporary"],
      },
      {
        id: "p2",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
        title: "City Whispers",
        peerLikes: 9,
        totalLikes: 178,
        trustScore: "high",
        keywords: ["cityscape", "moody", "architecture"],
      },
      {
        id: "p3",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
        title: "Concrete Dreams",
        peerLikes: 15,
        totalLikes: 312,
        trustScore: "high",
        keywords: ["urban", "dreams", "night"],
      },
      {
        id: "p4",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
        title: "Morning Commute",
        peerLikes: 7,
        totalLikes: 145,
        trustScore: "medium",
        keywords: ["morning", "street", "urban"],
      },
    ],
    followerAvatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50",
    ],
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    coverImage: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200",
    specialty: "Light & Abstract Forms",
    bio: "My practice centers on the interplay between light and form. Through careful observation and patient experimentation, I seek to distill complex visual experiences into their essential geometric elements.",
    reputation: "rising",
    followers: 890,
    following: 234,
    peerEndorsements: 23,
    joinedDate: "August 2022",
    location: "San Francisco, USA",
    website: "marcuschen.studio",
    socialLinks: {
      instagram: "marcus.chen.art",
    },
    endorsements: [
      {
        id: "e1",
        fromArtist: {
          name: "Elena Vance",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
          reputation: "established",
        },
        message: "Marcus brings a fresh perspective to minimalism. His work with light is genuinely innovative.",
        date: "1 week ago",
      },
      {
        id: "e2",
        fromArtist: {
          name: "Lisa Park",
          avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
          reputation: "rising",
        },
        message: "A rising voice that deserves attention. His geometric sensibility is remarkable.",
        date: "3 weeks ago",
      },
    ],
    portfolio: [
      {
        id: "p1",
        image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800",
        title: "Morning Light Series III",
        peerLikes: 8,
        totalLikes: 156,
        trustScore: "medium",
        keywords: ["light", "abstract", "minimalism"],
      },
      {
        id: "p2",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        title: "Geometric Dawn",
        peerLikes: 6,
        totalLikes: 123,
        trustScore: "medium",
        keywords: ["geometric", "dawn", "abstract"],
      },
      {
        id: "p3",
        image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800",
        title: "Chromatic Study",
        peerLikes: 11,
        totalLikes: 198,
        trustScore: "high",
        keywords: ["color", "study", "abstract"],
      },
    ],
    followerAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50",
    ],
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    coverImage: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200",
    specialty: "Mixed Media & Memory",
    bio: "Drawing from my Japanese heritage, I create works that explore the fragile nature of memory and the beauty of impermanence. My mixed media approach allows me to layer meaning and texture in ways that reflect the complexity of human experience.",
    reputation: "newcomer",
    followers: 234,
    following: 89,
    peerEndorsements: 8,
    joinedDate: "January 2024",
    location: "Tokyo, Japan",
    socialLinks: {
      instagram: "yukitanaka_art",
    },
    endorsements: [
      {
        id: "e1",
        fromArtist: {
          name: "Elena Vance",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
          reputation: "established",
        },
        message: "A promising new voice. Yuki's work shows remarkable sensitivity and technical skill for someone so early in their career.",
        date: "2 weeks ago",
      },
    ],
    portfolio: [
      {
        id: "p1",
        image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
        title: "Fragments of Memory",
        peerLikes: 5,
        totalLikes: 89,
        trustScore: "emerging",
        keywords: ["memory", "japanese", "mixed media"],
      },
      {
        id: "p2",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
        title: "Wabi-Sabi Study",
        peerLikes: 3,
        totalLikes: 56,
        trustScore: "emerging",
        keywords: ["wabi-sabi", "texture", "cultural"],
      },
    ],
    followerAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
    ],
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    coverImage: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200",
    specialty: "Digital Naturalism",
    bio: "I bridge the gap between technology and nature, creating digital artworks that celebrate the organic world through a contemporary lens. My work questions our relationship with the natural environment in an increasingly digital age.",
    reputation: "established",
    followers: 3120,
    following: 178,
    peerEndorsements: 62,
    joinedDate: "November 2020",
    location: "London, UK",
    website: "sarahwilliams.art",
    socialLinks: {
      instagram: "sarah_williams_digital",
      twitter: "sarahwilliamsart",
    },
    endorsements: [
      {
        id: "e1",
        fromArtist: {
          name: "Elena Vance",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
          reputation: "established",
        },
        message: "Sarah's fusion of digital and natural aesthetics is truly groundbreaking. A visionary in the field.",
        date: "1 month ago",
      },
      {
        id: "e2",
        fromArtist: {
          name: "David Kim",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
          reputation: "established",
        },
        message: "Her technical mastery is matched only by her artistic vision. Essential viewing for any art enthusiast.",
        date: "2 months ago",
      },
      {
        id: "e3",
        fromArtist: {
          name: "Marcus Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
          reputation: "rising",
        },
        message: "A true pioneer in digital art. Her work has been a major influence on my own practice.",
        date: "3 months ago",
      },
    ],
    portfolio: [
      {
        id: "p1",
        image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800",
        title: "Digital Botanica",
        peerLikes: 15,
        totalLikes: 312,
        trustScore: "high",
        keywords: ["digital", "nature", "futurism"],
      },
      {
        id: "p2",
        image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800",
        title: "Cyber Flora",
        peerLikes: 18,
        totalLikes: 389,
        trustScore: "high",
        keywords: ["flora", "digital", "botanical"],
      },
      {
        id: "p3",
        image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800",
        title: "Neon Garden",
        peerLikes: 12,
        totalLikes: 267,
        trustScore: "high",
        keywords: ["neon", "garden", "digital"],
      },
      {
        id: "p4",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
        title: "Synthetic Nature",
        peerLikes: 9,
        totalLikes: 198,
        trustScore: "medium",
        keywords: ["synthetic", "nature", "abstract"],
      },
    ],
    followerAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50",
    ],
  },
];

export const getArtistById = (id: string): Artist | undefined => {
  return artists.find((artist) => artist.id === id);
};

export const getArtistByName = (name: string): Artist | undefined => {
  return artists.find((artist) => artist.name.toLowerCase() === name.toLowerCase());
};
