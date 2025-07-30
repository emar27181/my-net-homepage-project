/**
 * デコメ（動くGIF絵文字）ユーティリティ
 * 2000年代アメブロ風デコメの管理と生成
 */

export type DekomeType = 
  | 'heart-pink'        // ピンクハート
  | 'heart-rainbow'     // レインボーハート
  | 'star-twinkle'      // キラキラ星
  | 'star-shooting'     // 流れ星
  | 'flower-sakura'     // 桜
  | 'flower-cute'       // かわいい花
  | 'cat-wink'          // ウインク猫
  | 'cat-dance'         // 踊る猫
  | 'face-happy'        // 笑顔
  | 'face-love'         // 恋愛顔
  | 'sparkle-gold'      // 金のキラキラ
  | 'sparkle-rainbow'   // レインボーキラキラ
  | 'crown-princess'    // プリンセス王冠
  | 'butterfly'         // 蝶々
  | 'music-note'        // 音符
  | 'game-controller'   // ゲームコントローラー
  | 'computer'          // パソコン
  | 'coffee-steam';     // コーヒー湯気

export type DekomeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DekomeAnimation = 'none' | 'bounce' | 'pulse' | 'wiggle' | 'glow';
export type DekomeContext = 'text' | 'heading' | 'button' | 'default';

export interface DekomeConfig {
  type: DekomeType;
  size?: DekomeSize;
  animation?: DekomeAnimation;
  context?: DekomeContext;
  customClass?: string;
  alt?: string;
}

// デコメカテゴリー定義
export const DekomeCategories = {
  emotions: ['face-happy', 'face-love', 'heart-pink', 'heart-rainbow'] as const,
  nature: ['flower-sakura', 'flower-cute', 'butterfly'] as const,
  sparkles: ['star-twinkle', 'star-shooting', 'sparkle-gold', 'sparkle-rainbow'] as const,
  animals: ['cat-wink', 'cat-dance'] as const,
  tech: ['computer', 'game-controller'] as const,
  lifestyle: ['coffee-steam', 'music-note', 'crown-princess'] as const
} as const;

// プリセット定義
export const DekomePresets = {
  // 感情表現
  happy: { type: 'face-happy', animation: 'bounce' } as const,
  love: { type: 'heart-pink', animation: 'pulse' } as const,
  excited: { type: 'star-twinkle', animation: 'wiggle' } as const,
  
  // コンテンツ用
  title: { type: 'sparkle-gold', size: 'md', context: 'heading' } as const,
  section: { type: 'star-twinkle', size: 'sm', context: 'heading' } as const,
  
  // ゲーム関連
  gaming: { type: 'game-controller', animation: 'bounce' } as const,
  victory: { type: 'crown-princess', animation: 'glow' } as const,
  
  // 日常
  work: { type: 'computer', size: 'sm' } as const,
  coffee: { type: 'coffee-steam', animation: 'pulse' } as const,
  music: { type: 'music-note', animation: 'wiggle' } as const,
  
  // 自然・可愛い系
  sakura: { type: 'flower-sakura', animation: 'pulse' } as const,
  cute: { type: 'cat-wink', animation: 'bounce' } as const,
  nature: { type: 'butterfly', animation: 'wiggle' } as const
} as const;

/**
 * デコメクラス生成
 */
export function createDekomeClass(config: DekomeConfig): string {
  const classes: string[] = ['dekome'];
  
  // サイズクラス
  if (config.size) {
    classes.push(`dekome-${config.size}`);
  }
  
  // アニメーションクラス
  if (config.animation && config.animation !== 'none') {
    classes.push(`dekome-${config.animation}`);
  }
  
  // コンテキストクラス
  if (config.context && config.context !== 'default') {
    classes.push(`dekome-${config.context}`);
  }
  
  // カスタムクラス
  if (config.customClass) {
    classes.push(config.customClass);
  }
  
  return classes.join(' ');
}

/**
 * プリセット適用
 */
export function applyDekomePreset(presetName: keyof typeof DekomePresets): DekomeConfig {
  return { ...DekomePresets[presetName] };
}

