/**
 * テーマカラー設定ファイル
 * サイト全体の色をここで一元管理
 */

// ========================================
// メインテーマカラー設定
// ========================================
export const THEME_CONFIG = {
  // 色相 (0-360): 0=赤, 120=緑, 225=ネオンブルー, 240=青, 270=紫, 300=マゼンタ
  HUE: 225,

  // 彩度・明度設定
  SATURATION: 100,
  LIGHTNESS: 65,

  // アルファ値
  ALPHA: {
    LIGHT: 0.05,
    MEDIUM: 0.1,
    HEAVY: 0.3,
  },
} as const;

// ========================================
// HSL色空間でテーマカラーを生成
// ========================================
export const generateThemeColors = (hue: number = THEME_CONFIG.HUE) => {
  return {
    // メインカラー
    primary: `hsl(${hue}, 100%, 65%)`,
    primaryAlpha10: `hsla(${hue}, 100%, 65%, 0.1)`,
    primaryAlpha5: `hsla(${hue}, 100%, 65%, 0.05)`,
    primaryShadow: `hsla(${hue}, 100%, 65%, 0.3)`,

    // タイトル・見出しカラー（CSS変数で色相追従）
    heading: 'var(--col-heading)',

    // リンクカラー
    link: 'var(--col-heading)',

    // RGB形式（一部コンポーネント用）
    primaryRgb: hslToRgb(hue, 100, 65),
  };
};

// ========================================
// 固定カラー（色相に依存しない）
// ========================================
export const FIXED_COLORS = {
  // テキストカラー
  textWhite: '#ffffff',
  textGray: '#cccccc',
  textDarkGray: '#666666',
  textBlack: '#000000',

  // 背景・ボーダー
  bgWhite: '#ffffff',
  bgTransparent: 'transparent',

  // エフェクト
  shadowWhite: 'rgba(255,255,255,0.3)',
  shadowBlack: 'rgba(0,0,0,0.5)',
} as const;

// ========================================
// コンポーネント別カラー設定
// ========================================
export const COMPONENT_COLORS = {
  // 動画ビューア系
  video: {
    title: 'var(--col-primary)',
    border: 'var(--col-primary)',
    shadow: 'var(--col-primary-a30)',
  },

  // ナビゲーション
  navigation: {
    shadow: 'var(--col-primary-a30)',
  },
} as const;

// ========================================
// ヘルパー関数
// ========================================

/**
 * HSLをRGBに変換
 */
function hslToRgb(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));
  return `${r}, ${g}, ${b}`;
}

/**
 * 現在のテーマカラーを取得
 */
export const getCurrentThemeColors = () => generateThemeColors(THEME_CONFIG.HUE);

/**
 * 特定の色相でテーマカラーを取得
 */
export const getThemeColorsByHue = (hue: number) => generateThemeColors(hue);

// ========================================
// フォントサイズ設定
// ========================================
export const FONT_SIZES = {
  title: 'var(--fs-title)',
  subtitle: 'var(--fs-subtitle)',
  sectionTitle: 'var(--fs-section)',
  subTitle: 'var(--fs-subtitle)',
  bodyText: 'var(--fs-body)',
  smallText: 'var(--fs-small)',
  footer: 'var(--fs-footer)',
} as const;

// ========================================
// フォント設定
// ========================================
export const FONTS = {
  pixel: "'Press Start 2P', monospace",
  pixelJp: "'DotGothic16', 'BIZ UDPGothic', 'Press Start 2P', monospace",
} as const;

// ========================================
// インラインスタイルプリセット生成
// index.astro等でテンプレートリテラル内で使用する
// ========================================
export const getStylePresets = (colors: ReturnType<typeof getCurrentThemeColors> & typeof FIXED_COLORS) => {
  const textBase = `font-family: ${FONTS.pixelJp}; image-rendering: pixelated; text-shadow: 1px 1px 0px ${colors.textBlack};`;

  return {
    /** メインタイトル（h1レベル） */
    title: `color: ${colors.heading}; font-size: ${FONT_SIZES.title}; font-family: ${FONTS.pixel}; image-rendering: pixelated; text-shadow: 1px 1px 0px ${colors.textBlack}; letter-spacing: 1px;`,

    /** セクション見出し（h2レベル） */
    sectionTitle: `color: ${colors.heading}; font-size: ${FONT_SIZES.sectionTitle}; text-align: center; font-family: ${FONTS.pixel}; image-rendering: pixelated; text-shadow: 1px 1px 0px ${colors.textBlack}; letter-spacing: 1px;`,

    /** 小見出し（h3レベル） */
    subTitle: `color: ${colors.textWhite}; font-size: ${FONT_SIZES.subTitle}; ${textBase}`,

    /** 本文テキスト */
    bodyText: `color: ${colors.textGray}; font-size: ${FONT_SIZES.bodyText}; line-height: 1.8; ${textBase}`,

    /** 本文テキスト（line-heightなし） */
    bodyTextCompact: `color: ${colors.textGray}; font-size: ${FONT_SIZES.bodyText}; ${textBase}`,

    /** リンク色 */
    link: `color: ${colors.link};`,

    /** 区切り線 */
    divider: `border: none; height: 1px; background-color: ${colors.primary};`,

    /** テキストベース（フォント + text-shadow のみ） */
    textBase,
  };
};

// ========================================
// チャートグリッド・線の統一設定
// ========================================
export const CHART_GRID = {
  // 横線（Y軸グリッド）
  horizontal: {
    color: 'hsla(185, 100%, 82%, 0.4)',
    lineWidth: 1,
  },
  // 縦線（X軸グリッド）
  vertical: {
    color: 'hsla(185, 100%, 82%, 0.18)',
    lineWidth: 1,
  },
  // K/D 1.0 基準線
  kdBaseline: {
    lineWidth: 2.5,
  },
  // テーマカラー（ラベル・ポイント・ライン）
  themeColor: 'var(--col-heading)',
  // ツールチップ背景
  tooltipBg: 'rgba(5, 10, 20, 0.95)',
} as const;

// ========================================
// ナビゲーションバー設定
// ========================================
export const NAV_CONFIG = {
  links: [
    { label: 'PLAYER', href: '#about-section' },
    { label: 'CLIPS',  href: '#clips-gallery-section' },
    { label: 'DEVICE', href: '#device-section' },
    { label: 'WORKS',  href: '#works-section' },
  ],
  settingsLabel: 'SETTING',
} as const;

// デフォルトエクスポート
export default {
  THEME_CONFIG,
  FIXED_COLORS,
  COMPONENT_COLORS,
  FONT_SIZES,
  FONTS,
  CHART_GRID,
  getStylePresets,
  getCurrentThemeColors,
  getThemeColorsByHue,
};
