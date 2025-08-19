/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // reactStrictMode:false,
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
    ],
  },
};

module.exports = nextConfig;
