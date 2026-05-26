import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",
  resolve: {
    alias: {
      "next/link": path.resolve(__dirname, "./src/mock-next-link.tsx"),
      "next/image": path.resolve(__dirname, "./src/mock-next-link.tsx"),
      "@abd/styles": path.resolve(__dirname, "../../ABDStyles"),
    },
  },
});
