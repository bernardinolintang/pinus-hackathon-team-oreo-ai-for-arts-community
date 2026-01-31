import { Suspense } from "react";
import { i18nReady } from "./i18n";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

function I18nFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" role="status" aria-live="polite">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" aria-hidden />
      <span className="sr-only">Loading</span>
    </div>
  );
}

i18nReady.then(() => {
  createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<I18nFallback />}>
      <App />
    </Suspense>
  );
});
