import { defineConfig } from "vite";
import { resolve } from "node:path";
const locales = [
  "de",
  "es",
  "fr",
  "he",
  "hi",
  "id",
  "it",
  "ja",
  "ko",
  "pt",
  "tr",
  "zh",
];
export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries([
        ["index", resolve("index.html")],
        ...locales.map((x) => [x, resolve(x + "/index.html")]),
      ]),
    },
  },
});
