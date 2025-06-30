/**
 * ピクセルフォント一元管理システム
 * PROJECT_RULES.mdに基づくフォント・タイポグラフィ統一ルール
 */

// ピクセルフォントクラス定義
export const pixelFontClasses = {
  // 見出し系
  heading: {
    primary: 'font-pixel-primary text-white text-shadow-retro text-center',
    secondary: 'font-pixel-secondary text-white text-shadow-retro',
    tertiary: 'font-pixel-tertiary text-white text-shadow-retro',
  },
  
  // 本文系
  body: {
    main: 'font-pixel-body text-white text-shadow-retro leading-relaxed',
    small: 'font-pixel-small text-white text-shadow-retro leading-tight',
    label: 'font-pixel-label text-white text-shadow-retro font-bold',
  },
  
  // データ・値表示
  data: {
    value: 'font-pixel-data text-white text-shadow-retro',
    loading: 'font-pixel-loading text-blue-retro text-shadow-glow animate-pulse',
    error: 'font-pixel-error text-red-retro text-shadow-retro',
  },
  
  // 特殊用途
  special: {
    marquee: 'font-pixel-marquee text-white text-shadow-retro',
    button: 'font-pixel-button text-white text-shadow-retro font-bold',
    accent: 'font-pixel-accent text-blue-retro text-shadow-glow',
  }
} as const;

// フォントサイズマッピング
export const pixelFontSizes = {
  xs: 'text-xs',    // 10px
  sm: 'text-sm',    // 12px  
  base: 'text-base', // 14px
  lg: 'text-lg',    // 16px
  xl: 'text-xl',    // 18px
  '2xl': 'text-2xl', // 20px
} as const;

// 一元管理されたテキストスタイル
export const pixelTextStyles = {
  // セクションタイトル
  sectionTitle: `${pixelFontClasses.heading.primary} text-lg mb-3`,
  
  // サブタイトル
  subTitle: `${pixelFontClasses.heading.secondary} text-base mb-2`,
  
  // 小見出し
  subHeading: `${pixelFontClasses.heading.tertiary} text-sm mb-2`,
  
  // 本文
  bodyText: `${pixelFontClasses.body.main} text-sm`,
  
  // 説明文
  description: `${pixelFontClasses.body.small} text-xs opacity-90`,
  
  // ラベル
  label: `${pixelFontClasses.body.label} text-xs`,
  
  // データ値
  dataValue: `${pixelFontClasses.data.value} text-sm`,
  
  // ローディング表示
  loadingText: `${pixelFontClasses.data.loading} text-xs`,
  
  // マーキーテキスト
  marqueeText: `${pixelFontClasses.special.marquee} text-base`,
  
  // ボタンテキスト
  buttonText: `${pixelFontClasses.special.button} text-sm`,
  
  // アクセント
  accentText: `${pixelFontClasses.special.accent} text-sm`,
} as const;

// よく使用されるテキストパターン
export const commonTexts = {
  loading: 'DATA LOADING...',
  error: 'ERROR',
  notAvailable: 'N/A',
  collecting: '統計収集中',
  placeholder: '---',
} as const;

// タイポグラフィヘルパー関数
export function getPixelTextClass(
  type: keyof typeof pixelTextStyles,
  size?: keyof typeof pixelFontSizes,
  customClasses?: string
): string {
  const baseClass = pixelTextStyles[type];
  const sizeClass = size ? pixelFontSizes[size] : '';
  const custom = customClasses || '';
  
  return `${baseClass} ${sizeClass} ${custom}`.trim();
}

// PROJECT_RULES.mdに基づく統一CSS変数
export const pixelFontCSS = `
  .font-pixel-primary {
    font-family: var(--font-pixel), 'Press Start 2P', monospace;
  }
  
  .font-pixel-secondary {
    font-family: var(--font-pixel-jp), 'Press Start 2P', monospace;
  }
  
  .font-pixel-tertiary {
    font-family: var(--font-pixel-jp), 'Press Start 2P', monospace;
  }
  
  .font-pixel-body {
    font-family: var(--font-pixel-jp), 'Press Start 2P', monospace;
  }
  
  .font-pixel-small {
    font-family: var(--font-pixel-jp), 'Press Start 2P', monospace;
  }
  
  .font-pixel-label {
    font-family: var(--font-pixel), 'Press Start 2P', monospace;
  }
  
  .font-pixel-data {
    font-family: var(--font-pixel), 'Press Start 2P', monospace;
  }
  
  .font-pixel-loading {
    font-family: var(--font-pixel), 'Press Start 2P', monospace;
  }
  
  .font-pixel-error {
    font-family: var(--font-pixel), 'Press Start 2P', monospace;
  }
  
  .font-pixel-marquee {
    font-family: var(--font-pixel-jp), 'Press Start 2P', monospace;
  }
  
  .font-pixel-button {
    font-family: var(--font-pixel), 'Press Start 2P', monospace;
  }
  
  .font-pixel-accent {
    font-family: var(--font-pixel), 'Press Start 2P', monospace;
  }
  
  .text-shadow-retro {
    text-shadow: 1px 1px 0px #000000, 2px 2px 0px rgba(0,0,0,0.5);
  }
  
  .text-shadow-glow {
    text-shadow: 1px 1px 0px #000000, 0 0 10px var(--text-accessible-blue);
  }
  
  .text-blue-retro {
    color: var(--text-accessible-blue);
  }
  
  .text-red-retro {
    color: #ff4444;
  }
`;