/**
 * Trust signal generation for Artist Profile.
 * Produces human-readable, explainable insights based on the viewing user's
 * relationship to the artist and their network. Avoids opaque scores.
 */

/**
 * @param {object} ctx
 * @param {number} ctx.mutualFollowCount - Nr of users that current user follows who also follow this artist
 * @param {string[]} ctx.curatorNames - Names of curators (trusted recommenders) who follow this artist
 * @param {string} [ctx.topKeyword] - A style/keyword this artist is known for, appreciated by community
 * @param {number} [ctx.memberSinceYear] - Year the artist joined / became active
 * @param {string} [ctx.peerValidatedTitle] - Title of an artwork with strong peer validation (optional)
 * @returns {string[]} Human-readable trust signals
 */
function buildTrustSignals({
  mutualFollowCount,
  curatorNames,
  topKeyword,
  memberSinceYear,
  peerValidatedTitle,
}) {
  const signals = [];

  if (mutualFollowCount > 0) {
    signals.push(
      `You have ${mutualFollowCount} trusted peer${mutualFollowCount === 1 ? "" : "s"} who also follow this artist.`
    );
  }

  if (curatorNames.length > 0) {
    const names =
      curatorNames.length <= 2
        ? curatorNames.join(" and ")
        : `${curatorNames.slice(0, 2).join(", ")}, and ${curatorNames.length - 2} other${curatorNames.length > 3 ? "s" : ""}`;
    signals.push(
      `This artist is followed by several curators you admire, including ${names}.`
    );
  }

  if (topKeyword) {
    signals.push(
      `Their work in ${topKeyword} is highly appreciated by other artists in the community.`
    );
  }

  if (memberSinceYear) {
    signals.push(`A long-standing member, active since ${memberSinceYear}.`);
  }

  if (peerValidatedTitle) {
    signals.push(
      `Their piece "${peerValidatedTitle}" has strong peer validation from long-term community members.`
    );
  }

  return signals;
}

module.exports = { buildTrustSignals };
