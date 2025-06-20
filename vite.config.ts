import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercelProduction =
    process.env.VERCEL_ENV === 'production' || process.env.VERCEL_URL;

  let base = '/'; // デフォルトはルート

  if (command === 'serve') {
    // ローカル開発サーバーの場合
    base = '/memo1-app/';
  } else if (isVercelProduction) {
    // Vercelの本番デプロイの場合
    base = '/';
  } else if (isProduction) {
    // その他の本番ビルド
    // base = '/memo1-app/';
  }

  console.log(`Vite base path set to: ${base}`); // デバッグ用に表示

  return {
    plugins: [react()],
    base: base,
    build: {
      // 必要に応じて設定を調整
    },
  };
});
