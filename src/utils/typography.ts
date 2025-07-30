/**
 * タイポグラフィ管理システム
 * 文字スタイルの一元管理とプログラマティックな制御
 */

export interface TypographyConfig {
  variant: TypographyVariant;
  size?: TypographySize;
  color?: TypographyColor;
  glow?: TypographyGlow;
  animation?: TypographyAnimation;
  responsive?: boolean;
}

export type TypographyVariant =
  | 'heading-primary'     // 大見出し
  | 'heading-secondary'   // 中見出し
  | 'heading-tertiary'    // 小見出し
  | 'body-primary'        // メイン本文
  | 'body-secondary'      // サブ本文
  | 'body-small'          // 小本文
  | 'emphasis-strong'     // 強調
  | 'emphasis-highlight'  // ハイライト
  | 'emphasis-glow'       // グロー強調
  | 'nav-primary'         // プライマリナビ
  | 'nav-secondary'       // セカンダリナビ
  | 'button-primary'      // プライマリボタン
  | 'button-secondary'    // セカンダリボタン
  | 'label-primary'       // プライマリラベル
  | 'label-secondary'     // セカンダリラベル
  | 'meta-primary'        // メタ情報
  | 'meta-timestamp';     // タイムスタンプ

export type TypographySize =
  | 'xs'    // 9px
  | 'sm'    // 11px
  | 'base'  // 12px
  | 'md'    // 14px
  | 'lg'    // 16px
  | 'xl'    // 18px
  | '2xl';  // 20px

export type TypographyColor =
  | 'primary'     // メイン色
  | 'secondary'   // セカンダリ色
  | 'accent'      // アクセント色
  | 'highlight'   // ハイライト色
  | 'muted'       // 控えめ色
  | 'inverse';    // 反転色

export type TypographyGlow =
  | 'none'  // グローなし
  | 'sm'    // 小グロー
  | 'md'    // 中グロー
  | 'lg'    // 大グロー
  | 'xl';   // 特大グロー

export type TypographyAnimation =
  | 'none'         // アニメーションなし
  | 'pulse'        // パルス効果
  | 'flicker'      // フリッカー効果
  | 'cyber-glitch'; // サイバーグリッチ効果

/**
 * タイポグラフィクラス生成
 */
export function createTypographyClass(config: TypographyConfig): string {
  const classes: string[] = [];
  
  // ベースバリアント
  classes.push(`text-${config.variant}`);
  
  // サイズ修飾子
  if (config.size && config.size !== getDefaultSize(config.variant)) {
    classes.push(`text-size-${config.size}`);
  }
  
  // 色修飾子
  if (config.color && config.color !== getDefaultColor(config.variant)) {
    classes.push(`text-color-${config.color}`);
  }
  
  // グロー修飾子
  if (config.glow && config.glow !== 'none') {
    classes.push(`text-glow-${config.glow}`);
  }
  
  // アニメーション修飾子
  if (config.animation && config.animation !== 'none') {
    classes.push(`text-anim-${config.animation}`);
  }
  
  // レスポンシブ修飾子
  if (config.responsive) {
    classes.push('text-responsive');
  }
  
  return classes.join(' ');
}

/**
 * バリアント別デフォルトサイズ取得
 */
function getDefaultSize(variant: TypographyVariant): TypographySize {
  const sizeMap: Record<TypographyVariant, TypographySize> = {
    'heading-primary': 'xl',
    'heading-secondary': 'lg',
    'heading-tertiary': 'md',
    'body-primary': 'base',
    'body-secondary': 'sm',
    'body-small': 'xs',
    'emphasis-strong': 'base',
    'emphasis-highlight': 'base',
    'emphasis-glow': 'base',
    'nav-primary': 'sm',
    'nav-secondary': 'xs',
    'button-primary': 'sm',
    'button-secondary': 'xs',
    'label-primary': 'xs',
    'label-secondary': 'xs',
    'meta-primary': 'xs',
    'meta-timestamp': 'xs'
  };
  
  return sizeMap[variant];
}

/**
 * バリアント別デフォルト色取得
 */
function getDefaultColor(variant: TypographyVariant): TypographyColor {
  const colorMap: Record<TypographyVariant, TypographyColor> = {
    'heading-primary': 'accent',
    'heading-secondary': 'primary',
    'heading-tertiary': 'primary',
    'body-primary': 'primary',
    'body-secondary': 'secondary',
    'body-small': 'muted',
    'emphasis-strong': 'accent',
    'emphasis-highlight': 'highlight',
    'emphasis-glow': 'primary',
    'nav-primary': 'accent',
    'nav-secondary': 'secondary',
    'button-primary': 'inverse',
    'button-secondary': 'accent',
    'label-primary': 'accent',
    'label-secondary': 'primary',
    'meta-primary': 'muted',
    'meta-timestamp': 'muted'
  };
  
  return colorMap[variant];
}

/**
 * プリセット定義
 */
export const TypographyPresets = {
  // 見出し系
  pageTitle: { variant: 'heading-primary' as const, glow: 'lg' as const, responsive: true },
  sectionTitle: { variant: 'heading-secondary' as const, glow: 'md' as const },
  subsectionTitle: { variant: 'heading-tertiary' as const, glow: 'sm' as const },
  
  // 本文系
  mainText: { variant: 'body-primary' as const },
  subText: { variant: 'body-secondary' as const },
  caption: { variant: 'body-small' as const },
  
  // 強調系
  important: { variant: 'emphasis-strong' as const, glow: 'sm' as const },
  highlight: { variant: 'emphasis-highlight' as const, glow: 'md' as const },
  glowing: { variant: 'emphasis-glow' as const, animation: 'pulse' as const },
  
  // ナビゲーション系
  mainNav: { variant: 'nav-primary' as const, glow: 'sm' as const },
  subNav: { variant: 'nav-secondary' as const },
  
  // インタラクティブ系
  primaryButton: { variant: 'button-primary' as const, glow: 'sm' as const },
  secondaryButton: { variant: 'button-secondary' as const },
  
  // ラベル・タグ系
  tag: { variant: 'label-primary' as const, glow: 'sm' as const },
  badge: { variant: 'label-secondary' as const },
  
  // メタ情報系
  description: { variant: 'meta-primary' as const },
  timestamp: { variant: 'meta-timestamp' as const },
  
  // 特殊効果系
  cyberTitle: { variant: 'heading-primary' as const, animation: 'cyber-glitch' as const },
  flickerText: { variant: 'body-primary' as const, animation: 'flicker' as const }
} as const;

/**
 * プリセット適用
 */
export function applyTypographyPreset(presetName: keyof typeof TypographyPresets): string {
  const preset = TypographyPresets[presetName];
  return createTypographyClass(preset);
}

/**
 * カスタムタイポグラフィクラス生成
 */
export function typography(config: TypographyConfig): string {
  return createTypographyClass(config);
}

/**
 * 利用可能なバリアント一覧取得
 */
export function getAvailableVariants(): TypographyVariant[] {
  return [
    'heading-primary',
    'heading-secondary', 
    'heading-tertiary',
    'body-primary',
    'body-secondary',
    'body-small',
    'emphasis-strong',
    'emphasis-highlight',
    'emphasis-glow',
    'nav-primary',
    'nav-secondary',
    'button-primary',
    'button-secondary',
    'label-primary',
    'label-secondary',
    'meta-primary',
    'meta-timestamp'
  ];
}

/**
 * プリセット一覧取得
 */
export function getAvailablePresets(): Array<keyof typeof TypographyPresets> {
  return Object.keys(TypographyPresets) as Array<keyof typeof TypographyPresets>;
}