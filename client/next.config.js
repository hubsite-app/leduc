/**
 * @type {import('next').NextConfig}
 */

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = withPWA({
  dest: "public",
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

module.exports = nextConfig;
