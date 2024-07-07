/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bin.bnbstatic.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
