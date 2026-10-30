import type { NextConfig } from "next";
import path from "path";

// On custom domain (ummamotherhood.my.id), all assets are served from root "/"
const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
