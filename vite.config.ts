// vite.config.ts (または .js)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/memo1-app/", // ここにリポジトリ名を追加！
  // または本番環境でのみ適用するなら
  // base: process.env.NODE_ENV === 'production' ? '/memo1-app/' : '/',
});
