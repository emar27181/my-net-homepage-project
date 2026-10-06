// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nodoame-portfolio.netlify.app',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    build: {
      // フォントは unicode-range で必要な分だけ読む前提なので、CSS に埋め込まず別ファイルにする
      // （埋め込むと全員が未使用フォントまで CSS ごと読み込む。実測 76KB → 391KB）
      assetsInlineLimit: (file) => (file.endsWith('.woff2') ? false : undefined),
    },
  },
  build: {
    assets: 'assets'
  }
});