// Main Portfolio Application
class SpiderVersePortfolio {
  constructor() {
    this.config = window.siteConfig;
    this.currentTheme = 0;
    this.isLoaded = false;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadContent();
    this.setupThemeSystem();
    this.setupNavigation();
    this.setupSpotifyWidget();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.updateFooter();
    
    // Mark as loaded
    setTimeout(() => {
      this.isLoaded = true;
      document.body.classList.add('loaded');
    }, 1000);
  }
  
  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.cycleTheme());
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        this.scrollToSection(targetId.substring(1));
      });
    });
    
    // Spider sense on logo click
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
      navBrand.addEventListener('click', () => {
        if (window.spiderWeb) {
          window.spiderWeb.triggerSpiderSense();
        }
      });
    }
  }
  
  loadPersonalInfo() {
    if (!this.config.personal) return;
    
    const personal = this.config.personal;
    
    // Update main bio text
    const mainBioText = document.querySelector('.about-card.main-card .card-text');
    if (mainBioText && personal.description) {
      mainBioText.textContent = personal.description;
    }
    
    // Update currently section
    const currentlyText = document.querySelector('.about-card:not(.main-card) .card-text');
    if (currentlyText && personal.currentFocus) {
      currentlyText.textContent = personal.currentFocus;
    }
    
    // Update fun facts
    const factsList = document.querySelector('.facts-list');
    if (factsList && personal.funFacts) {
      factsList.innerHTML = personal.funFacts.map(fact => 
        `<li><i class="fas fa-lightbulb"></i> ${fact}</li>`
      ).join('');
    }
  }
  
  loadContent() {
    this.loadPersonalInfo();
    this.loadProjects();
    this.loadResearch();
    this.loadMusic();
    this.loadQuotes();
  }
  
  loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid || !this.config.projects) return;
    
    projectsGrid.innerHTML = '';
    
    this.config.projects.forEach(project => {
      const projectCard = this.createProjectCard(project);
      projectsGrid.appendChild(projectCard);
    });
  }
  
  createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'material-card project-card';
    card.style.setProperty('--project-color', project.color || '#4f8cff');
    
    const statusBadge = project.status === 'coming-soon' 
      ? '<span class="material-chip" style="background: var(--secondary); color: white;">Coming Soon</span>'
      : '<span class="material-chip selected">Live</span>';
    
    card.innerHTML = `
      <div class="card-header">
        <div class="project-icon" style="color: ${project.color || '#4f8cff'}">
          <i class="${project.icon || 'fas fa-code'}"></i>
        </div>
        <div class="project-meta">
          <h3 class="card-title">${project.title}</h3>
          <p class="project-type">${project.type} • ${project.year}</p>
        </div>
        ${statusBadge}
      </div>
      
      <p class="card-text">${project.description}</p>
      
      <div class="project-tech">
        ${project.technologies.slice(0, 3).map(tech => 
          `<span class="material-chip">${tech}</span>`
        ).join('')}
      </div>
      
      <div class="project-actions">
        ${project.githubUrl !== '#' ? 
          `<a href="${project.githubUrl}" target="_blank" class="btn-compact">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>` : ''
        }
        ${project.liveUrl !== '#' ? 
          `<a href="${project.liveUrl}" target="_blank" class="btn-compact primary">
            <i class="fas fa-external-link-alt"></i>
            <span>Live Demo</span>
          </a>` : ''
        }
      </div>
    `;
    
    return card;
  }
  
  loadResearch() {
    const researchGrid = document.getElementById('research-grid');
    if (!researchGrid || !this.config.research) return;
    
    researchGrid.innerHTML = '';
    
    this.config.research.forEach(research => {
      const researchCard = this.createResearchCard(research);
      researchGrid.appendChild(researchCard);
    });
  }
  
  createResearchCard(research) {
    const card = document.createElement('a');
    card.href = research.url;
    card.target = '_blank';
    card.className = 'material-card research-card';
    card.style.setProperty('--research-color', research.color || '#10b981');
    
    card.innerHTML = `
      <div class="card-header">
        <div class="research-icon" style="color: ${research.color || '#10b981'}">
          <i class="${research.icon || 'fas fa-flask'}"></i>
        </div>
        <div class="research-meta">
          <h3 class="card-title">${research.title}</h3>
          <p class="research-type">${research.type} • ${research.year}</p>
        </div>
        <span class="material-chip ${research.status === 'completed' ? 'selected' : ''}">${research.status}</span>
      </div>
      
      <p class="card-text">${research.description}</p>
      
      ${research.tags ? `
        <div class="research-tags">
          ${research.tags.map(tag => 
            `<span class="material-chip">${tag}</span>`
          ).join('')}
        </div>
      ` : ''}
      
      <div class="research-link">
        <i class="fas fa-external-link-alt"></i>
        <span>View Research</span>
      </div>
    `;
    
    return card;
  }
  
  loadMusic() {
    const musicGrid = document.getElementById('music-grid');
    if (!musicGrid || !this.config.music) return;
    
    musicGrid.innerHTML = '';
    
    this.config.music.forEach(track => {
      const musicCard = this.createMusicCard(track);
      musicGrid.appendChild(musicCard);
    });
  }
  
  createMusicCard(track) {
    const card = document.createElement('div');
    card.className = 'material-card music-card';
    card.style.setProperty('--music-color', track.color || '#1db954');
    
    const platformIcon = track.platform === 'spotify' ? 'fab fa-spotify' : 'fab fa-youtube';
    const platformColor = track.platform === 'spotify' ? '#1db954' : '#ff0000';
    
    card.innerHTML = `
      <div class="card-header">
        <div class="music-icon" style="color: ${track.color}">
          <i class="${platformIcon}"></i>
        </div>
        <div class="music-meta">
          <h3 class="card-title">${track.title}</h3>
          <p class="music-artist">${track.artist} • ${track.type} • ${track.year}</p>
          ${track.genre ? `<p class="music-genre">${track.genre}</p>` : ''}
        </div>
        ${track.duration ? `<span class="material-chip">${track.duration}</span>` : ''}
      </div>
      
      <p class="card-text">${track.description}</p>
      
      <div class="music-links">
        ${track.platform === 'spotify' && track.url ? 
          `<a href="${track.url}" target="_blank" class="material-button outlined" style="border-color: #1db954; color: #1db954;">
            <i class="fab fa-spotify"></i>
            <span>Spotify</span>
          </a>` : ''
        }
        ${track.youtubeUrl ? 
          `<a href="${track.youtubeUrl}" target="_blank" class="material-button outlined" style="border-color: #ff0000; color: #ff0000;">
            <i class="fab fa-youtube"></i>
            <span>YouTube</span>
          </a>` : ''
        }
        ${track.platform === 'youtube' && track.url && !track.youtubeUrl ? 
          `<a href="${track.url}" target="_blank" class="material-button outlined" style="border-color: #ff0000; color: #ff0000;">
            <i class="fab fa-youtube"></i>
            <span>YouTube Music</span>
          </a>` : ''
        }
      </div>
      
      ${this.createMusicEmbed(track)}
      
      ${track.highlights ? `
        <div class="music-highlights">
          ${track.highlights.map(highlight => 
            `<div class="highlight-item">
              <i class="fas fa-music" style="color: ${track.color}"></i>
              <span>${highlight}</span>
            </div>`
          ).join('')}
        </div>
      ` : ''}
    `;
    
    return card;
  }
  
  createMusicEmbed(track) {
    if (track.platform === 'spotify' && track.embedId) {
      return `
        <div class="music-embed">
          <iframe style="border-radius:12px" 
                  src="https://open.spotify.com/embed/track/${track.embedId}?utm_source=generator" 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy">
          </iframe>
        </div>
      `;
    } else if (track.platform === 'youtube' && track.youtubeEmbedId) {
      return `
        <div class="music-embed">
          <iframe width="100%" 
                  height="152" 
                  src="https://www.youtube.com/embed/${track.youtubeEmbedId}" 
                  title="${track.title}" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
          </iframe>
        </div>
      `;
    }
    return '';
  }
  
  setupThemeSystem() {
    // Apply initial theme
    this.applyTheme(0);
    
    // Theme persistence
    const savedTheme = localStorage.getItem('spider-theme');
    if (savedTheme) {
      this.currentTheme = parseInt(savedTheme);
      this.applyTheme(this.currentTheme);
    }
  }
  
  cycleTheme() {
    this.currentTheme = (this.currentTheme + 1) % this.config.themes.length;
    this.applyTheme(this.currentTheme);
    localStorage.setItem('spider-theme', this.currentTheme.toString());
    
    // Update spider web colors if available
    if (window.spiderWeb) {
      const theme = this.config.themes[this.currentTheme];
      window.spiderWeb.updateTheme({
        primary: `rgba(${this.hexToRgb(theme.primary)}, `,
        secondary: 'rgba(255, 59, 114, ',
        accent: 'rgba(0, 212, 255, '
      });
    }
  }
  
  applyTheme(themeIndex) {
    const theme = this.config.themes[themeIndex];
    if (!theme) return;
    
    // Remove all theme classes
    this.config.themes.forEach(t => {
      document.body.classList.remove(t.class);
    });
    
    // Apply new theme
    document.body.classList.add(theme.class);
    document.body.classList.add('theme-transition');
    
    // Update theme toggle icon
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme.icon;
      }
      themeToggle.title = theme.name;
    }
    
    // Update meta theme color
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = theme.primary;
  }
  
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '79, 140, 255';
  }
  
  setupNavigation() {
    // Active section highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          // Update active nav link
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  }
  
  setupSpotifyWidget() {
    const nowPlaying = document.getElementById('now-playing');
    if (!nowPlaying || !this.config.spotify) return;
    
    const messages = this.config.spotify.nowPlayingMessages;
    let currentMessageIndex = 0;
    
    const updateMessage = () => {
      const textElement = nowPlaying.querySelector('.now-playing-text');
      if (textElement) {
        textElement.textContent = messages[currentMessageIndex];
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      }
    };
    
    // Update every 10 seconds
    setInterval(updateMessage, 10000);
    
    // Click to open Spotify
    nowPlaying.addEventListener('click', () => {
      window.open(`https://open.spotify.com/artist/${this.config.spotify.artistId}`, '_blank');
    });
  }
  
  setupScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      });
    }
    
    // Fade in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.material-card, .section-header').forEach(el => {
      fadeObserver.observe(el);
    });
  }
  
  setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        mobileMenuToggle.classList.toggle('active');
      });
      
      // Close menu when clicking a link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('mobile-active');
          mobileMenuToggle.classList.remove('active');
        });
      });
    }
  }
  
  loadQuotes() {
    const footerQuote = document.getElementById('footer-quote');
    if (!footerQuote || !this.config.quotes) return;
    
    const randomQuote = this.config.quotes[Math.floor(Math.random() * this.config.quotes.length)];
    footerQuote.innerHTML = `"${randomQuote.text}" - ${randomQuote.author}`;
  }
  
  updateFooter() {
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  }
  
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
  
  // Public methods
  triggerSpiderSense() {
    if (window.spiderWeb) {
      window.spiderWeb.triggerSpiderSense();
    }
  }
  
  updateContent(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.loadContent();
  }
}

