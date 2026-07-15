# HANDOFF — 株式会社Epitaph コーポレートサイト

最終更新: 2026-07-15 / 作業者: Claude Code（AI研修LP追加・commit & push・掲載証跡保存 まで完了）

> AI研修LP関連は一通り完了。残タスクは「4. 残タスク」参照（Formspree未接続・npm audit未対応のみ）。

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

## 3.5. 2026-07-15 教育事業追加＋ビジュアル/コピー刷新

- **Expertise に「08 教育事業 (Education)」を新設**、ソーシャルインパクトは 09 へ繰り下げ（`consts.ts` の EXPERTISE 配列）。
- **画像を全面刷新**: 旧画像は英語ラベル/崩れ文字入りのAI生成ストック風で世界観と乖離していたため、漆黒×ミニマルに合わせた自作のジェネラティブアート9枚（1600x1000、領域ごとのモチーフ＋差し色、グレースケール→ホバーでカラーが映える設計）に置換。生成スクリプトはセッション scratchpad の `gen_art.py`（リポジトリ外・再生成時は要再作成）。ファイル名は project1〜8 を上書き＋project9.jpg（教育=project9、ソーシャル=project8 のまま）。
- **説明文を全9領域ブラッシュアップ**（「絵に描いた戦略は〜」等、断定調で統一。コピー刷新であり意味は既存踏襲）。SITE.description / expertise メタ / page-lead も「9つの領域」「教育・人材育成」へ更新。
- **可読性向上**: `--muted` #888→#969696・`--faint` #555→#6e6e6e、小さい文字を底上げ（nav 0.8→0.85rem・g-sub 0.8→0.9rem・exp-desc 1→1.05rem・foot/form/lead 各+0.05rem 等、モバイル nav 0.65→0.72rem）。
- **デザイン追加**: expertise 各ブロック背後に縁取り数字ウォーターマーク（`.exp-watermark`、モバイル非表示）、トップの Expertise リストに英語サブラベル表示。
- **検証**: `npm run build` 成功（5ページ・画像108ファイル生成）。DOM/computed style で 9 領域の並び・フォントサイズ反映を確認。※Browser ペインのスクリーンショット機能がセッション全体で固まり視覚確認は不可だった（JS/ネットワークは正常、ページ側のエラーなし）。push 後に本番で目視確認を推奨。

## 3.6. 2026-07-15 AI研修LP追加（commit `48fd9ea` で push済み）

`~/Documents/ai-training-grant/` で設計した「AI業務自動化 実践研修」（人材開発支援助成金・事業展開等リスキリング支援コース対応）を、コーポレートサイトと同一デザインシステムでLP化。

- **新規ページ**: `src/pages/ai-training.astro`（URL: `/ai-training/`）。`Base.astro` を使い、既存クラス（`.page-head`/`.grid-3`+`.card`/`.timeline`/`.service-list`+`.srv-item`/`.co-dl`/`.cta-band`）のみで構成。新規CSSはゼロ。
- **ナビ追加**: `src/consts.ts` の `NAV` 配列に `{ label: 'Training', href: '/ai-training/' }` を追加（Nav/Footer 両方に自動反映）。
- **コンテンツ方針（ユーザー確認済み）**:
  - ヒーローは「AIとの距離がぐっと縮まる」体験訴求。「研修終了時に成果物が完成している」という表現は**助成金の「対象とならないOFF-JT」規定（事業活動における成果物の創出）に抵触しうるため使用しない**。演習はダミーデータでの体験・習得と位置づけ。
  - **助成金は目立たせない**: FAQに1行のみ（「人材開発支援助成金の活用をご検討いただける場合があります。適用可否は各社の申請・審査によります」）。金額・助成率・実質負担額はLPに一切記載しない（助成金ビジネスと誤認されるリスク・労働局の心証への配慮）。
  - 受講料 300,000円（税抜）/名・全12時間は明示（事業外訓練の商品化要件）。
- **コピー正本**: `~/Documents/ai-training-grant/02_研修機関側帳票/01_HP掲載用商品ページ原稿.md`（このHANDOFFと合わせて更新済み）。
- **検証**: `npm run build` 成功（6ページ生成）。read_page（アクセシビリティツリー）で全セクション・ナビ・フッター・CTA・FAQ文言を確認、コンソールエラーなし。**Browserペインのスクリーンショット機能がこのセッションでもタイムアウトし続け、視覚的な最終確認は未実施**（3.5 と同種の既知の環境制約。JS/ビルド自体は正常）。push後に本番で目視確認を推奨。
- **ローカル一時変更（gitignore対象・コミット不要）**: `.claude/launch.json` に検証用ポート設定（`autoPort: true`, port 4322）を追記。加えて monorepo 側 `~/Documents/Claude_Projects/.claude/launch.json` に一時エントリ `epitaph-preview`（port 4323/autoPort）を追加済み（既存 `epitaph` エントリの `--port 4321` 固定指定が別セッションのdevサーバーと衝突したための回避策）。実害はないが、不要になれば削除してよい。

## 4. 残タスク

1. **Formspree 接続**: フォーム作成 → 発行 ID を `src/consts.ts` の `FORMSPREE_ID` に設定（空のままなら mailto フォールバックで動作。送信先 `info@epitaphinc.com`、honeypot `_gotcha` 実装済）
2. npm audit 2件（low×1, high×1、Astro 依存ツリー由来）未対応
3. （3.5 教育事業追加分は commit `be28937`、3.6 AI研修LPは commit `48fd9ea`/`d61faeb` で **push済み・完了**。掲載証跡PDFはユーザーが手動キャプチャし `ai-training-grant/02_研修機関側帳票/07_HP掲載証跡/2026-07-15_ai-training掲載証跡.pdf` へ保存済み）

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
