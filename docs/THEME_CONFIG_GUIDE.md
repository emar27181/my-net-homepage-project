# テーマカラー設定ガイド

## 概要

このプロジェクトでは、サイト全体の色を **1つの設定ファイル** から一元管理しています。

## 設定ファイルの場所

```
src/config/themeConfig.ts
```

## 色を変更する方法

### 1. テーマの色相（HUE）を変更

`src/config/themeConfig.ts` を開き、`THEME_CONFIG.HUE` の値を変更するだけです：

```typescript
export const THEME_CONFIG = {
  // 色相 (0-360)
  HUE: 225,  // ← この値を変更

  // 例:
  // 0   = 赤
  // 30  = オレンジ
  // 60  = 黄色
  // 120 = 緑
  // 180 = シアン
  // 225 = ネオンブルー（現在の設定）
  // 240 = 青
  // 270 = 紫
  // 300 = マゼンタ
};
```

### 2. 設定を反映

設定ファイルを変更したら、開発サーバーを再起動してください：

```bash
npm run dev
```

## 色の管理方式

### CSS変数システム

すべてのコンポーネントは以下のCSS変数を使用しています：

```css
:root {
  --theme-primary: #4d79ff;        /* メインカラー */
  --theme-primary-rgb: 77, 121, 255; /* RGB形式 */
  --theme-shadow: rgba(77, 121, 255, 0.3); /* シャドウ用 */
}
```

### 使用例

#### Astroコンポーネント内

```typescript
import { getCurrentThemeColors } from "../config/themeConfig";

const colors = getCurrentThemeColors();
// colors.primary = "hsl(225, 100%, 65%)"
```

#### CSSファイル内

```css
.my-element {
  color: var(--theme-primary);
  border: 2px solid var(--theme-primary);
  box-shadow: 0 0 10px rgba(var(--theme-primary-rgb), 0.3);
}
```

## ファイル構成

```
src/
├── config/
│   └── themeConfig.ts          # ← 色の設定ファイル（ここだけ編集）
├── styles/
│   └── global.css              # CSS変数定義
├── pages/
│   └── index.astro             # テーマカラーを使用
└── components/
    ├── YouTubeClipViewer.astro # CSS変数を使用
    ├── EmbeddedVideoViewer.astro
    └── ...
```

## 注意事項

### ハードコードの禁止

❌ **悪い例**：色を直接指定
```css
.element {
  color: #4d79ff; /* ハードコード */
}
```

✅ **良い例**：CSS変数を使用
```css
.element {
  color: var(--theme-primary);
}
```

### RGB形式の使用

アルファ値付きの色を使う場合は `--theme-primary-rgb` を使用：

```css
.element {
  background: rgba(var(--theme-primary-rgb), 0.1);
}
```

## よくある質問

### Q1: なぜHSL形式を使うのか？

**A**: HSL（色相・彩度・明度）は色の調整が直感的です。色相を変えるだけで、全体のトーンを保ったまま別の色に変更できます。

### Q2: 複数のテーマを切り替えたい

**A**: `getThemeColorsByHue()` 関数を使って動的に生成できます：

```typescript
const redTheme = getThemeColorsByHue(0);   // 赤
const blueTheme = getThemeColorsByHue(225); // 青
```

### Q3: 一部のコンポーネントだけ色を変えたい

**A**: そのコンポーネントに独自のCSS変数を定義するか、インラインスタイルで上書きできます。

## まとめ

- **色を変えたい** → `src/config/themeConfig.ts` の `HUE` を変更
- **新しいコンポーネント** → `var(--theme-primary)` を使用
- **ハードコード禁止** → 常に設定ファイルかCSS変数を参照