// Global utility functions
window.scrollToSection = function(sectionId) {
  if (window.portfolio) {
    window.portfolio.scrollToSection(sectionId);
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize portfolio
  window.portfolio = new SpiderVersePortfolio();
  
  // Add loading animation
  document.body.classList.add('loading');
  
  // Add fade-in styles
  const style = document.createElement('style');
  style.textContent = `
    .loading * {
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.4s ease-out;
    }
    
    .loaded * {
      opacity: 1;
      transform: translateY(0);
    }
    
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .material-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-card:hover,
    .research-card:hover,
    .music-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
    }
    
    .card-header {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .project-icon,
    .research-icon,
    .music-icon {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }
    
    .project-meta,
    .research-meta,
    .music-meta {
      flex: 1;
    }
    
    .project-type,
    .research-type,
    .music-artist,
    .music-genre {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin: 0;
    }
    
    .project-tech,
    .research-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1rem 0;
    }
    
    .project-highlights,
    .music-highlights {
      margin: 1rem 0;
    }
    
    .highlight-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    
    .project-actions,
    .music-links {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
    
    .music-embed {
      margin: 1rem 0;
      border-radius: 12px;
      overflow: hidden;
    }
    
    .research-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary);
      font-weight: 500;
      margin-top: 1rem;
    }
    
    .nav-link.active {
      color: var(--primary);
    }
    
    .nav-link.active::after {
      width: 100%;
    }
    
    @media (max-width: 768px) {
      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--bg-secondary);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 2rem;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        border-bottom: 1px solid rgba(79, 140, 255, 0.1);
      }
      
      .nav-links.mobile-active {
        transform: translateY(0);
      }
      
      .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
      
      .project-actions,
      .music-links {
        flex-direction: column;
      }
    }
  `;
  document.head.appendChild(style);
});

// Export for external use
window.SpiderVersePortfolio = SpiderVersePortfolio;