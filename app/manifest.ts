import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "الوجهة الضبابية - اكتشف معالم القصيم",
    short_name: "الوجهة الضبابية",
    description: "لعبة تفاعلية لاكتشاف المعالم السياحية والتراثية في منطقة القصيم",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16a34a",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["games", "education", "travel"],
    lang: "ar",
    dir: "rtl",
  }
}
