/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  swcMinify: true,
  poweredByHeader: false,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.lacagnottedesproches.fr",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dev.lacagnottedesproches.fr",
        port: "",
      },
      {
        protocol: "https",
        hostname: "o-ciel.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
