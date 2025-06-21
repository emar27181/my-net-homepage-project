/**
 * ネオンサイン風ボーダーのTailwindユーティリティ関数
 * 
 * @param color - ボーダーの色 ('cyan' | 'pink' | 'purple' | 'lime' | 'blue' | 'red')
 * @param size - ボーダーのサイズ ('sm' | 'md' | 'lg' | 'xl')
 * @param options - 追加オプション
 * @returns TailwindCSSクラス文字列
 */

export type NeonBorderColor = 'cyan' | 'pink' | 'purple' | 'lime' | 'blue' | 'red' | 'orange' | 'yellow' | 'teal' | 'magenta';
export type NeonBorderSize = 'sm' | 'md' | 'lg' | 'xl';
export type NeonBorderAnimation = 'pulse' | 'glow' | 'flicker' | 'wave' | 'rotate' | 'breathe' | 'electric';

export interface NeonBorderOptions {
  /** アニメーション効果を指定 */
  animation?: NeonBorderAnimation | NeonBorderAnimation[];
  /** グラデーションボーダーを有効にする */
  gradient?: boolean;
  /** ダブルボーダーエフェクトを有効にする */
  double?: boolean;
  /** 追加のカスタムクラス */
  customClasses?: string;
}

/**
 * ネオンボーダーのクラス文字列を生成する
 */
export function applyNeonBorder(
  color: NeonBorderColor,
  size: NeonBorderSize,
  options: NeonBorderOptions = {}
): string {
  const {
    animation,
    gradient = false,
    double = false,
    customClasses = ''
  } = options;

  // ベースクラス配列
  const classes: string[] = [];

  // サイズクラス
  classes.push(`neon-border-${size}`);

  // 色クラス
  classes.push(`neon-border-${color}`);

  // アニメーションクラス
  if (animation) {
    const animations = Array.isArray(animation) ? animation : [animation];
    animations.forEach(anim => {
      classes.push(`neon-border-${anim}`);
    });
  }

  // グラデーションクラス
  if (gradient) {
    classes.push('neon-border-gradient');
  }

  // ダブルボーダーエフェクト
  if (double) {
    classes.push('neon-border-double');
  }

  // カスタムクラス
  if (customClasses) {
    classes.push(customClasses);
  }

  return classes.join(' ');
}

/**
 * 簡単なネオンボーダークラス生成（デフォルトオプション付き）
 */
export function simpleNeonBorder(color: NeonBorderColor, size: NeonBorderSize = 'md'): string {
  return applyNeonBorder(color, size, { animation: 'pulse' });
}

/**
 * グローイングネオンボーダークラス生成
 */
export function glowingNeonBorder(color: NeonBorderColor, size: NeonBorderSize = 'lg'): string {
  return applyNeonBorder(color, size, { animation: 'glow', gradient: true });
}

/**
 * フリッカー効果付きネオンボーダークラス生成
 */
export function flickerNeonBorder(color: NeonBorderColor, size: NeonBorderSize = 'lg'): string {
  return applyNeonBorder(color, size, { animation: 'flicker', double: true });
}

/**
 * エレクトリック効果付きネオンボーダークラス生成
 */
export function electricNeonBorder(color: NeonBorderColor, size: NeonBorderSize = 'xl'): string {
  return applyNeonBorder(color, size, { animation: 'electric', gradient: true });
}

/**
 * 全エフェクト付きネオンボーダークラス生成
 */
export function ultimateNeonBorder(color: NeonBorderColor, size: NeonBorderSize = 'xl'): string {
  return applyNeonBorder(color, size, { 
    animation: ['pulse', 'glow'], 
    gradient: true,
    double: true
  });
}

/**
 * カスタムコンボ：呼吸するネオンボーダー
 */
export function breathingNeonBorder(color: NeonBorderColor, size: NeonBorderSize = 'lg'): string {
  return applyNeonBorder(color, size, { animation: 'breathe', gradient: true });
}

/**
 * カスタムコンボ：波打つネオンボーダー
 */
export function wavingNeonBorder(color: NeonBorderColor, size: NeonBorderSize = 'md'): string {
  return applyNeonBorder(color, size, { animation: 'wave', double: true });
}

/**
 * 利用可能な色の一覧
 */
export const NEON_COLORS: NeonBorderColor[] = [
  'cyan', 'pink', 'purple', 'lime', 'blue', 'red',
  'orange', 'yellow', 'teal', 'magenta'
];

