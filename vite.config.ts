import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  // VERCEL_URL または VITE_VERCEL_ENV など、Vercelが提供する環境変数を参照
  // あるいは、特定の環境変数（例: VITE_APP_BASE_PATH）を設定して制御
  const isVercelProduction =
    process.env.VERCEL_ENV === 'production' || process.env.VERCEL_URL;

  let base = '/'; // デフォルトはルート

  if (command === 'serve') {
    // ローカル開発サーバーの場合 (npm run dev)
    // ローカルでは '/memo1-app/' をベースとする
    base = '/memo1-app/';
  } else if (isVercelProduction) {
    // Vercelの本番デプロイの場合
    // ルートをベースとする
    base = '/';
  } else if (isProduction) {
    // その他の本番ビルド（Vercel以外など）でサブディレクトリを使いたい場合
    // base = '/memo1-app/';
  }

  console.log(`Vite base path set to: ${base}`); // デバッグ用に表示

  return {
    plugins: [react()],
    base: base,
    build: {
      // 適切なパスでビルドされるように、必要であれば設定を調整
      // 例: outDir: 'dist',
    },
  };
});
