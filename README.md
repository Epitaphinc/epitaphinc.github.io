# epitaphinc.github.io

株式会社Epitaph コーポレートサイト（apex: https://epitaphinc.com）。

- **技術**: [Astro](https://astro.build/)（静的出力）
- **公開**: GitHub Actions → GitHub Pages（独自ドメイン `epitaphinc.com`）
- **旧サイト**: `Epitaphinc/corporate`（`/corporate/`）はルートへ統合・リダイレクト

## 開発

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に静的出力
npm run preview  # ビルド結果をローカル確認
```

## 構成

```
src/
  consts.ts            サイト共通データ（会社情報・ナビ・Expertise）
  layouts/Base.astro   共通レイアウト（SEO/OGP/JSON-LD/世界観演出）
  components/           Nav / Footer / Gallery / Lightbox
  pages/               index / about / expertise / work / contact
public/                CNAME・favicon・robots.txt・画像
```

## コンテンツ更新

会社情報・Expertise は `src/consts.ts` を編集すれば全ページに反映されます。
