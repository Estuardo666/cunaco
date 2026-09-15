import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Every icon on the cloned site ships as an <img src="*.svg">. The files are
    // downloaded into this repo's own public/ tree, so allowing SVG through the
    // image optimizer only affects first-party assets.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
