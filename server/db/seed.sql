-- Seed data for Artist Profile API (matches mock artists)

INSERT INTO users (id, username, email, bio, avatar_url, created_at) VALUES
  (1, 'elena_vance', 'elena@example.com', 'I explore the emotional resonance of urban spaces through a lens of solitude and contemplation. My work seeks to capture the quiet moments between the chaos of city life, revealing the poetry hidden in concrete and steel.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', '2021-03-01'),
  (2, 'marcus_chen', 'marcus@example.com', 'My practice centers on the interplay between light and form. Through careful observation and patient experimentation, I seek to distill complex visual experiences into their essential geometric elements.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', '2022-08-01'),
  (3, 'yuki_tanaka', 'yuki@example.com', 'Drawing from my Japanese heritage, I create works that explore the fragile nature of memory and the beauty of impermanence. My mixed media approach allows me to layer meaning and texture in ways that reflect the complexity of human experience.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', '2024-01-01'),
  (4, 'sarah_williams', 'sarah@example.com', 'I bridge the gap between technology and nature, creating digital artworks that celebrate the organic world through a contemporary lens. My work questions our relationship with the natural environment in an increasingly digital age.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', '2020-11-01')
ON CONFLICT (id) DO NOTHING;

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

INSERT INTO artists (user_id, slug, is_verified, website_url) VALUES
  (1, 'elena-vance', true, 'https://elenavance.art'),
  (2, 'marcus-chen', true, 'https://marcuschen.studio'),
  (3, 'yuki-tanaka', true, NULL),
  (4, 'sarah-williams', true, 'https://sarahwilliams.art')
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO artworks (id, artist_id, title, description, image_url, created_at) VALUES
  (101, 1, 'Urban Solitude', 'Urban landscape', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800', NOW()),
  (102, 1, 'City Whispers', 'Cityscape', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800', NOW()),
  (103, 1, 'Concrete Dreams', 'Urban night', 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', NOW()),
  (104, 1, 'Morning Commute', 'Street scene', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', NOW()),
  (201, 2, 'Morning Light Series III', 'Light abstract', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', NOW()),
  (202, 2, 'Geometric Dawn', 'Geometric abstract', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', NOW()),
  (203, 2, 'Chromatic Study', 'Color study', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800', NOW()),
  (301, 3, 'Fragments of Memory', 'Memory work', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800', NOW()),
  (302, 3, 'Wabi-Sabi Study', 'Wabi-sabi', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', NOW()),
  (401, 4, 'Digital Botanica', 'Digital nature', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800', NOW()),
  (402, 4, 'Cyber Flora', 'Flora digital', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800', NOW()),
  (403, 4, 'Neon Garden', 'Neon garden', 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800', NOW()),
  (404, 4, 'Synthetic Nature', 'Synthetic', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800', NOW())
ON CONFLICT (id) DO NOTHING;

SELECT setval('artworks_id_seq', (SELECT MAX(id) FROM artworks));

-- Follows: current user 5 follows artists 1,2; artists follow each other
INSERT INTO follows (follower_id, following_id) VALUES
  (5, 1), (5, 2), (1, 2), (1, 4), (2, 1), (2, 4), (3, 1), (4, 1), (4, 2)
ON CONFLICT DO NOTHING;

-- Likes: user 5 liked 101, 102 (peer validation)
INSERT INTO likes (user_id, artwork_id) VALUES
  (5, 101), (5, 102), (1, 201), (2, 101), (2, 102), (4, 101), (4, 102), (4, 103)
ON CONFLICT DO NOTHING;

-- Keywords
INSERT INTO keywords (id, name) VALUES (1, 'urban'), (2, 'abstract'), (3, 'digital'), (4, 'nature'), (5, 'minimalism'), (6, 'memory'), (7, 'contemporary')
ON CONFLICT (id) DO NOTHING;

INSERT INTO artwork_keywords (artwork_id, keyword_id) VALUES
  (101, 1), (101, 7), (102, 1), (103, 1), (104, 1),
  (201, 2), (201, 5), (202, 2), (203, 2),
  (301, 6), (302, 6),
  (401, 3), (401, 4), (402, 3), (402, 4), (403, 3), (404, 3), (404, 4)
ON CONFLICT DO NOTHING;

-- Curators: users 1, 4 as trusted curators
INSERT INTO curators (user_id) VALUES (1), (4) ON CONFLICT DO NOTHING;

-- Extra user for "current user" (id 5)
INSERT INTO users (id, username, email, bio, avatar_url, created_at) VALUES
  (5, 'current_user', 'current@example.com', NULL, NULL, NOW())
ON CONFLICT (id) DO NOTHING;
