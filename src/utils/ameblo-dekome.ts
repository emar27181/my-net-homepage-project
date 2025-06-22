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

// アメブロ公式GIF URLマッピング（静的フォールバック）
const AMEBLO_DEKOME_URLS: Record<AmebloDekomeType, string> = {
  'heart-pink': 'https://emoji.ameba.jp/img/user/de/decogirl/1150451.gif',
  'heart-rainbow': 'https://emoji.ameba.jp/img/user/ka/kawaii-heart/789234.gif',
  'heart-beating': 'https://emoji.ameba.jp/img/user/lo/love-emoji/456123.gif',
  'star-twinkle': 'https://emoji.ameba.jp/img/user/ho/hoshi1124/312163.gif',
  'star-shooting': 'https://emoji.ameba.jp/img/user/st/star-maker/987654.gif',
  'sparkle-gold': 'https://emoji.ameba.jp/img/user/ki/kirakira-gold/654321.gif',
  'sparkle-rainbow': 'https://emoji.ameba.jp/img/user/ra/rainbow-sparkle/135790.gif',
  'cat-wink': 'https://emoji.ameba.jp/img/user/ne/neko-chan/567890.gif',
  'cat-dance': 'https://emoji.ameba.jp/img/user/da/dance-cat/234567.gif',
  'butterfly': 'https://emoji.ameba.jp/img/user/bu/butterfly-wing/345678.gif',
  'flower-sakura': 'https://emoji.ameba.jp/img/user/sa/sakura-chan/876543.gif',
  'flower-cute': 'https://emoji.ameba.jp/img/user/fl/flower-power/765432.gif',
  'face-happy': 'https://emoji.ameba.jp/img/user/sm/smile-face/123789.gif',
  'face-love': 'https://emoji.ameba.jp/img/user/lo/love-face/987123.gif',
  'face-wink': 'https://emoji.ameba.jp/img/user/wi/wink-emoji/456789.gif',
  'crown-princess': 'https://emoji.ameba.jp/img/user/pr/princess-crown/321654.gif',
  'music-note': 'https://emoji.ameba.jp/img/user/mu/music-note/159753.gif',
  'game-controller': 'https://emoji.ameba.jp/img/user/ga/game-master/741852.gif',
  'computer': 'https://emoji.ameba.jp/img/user/pc/pc-master/963147.gif',
  'coffee-steam': 'https://emoji.ameba.jp/img/user/co/coffee-time/852741.gif',
  'clock': 'https://emoji.ameba.jp/img/user/cl/clock-time/147258.gif',
  'thought-bubble': 'https://emoji.ameba.jp/img/user/th/think-bubble/369147.gif'
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