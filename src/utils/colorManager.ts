/**
 * カラー管理システム - 一元管理
 * 全てのテキスト色・UI色を中央で管理
 */

// カラー設定の型定義
export interface ColorConfig {
  id: string;
  name: string;
  primary: string;      // メインテキスト色
  secondary: string;    // セカンダリテキスト色
  accent: string;       // アクセント色（強調）
  border: string;       // 枠線色
  background: string;   // 背景色
  highlight: string;    // ハイライト色
  enabled: boolean;
}

// プリセットカラー設定
export const COLOR_PRESETS: Record<string, ColorConfig> = {
  cyan: {
    id: 'cyan',
    name: '水色統一',
    primary: '#00d4ff',      // メインテキスト - 明るい水色
    secondary: '#7ae7ff',    // セカンダリテキスト - より明るい水色
    accent: '#00b8e6',       // アクセント - 濃い水色
    border: '#4d79ff',       // 枠線 - 青
    background: 'rgba(0, 212, 255, 0.05)', // 背景 - 薄い水色
    highlight: '#33ddff',    // ハイライト - 中間の水色
    enabled: true
  },

  red: {
    id: 'red',
    name: '赤統一',
    primary: '#4d79ff',
    secondary: '#ff7a7a',
    accent: '#e63946',
    border: '#4d79ff',
    background: 'rgba(77, 121, 255, 0.05)',
    highlight: '#ff6b6b',
    enabled: false
  },

  blue: {
    id: 'blue',
    name: '青統一',
    primary: '#4d79ff',
    secondary: '#7a99ff',
    accent: '#2952cc',
    border: '#4d79ff',
    background: 'rgba(77, 121, 255, 0.05)',
    highlight: '#6b8fff',
    enabled: false
  },

  green: {
    id: 'green',
    name: '緑統一',
    primary: '#32ff32',
    secondary: '#66ff66',
    accent: '#28a745',
    border: '#4d79ff',
    background: 'rgba(50, 255, 50, 0.05)',
    highlight: '#4dff4d',
    enabled: false
  },

  purple: {
    id: 'purple',
    name: '紫統一',
    primary: '#8000ff',
    secondary: '#a033ff',
    accent: '#6610f2',
    border: '#4d79ff',
    background: 'rgba(128, 0, 255, 0.05)',
    highlight: '#9933ff',
    enabled: false
  },

  orange: {
    id: 'orange',
    name: 'オレンジ統一',
    primary: '#ff6600',
    secondary: '#ff8533',
    accent: '#e55100',
    border: '#4d79ff',
    background: 'rgba(255, 102, 0, 0.05)',
    highlight: '#ff7a1a',
    enabled: false
  }
};

/**
 * カラー管理クラス
 */
export class ColorManager {
  private static instance: ColorManager;
  private currentConfig: ColorConfig;
  private cssVariables: Map<string, string> = new Map();

  private constructor() {
    // デフォルトは水色に設定
    this.currentConfig = { ...COLOR_PRESETS.cyan };
    this.updateCSSVariables();
  }

  static getInstance(): ColorManager {
    if (!ColorManager.instance) {
      ColorManager.instance = new ColorManager();
    }
    return ColorManager.instance;
  }

  /**
   * 現在のカラー設定を取得
   */
  getCurrentConfig(): ColorConfig {
    return { ...this.currentConfig };
  }

  /**
   * カラー設定を変更
   */
  setColorScheme(schemeId: string): void {
    const preset = COLOR_PRESETS[schemeId];
    if (preset && preset.enabled) {
      this.currentConfig = { ...preset };
      this.updateCSSVariables();
    }
  }

  /**
   * カスタムカラー設定を適用
   */
  setCustomColors(updates: Partial<ColorConfig>): void {
    this.currentConfig = { ...this.currentConfig, ...updates };
    this.updateCSSVariables();
  }

  /**
   * 特定の色だけを変更
   */
  updateColor(colorType: keyof Omit<ColorConfig, 'id' | 'name' | 'enabled'>, color: string): void {
    this.currentConfig[colorType] = color;
    this.updateCSSVariables();
  }

  /**
   * CSS変数を更新
   */
  private updateCSSVariables(): void {
    this.cssVariables.clear();
    
    // 統一カラー変数
    this.cssVariables.set('--unified-text-primary', this.currentConfig.primary);
    this.cssVariables.set('--unified-text-secondary', this.currentConfig.secondary);
    this.cssVariables.set('--unified-text-accent', this.currentConfig.accent);
    this.cssVariables.set('--unified-border-color', this.currentConfig.border);
    this.cssVariables.set('--unified-bg-color', this.currentConfig.background);
    this.cssVariables.set('--unified-highlight-color', this.currentConfig.highlight);

    // 既存の変数も更新（後方互換性）
    this.cssVariables.set('--unified-text-color', this.currentConfig.primary);
    this.cssVariables.set('--unified-accent-color', this.currentConfig.accent);

    // テキスト関連の詳細変数
    this.cssVariables.set('--text-h1', this.currentConfig.accent);
    this.cssVariables.set('--text-h2', this.currentConfig.primary);
    this.cssVariables.set('--text-h3', this.currentConfig.primary);
    this.cssVariables.set('--text-body', this.currentConfig.primary);
    this.cssVariables.set('--text-link', this.currentConfig.highlight);
    this.cssVariables.set('--text-button', this.currentConfig.accent);
  }

  /**
   * CSS変数を文字列として取得
   */
  getCSSVariablesString(): string {
    const cssRules = Array.from(this.cssVariables.entries())
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
    
    return `:root {\n${cssRules}\n}`;
  }

  /**
   * 動的にCSS変数をDOMに適用
   */
  applyToDOM(): void {
    if (typeof document === 'undefined') return;

    const styleId = 'unified-color-variables';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = this.getCSSVariablesString();
  }

  /**
   * 利用可能なカラースキーム一覧を取得
   */
  getAvailableSchemes(): ColorConfig[] {
    return Object.values(COLOR_PRESETS).filter(config => config.enabled);
  }

  /**
   * カラースキームを有効/無効にする
   */
  toggleScheme(schemeId: string, enabled: boolean): void {
    if (COLOR_PRESETS[schemeId]) {
      COLOR_PRESETS[schemeId].enabled = enabled;
    }
  }

  /**
   * 現在の色情報を取得（デバッグ用）
   */
  getColorInfo(): Record<string, string> {
    return {
      primary: this.currentConfig.primary,
      secondary: this.currentConfig.secondary,
      accent: this.currentConfig.accent,
      border: this.currentConfig.border,
      background: this.currentConfig.background,
      highlight: this.currentConfig.highlight
    };
  }
}

// シングルトンインスタンスをエクスポート
export const colorManager = ColorManager.getInstance();

// ユーティリティ関数
export const setColorScheme = (schemeId: string) => colorManager.setColorScheme(schemeId);
export const updateColor = (colorType: keyof Omit<ColorConfig, 'id' | 'name' | 'enabled'>, color: string) => 
  colorManager.updateColor(colorType, color);
export const getCurrentColors = () => colorManager.getCurrentConfig();
export const applyColors = () => colorManager.applyToDOM();