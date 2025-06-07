import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const REPO_NAME = "/memo1-app/";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: REPO_NAME,
});
