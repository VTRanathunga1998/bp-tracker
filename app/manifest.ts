// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SmartBP",
    short_name: "SmartBP",
    description: "track your blood pressure and keep your health good",
    start_url: "/",
    display: "standalone",
    background_color: "#5fe0f0ff",
    theme_color: "#5fe0f0ff",
    orientation: "portrait-primary",
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
