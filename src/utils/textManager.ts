// テキスト表示を一元管理するユーティリティ
// 設定を変更すれば全サイトに反映される

import { jaTexts, enTexts, type TextContent } from '../data/textContent';

export type Language = 'ja' | 'en';

export class TextManager {
  private static instance: TextManager;
  private currentLanguage: Language = 'ja';
  private texts: TextContent;

  private constructor() {
    this.loadTexts();
  }

  static getInstance(): TextManager {
    if (!TextManager.instance) {
      TextManager.instance = new TextManager();
    }
    return TextManager.instance;
  }

  /**
   * テキストを取得する
   * @param path ドット記法でのパス（例: 'site.title', 'ui.readMore'）
   * @returns 対応するテキスト
   */
  getText(path: string): string {
    try {
      return this.getNestedValue(this.texts, path) || path;
    } catch (error) {
      console.warn(`Text not found for path: ${path}`);
      return path;
    }
  }

  /**
   * 言語を設定する
   * @param lang 設定する言語
   */
  setLanguage(lang: Language): void {
    this.currentLanguage = lang;
    this.loadTexts();
  }

  /**
   * 現在の言語を取得する
   */
  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  /**
   * 状態メッセージを取得する（準備中、データ収集中など）
   * @param status 状態の種類
   */
  getStatus(status: 'preparing' | 'dataCollecting' | 'comingSoon' | 'underConstruction'): string {
    return this.getText(`status.${status}`);
  }

  /**
   * UIテキストを取得する
   * @param key UIテキストのキー
   */
  getUI(key: string): string {
    return this.getText(`ui.${key}`);
  }

  /**
   * ナビゲーションテキストを取得する
   * @param page ページ名
   */
  getNav(page: string): string {
    return this.getText(`navigation.${page}`);
  }

  /**
   * ページタイトルを取得する
   * @param page ページ名
   */
  getPageTitle(page: string): string {
    return this.getText(`pageTitles.${page}`);
  }

  /**
   * サイト情報を取得する
   * @param key サイト情報のキー
   */
  getSite(key: string): string {
    return this.getText(`site.${key}`);
  }

  private loadTexts(): void {
    this.texts = this.currentLanguage === 'ja' ? jaTexts : enTexts;
  }

  private getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }
}

// シングルトンインスタンスを作成
export const textManager = TextManager.getInstance();

// よく使用される関数のショートカット
export const t = (path: string): string => textManager.getText(path);
export const tStatus = (status: 'preparing' | 'dataCollecting' | 'comingSoon' | 'underConstruction'): string => textManager.getStatus(status);
export const tUI = (key: string): string => textManager.getUI(key);
export const tNav = (page: string): string => textManager.getNav(page);
export const tPageTitle = (page: string): string => textManager.getPageTitle(page);
export const tSite = (key: string): string => textManager.getSite(key);

// Astroコンポーネント用のヘルパー関数
export function useText() {
  return {
    t,
    tStatus,
    tUI,
    tNav,
    tPageTitle,
    tSite,
    setLanguage: (lang: Language) => textManager.setLanguage(lang),
    getCurrentLanguage: () => textManager.getCurrentLanguage()
  };
}