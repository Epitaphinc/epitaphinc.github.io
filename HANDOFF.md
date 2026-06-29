# HANDOFF — 株式会社Epitaph コーポレートサイト リニューアル

最終更新: 2026-06-29 / 作業者: Claude Code（コンテキストクリア・別アカウント移行前の引き継ぎ）

---

## 1. このプロジェクトは何か

旧コーポレートサイト（`epitaphinc.com/corporate/` ＝ 単一HTML）を、**世界観を継承したまま複数ページ化し、ドメイン直下 `epitaphinc.com` に統合**するリニューアル。

### ヒアリングで確定した方針
- **最重要ゴール**: 信頼・ブランドの確立
- **ターゲット**: 中小企業の経営者・事業責任者／協業・提携パートナー
- **デザイン**: 今のダーク×ミニマル（漆黒 #050505・縁取りヒーロー・カスタムカーソル・ノイズ・グレースケール→ホバーでカラー）を**継承し洗練**
- **技術**: Astro（静的出力）＋ GitHub Actions → GitHub Pages
- **ルート構成**: **apex リポ `Epitaphinc/epitaphinc.github.io` に本体を構築**し `epitaphinc.com/` 直下で公開。旧 `/corporate/` はルートへリダイレクトして集約。

### なぜルート統合が必要だったか
`epitaphinc.com`（ルート）は `Epitaphinc/epitaphinc.github.io`（`CNAME`+`README.md` のみ・index.html 不在）が配信元で、**Pages が README を Jekyll 描画した「親リポジトリ」の仮ページ**が表示されていた（Pages status=errored）。本体は別リポ `/corporate/` にあった。これを apex に一本化して解消する。

---

## 2. 作業ディレクトリ

- **本体（apex・これが正）**: `~/Documents/epitaphinc.github.io/` ← `Epitaphinc/epitaphinc.github.io`
- **旧サイト（リダイレクト化）**: `~/Documents/corporate/` ← `Epitaphinc/corporate`（デザイン資産の元でもある）
- **プラン**: `~/.claude/plans/https-epitaphinc-com-corporate-web-https-jolly-catmull.md`

---

## 3. 完了済み（ローカルのみ・未 push）

apex リポに Astro サイト一式を新規構築し、ローカルでビルド＆全ページ検証済み。

```
src/
  consts.ts            会社情報・ナビ・Expertise(8領域・旧サイトの詳細文を流用)・FORMSPREE_ID
  styles/global.css    世界観CSS継承＋多ページ用拡張(nav/page-head/prose/card/timeline/form/cta)
  layouts/Base.astro   共通<head>・SEO/OGP/Twitter・JSON-LD(Organization)・canonical・フォント
  components/
    Atmosphere.astro   ノイズ＋カスタムカーソル＋ホバー拡大(script, pointer:fine時のみ)
    Nav.astro          固定ナビ(mix-blend-difference)・現在地 aria-current
    Footer.astro       ブランド/リンク/コピーライト
    Gallery.astro      2列グレースケール→カラー・data-lightbox 連携
    Lightbox.astro     画像拡大モーダル＋window.openLightbox＋data属性クリック束ね
  pages/
    index.astro        Home: Hero / Statement / Expertise抜粋 / Selected Works / CTA
    about.astro        About: Mission/Values/Message(※草案)/History/Company
    expertise.astro    8領域を画像＋詳細文で交互レイアウト
    work.astro         Flagship=データ化.com(実在・自社) / Fields of Work / 守秘注記 / CTA
    contact.astro      フォーム(Formspree→未設定時はmailtoフォールバック・honeypot)＋直接連絡先
public/                CNAME(epitaphinc.com)・favicon.ico・robots.txt・image/(project1-8.jpg,ogp.jpg)
astro.config.mjs       site=https://epitaphinc.com / trailingSlash:always / sitemap integration
.github/workflows/deploy.yml   push(main)→withastro/action→actions/deploy-pages
.gitignore / package.json / package-lock.json / README.md
```

