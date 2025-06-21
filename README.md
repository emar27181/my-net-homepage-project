# 🌟 nodoame's Retro Portfolio

2000年代初頭のレトロなホームページ風ポートフォリオサイト

## 📝 概要

このサイトは、**nodoame**（のどあめ）のポートフォリオサイトです。  
懐かしい2000年代のWeb文化を現代の技術で再現し、レトロな雰囲気の中でプロフィール・作品・活動を紹介しています。

### 🎨 デザインコンセプト
- **レトロWeb**: 2000年代初頭のHTML4時代を彷彿とさせるデザイン
- **テーブルレイアウト風**: CSS GridとFlexboxを使用してテーブルレイアウトを再現
- **ピクセルフォント**: Press Start 2P、VT323を使用したドット絵風フォント
- **アニメーション**: マーキースクロール、フローティングアイコンなど懐かしい動き
- **パステルカラー**: ピンク・水色・薄緑を基調とした優しい色合い

## 🛠️ 技術スタック

- **Framework**: [Astro](https://astro.build/) v4.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4.x
- **Fonts**: Google Fonts (Press Start 2P, VT323)
- **Deployment**: [Netlify](https://netlify.com)
- **Language**: TypeScript + HTML + CSS

## 📂 プロジェクト構成

```
my-net-homepage-project/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # ベースレイアウトコンポーネント
│   ├── components/
│   │   └── Navigation.astro      # ナビゲーションバーコンポーネント
│   ├── pages/
│   │   ├── index.astro          # トップページ
│   │   ├── about.astro          # 自己紹介（Q&A形式）
│   │   ├── gallery.astro        # 作品ギャラリー
│   │   ├── game.astro           # ゲーム情報（VALORANT中心）
│   │   ├── dev.astro            # 開発・研究活動
│   │   ├── blog.astro           # ブログ・日記
│   │   └── link.astro           # リンク集・相互リンク
│   └── styles/
│       └── global.css           # グローバルスタイル・レトロ用CSS
├── public/
│   ├── images/
│   │   └── bg-pattern.css       # 背景パターン用CSS
│   └── icons/                   # アニメGIF・アイコン類
├── astro.config.mjs             # Astro設定ファイル
├── netlify.toml                 # Netlifyデプロイ設定
├── tailwind.config.js           # Tailwind CSS設定
└── PROJECT_RULES.md             # 開発ルール
```

## 🎯 ページ別機能

### 🏠 トップページ (index.astro)
- プロフィール概要
- 最近の活動更新
- マーキースクロールでの更新情報
- 訪問者カウンター風演出
- フローティングアニメーション

### 😊 自己紹介 (about.astro)  
- Q&A形式での詳細プロフィール
- スキル・得意分野の紹介
- 好きなもの・趣味の詳細
- SNS・連絡先情報

### 🎨 ギャラリー (gallery.astro)
- カテゴリー別作品展示
- フィルター機能（猫イラスト、漫画模写、ロゴ、ピクセルアート、ジェネラティブアート）
- 作品詳細情報（制作日、使用ソフト、コメント）
- 制作依頼情報

### 🎮 ゲーム (game.astro)
- VALORANTの戦績・ランク情報
- エージェント別プレイスタイル解説
- 最近の試合結果
- デバイス・設定情報
- 今後の目標

### 💻 開発 (dev.astro)
- 技術スタック・使用言語
- 主要プロジェクト紹介
- 大学での研究活動
- 技術記事・ブログ投稿
- コラボレーション・お仕事情報

### 📝 ブログ (blog.astro)
- 日常・技術・創作活動の記事
- カテゴリー別フィルター機能
- タグクラウド
- アーカイブ機能

### 🔗 リンク (link.astro)
- 相互リンク・友達サイト
- 技術系参考サイト
- デザイン・インスピレーション
- レトロWeb・懐かしサイト
- リンクポリシー・申請方法

## 🚀 開発・デプロイ

### ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

### Netlifyデプロイ

1. GitHubリポジトリをNetlifyに連携
2. ビルド設定: `npm run build`
3. 公開ディレクトリ: `dist`
4. 自動デプロイが実行される

## 🎨 カスタマイズ

### レトロスタイルの調整

`src/styles/global.css` でレトロなスタイルを調整可能：

- CSS変数でカラーパレット変更
- `.retro-button` でボタンスタイル調整  
- `.retro-frame` でフレーム装飾変更
- 背景パターンのカスタマイズ

### フォントの変更

Google Fontsから他のピクセルフォントに変更可能：
- Orbitron
- Share Tech Mono  
- Major Mono Display
- など

## 📱 レスポンシブ対応

- **デスクトップ**: 最大幅800pxのレトロなレイアウト
- **タブレット**: 2カラム→1カラムへの切り替え
- **スマートフォン**: 縦積みレイアウト
- **レトロ感維持**: 小画面でもテーブル風デザインを保持

## 🔒 SEO・パフォーマンス

- **メタタグ最適化**: 各ページに適切なタイトル・説明
- **構造化データ**: 個人ポートフォリオとして検索エンジン対応
- **画像最適化**: WebP形式での配信推奨
- **静的生成**: Astroによる高速な静的サイト

## 📄 ライセンス

このプロジェクトは個人ポートフォリオとして作成されています。  
コードの参考利用は自由ですが、コンテンツ（文章・プロフィール情報）の無断転用はご遠慮ください。

## 💌 お問い合わせ

- **Email**: nodoame@example.com
- **Twitter**: [@nodoame_art](https://twitter.com/nodoame_art)
- **GitHub**: [nodoame](https://github.com/nodoame)

---

**🌟 Made with Astro + Tailwind CSS + Love for Retro Web Culture 🌟**
