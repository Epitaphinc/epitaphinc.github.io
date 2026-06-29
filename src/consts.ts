// ============================================================
// サイト共通データ（ここを編集すれば全ページに反映されます）
// ============================================================

export const SITE = {
  name: '株式会社Epitaph',
  nameEn: 'Epitaph Inc.',
  tagline: 'Vision Meets Reality',
  url: 'https://epitaphinc.com',
  email: 'info@epitaphinc.com',
  ogImage: '/image/ogp.jpg',
  description:
    '大阪・箕面を拠点とする株式会社Epitaph（エピタフ）。経営戦略を現場の実行へ落とし込むビジネススタジオです。中小企業・スタートアップの新規事業開発、組織開発、AI・DX推進を支援し、理想と現実をつなぐ「現実解」を創出します。',
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

// Expertise（専門領域）— 既存サイトの詳細文を流用。image は public/image/ 配下。
export type Expertise = {
  num: string;
  title: string;
  titleEn: string;
  desc: string;
  image: string;
};

export const EXPERTISE: Expertise[] = [
  {
    num: '01',
    title: '戦略策定',
    titleEn: 'Strategy',
    desc: '理想論だけの絵図は描きません。対話と分析を通じ、財務的裏付けと現場の実行可能性（フィジビリティ）を兼ね備えた、ロードマップを策定します。',
    image: '/image/project1.jpg',
  },
  {
    num: '02',
    title: '組織開発',
    titleEn: 'Organization',
    desc: '戦略を動かすのは、「人」と「規律」です。KPI設計から評価制度の構築、風土改革まで、組織が自律的に目標へ向かうための羅針盤を設計します。',
    image: '/image/project2.jpg',
  },
  {
    num: '03',
    title: 'プロジェクトマネジメント',
    titleEn: 'Project Management',
    desc: 'プロジェクトの停滞要因は、多くの場合、現場に理由があります。複雑な利害関係を調整し、As-is（現状）からTo-be（理想）への移行プロセスを、泥臭く、かつ確実に完遂させます。',
    image: '/image/project3.jpg',
  },
  {
    num: '04',
    title: '新規事業開発',
    titleEn: 'New Business',
    desc: '「ビジネス・スタジオ」として、0→1の立ち上げからPMF（市場適合）の検証までを伴走。机上の空論ではない、現場検証に基づいた事業創出を支援します。',
    image: '/image/project4.jpg',
  },
  {
    num: '05',
    title: 'データ分析',
    titleEn: 'Data Analytics',
    desc: '感覚と経験だけの経営からの脱却を。埋もれている現場データを掘り起こして可視化し、経営判断の精度を高めるための武器として再定義します。',
    image: '/image/project5.jpg',
  },
  {
    num: '06',
    title: 'AIトランスフォーメーション',
    titleEn: 'AI Transformation',
    desc: '「何ができるか」ではなく「何をなすべきか」の視点から、AIの最適解を導き出します。発展途上の技術をビジネスの文脈へと翻訳し、ビジネスモデルをアップデート。組織が持つポテンシャルを解放し、競争優位性のある新たな価値を創出します。',
    image: '/image/project6.jpg',
  },
  {
    num: '07',
    title: 'デジタルソリューション',
    titleEn: 'Digital Solution',
    desc: '「データ化.com」に代表されるように、過剰な機能よりも「現場が使いこなせる現実解」を重視。業務フローに滑らかに溶け込む、実利あるDXを実装します。',
    image: '/image/project7.jpg',
  },
  {
    num: '08',
    title: 'ソーシャルインパクト',
    titleEn: 'Social Impact',
    desc: '企業の利益にとどまらず、業界全体の構造課題や社会課題へアプローチする。事業活動を通じて社会にポジティブな楔を刻む、CSV経営を実現します。',
    image: '/image/project8.jpg',
  },
];

// お問い合わせフォームの送信先（Formspree）。
// TODO: Formspree でフォーム作成後、発行される ID に差し替える（例: 'xpwgkqyz'）。
// 空のままだと送信は mailto フォールバックになります。
export const FORMSPREE_ID = '';
