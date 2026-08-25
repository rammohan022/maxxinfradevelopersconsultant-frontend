/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3003",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.peopleconsulting.co",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.peopleconsulting.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "apipeopleconsulting.webexbytes.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.equityandlegalsolutions.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
