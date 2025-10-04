/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/30051417",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform.theverge.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "techcrunch.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.digitaltrends.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.mos.cms.futurecdn.net",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      {
        source: "/coverage",
        destination: "/coverage/lcov-report/index.html",
        permanent: true,
      },
    ];
  },
};

const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);
