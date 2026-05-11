import type { NextConfig } from "next";
import path from "node:path";

const projectRoot = path.resolve(__dirname);
const nodeModules = path.join(projectRoot, "node_modules");

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  webpack(config) {
    config.resolve.modules = [nodeModules, "node_modules"];
    // Ignore the iCloud-synced duplicate subfolder
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [/node_modules/, /conflitti-infanzia\/conflitti-infanzia/],
    };
    return config;
  },
  // Exclude the nested duplicate from TypeScript page scanning
  pageExtensions: ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;
