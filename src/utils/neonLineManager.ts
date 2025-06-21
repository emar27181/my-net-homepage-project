/**
 * ネオンライン設定の一元管理システム
 * 全てのネオンサイン・ボーダー・ラインの設定を中央で管理
 */

// ネオンライン設定の型定義
export interface NeonLineConfig {
  id: string;
  name: string;
  color: string;
  intensity: 'low' | 'medium' | 'high' | 'ultra';
  thickness: 'thin' | 'normal' | 'thick' | 'ultra';
  animation: 'none' | 'pulse' | 'glow' | 'breathe' | 'flicker' | 'wave';
  blur: number;
  opacity: number;
  enabled: boolean;
}

// プリセットネオンライン設定
export const NEON_LINE_PRESETS: Record<string, NeonLineConfig> = {
  // メインカラー系
  primary: {
    id: 'primary',
    name: 'プライマリーブルー',
    color: '#4d79ff',
    intensity: 'high',
    thickness: 'normal',
    animation: 'pulse',
    blur: 10,
    opacity: 0.9,
    enabled: true
  },
  
  secondary: {
    id: 'secondary',
    name: 'セカンダリーパープル',
    color: '#8000ff',
    intensity: 'medium',
    thickness: 'normal',
    animation: 'glow',
    blur: 8,
    opacity: 0.8,
    enabled: true
  },
  
  // アクセントカラー系
  cyan: {
    id: 'cyan',
    name: 'サイバーシアン',
    color: '#00d4ff',
    intensity: 'high',
    thickness: 'thin',
    animation: 'breathe',
    blur: 12,
    opacity: 0.85,
    enabled: true
  },
  
  pink: {
    id: 'pink',
    name: 'ネオンピンク',
    color: '#ff1493',
    intensity: 'ultra',
    thickness: 'thick',
    animation: 'flicker',
    blur: 15,
    opacity: 0.95,
    enabled: true
  },
  
  lime: {
    id: 'lime',
    name: 'エレクトリックライム',
    color: '#32ff32',
    intensity: 'medium',
    thickness: 'normal',
    animation: 'wave',
    blur: 10,
    opacity: 0.8,
    enabled: true
  },
  
  // 状態表示用
  success: {
    id: 'success',
    name: '成功グリーン',
    color: '#00ff88',
    intensity: 'medium',
    thickness: 'thin',
    animation: 'glow',
    blur: 8,
    opacity: 0.8,
    enabled: true
  },
  
  warning: {
    id: 'warning',
    name: '警告オレンジ',
    color: '#ff6600',
    intensity: 'high',
    thickness: 'normal',
    animation: 'pulse',
    blur: 10,
    opacity: 0.9,
    enabled: true
  },
  
  error: {
    id: 'error',
    name: 'エラーレッド',
    color: '#ff3333',
    intensity: 'ultra',
    thickness: 'thick',
    animation: 'flicker',
    blur: 12,
    opacity: 0.95,
    enabled: true
  },
  
  // 特殊効果用
  gradient: {
    id: 'gradient',
    name: 'レインボーグラデーション',
    color: 'linear-gradient(45deg, #ff0080, #00d4ff, #32ff32, #ff6600)',
    intensity: 'ultra',
    thickness: 'ultra',
    animation: 'wave',
    blur: 20,
    opacity: 0.7,
    enabled: true
  },
  
  subtle: {
    id: 'subtle',
    name: 'サブトルホワイト',
    color: '#ffffff',
    intensity: 'low',
    thickness: 'thin',
    animation: 'none',
    blur: 5,
    opacity: 0.5,
    enabled: true
  }
};

// インテンシティのマッピング
const INTENSITY_MAP = {
  low: { shadowCount: 1, maxBlur: 5, brightness: 1 },
  medium: { shadowCount: 2, maxBlur: 10, brightness: 1.2 },
  high: { shadowCount: 3, maxBlur: 15, brightness: 1.4 },
  ultra: { shadowCount: 4, maxBlur: 20, brightness: 1.6 }
};

// 太さのマッピング
const THICKNESS_MAP = {
  thin: 1,
  normal: 2,
  thick: 3,
  ultra: 4
};

/**
 * ネオンライン管理クラス
 */
export class NeonLineManager {
  private static instance: NeonLineManager;
  private configs: Map<string, NeonLineConfig> = new Map();
  private cssVariables: Map<string, string> = new Map();

  private constructor() {
    // プリセットを初期化
    Object.values(NEON_LINE_PRESETS).forEach(config => {
      this.configs.set(config.id, { ...config });
    });
    this.updateCSSVariables();
  }

  static getInstance(): NeonLineManager {
    if (!NeonLineManager.instance) {
      NeonLineManager.instance = new NeonLineManager();
    }
    return NeonLineManager.instance;
  }

