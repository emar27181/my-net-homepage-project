// サイト全体のテキスト内容を一元管理するシステム
// 設定を変更すれば全サイトに反映される

export interface SiteTexts {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  footer: string;
}

export interface NavigationTexts {
  home: string;
  about: string;
  gallery: string;
  game: string;
  dev: string;
  blog: string;
  link: string;
}

export interface StatusTexts {
  preparing: string;
  dataCollecting: string;
  comingSoon: string;
  underConstruction: string;
  contact: string;
}

export interface UITexts {
  readMore: string;
  viewMore: string;
  contact: string;
  email: string;
  twitter: string;
  github: string;
  rss: string;
  newsletter: string;
  categories: string;
  archive: string;
  tags: string;
  aboutWriter: string;
  moreInfo: string;
  visit: string;
  prev: string;
  next: string;
  allWorks: string;
  profileDetails: string;
  skillsAndAbilities: string;
  favoriteThings: string;
  contactAndSocial: string;
  currentStatus: string;
  favoriteMaps: string;
  recentMatches: string;
  agentProfiles: string;
  playStyleTactics: string;
  settingsSetup: string;
  goalsObjectives: string;
  galleryCategories: string;
  artistNote: string;
  commissionInfo: string;
  welcomeToBlog: string;
  subscribeUpdates: string;
  pageNavigation: string;
  mutualLinks: string;
  techSites: string;
  designArt: string;
  retroWeb: string;
  linkPolicy: string;
  linkApplication: string;
}

export interface PageTitles {
  home: string;
  about: string;
  gallery: string;
  game: string;
  dev: string;
  blog: string;
  link: string;
}

export interface TextContent {
  site: SiteTexts;
  navigation: NavigationTexts;
  status: StatusTexts;
  ui: UITexts;
  pageTitles: PageTitles;
}

// 日本語のテキスト内容
export const jaTexts: TextContent = {
  site: {
    title: "nodoame's Cyber Space",
    subtitle: "Welcome to Neo Tokyo Web",
    description: "大学生クリエイターnodoameのレトロ風ポートフォリオサイト",
    author: "nodoame",
    footer: "Created by nodoame | Powered by Astro + Tailwind CSS"
  },
  
  navigation: {
    home: "HOME",
    about: "ABOUT",
    gallery: "GALLERY", 
    game: "GAME",
    dev: "DEV",
    blog: "BLOG",
    link: "LINK"
  },

  status: {
    preparing: "準備中",
    dataCollecting: "データ収集中",
    comingSoon: "近日公開",
    underConstruction: "工事中",
    contact: "お問い合わせからどうぞ"
  },

  ui: {
    readMore: "続きを読む →",
    viewMore: "もっと見る",
    contact: "お問い合わせ",
    email: "Email",
    twitter: "Twitter", 
    github: "GitHub",
    rss: "RSS Feed",
    newsletter: "Newsletter",
    categories: "Categories",
    archive: "Archive",
    tags: "Tags",
    aboutWriter: "About Writer",
    moreInfo: "More Info",
    visit: "Visit",
    prev: "« Prev",
    next: "Next »",
    allWorks: "🖼️ All Works",
    profileDetails: "👤 Profile Details 📋",
    skillsAndAbilities: "🎯 Skills & Abilities",
    favoriteThings: "💖 Favorite Things",
    contactAndSocial: "📞 Contact & Social Media",
    currentStatus: "🏆 Current Status",
    favoriteMaps: "🗺️ Favorite Maps",
    recentMatches: "📊 Recent Matches",
    agentProfiles: "🌟 Agent Profiles 🌟",
    playStyleTactics: "⚔️ Play Style & Tactics ⚔️",
    settingsSetup: "⚙️ Settings & Setup ⚙️",
    goalsObjectives: "🎯 Goals & Objectives 🎯",
    galleryCategories: "🖼️ Gallery Categories 🖼️",
    artistNote: "💭 Artist's Note",
    commissionInfo: "📩 Commission Info",
    welcomeToBlog: "✨ Welcome to nodoame's Blog! ✨",
    subscribeUpdates: "📡 Subscribe & Updates",
    pageNavigation: "📄 Page Navigation",
    mutualLinks: "🤝 相互リンク・お友達サイト 🤝",
    techSites: "💻 技術・学習サイト 💻",
    designArt: "🎨 デザイン・アート・インスピレーション 🎨",
    retroWeb: "📼 レトロWeb・懐かしのインターネット 📼",
    linkPolicy: "📋 リンクについて・相互リンクのお誘い 📋",
    linkApplication: "📧 リンク申請方法"
  },

  pageTitles: {
    home: "🌟 nodoame's Cyber Space - レトロな雰囲気のポートフォリオサイトへようこそ！ ✨",
    about: "🌟 About nodoame - Q&A形式でいろいろ答えちゃいます！ ✨",
    gallery: "🎨 Welcome to nodoame's Art Gallery! イラスト・ドット絵・ジェネラティブアート作品を展示中です 🖼️",
    game: "🎮 nodoame's Gaming World - VALORANT中心にFPSゲームの戦績・情報をお届け！ 🕹️",
    dev: "💻 nodoame's Development Space - プログラミング・研究・技術スタックを紹介！ ⚙️",
    blog: "📖 nodoame's Digital Diary - 日常・技術・ゲーム・創作活動について気ままに書いてます 📝",
    link: "🔗 nodoame's Link Collection - お気に入りサイト・相互リンク・懐かしのWebリング風リンク集！ 🌐"
  }
};

