/**
 * アメブロ公式デコメGIFシステム
 * 2000年代アメブロ風の動く絵文字を管理
 */

// アメブロデコメタイプ定義（JSONデータベースと同期）
export type AmebloDekomeType = 
  | 'heart-pink'        // ピンクハート
  | 'heart-rainbow'     // レインボーハート  
  | 'heart-beating'     // 鼓動ハート
  | 'star-twinkle'      // キラキラ星
  | 'star-shooting'     // 流れ星
  | 'sparkle-gold'      // 金のキラキラ
  | 'sparkle-rainbow'   // レインボーキラキラ
  | 'cat-wink'          // ウインク猫
  | 'cat-dance'         // 踊る猫
  | 'butterfly'         // 蝶々
  | 'flower-sakura'     // 桜
  | 'flower-cute'       // 可愛い花
  | 'face-happy'        // 笑顔
  | 'face-love'         // ラブリー
  | 'face-wink'         // ウインク
  | 'crown-princess'    // プリンセス王冠
  | 'music-note'        // 音符
  | 'game-controller'   // ゲームコントローラー
  | 'computer'          // パソコン
  | 'coffee-steam'      // コーヒー
  | 'clock'             // 時計
  | 'thought-bubble';   // 思考バブル

export type DekomeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DekomeEmoji {
  url: string;
  alt: string;
  author: string;
  description: string;
}

export interface DekomeCategory {
  name: string;
  emojis: Record<string, DekomeEmoji>;
}

export interface AmebloDekomeData {
  metadata: {
    title: string;
    description: string;
    version: string;
    lastUpdated: string;
    usage: string;
    note: string;
  };
  categories: Record<string, DekomeCategory>;
}

// アメブロ風動くGIF URLマッピング（利用可能フリー素材）
const AMEBLO_DEKOME_URLS: Record<AmebloDekomeType, string> = {
  'heart-pink': 'https://media.giphy.com/media/3oKIPnAI0k3oztVvoI/giphy.gif',
  'heart-rainbow': 'https://media.giphy.com/media/l0Exk8EUzhhMjzqWQ/giphy.gif',
  'heart-beating': 'https://media.giphy.com/media/3oz8xJhJTB6pZ6TrIk/giphy.gif',
  'star-twinkle': 'https://media.giphy.com/media/xT5LMzIK1AdZJ4cYW4/giphy.gif',
  'star-shooting': 'https://media.giphy.com/media/3o7aCZDlmQZLe4Q8pO/giphy.gif',
  'sparkle-gold': 'https://media.giphy.com/media/26FLgGTPUDH6UGAbm/giphy.gif',
  'sparkle-rainbow': 'https://media.giphy.com/media/l0ExhcMymdL6TrZ84/giphy.gif',
  'cat-wink': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  'cat-dance': 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
  'butterfly': 'https://media.giphy.com/media/26FeVHrCvkr4IBSuI/giphy.gif',
  'flower-sakura': 'https://media.giphy.com/media/l46CsTPYZdJUOLjTW/giphy.gif',
  'flower-cute': 'https://media.giphy.com/media/3o6fJrp8UNnSDTJ7oI/giphy.gif',
  'face-happy': 'https://media.giphy.com/media/AeWoyE3ZT90YM/giphy.gif',
  'face-love': 'https://media.giphy.com/media/3o6Ztb4VFHtAfPUl8c/giphy.gif',
  'face-wink': 'https://media.giphy.com/media/3oxHQBKYmF9PKUa6wU/giphy.gif',
  'crown-princess': 'https://media.giphy.com/media/3o6ZtecPIFKdCzP2Dm/giphy.gif',
  'music-note': 'https://media.giphy.com/media/3oriO13KTkzPwTykp2/giphy.gif',
  'game-controller': 'https://media.giphy.com/media/3o7aCSPqXE5C6T8tBC/giphy.gif',
  'computer': 'https://media.giphy.com/media/3o6MbpOCVEOK5JHTBK/giphy.gif',
  'coffee-steam': 'https://media.giphy.com/media/3o6ozDGSyL0vFJIrGU/giphy.gif',
  'clock': 'https://media.giphy.com/media/3o6fJeAiIpk5EeoC8o/giphy.gif',
  'thought-bubble': 'https://media.giphy.com/media/3o6QZhOe8CzZbzUwrS/giphy.gif'
};

