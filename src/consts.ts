// ============================================================
// サイト共通データ（ここを編集すれば全ページに反映されます）
// ============================================================

import type { ImageMetadata } from 'astro';

// src/assets/image/ 配下の画像を astro:assets の最適化対象として読み込む
const projectImages = import.meta.glob<{ default: ImageMetadata }>(
  './assets/image/project*.jpg',
  { eager: true }
);
const img = (file: string): ImageMetadata => {
  const mod = projectImages[`./assets/image/${file}`];
  if (!mod) throw new Error(`画像が見つかりません: src/assets/image/${file}`);
  return mod.default;
};

export const SITE = {
  name: '株式会社Epitaph',
  nameEn: 'Epitaph Inc.',
  tagline: 'Vision Meets Reality',
  url: 'https://epitaphinc.com',
  email: 'info@epitaphinc.com',
  ogImage: '/image/ogp.jpg',
  description:
    '大阪・箕面を拠点とする株式会社Epitaph（エピタフ）。経営戦略を現場の実行へ落とし込むビジネススタジオです。中小企業・スタートアップの新規事業開発、組織開発、AI・DX推進、教育・人材育成を支援し、理想と現実をつなぐ「現実解」を創出します。',
};

export const COMPANY = {
  name: '株式会社Epitaph',
  nameEn: 'Epitaph Inc.',
  address: '〒562-0001 大阪府箕面市箕面3-11-25',
  founded: '2019.04.19',
  ceo: '岩﨑 陽治郎',
};

// グローバルナビゲーション
export const NAV = [
  { label: 'About', href: '/about/' },
  { label: 'Expertise', href: '/expertise/' },
  { label: 'Work', href: '/work/' },
  { label: 'Contact', href: '/contact/' },
];

// ヒーローのコピー
export const HERO = {
  // <br> 区切りで段組み表示
  titleLines: ['Vision', 'Meets', 'Reality'],
  desc: '理想と現実をつなぐ「解」を刻む。<br>私たちは戦略を現場の日常へ落とし込む<br>中小企業向けのビジネススタジオです。',
};

// 会社の核となるステートメント（Home / About 共用）
export const STATEMENT = {
  lead: '経営のロジックと現場のリアリティを融合させ、常に「現実解」を創造するビジネススタジオ。',
  body: '課題解決を通じ、事業と組織に深く刻まれる本質的な姿や潜在能力を引き出します。',
};

// Expertise（専門領域）— 既存サイトの詳細文を流用。image は src/assets/image/ 配下（ビルド時に最適化）。
export type Expertise = {
  num: string;
  title: string;
  titleEn: string;
  desc: string;
  image: ImageMetadata;
};

export const EXPERTISE: Expertise[] = [
  {
    num: '01',
    title: '戦略策定',
    titleEn: 'Strategy',
    desc: '絵に描いた戦略は、実行されない戦略と同じです。対話と分析を重ねて財務の裏付けと現場の実行可能性を精査し、「明日から動かせる」ロードマップへ落とし込みます。',
    image: img('project1.jpg'),
  },
  {
    num: '02',
    title: '組織開発',
    titleEn: 'Organization',
    desc: '戦略を動かすのは、仕組みと、人の納得です。KPI設計・評価制度・風土改革までを一体でデザインし、指示を待たずに目標へ向かう自律的な組織をつくります。',
    image: img('project2.jpg'),
  },
  {
    num: '03',
    title: 'プロジェクトマネジメント',
    titleEn: 'Project Management',
    desc: 'プロジェクトが止まる理由は、計画表の外側にあります。複雑な利害関係を丁寧にほどき、As-is（現状）からTo-be（理想）への移行を、泥臭く、しかし確実に完遂させます。',
    image: img('project3.jpg'),
  },
  {
    num: '04',
    title: '新規事業開発',
    titleEn: 'New Business',
    desc: '0→1は、ひらめきではなく検証の積み重ねです。ビジネススタジオとして立ち上げからPMF（市場適合）までを伴走し、市場の手応えに裏打ちされた事業を形にします。',
    image: img('project4.jpg'),
  },
  {
    num: '05',
    title: 'データ分析',
    titleEn: 'Data Analytics',
    desc: '勘と経験は、データと組み合わせてはじめて武器になります。現場に埋もれた数字を掘り起こして可視化し、経営判断の解像度とスピードを引き上げます。',
    image: img('project5.jpg'),
  },
  {
    num: '06',
    title: 'AIトランスフォーメーション',
    titleEn: 'AI Transformation',
    desc: '「AIで何ができるか」ではなく、「何をなすべきか」から始めます。発展途上の技術をビジネスの文脈へ翻訳し、業務とビジネスモデルをアップデート。組織のポテンシャルを解放し、競争優位を生む新たな価値を創出します。',
    image: img('project6.jpg'),
  },
  {
    num: '07',
    title: 'デジタルソリューション',
    titleEn: 'Digital Solution',
    desc: '高機能であることより、現場が使いこなせること。「データ化.com」をはじめとする自社開発の知見を活かし、業務フローに滑らかに溶け込む、実利あるDXを実装します。',
    image: img('project7.jpg'),
  },
  {
    num: '08',
    title: '教育事業',
    titleEn: 'Education',
    desc: '変革を最後までやり切るのは、外部の専門家ではなく社内の人材です。AI・DXを軸にした実務直結の研修を設計し、公的助成制度の活用支援も含めて、学びが成果に変わるまで伴走します。',
    image: img('project9.jpg'),
  },
  {
    num: '09',
    title: 'ソーシャルインパクト',
    titleEn: 'Social Impact',
    desc: '一社の利益で終わらせず、業界の構造課題へ楔を打ち込みます。事業活動を通じて社会に価値を還元するCSV経営を、理想論ではなく実装として追求します。',
    image: img('project8.jpg'),
  },
];

// お問い合わせフォームの送信先（Formspree）。
// TODO: Formspree でフォーム作成後、発行される ID に差し替える（例: 'xpwgkqyz'）。
// 空のままだと送信は mailto フォールバックになります。
export const FORMSPREE_ID = '';