// 英語のテキスト内容（将来の多言語対応用）
export const enTexts: TextContent = {
  site: {
    title: "nodoame's Cyber Space",
    subtitle: "Welcome to Neo Tokyo Web", 
    description: "Retro-style portfolio site by nodoame, a university student creator",
    author: "nodoame",
    footer: "Created by nodoame | Powered by Astro + Tailwind CSS"
  },

  navigation: {
    home: "HOME",
    about: "ABOUT", 
    gallery: "GALLERY",
    game: "GAME",
    dev: "DEV",
    blog: "BLOG",
    link: "LINK"
  },

  status: {
    preparing: "Under Preparation",
    dataCollecting: "Collecting Data",
    comingSoon: "Coming Soon", 
    underConstruction: "Under Construction",
    contact: "Please contact us"
  },

  ui: {
    readMore: "Read More →",
    viewMore: "View More",
    contact: "Contact",
    email: "Email",
    twitter: "Twitter",
    github: "GitHub", 
    rss: "RSS Feed",
    newsletter: "Newsletter",
    categories: "Categories",
    archive: "Archive",
    tags: "Tags",
    aboutWriter: "About Writer",
    moreInfo: "More Info",
    visit: "Visit",
    prev: "« Prev", 
    next: "Next »",
    allWorks: "🖼️ All Works",
    profileDetails: "👤 Profile Details 📋",
    skillsAndAbilities: "🎯 Skills & Abilities",
    favoriteThings: "💖 Favorite Things",
    contactAndSocial: "📞 Contact & Social Media",
    currentStatus: "🏆 Current Status",
    favoriteMaps: "🗺️ Favorite Maps",
    recentMatches: "📊 Recent Matches", 
    agentProfiles: "🌟 Agent Profiles 🌟",
    playStyleTactics: "⚔️ Play Style & Tactics ⚔️",
    settingsSetup: "⚙️ Settings & Setup ⚙️",
    goalsObjectives: "🎯 Goals & Objectives 🎯",
    galleryCategories: "🖼️ Gallery Categories 🖼️",
    artistNote: "💭 Artist's Note",
    commissionInfo: "📩 Commission Info",
    welcomeToBlog: "✨ Welcome to nodoame's Blog! ✨",
    subscribeUpdates: "📡 Subscribe & Updates",
    pageNavigation: "📄 Page Navigation",
    mutualLinks: "🤝 Mutual Links & Friend Sites 🤝",
    techSites: "💻 Tech & Learning Sites 💻",
    designArt: "🎨 Design・Art・Inspiration 🎨",
    retroWeb: "📼 Retro Web・Nostalgic Internet 📼",
    linkPolicy: "📋 About Links・Mutual Link Invitation 📋",
    linkApplication: "📧 Link Application Method"
  },

  pageTitles: {
    home: "🌟 nodoame's Cyber Space - Welcome to the retro-style portfolio site! ✨",
    about: "🌟 About nodoame - I'll answer various questions in Q&A format! ✨",
    gallery: "🎨 Welcome to nodoame's Art Gallery! Exhibiting illustrations, pixel art, and generative art works 🖼️",
    game: "🎮 nodoame's Gaming World - Delivering VALORANT-centered FPS game records and information! 🕹️",
    dev: "💻 nodoame's Development Space - Introducing programming, research, and tech stack! ⚙️",
    blog: "📖 nodoame's Digital Diary - Writing freely about daily life, technology, games, and creative activities 📝",
    link: "🔗 nodoame's Link Collection - Favorite sites, mutual links, nostalgic web ring-style link collection! 🌐"
  }
};