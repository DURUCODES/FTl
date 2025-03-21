import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.JPG", "**/*.jpg"], // Add image extensions to the assetsInclude
});
