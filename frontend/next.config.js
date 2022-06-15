/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 개발 모드
  trailingSlash: true,
  images: {
    // loader: "akamai",
    // path: "/",
    domains: ["imagedelivery.net", "videodelivery.net"], // next/image
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
