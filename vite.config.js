import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  name: "VueUploader",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "vue-uploader",
      fileName: (format) => `vue-uploader.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "vue",
        },
      },
    },
  },
  plugins: [vue()],
});