/**
 * 利用可能なサイズの一覧
 */
export const NEON_SIZES: NeonBorderSize[] = ['sm', 'md', 'lg', 'xl'];

/**
 * 利用可能なアニメーションの一覧
 */
export const NEON_ANIMATIONS: NeonBorderAnimation[] = [
  'pulse', 'glow', 'flicker', 'wave', 'rotate', 'breathe', 'electric'
];

/**
 * 色情報の定義（16進数とRGBA値）
 */
const COLOR_MAP = {
  cyan: { hex: '#00d4ff', rgba: '0, 212, 255' },
  pink: { hex: '#ff1493', rgba: '255, 20, 147' },
  purple: { hex: '#8000ff', rgba: '128, 0, 255' },
  lime: { hex: '#32ff32', rgba: '50, 255, 50' },
  blue: { hex: '#4d79ff', rgba: '77, 121, 255' },
  red: { hex: '#ff3333', rgba: '255, 51, 51' },
  orange: { hex: '#ff6600', rgba: '255, 102, 0' },
  yellow: { hex: '#ffff00', rgba: '255, 255, 0' },
  teal: { hex: '#00ffff', rgba: '0, 255, 255' },
  magenta: { hex: '#ff00ff', rgba: '255, 0, 255' }
} as const;

/**
 * 統合ネオンボーダー - 線とグラデーションの色を完全に一致させる
 * Astro用にCSSユーティリティクラスベースで実装
 */
export function unifiedNeonBorder(
  color: NeonBorderColor,
  size: NeonBorderSize = 'md',
  options: NeonBorderOptions = {}
): string {
  const {
    animation,
    gradient = false,
    double = false,
    customClasses = ''
  } = options;

  // ベースクラス配列
  const classes: string[] = [];

  // 統合スタイルのクラス名
  classes.push(`unified-neon-border`);
  classes.push(`unified-neon-${color}`);
  classes.push(`unified-size-${size}`);

  // アニメーションクラス
  if (animation) {
    const animations = Array.isArray(animation) ? animation : [animation];
    animations.forEach(anim => {
      classes.push(`unified-anim-${anim}`);
    });
  }

  // 特殊効果クラス
  if (gradient) {
    classes.push('unified-gradient');
  }

  if (double) {
    classes.push('unified-double');
  }

  // カスタムクラス
  if (customClasses) {
    classes.push(customClasses);
  }

  return classes.join(' ');
}

/**
 * インラインスタイル生成 - 完全に一致した色でネオンボーダーを作成
 */
export function createUnifiedNeonStyle(
  color: NeonBorderColor,
  size: NeonBorderSize = 'md',
  options: NeonBorderOptions = {}
): string {
  const {
    animation,
    gradient = false,
    double = false
  } = options;

  const colorData = COLOR_MAP[color];
  const sizeMap = {
    sm: { border: '1px', glow: '5px', glowStrong: '10px', radius: '4px' },
    md: { border: '2px', glow: '10px', glowStrong: '20px', radius: '6px' },
    lg: { border: '3px', glow: '15px', glowStrong: '30px', radius: '8px' },
    xl: { border: '4px', glow: '20px', glowStrong: '40px', radius: '10px' }
  };

  const sizeConfig = sizeMap[size];

  const baseStyle = `
    border: ${sizeConfig.border} solid ${colorData.hex};
    background: linear-gradient(
      135deg,
      rgba(${colorData.rgba}, 0.035) 0%,
      rgba(${colorData.rgba}, 0.105) 50%,
      rgba(${colorData.rgba}, 0.035) 100%
    );
    box-shadow: 
      inset 0 0 ${sizeConfig.glow} rgba(${colorData.rgba}, 0.3),
      0 0 ${sizeConfig.glow} ${colorData.hex},
      0 0 ${sizeConfig.glowStrong} ${colorData.hex},
      0 0 calc(${sizeConfig.glowStrong} * 1.5) rgba(${colorData.rgba}, 0.28);
    position: relative;
    border-radius: ${sizeConfig.radius};
    color: ${colorData.hex};
    text-shadow: 0 0 ${sizeConfig.glow} ${colorData.hex};
    overflow: hidden;
    ${animation ? `animation: unified-${animation}-${color} 2s ease-in-out infinite alternate;` : ''}
  `.replace(/\s+/g, ' ').trim();

  return baseStyle;
}