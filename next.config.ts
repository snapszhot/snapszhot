const path = require("path");
import { withSentryConfig } from "@sentry/nextjs";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ["images.prismic.io", "i.imgur.com"],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default withSentryConfig(nextConfig, {
  org: "example-org",
  project: "example-project",
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
});
