# HANDOFF — 株式会社Epitaph コーポレートサイト

最終更新: 2026-07-05 / 作業者: Claude Code（デザイン洗練化の完了時点）

---

## 1. このプロジェクトは何か

旧コーポレートサイト（`epitaphinc.com/corporate/` ＝ 単一HTML）を、世界観を継承したまま Astro で複数ページ化し、ドメイン直下 `epitaphinc.com` に統合したコーポレートサイト。**2026-07-05 時点で本番稼働中**（Pages=GitHub Actions ビルド・HTTPS 強制オン・旧 /corporate/ はリダイレクト済み）。

- **最重要ゴール**: 信頼・ブランドの確立
- **ターゲット**: 中小企業の経営者・事業責任者／協業・提携パートナー
- **デザイン**: ダーク×ミニマル（漆黒 #050505・縁取りヒーロー・カスタムカーソル・ノイズ・グレースケール→ホバーでカラー）
- **技術**: Astro 5（静的出力）＋ GitHub Actions → GitHub Pages。`site=https://epitaphinc.com` / `trailingSlash:'always'`

## 2. 作業ディレクトリ

- **本体（apex・これが正）**: `~/Documents/epitaphinc.github.io/` ← `Epitaphinc/epitaphinc.github.io`
- ローカル起動: preview_start 名 `epitaph`（port 4321、セッションルート `.claude/launch.json` 登録済）または `npm --prefix ~/Documents/epitaphinc.github.io run dev`

## 3. 2026-07-05 デザイン洗練化（本セッションの作業・ローカル検証済み）

方針: 漆黒×モノクロの世界観は維持し、動き・タイポ・画像品質・細部で高級感を出す。**コピーは不変更**。

- **スクロール連動 reveal**: `Base.astro` に IntersectionObserver、`.reveal`/`.is-visible` ＋ `--rv-delay` スタッガー。全5ページの主要要素に付与。reduced-motion/非対応/JS無効(noscript)時は即時表示。
- **ヒーロー入場演出**: 3行がマスク下から順に立ち上がる（`.hero-line-mask`/`.hero-line`）。`hero-desc`/`scroll-hint` は遅延フェード、scroll-hint に伸縮する縦線ループ。
- **View Transitions**: `<ClientRouter />` 導入。スクリプトは全て遷移対応済み — Lightbox は document へのイベント委譲に全面書き換え、Atmosphere は `astro:page-load` で要素再取得、contact フォームは `data-bound` ガード付き再初期化。
- **画像最適化**: project1〜8.jpg を `public/image/` → `src/assets/image/` に移動し、`consts.ts` で `import.meta.glob`→`ImageMetadata` 化。Gallery/expertise/work は `<Picture>`（AVIF/WebP、widths 480/800/1200、width/height 自動で CLS 解消）。Lightbox は `image.src` を使用。**ogp.jpg のみ public に残置**（OGP は絶対URL必須）。
- **タイポ**: Noto Sans JP に w400 追加し本文を 400 へ（w300 は statement 等の大型テキストに残す）。見出し系に `font-feature-settings:'palt'`、本文 letter-spacing 0.02em。
- **レスポンシブ/入力**: 1024px タブレットブレークポイント新設（gallery/exp-block/grid-3→2列）。カスタムカーソルは `@media (pointer: fine)` に一元化（768px ハック撤去）。375px でナビがはみ出す既存バグを修正（寸法詰め）。
- **細部**: `::selection` 白黒反転・細スクロールバー・`:focus-visible` 白アウトライン・srv-item ホバーをグラデ＋番号色変化・card ホバー translateY(-4px)・smooth scroll（reduced-motion 時無効）。
- **検証済み**: 全5ページ console エラー0・遷移後の Lightbox/フォーム/reveal 再動作・モバイル375/タブレット900/デスクトップで横スクロール0・`npm run build` 成功（AVIF/WebP 96ファイル生成、img に width/height/srcset 付与）。

## 4. 残タスク

1. **本セッション分の commit & push**（push=本番デプロイ。ユーザー承認待ち）
2. **Formspree 接続**: フォーム作成 → 発行 ID を `src/consts.ts` の `FORMSPREE_ID` に設定（空のままなら mailto フォールバックで動作。送信先 `info@epitaphinc.com`、honeypot `_gotcha` 実装済）
3. npm audit 2件（low×1, high×1、Astro 依存ツリー由来）未対応

## 5. 要レビュー：草案コンテンツ（前回から継続）

- **About 代表メッセージ**（`about.astro` Message 節）: 草案。本人の言葉に差替え推奨。
- **About Values 3枚**（現実解/伴走/本質）: 既存コピーから導出した草案。
- **Work**: 顧客事例は未掲載（守秘注記＋匿名化差込枠を `work.astro` コメントで用意）。追加時は「業種＋課題＋アプローチ＋成果」で匿名化。
- 会社概要（社名/住所/設立 2019.04.19/CEO 岩﨑陽治郎）は実値。

## 6. 既知の注意点

- `trailingSlash:'always'` のため内部リンクは末尾 `/` 必須。
- reveal と要素固有 transition の競合は `.srv-item.reveal`/`.card.reveal` の合成 transition で解決済み。card の reveal はフェードのみ（hover の transform と両立させるため）。
- 画像を追加する場合は `src/assets/image/` に置き `consts.ts` の `img()` で参照する（public 直置きは最適化されない）。
- PII 配慮：実取引先名・売上実数はサイト/コミット/ログに載せない（匿名化）。
- 2アカウント(426/0426)同一PC・`~/.claude` 共有のため、本 HANDOFF は移行先からも参照可能。