### 検証結果（`npm run build` ＋ dev プレビュー）
- ビルド成功・5ページ＋`sitemap-index.xml`/`sitemap-0.xml`＋`CNAME` が `dist/` に出力。
- 全ページ status 200・`<title>`正・JSON-LD あり・canonical は apex ルートURL。
- Home: Hero "VISION MEETS REALITY"(128px)・ナビ4・Expertise 8・ギャラリー8、**横スクロール無し**(docW=bodyScrollW=1265)。
- expertise: exp-block ×8 / work: flagship ×1 / contact: form field ×5。
- コンソールエラー 0。
- ※プレビューのスクリーンショットは実ウィンドウが狭く左上寄りに写るツール都合の癖あり。レイアウト判定は DOM 計測で実施済み（正常）。

### git 状態（両リポとも未コミット）
- apex: README変更＋ src/public/.github/設定ファイル一式が untracked（`.claude/` は gitignore 済）。
- corporate: `index.html` をルート転送ページに差し替え済（meta refresh + canonical + JS replace、noindex,follow）。

---

## 4. 未完了（すべて外向き＝実行前にユーザー確認が必須）

> CLAUDE.md の破壊的/外向き操作ルールにより、以下は**ユーザーの明示 GO まで実行しない**。

1. **apex の Pages ソース切替（legacy/Jekyll → GitHub Actions）**
   ```bash
   gh api -X PUT repos/Epitaphinc/epitaphinc.github.io/pages -f build_type=workflow
   ```
   ※これをやらないと push 時に旧 Jekyll ビルドが走り Astro と競合する。

2. **apex を commit ＆ push（main）** → `deploy.yml` 起動 → `epitaphinc.com` へ反映。
   - 初回は Actions の "Build/Deploy" 成功と、`/ /about/ /expertise/ /work/ /contact/` が 200 になることを確認。

3. **HTTPS 強制をオン**（現在 `https_enforced=false`、証明書は epitaphinc.com / www approved）
   ```bash
   gh api -X PUT repos/Epitaphinc/epitaphinc.github.io/pages -F https_enforced=true
   ```

4. **corporate リポの redirect を push**（`~/Documents/corporate/index.html` は差替え済）→ `/corporate/` 来訪をルートへ集約。

5. **Formspree 接続**: フォーム作成 → 発行 ID を `src/consts.ts` の `FORMSPREE_ID` に設定（空なら mailto フォールバックのまま動作）。送信先は `info@epitaphinc.com`、honeypot `_gotcha` 実装済。

---

## 5. 要レビュー：当方が作成した「草案」コンテンツ

実データが無い箇所は**捏造せず**草案/誠実表現にしてある。ユーザー確認・差替え推奨。

- **About 代表メッセージ**（`about.astro` の Message 節）: 旧サイトのトーンに沿った草案。社名由来（墓碑＝解を刻む）を絡めた一般的内容。**本人の言葉に差替え推奨**。
- **About Values 3枚**（現実解/伴走/本質）: 既存コピーから導出。
- **Work**: 実在の自社プロダクト「データ化.com」のみ Flagship 掲載。**顧客事例は未掲載**（守秘注記＋匿名化ケースの差込枠を `work.astro` 内コメントで用意）。実績素材が出せれば「業種＋課題＋アプローチ＋成果」で匿名化追加。
- 会社概要（社名/住所/設立2019.04.19/CEO 岩﨑陽治郎）は旧サイトから踏襲・実値。

---

## 6. 再開手順（次セッション）

```bash
# 依存（既に node_modules あれば不要）
npm --prefix ~/Documents/epitaphinc.github.io install
# ローカル起動：preview_start 名 "epitaph"(port 4321) ＝ セッションルート .claude/launch.json に登録済
# もしくは
npm --prefix ~/Documents/epitaphinc.github.io run dev
```

PII 配慮：実取引先名・売上実数はサイト/コミット/ログに載せない（匿名化）。

---

## 7. 既知の注意点
- npm audit に 2件（low×1, high×1、Astro 依存ツリー由来）。未対応。公開前に `npm audit` 内容を確認推奨。
- `trailingSlash:'always'` のため内部リンクは末尾 `/` 必須（consts.ts の NAV は対応済）。
- 2アカウント(426/0426)同一PC・`~/.claude` 共有のため、本 HANDOFF / plan / memory は移行先からも参照可能。
