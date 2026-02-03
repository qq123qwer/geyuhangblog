import { createContentCollectionPlugin } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

const withContentCollections = createContentCollectionPlugin({
  configPath: "content-collections.conf.ts",
});

export default withContentCollections(nextConfig);
