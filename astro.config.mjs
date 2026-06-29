// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 本番ドメイン直下で公開（apex リポジトリ）。base は "/"。
export default defineConfig({
  site: 'https://epitaphinc.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
