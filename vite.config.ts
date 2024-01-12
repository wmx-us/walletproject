import { defineConfig, loadEnv } from 'vite'
import legacy from "@vitejs/plugin-legacy";
import react from '@vitejs/plugin-react'
import reactRefresh from "@vitejs/plugin-react-refresh";
import * as path from "path";
import type { ConfigEnv } from "vite";
import { proxyApi, apiAddress } from "./src/config";
import postcssPresetEnv from "postcss-preset-env";
import { reactScopedCssPlugin } from "rollup-plugin-react-scoped-css";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), "env"), "PROJECT_");
  return {
    envDir: "env",
    envPrefix: "PROJECT_",
    server: {
      port: 8080,
      host: '0.0.0.0',
      proxy: {
        [proxyApi]: {
          target: env.PROJECT_ENV_PREFIX,
          changeOrigin: true,
          cookieDomainRewrite: "",
          secure: false,
          rewrite: (p) => p.replace(/^\/insland/, "/insland"),
        }
      }
    },
    base: env.PROJECT_ || "/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    },
    css: {
      postcss: {
        plugins: [
          postcssPresetEnv({
            stage: 3, // Set the stage value based on your requirements
            autoprefixer: { grid: true },
          }),
        ],
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "[hash].[ext]",
          chunkFileNames: "[hash].js",
          entryFileNames: "[hash].js",
          compact: true,
        },
      },
    },
    plugins: [
      react(),
      reactRefresh(),
      reactScopedCssPlugin(),
      legacy({
        targets: ["defaults", "chrome > 79", "iOS >= 10", "Android >= 8"],
        modernPolyfills: ["es.global-this"],
      }),
    ],
  }
})
