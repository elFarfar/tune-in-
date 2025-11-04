import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icons/favicon.ico",
        "icons/apple-touch-icon.png",
        "icons/android-chrome-192x192.png",
        "icons/android-chrome-512x512.png",
        "icons/favicon-32x32.png",
        "icons/favicon-16x16.png",
      ],
      manifest: {
        name: "Tune-In",
        short_name: "TuneIn",
        description: "A platform for artists, producers, and A&Rs to share snippets.",
        theme_color: "#1a1a1a",
        background_color: "#1a1a1a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/icons/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document" || request.destination === "script",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-js-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image" || request.destination === "style",
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
            },
          },
        ],
      },
    }),
  ],
});
