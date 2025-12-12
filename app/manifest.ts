// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BP Tracker",
    short_name: "bp-tracker",
    description: "track your blood pressure and keep your health good",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#eb0c0cff", // Your brand color
    orientation: "portrait-primary",
    // app/manifest.ts   ← ONLY CHANGE THESE LINES
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
