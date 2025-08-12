// Site Configuration - Spider-Verse Portfolio
const siteConfig = {
  // Personal Information
  personal: {
    name: "Rudra Tiwari",
    title: "High School Student & Aspiring Researcher",
    subtitle: [
      "Full-stack Developer",
      "Research Enthusiast",
      "Music Producer",
      "AI Explorer",
      "Creative Thinker"
    ],
    bio: "Welcome to my digital universe where curiosity drives innovation and creativity knows no bounds. I'm a high school student who thinks like a researcher, codes like a craftsman, and creates music that tells stories.",
    description: "Fueled by curiosity (and way too much coffee ☕), I live at the intersection of science, technology, and creative expression. I approach problems with first principles thinking, always asking 'why' before 'how.' Whether I'm diving deep into compression algorithms, building productivity tools, or producing my next track, I'm constantly pushing the boundaries of what's possible.",
    currentFocus: "Currently exploring the fascinating world of machine learning and AGI research. I've been diving deep into transformer architectures and recently started venturing into neuroscience to understand how biological intelligence works. My goal? To bridge the gap between artificial and human intelligence while creating tools that actually make people's lives better.",
    personality: "INTP",
    email: "contactme.rtx@gmail.com",
    github: "Rtx09x",
    funFacts: [
      "INTP personality type",
      "Planning to rock the stage someday!",
      "Forever analyzing the \"why\" behind everything"
    ]
  },

  // Projects
  projects: [
    {
      id: "youtube-tldr",
      title: "YouTube TLDR",
      description: "A distraction-blocking Chrome extension that intercepts YouTube videos and redirects you to an AI-generated summary instead.",
      longDescription: "An innovative Chrome extension designed to combat YouTube addiction and improve productivity. When users click on YouTube videos, the extension intercepts the request and provides an AI-generated summary of the video content instead.",
      technologies: ["JavaScript", "Chrome Extensions API", "AI Integration", "Content Scripts"],
      githubUrl: "https://github.com/Rtx09x/YouTube-TLDR",
      liveUrl: "#",
      status: "active",
      featured: true,
      year: "2024",
      type: "Chrome Extension",
      icon: "fas fa-youtube",
      color: "#ff0000",
      highlights: [
        "Intercepts YouTube video requests",
        "Generates AI-powered summaries",
        "Reduces digital distractions",
        "Improves productivity and focus"
      ]
    },
    {
      id: "meow-mocks",
      title: "Meow Mocks",
      description: "A comprehensive web-based mock test platform that uses JSON configuration files to create customizable exam experiences.",
      longDescription: "A sophisticated mock test engine designed for competitive exam preparation. The platform uses JSON configuration files to define exam papers, making it completely plug-and-play for any type of mock test.",
      technologies: ["JavaScript", "JSON Configuration", "Material You Design", "Responsive UI"],
      githubUrl: "https://github.com/Rtx09x/Meow-Mocks",
      liveUrl: "https://rtx09x.github.io/Meow-Mocks/",
      status: "active",
      featured: true,
      year: "2024",
      type: "Web Application",
      icon: "fas fa-cat",
      color: "#4f8cff",
      highlights: [
        "JSON-based configuration system",
        "Material You design implementation",
        "Real-time scoring and analytics",
        "Plug-and-play for any exam type"
      ]
    },
    {
      id: "ai-research-model",
      title: "AI Research Model",
      description: "An upcoming AI model project focused on research applications and practical implementations in machine learning.",
      longDescription: "A comprehensive AI model project currently in development, focusing on research applications and practical implementations. This project will explore advanced machine learning techniques and their real-world applications.",
      technologies: ["Python", "PyTorch", "Machine Learning", "Research"],
      githubUrl: "#",
      liveUrl: "#",
      status: "coming-soon",
      featured: true,
      year: "2025",
      type: "AI Model",
      icon: "fas fa-brain",
      color: "#8b5cf6",
      highlights: [
        "Advanced ML techniques",
        "Research-focused approach",
        "Real-world applications",
        "Coming soon - stay tuned!"
      ]
    }
  ],

  // Research Work
  research: [
    {
      id: "curiosity-cache",
      title: "CuriosityCache",
      description: "Personal Research Collective - A repository of research findings, insights, and discoveries.",
      url: "https://github.com/Rtx09x/CuriosityCache",
      year: "2025",
      type: "Research Repository",
      status: "active",
      icon: "fas fa-flask",
      color: "#10b981",
      tags: ["Research", "Documentation", "Knowledge Base"]
    },
    {
      id: "infinite-compression",
      title: "Infinite Lossless Compression",
      description: "A personal 3-hour deep dive exploring the theoretical limits of lossless data compression, facing the fundamental Shannon Entropy Wall.",
      url: "https://github.com/Rtx09x/CuriosityCache/blob/main/CuriosityCache/Infinite%20Lossless%20Compression/My%20Compression%20Quest%20-%20Summary%20%26%20The%20Wall.md",
      year: "2025",
      type: "Theoretical CS",
      status: "completed",
      icon: "fas fa-compress-alt",
      color: "#f59e0b",
      tags: ["Information Theory", "Compression", "Mathematics"]
    }
  ],

  // Music Tracks
  music: [
    {
      id: "if-only-you-knew",
      title: "If Only You Knew",
      artist: "RTX09",
      platform: "spotify",
      url: "https://open.spotify.com/track/23BEGzgR0ZwBrQYYtjGwRJ?si=83a9ed65a1484672",
      youtubeUrl: "https://music.youtube.com/watch?v=A_PK87tTofY&si=9DqlEdz6zHBQnsvS",
      embedId: "23BEGzgR0ZwBrQYYtjGwRJ",
      year: "2024",
      type: "Single",
      description: "A heartfelt single exploring themes of connection and understanding",
      genre: "Pop/Electronic",
      duration: "3:42",
      status: "released",
      featured: true,
      color: "#1db954",
      highlights: [
        "Available on Spotify and YouTube Music",
        "Original composition and vocals by RTX09",
        "Electronic pop with emotional depth"
      ]
    },
    {
      id: "sometimes-im-like",
      title: "Sometimes I'm Like",
      artist: "RTX09",
      platform: "youtube",
      url: "https://music.youtube.com/watch?v=MXl8CvB_rJU&si=HSkZfrl2610AAYIU",
      youtubeEmbedId: "MXl8CvB_rJU",
      year: "2024",
      type: "Single",
      description: "An introspective track about self-reflection and personal growth",
      genre: "Alternative/Indie",
      duration: "4:15",
      status: "released",
      featured: true,
      color: "#ff0000",
      highlights: [
        "Available on YouTube Music",
        "Introspective lyrics and melody",
        "Alternative indie sound"
      ]
    }
  ],

  // Social Links
  social: {
    github: "https://github.com/Rtx09x",
    medium: "https://medium.com/@einstien56789",
    youtube: "https://www.youtube.com/@rtxmusicx9",
    spotify: "https://open.spotify.com/user/31ttvfbabaimqzh6zgvilugqd7ya",
    buymeacoffee: "https://www.buymeacoffee.com/rudratiwari",
    email: "mailto:contactme.rtx@gmail.com"
  },

  // Spotify Integration
  spotify: {
    artistId: "2aC7n1BaEOCEgJknWRnLAj",
    nowPlayingMessages: [
      "Currently vibing to: If Only You Knew - RTX09",
      "Currently vibing to: Sometimes I'm Like - RTX09",
      "Currently listening to my own track",
      "Vibing to some electronic beats",
      "In the zone with some music"
    ]
  },

  // Theme Configuration
  themes: [
    { name: "Dark Mode", class: "theme-dark", primary: "#4f8cff", icon: "fas fa-moon", type: "dark" },
    { name: "Light Mode", class: "theme-light", primary: "#4f8cff", icon: "fas fa-sun", type: "light" },
    { name: "Spider-Blue", class: "theme-blue", primary: "#4f8cff", icon: "fas fa-spider", type: "color" },
    { name: "Mystic Purple", class: "theme-purple", primary: "#8b5cf6", icon: "fas fa-magic", type: "color" },
    { name: "Matrix Green", class: "theme-green", primary: "#10b981", icon: "fas fa-code", type: "color" },
    { name: "Danger Red", class: "theme-red", primary: "#ef4444", icon: "fas fa-fire", type: "color" },
    { name: "Energy Orange", class: "theme-orange", primary: "#f59e0b", icon: "fas fa-bolt", type: "color" },
    { name: "Cyber Pink", class: "theme-pink", primary: "#ec4899", icon: "fas fa-heart", type: "color" },
    { name: "Electric Cyan", class: "theme-cyan", primary: "#06b6d4", icon: "fas fa-water", type: "color" },
    { name: "Neon Yellow", class: "theme-yellow", primary: "#eab308", icon: "fas fa-star", type: "color" },
    { name: "Deep Indigo", class: "theme-indigo", primary: "#6366f1", icon: "fas fa-gem", type: "color" },
    { name: "Emerald", class: "theme-emerald", primary: "#059669", icon: "fas fa-leaf", type: "color" }
  ],

  // Inspirational Quotes
  quotes: [
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.", author: "Patrick McKenzie" },
    { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" }
  ],

  // Navigation
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "#research" },
    { label: "Music", href: "#music" },
    { label: "Connect", href: "#connect" }
  ],

  // Site Metadata
  meta: {
    title: "Rudra • Spider-Verse Portfolio",
    description: "Rudra's Spider-Verse themed portfolio - Developer, Researcher, Music Creator",
    keywords: ["portfolio", "developer", "researcher", "music", "AI", "machine learning", "spider-verse"],
    author: "Rudra Tiwari",
    url: "https://rtx09x.github.io"
  }
};

// Make config globally available
window.siteConfig = siteConfig;

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
}