  /**
   * ネオンライン設定を取得
   */
  getConfig(id: string): NeonLineConfig | undefined {
    return this.configs.get(id);
  }

  /**
   * 全ネオンライン設定を取得
   */
  getAllConfigs(): NeonLineConfig[] {
    return Array.from(this.configs.values());
  }

  /**
   * ネオンライン設定を更新
   */
  updateConfig(id: string, updates: Partial<NeonLineConfig>): void {
    const existing = this.configs.get(id);
    if (existing) {
      this.configs.set(id, { ...existing, ...updates });
      this.updateCSSVariables();
    }
  }

  /**
   * 新しいネオンライン設定を追加
   */
  addConfig(config: NeonLineConfig): void {
    this.configs.set(config.id, config);
    this.updateCSSVariables();
  }

  /**
   * ネオンライン設定を削除
   */
  removeConfig(id: string): void {
    this.configs.delete(id);
    this.updateCSSVariables();
  }

  /**
   * CSS変数を更新
   */
  private updateCSSVariables(): void {
    this.cssVariables.clear();
    
    this.configs.forEach(config => {
      if (!config.enabled) return;

      const prefix = `--neon-line-${config.id}`;
      const intensity = INTENSITY_MAP[config.intensity];
      const thickness = THICKNESS_MAP[config.thickness];

      // 基本プロパティ
      this.cssVariables.set(`${prefix}-color`, config.color);
      this.cssVariables.set(`${prefix}-thickness`, `${thickness}px`);
      this.cssVariables.set(`${prefix}-opacity`, config.opacity.toString());
      this.cssVariables.set(`${prefix}-blur`, `${config.blur}px`);

      // シャドウ効果を生成
      const shadows = this.generateShadows(config, intensity);
      this.cssVariables.set(`${prefix}-shadow`, shadows);

      // アニメーション
      if (config.animation !== 'none') {
        this.cssVariables.set(`${prefix}-animation`, `neon-${config.animation} 2s infinite`);
      }

      // ボーダースタイル（完全版）
      const borderStyle = this.generateBorderStyle(config, intensity, thickness);
      this.cssVariables.set(`${prefix}-border-style`, borderStyle);
    });
  }

  /**
   * シャドウ効果を生成
   */
  private generateShadows(config: NeonLineConfig, intensity: any): string {
    const shadows = [];
    const baseColor = config.color;
    
    // インナーシャドウ
    shadows.push(`inset 0 0 ${config.blur}px ${baseColor.includes('gradient') ? '#4d79ff' : baseColor}${Math.round(config.opacity * 51).toString(16)}`);
    
    // アウターシャドウ（複数層）
    for (let i = 1; i <= intensity.shadowCount; i++) {
      const blur = (config.blur * i);
      const spread = i === 1 ? 0 : Math.floor(blur * 0.1);
      shadows.push(`0 0 ${blur}px ${spread}px ${baseColor.includes('gradient') ? '#4d79ff' : baseColor}`);
    }

    return shadows.join(', ');
  }

  /**
   * 完全なボーダースタイルを生成
   */
  private generateBorderStyle(config: NeonLineConfig, intensity: any, thickness: number): string {
    const color = config.color.includes('gradient') ? '#4d79ff' : config.color;
    return `${thickness}px solid ${color}`;
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

    const styleId = 'neon-line-variables';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = this.getCSSVariablesString();
  }

  /**
   * 特定のネオンラインのクラス名を取得
   */
  getClassName(id: string, size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): string {
    const config = this.configs.get(id);
    if (!config || !config.enabled) return '';

    return `neon-line-${id} neon-line-${size}`;
  }

  /**
   * インラインスタイルを生成
   */
  getInlineStyle(id: string): string {
    const config = this.configs.get(id);
    if (!config || !config.enabled) return '';

    return `
      border: var(--neon-line-${id}-border-style);
      box-shadow: var(--neon-line-${id}-shadow);
      ${config.animation !== 'none' ? `animation: var(--neon-line-${id}-animation);` : ''}
    `.trim();
  }
}

// シングルトンインスタンスをエクスポート
export const neonLineManager = NeonLineManager.getInstance();

// ユーティリティ関数
export const getNeonLineConfig = (id: string) => neonLineManager.getConfig(id);
export const updateNeonLine = (id: string, updates: Partial<NeonLineConfig>) => 
  neonLineManager.updateConfig(id, updates);
export const getNeonLineClass = (id: string, size?: 'sm' | 'md' | 'lg' | 'xl') => 
  neonLineManager.getClassName(id, size);
export const getNeonLineStyle = (id: string) => neonLineManager.getInlineStyle(id);