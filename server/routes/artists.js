const express = require("express");
const { buildTrustSignals } = require("../lib/trustSignals");
const { getPool } = require("../db/pool");

const router = express.Router();

/**
 * GET /api/artists/:artistId
 * Query: currentUserId (optional)
 * Returns artist profile with trust signals and artworks, tailored to current user.
 */
router.get("/:artistId", async (req, res) => {
  const { artistId } = req.params;
  const currentUserId = req.query.currentUserId
    ? parseInt(req.query.currentUserId, 10)
    : null;
  const pool = getPool();
  if (!pool) {
    return res.status(503).json({ message: "Database unavailable" });
  }

  const client = await pool.connect();
  try {
    const isNumeric = /^\d+$/.test(artistId);
    const artistRow = isNumeric
      ? await client.query(
          "SELECT a.user_id AS id, u.username, u.bio, u.avatar_url, a.slug, a.is_verified, a.website_url, a.created_at FROM artists a JOIN users u ON u.id = a.user_id WHERE a.user_id = $1",
          [parseInt(artistId, 10)]
        )
      : await client.query(
          "SELECT a.user_id AS id, u.username, u.bio, u.avatar_url, a.slug, a.is_verified, a.website_url, a.created_at FROM artists a JOIN users u ON u.id = a.user_id WHERE a.slug = $1",
          [artistId]
        );

    if (!artistRow.rows.length) {
      return res.status(404).json({ message: "Artist not found" });
    }
    const artist = artistRow.rows[0];
    const aid = artist.id;

    const name = (artist.username || "")
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const [followerCount, artworkRows, followByCurrent, curatorRows, mutualRows, likesByPeers, memberYear, topKw] =
      await Promise.all([
        client.query(
          "SELECT COUNT(*)::int AS c FROM follows WHERE following_id = $1",
          [aid]
        ),
        client.query(
          "SELECT id, image_url AS thumbnail_url, title FROM artworks WHERE artist_id = $1 ORDER BY created_at DESC",
          [aid]
        ),
        currentUserId
          ? client.query(
              "SELECT 1 FROM follows WHERE follower_id = $1 AND following_id = $2",
              [currentUserId, aid]
            )
          : Promise.resolve({ rows: [] }),
        client.query(
          `SELECT u.username FROM curators c
           JOIN users u ON u.id = c.user_id
           JOIN follows f ON f.following_id = $1 AND f.follower_id = c.user_id`,
          [aid]
        ),
        currentUserId
          ? client.query(
              `SELECT COUNT(*)::int AS c FROM follows f1
               JOIN follows f2 ON f2.following_id = $1 AND f2.follower_id = f1.following_id
               WHERE f1.follower_id = $2`,
              [aid, currentUserId]
            )
          : Promise.resolve({ rows: [{ c: 0 }] }),
        currentUserId
          ? client.query(
              `SELECT DISTINCT aw.id, aw.title FROM likes l
               JOIN artworks aw ON aw.id = l.artwork_id AND aw.artist_id = $1
               JOIN follows f ON f.following_id = l.user_id AND f.follower_id = $2`,
              [aid, currentUserId]
            )
          : Promise.resolve({ rows: [] }),
        client.query(
          "SELECT EXTRACT(YEAR FROM created_at)::int AS y FROM artists WHERE user_id = $1",
          [aid]
        ),
        client.query(
          `SELECT k.name FROM artwork_keywords ak
           JOIN keywords k ON k.id = ak.keyword_id
           JOIN artworks aw ON aw.id = ak.artwork_id AND aw.artist_id = $1
           GROUP BY k.name ORDER BY COUNT(*) DESC LIMIT 1`,
          [aid]
        ),
      ]);

    const mutualCount = mutualRows.rows[0]?.c ?? 0;
    const curatorNames = (curatorRows.rows || []).map((r) =>
      (r.username || "")
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    );
    const peerLikedRows = likesByPeers.rows || [];
    const peerValidatedTitle = peerLikedRows[0]?.title || null;
    const year = memberYear.rows[0]?.y;
    const keyword = topKw.rows[0]?.name;

    const trustSignals = buildTrustSignals({
      mutualFollowCount: mutualCount,
      curatorNames,
      topKeyword: keyword || null,
      memberSinceYear: year || null,
      peerValidatedTitle: peerValidatedTitle || null,
    });

    const likedByPeerSet = new Set(peerLikedRows.map((r) => r.id));
    const artworks = (artworkRows.rows || []).map((r) => ({
      id: r.id,
      thumbnailUrl: r.thumbnail_url,
      title: r.title,
      socialIndicator: likedByPeerSet.has(r.id) ? "Liked by a peer" : null,
    }));

    let followerPreview = [];
    if (currentUserId) {
      const prev = await client.query(
        `SELECT u.id, u.username, u.avatar_url,
                EXISTS(SELECT 1 FROM follows f WHERE f.follower_id = $1 AND f.following_id = u.id) AS is_followed
         FROM follows f
         JOIN users u ON u.id = f.follower_id
         WHERE f.following_id = $2
         ORDER BY is_followed DESC, u.username
         LIMIT 10`,
        [currentUserId, aid]
      );
      followerPreview = (prev.rows || []).map((r) => ({
        id: r.id,
        name: (r.username || "")
          .split("_")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        avatarUrl: r.avatar_url || "",
        isFollowedByCurrentUser: !!r.is_followed,
      }));
    }

    const payload = {
      id: aid,
      name,
      avatarUrl: artist.avatar_url || "",
      isVerified: !!artist.is_verified,
      followerCount: followerCount.rows[0]?.c ?? 0,
      artworkCount: artworkRows.rows.length,
      isFollowedByCurrentUser: !!followByCurrent.rows.length,
      bio: artist.bio || "",
      websiteUrl: artist.website_url || undefined,
      trustSignals,
      artworks,
      followerPreview: followerPreview.length ? followerPreview : undefined,
    };

    res.json(payload);
  } catch (e) {
    console.error("GET /api/artists/:artistId", e);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
});

module.exports = router;
