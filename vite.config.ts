import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteComponents, { NaiveUiResolver } from "vite-plugin-components";
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [NaiveUiResolver()]
      // globalComponentsDeclaration: true,
    })
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  }
});