// デフォルトalt文字列
const DEKOME_ALTS: Record<AmebloDekomeType, string> = {
  'heart-pink': 'ピンクハート',
  'heart-rainbow': 'レインボーハート',
  'heart-beating': '鼓動ハート',
  'star-twinkle': 'キラキラ星',
  'star-shooting': '流れ星',
  'sparkle-gold': '金のキラキラ',
  'sparkle-rainbow': 'レインボーキラキラ',
  'cat-wink': 'ウインク猫',
  'cat-dance': '踊る猫',
  'butterfly': '蝶々',
  'flower-sakura': '桜',
  'flower-cute': '可愛い花',
  'face-happy': '笑顔',
  'face-love': 'ラブリー',
  'face-wink': 'ウインク',
  'crown-princess': 'プリンセス王冠',
  'music-note': '音符',
  'game-controller': 'ゲームコントローラー',
  'computer': 'パソコン',
  'coffee-steam': 'コーヒー',
  'clock': '時計',
  'thought-bubble': '思考バブル'
};

// サイズマッピング（Tailwind CSS対応）
export const DEKOME_SIZE_CLASSES: Record<DekomeSize, string> = {
  'xs': 'w-3 h-3',      // 12px
  'sm': 'w-4 h-4',      // 16px  
  'md': 'w-5 h-5',      // 20px
  'lg': 'w-6 h-6',      // 24px
  'xl': 'w-8 h-8'       // 32px
};

/**
 * アメブロデコメGIF URLを取得
 */
export function getAmebloDekomeUrl(type: AmebloDekomeType): string {
  return AMEBLO_DEKOME_URLS[type];
}

/**
 * デコメの代替テキストを取得
 */
export function getDekomeAlt(type: AmebloDekomeType): string {
  return DEKOME_ALTS[type];
}

/**
 * サイズクラスを取得
 */
export function getDekomeSize(size: DekomeSize): string {
  return DEKOME_SIZE_CLASSES[size];
}

/**
 * 利用可能なデコメタイプ一覧を取得
 */
export function getAvailableDekomeTypes(): AmebloDekomeType[] {
  return Object.keys(AMEBLO_DEKOME_URLS) as AmebloDekomeType[];
}

/**
 * カテゴリ別デコメタイプを取得
 */
export function getDekomesByCategory(): Record<string, AmebloDekomeType[]> {
  return {
    heart: ['heart-pink', 'heart-rainbow', 'heart-beating'],
    star: ['star-twinkle', 'star-shooting', 'sparkle-gold', 'sparkle-rainbow'],
    animal: ['cat-wink', 'cat-dance', 'butterfly'],
    flower: ['flower-sakura', 'flower-cute'],
    face: ['face-happy', 'face-love', 'face-wink'],
    accessory: ['crown-princess'],
    music: ['music-note'],
    technology: ['game-controller', 'computer'],
    misc: ['coffee-steam', 'clock', 'thought-bubble']
  };
}

/**
 * ランダムデコメタイプを取得
 */
export function getRandomDekome(): AmebloDekomeType {
  const types = getAvailableDekomeTypes();
  return types[Math.floor(Math.random() * types.length)];
}

/**
 * カテゴリからランダムデコメを取得
 */
export function getRandomDekomeFromCategory(category: keyof ReturnType<typeof getDekomesByCategory>): AmebloDekomeType {
  const categoryTypes = getDekomesByCategory()[category];
  if (!categoryTypes || categoryTypes.length === 0) {
    return getRandomDekome();
  }
  return categoryTypes[Math.floor(Math.random() * categoryTypes.length)];
}