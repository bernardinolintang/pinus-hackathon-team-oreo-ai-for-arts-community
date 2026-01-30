/**
 * Centralized user-facing error messages.
 * Use in catch blocks so users see consistent, friendly messages and we can add retry where it matters.
 */

const FALLBACK_MESSAGES: Record<string, string> = {
  default: "Something went wrong. Please try again.",
  network: "Unable to connect. Please check your connection and try again.",
  forbidden: "You don't have permission to do that.",
  notFound: "We couldn't find what you're looking for.",
  login: "Invalid email or password.",
  signup: "We couldn't create your account. Please try again.",
  favorites: "Failed to load your favorites. Please try again.",
  artworks: "Failed to load artworks. Please try again.",
  moderation: "Failed to load artist applications. Please try again.",
  comments: "Failed to load comments.",
  post: "Failed to post artwork. Please try again.",
  approve: "Failed to approve. Please try again.",
  reject: "Failed to reject. Please try again.",
};

/**
 * Get a user-friendly message from an unknown error.
 * Prefers Error.message; falls back to generic messages for network/HTTP-like errors.
 */
export function getUserMessage(error: unknown, context: keyof typeof FALLBACK_MESSAGES = "default"): string {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("fetch") || msg.includes("network") || msg.includes("failed to fetch"))
      return FALLBACK_MESSAGES.network;
    if (msg.includes("forbidden") || msg.includes("403")) return FALLBACK_MESSAGES.forbidden;
    if (msg.includes("not found") || msg.includes("404")) return FALLBACK_MESSAGES.notFound;
    if (msg.includes("invalid email") || msg.includes("password")) return FALLBACK_MESSAGES.login;
    return error.message;
  }
  return FALLBACK_MESSAGES[context] ?? FALLBACK_MESSAGES.default;
}
