import { useEffect } from "react";

/**
 * Sets document.title for the current page.
 * @param title - Page title (e.g. "Discover"). Result: "Discover – Atelier". Pass "" for SITE_TITLE.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} – Atelier` : "Atelier – Community-Driven Art Discovery";
  }, [title]);
}
