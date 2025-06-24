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
    title: "nodoame's 8-bit Adventure",
    subtitle: "◆ Welcome to the Pixel World ◆",
    description: "8bitの冒険が始まる！",
    author: "Player: nodoame",
    footer: "◆ Game Created by nodoame ◆ Engine: Astro + CSS Magic ◆"
  },
  
  navigation: {
    home: "◆ WORLD MAP ◆",
    about: "◆ STATUS ◆",
    gallery: "◆ GALLERY ◆", 
    game: "◆ BATTLE ◆",
    dev: "◆ SKILLS ◆",
    blog: "◆ DIARY ◆",
    link: "◆ GUILD ◆"
  },

  status: {
    preparing: "◆ 準備中... ◆",
    dataCollecting: "◆ データ収集中... ◆",
    comingSoon: "◆ Coming Soon ◆",
    underConstruction: "◆ Under Construction ◆",
    contact: "◆ メッセージを送る ◆"
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
    prev: "◄ PREV",
    next: "NEXT ►",
    allWorks: "◆ All Items ◆",
    profileDetails: "◆ Player Status ◆",
    skillsAndAbilities: "◆ Skill Tree ◆",
    favoriteThings: "◆ Favorite Items ◆",
    contactAndSocial: "◆ Communication ◆",
    currentStatus: "◆ Battle Stats ◆",
    favoriteMaps: "◆ Battle Fields ◆",
    recentMatches: "◆ Battle Log ◆",
    agentProfiles: "◆ Character Data ◆",
    playStyleTactics: "◆ Battle Style ◆",
    settingsSetup: "◆ Config Menu ◆",
    goalsObjectives: "◆ Quest Log ◆",
    galleryCategories: "◆ Item Categories ◆",
    artistNote: "◆ Creator's Note ◆",
    commissionInfo: "◆ Quest Request ◆",
    welcomeToBlog: "◆ Welcome to Adventure Log ◆",
    subscribeUpdates: "◆ News & Updates ◆",
    pageNavigation: "◆ Page Select ◆",
    mutualLinks: "◆ Party Members ◆",
    techSites: "◆ Skill Learning ◆",
    designArt: "◆ Art Gallery ◆",
    retroWeb: "◆ Retro Zone ◆",
    linkPolicy: "◆ Guild Rules ◆",
    linkApplication: "◆ Join Request ◆"
  },

  pageTitles: {
    home: "HOME",
    about: "ABOUT", 
    gallery: "GALLERY",
    game: "GAME",
    dev: "DEV",
    blog: "BLOG",
    link: "LINK"
  }
};

// 英語のテキスト内容（将来の多言語対応用）
export const enTexts: TextContent = {
  site: {
    title: "nodoame's Cyber Space",
    subtitle: "Welcome to Neo Tokyo Web", 
    description: "nodoame, a university student creator",
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
    home: "HOME",
    about: "ABOUT",
    gallery: "GALLERY",
    game: "GAME",
    dev: "DEV",
    blog: "BLOG",
    link: "LINK"
  }
};