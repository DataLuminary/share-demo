import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["PUBLIC_"] });

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "DataLuminary Embed Demo",
    favicon: "./public/favicon.svg",
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  source: {
    entry: {
      index: "./src/index.tsx",
    },
    define: {
      ...publicVars,
      "process.env.PUBLIC_APP_ORIGIN": JSON.stringify(
        process.env.PUBLIC_APP_ORIGIN || "https://app.dataluminary.dev",
      ),
      "process.env.PUBLIC_SHARE_UID": JSON.stringify(process.env.PUBLIC_SHARE_UID || ""),
      "process.env.PUBLIC_SHARE_TOKEN": JSON.stringify(process.env.PUBLIC_SHARE_TOKEN || ""),
      "process.env.PUBLIC_PROXY": JSON.stringify(process.env.PUBLIC_PROXY || ""),
      "process.env.PUBLIC_SDK_CDN_URL": JSON.stringify(process.env.PUBLIC_SDK_CDN_URL || ""),
    },
  },
  output: {
    assetPrefix: "/",
    distPath: {
      root: "dist",
    },
  },
  server: {
    port: 13033,
  },
});
