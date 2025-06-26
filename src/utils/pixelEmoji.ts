// 8-bitピクセル絵文字一元管理システム
// PROJECT_RULES.mdに基づく統一絵文字システム

export const PIXEL_EMOJI = {
  // ゲーム関連
  GAME: '▢',
  GAMEPAD: '▢', 
  TROPHY: '★',
  TARGET: '◉',
  
  // テクノロジー関連
  COMPUTER: '■',
  MOUSE: '◆',
  SETTINGS: '◎',
  CODE: '■',
  GITHUB: '■',
  
  // コミュニケーション関連
  EMAIL: '◆',
  TWITTER: '◈',
  DISCORD: '◆',
  COMMENT: '◆',
  LIKE: '◇',
  SHARE: '◈',
  
  // データ・統計関連
  CHART: '▣',
  DATA: '▣',
  STATS: '▣',
  NUMBER: '#',
  CALENDAR: '▤',
  GRAPH_UP: '↗',
  
  // UI・ナビゲーション関連
  FOLDER: '▣',
  ARCHIVE: '▤',
  PAGE: '▦',
  REFRESH: '◈',
  LINK: '◈',
  TAG: '◆',
  
  // クリエイティブ関連
  ART: '▨',
  PALETTE: '▨',
  PICTURE: '▢',
  GALLERY: '▢',
  PIXEL_ART: '▢',
  DESIGN: '◉',
  
  // 動物・キャラクター関連
  CAT: '◇',
  PET: '◇',
  
  // その他
  NOTE: '▦',
  INFO: '◆',
  WARNING: '◎',
  SPARKLE: '◎',
  COLLABORATION: '◇',
  CONTACT: '◆',
  
  // 飲食・日常関連
  COFFEE: '○',
  
  // ネットワーク・Web関連
  WEB: '◉',
  NETWORK: '◉',
  RSS: '◈',
  
  // 学習・研究関連
  BOOK: '▦',
  RESEARCH: '◈',
  UNIVERSITY: '◇',
  LEARNING: '▦',
  
  // 音楽・エンターテイメント関連
  MUSIC: '◇',
  
  // スポーツ・競技関連
  CURRENT_RANK: '★',
  
  // マップ・場所関連
  MAP: '■',
  
  // 時間・期間関連
  RECENT: '▣',
  
  // エージェント・キャラクター関連
  AGENT: '★',
  
  // 戦術・戦略関連
  TACTICS: '◈',
  DEFENSE: '◆',
  ATTACK: '◇',
  THINKING: '◆',
  
  // 目標・計画関連
  GOALS: '◉',
  
  // プロジェクト・作業関連
  PROJECT: '■',
  WORK: '◆'
} as const;

// 絵文字置換関数
export function getPixelEmoji(type: keyof typeof PIXEL_EMOJI): string {
  return PIXEL_EMOJI[type];
}

// よく使う絵文字パターンのヘルパー関数
export function formatSectionTitle(title: string, leftEmoji: keyof typeof PIXEL_EMOJI, rightEmoji?: keyof typeof PIXEL_EMOJI): string {
  const left = getPixelEmoji(leftEmoji);
  const right = rightEmoji ? getPixelEmoji(rightEmoji) : left;
  return `${left} ${title} ${right}`;
}

// カテゴリ別ヘルパー関数
export const CATEGORY_EMOJI = {
  tech: () => getPixelEmoji('COMPUTER'),
  game: () => getPixelEmoji('GAME'),
  art: () => getPixelEmoji('ART'),
  contact: () => getPixelEmoji('CONTACT'),
  data: () => getPixelEmoji('DATA'),
  social: () => getPixelEmoji('TWITTER'),
} as const;