/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Run as a standalone Node.js server on Render — disables static/edge
  // pre-rendering entirely so every request hits the server fresh.
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
  // Prevent Cloudflare and other CDNs from caching HTML pages.
  // Static assets (_next/static/**) are intentionally excluded so they
  // can still be cached at the edge — only HTML responses are uncacheable.
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|favicon\\.ico).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "CDN-Cache-Control",
            value: "no-store",
          },
          {
            key: "Surrogate-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