/**
 * ランダムデコメ生成
 */
export function getRandomDekome(category?: keyof typeof DekomeCategories): DekomeConfig {
  let types: readonly DekomeType[];
  
  if (category && DekomeCategories[category]) {
    types = DekomeCategories[category];
  } else {
    // 全てのタイプからランダム選択
    types = Object.values(DekomeCategories).flat();
  }
  
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomAnimation: DekomeAnimation = ['none', 'bounce', 'pulse', 'wiggle'][Math.floor(Math.random() * 4)] as DekomeAnimation;
  
  return {
    type: randomType,
    animation: randomAnimation,
    size: 'sm'
  };
}

/**
 * 感情に基づくデコメ推奨
 */
export function getDekomeByEmotion(emotion: 'happy' | 'love' | 'excited' | 'cute' | 'cool'): DekomeConfig {
  const emotionMap: Record<string, DekomeConfig> = {
    happy: { type: 'face-happy', animation: 'bounce', size: 'sm' },
    love: { type: 'heart-rainbow', animation: 'pulse', size: 'md' },
    excited: { type: 'star-twinkle', animation: 'wiggle', size: 'sm' },
    cute: { type: 'cat-wink', animation: 'bounce', size: 'sm' },
    cool: { type: 'sparkle-gold', animation: 'glow', size: 'md' }
  };
  
  return emotionMap[emotion] || emotionMap.happy;
}

/**
 * カテゴリー別デコメ一覧取得
 */
export function getDekomesByCategory(category: keyof typeof DekomeCategories): DekomeType[] {
  return [...DekomeCategories[category]];
}

/**
 * 全デコメタイプ取得
 */
export function getAllDekomeTypes(): DekomeType[] {
  return Object.values(DekomeCategories).flat();
}

/**
 * プリセット一覧取得
 */
export function getAvailablePresets(): Array<keyof typeof DekomePresets> {
  return Object.keys(DekomePresets) as Array<keyof typeof DekomePresets>;
}

/**
 * 使用推奨デコメ（文脈別）
 */
export const ContextRecommendations = {
  // ページタイトル
  pageTitle: [
    { type: 'sparkle-rainbow', size: 'lg', animation: 'glow' },
    { type: 'crown-princess', size: 'md', animation: 'pulse' },
    { type: 'star-shooting', size: 'lg', animation: 'wiggle' }
  ],
  
  // セクション見出し
  sectionHeading: [
    { type: 'star-twinkle', size: 'md', animation: 'pulse' },
    { type: 'sparkle-gold', size: 'sm', animation: 'glow' },
    { type: 'flower-cute', size: 'sm', animation: 'bounce' }
  ],
  
  // 本文強調
  textEmphasis: [
    { type: 'heart-pink', size: 'sm', animation: 'pulse' },
    { type: 'face-happy', size: 'sm', animation: 'bounce' },
    { type: 'star-twinkle', size: 'xs', animation: 'wiggle' }
  ],
  
  // ゲーム関連
  gaming: [
    { type: 'game-controller', size: 'sm', animation: 'bounce' },
    { type: 'crown-princess', size: 'md', animation: 'glow' },
    { type: 'star-shooting', size: 'sm', animation: 'wiggle' }
  ],
  
  // 作品・アート関連
  creative: [
    { type: 'butterfly', size: 'sm', animation: 'wiggle' },
    { type: 'flower-sakura', size: 'sm', animation: 'pulse' },
    { type: 'sparkle-rainbow', size: 'md', animation: 'glow' }
  ],
  
  // 技術・開発関連
  tech: [
    { type: 'computer', size: 'sm', animation: 'pulse' },
    { type: 'sparkle-gold', size: 'xs', animation: 'glow' },
    { type: 'star-twinkle', size: 'sm', animation: 'bounce' }
  ]
} as const;

/**
 * 文脈別推奨デコメ取得
 */
export function getRecommendedDekome(context: keyof typeof ContextRecommendations): DekomeConfig {
  const recommendations = ContextRecommendations[context];
  const randomIndex = Math.floor(Math.random() * recommendations.length);
  return recommendations[randomIndex];
}