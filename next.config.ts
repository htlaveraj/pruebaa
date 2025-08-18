// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 esto activa la exportación estática
  images: {
    unoptimized: true, // 👈 necesario para que next/image no truene al exportar
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
