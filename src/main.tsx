import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
// Real, bundled literacy fonts (self-hosted, work offline). Andika is designed
// for beginning readers (distinct b/d/p/q, single-story a/g); OpenDyslexic is
// the dyslexia-friendly option behind the ParentScreen toggle.
import "@fontsource/andika/latin-400.css";
import "@fontsource/andika/latin-700.css";
import "@fontsource/opendyslexic/latin-400.css";
import "@fontsource/opendyslexic/latin-700.css";
import "./index.css";

// Auto-update the installed PWA in the background.
registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
