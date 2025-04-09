// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeToggleTop = document.getElementById('theme-toggle-top');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const htmlElement = document.documentElement;
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const closeReadmeButton = document.getElementById('close-readme');
const readmeViewer = document.getElementById('readme-viewer');

// Theme Management
const applyTheme = (theme) => {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    
    // Store the preference
    localStorage.setItem('theme', theme);
};

// Check localStorage for saved theme preference
const savedTheme = localStorage.getItem('theme');
// Check system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Determine initial theme
let currentTheme = 'light'; // Default to light
if (savedTheme) {
    currentTheme = savedTheme;
} else if (prefersDark) {
    currentTheme = 'dark';
}

// Apply the initial theme
applyTheme(currentTheme);

// Theme toggle listeners (desktop and mobile)
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.contains('dark')
            ? applyTheme('light')
            : applyTheme('dark');
    });
}

if (themeToggleTop) {
    themeToggleTop.addEventListener('click', () => {
        htmlElement.classList.contains('dark')
            ? applyTheme('light')
            : applyTheme('dark');
    });
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => {
        htmlElement.classList.contains('dark')
            ? applyTheme('light')
            : applyTheme('dark');
    });
}

// Listen for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only change if no theme is explicitly saved in localStorage
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// README Viewer Close
if (closeReadmeButton && readmeViewer) {
    closeReadmeButton.addEventListener('click', () => {
        readmeViewer.classList.add('hidden');
    });
}

// --- GitHub Integration ---
async function fetchGitHubRepos(username = 'Rtx09x', maxRepos = 4) {
    const repoContainer = document.getElementById('github-repos');
    if (!repoContainer) return;
    
    try {
        // GitHub public API endpoint
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter out profile repo
        const filteredRepos = repos.filter(repo => repo.name !== 'Rtx09x');
        
        // Clear loading state
        repoContainer.innerHTML = '';
        
        // Process and display each repo
        filteredRepos.forEach(repo => {
            // Create repo card
            const card = document.createElement('div');
            card.className = 'glass-card overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer';
            card.setAttribute('data-repo', repo.name);
            card.setAttribute('data-owner', repo.owner.login);
            
            // Card contents
            card.innerHTML = `
                <div class="p-6">
                    <div class="flex items-center mb-4">
                        <i class="fab fa-github text-xl mr-3 text-primary"></i>
                        <h3 class="text-xl font-semibold">${repo.name}</h3>
                    </div>
                    <p class="text-light-muted dark:text-dark-muted mb-4 text-sm line-clamp-2">${repo.description || 'No description available.'}</p>
                    
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center space-x-4">
                            <span><i class="fas fa-star mr-1"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch mr-1"></i> ${repo.forks_count}</span>
                        </div>
                        <span class="text-xs bg-light-card dark:bg-dark-card px-2 py-1 rounded">${repo.language || 'N/A'}</span>
                    </div>
                </div>
            `;
            
            // Add click event to open repository in a new tab
            card.addEventListener('click', () => {
                window.open(repo.html_url, '_blank', 'noopener,noreferrer');
            });
            
            // Add to container
            repoContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        repoContainer.innerHTML = `
            <div class="glass-card p-6 col-span-full">
                <div class="text-center">
                    <i class="fas fa-exclamation-circle text-3xl text-red-500/60 mb-2"></i>
                    <p class="text-light-muted dark:text-dark-muted">Couldn't load repositories. Please try again later.</p>
                </div>
            </div>
        `;
    }
}

async function fetchRepoReadme(owner, repo) {
    const readmeViewer = document.getElementById('readme-viewer');
    const readmeTitle = document.getElementById('readme-title');
    const readmeContent = document.getElementById('readme-content');
    
    if (!readmeViewer || !readmeTitle || !readmeContent) return;
    
    try {
        // Show loading state
        readmeViewer.classList.remove('hidden');
        readmeTitle.textContent = `${repo}`;
        readmeContent.innerHTML = '<div class="animate-pulse text-center py-8"><i class="fas fa-spinner fa-spin text-primary text-3xl"></i><p class="mt-4 text-light-muted dark:text-dark-muted">Loading README...</p></div>';
        
        // Fetch the README content
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Decode content (it's base64 encoded)
        const decoded = atob(data.content);
        
        // Use marked.js to render markdown (need to include the library in your HTML)
        if (window.marked) {
            readmeContent.innerHTML = marked.parse(decoded);
        } else {
            // Basic formatting if marked.js isn't available
            readmeContent.innerHTML = `<pre class="whitespace-pre-wrap">${decoded}</pre>`;
        }
    } catch (error) {
        console.error('Error fetching README:', error);
        readmeContent.innerHTML = `
            <div class="text-center">
                <i class="fas fa-exclamation-circle text-3xl text-red-500/60 mb-2"></i>
                <p class="text-light-muted dark:text-dark-muted">Couldn't load README. The repository may not have one.</p>
            </div>
        `;
    }
}

// --- Medium Feed Integration ---
async function fetchMediumFeed(username = 'rudra', maxPosts = 3) {
    const feedContainer = document.getElementById('medium-feed');
    if (!feedContainer) return;
    
    try {
        // Since Medium's API is limited, we'll use a public RSS-to-JSON converter
        // You can replace this with your own backend proxy if needed
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`);
        
        if (!response.ok) {
            throw new Error(`RSS API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Clear loading state
        feedContainer.innerHTML = '';
        
        // Check if we have valid items
        if (data.status !== 'ok' || !data.items || data.items.length === 0) {
            throw new Error('No posts found or invalid feed');
        }
        
        // Process and display each post (limit to maxPosts)
        data.items.slice(0, maxPosts).forEach(post => {
            // Extract publish date
            const pubDate = new Date(post.pubDate);
            const formattedDate = pubDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // Extract thumbnail
            const imgRegex = /<img.*?src="(.*?)".*?>/;
            const imgMatch = post.content.match(imgRegex);
            const thumbnailUrl = imgMatch ? imgMatch[1] : 'https://via.placeholder.com/60'; // Fallback image
            
            // Create post card
            const card = document.createElement('div');
            card.className = 'glass-card hover:shadow-lg transition-all duration-300';
            
            // Card contents
            card.innerHTML = `
                <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="block p-6">
                    <div class="flex items-center">
                        <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mr-6">
                            <img src="${thumbnailUrl}" alt="Post thumbnail" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold mb-1 hover:text-primary transition-colors">${post.title}</h3>
                            <p class="text-xs text-light-muted dark:text-dark-muted mb-2">${formattedDate}</p>
                            <p class="text-sm text-light-text/80 dark:text-dark-text/80 line-clamp-2">${post.description || 'Click to read this article on Medium.'}</p>
                        </div>
                    </div>
                </a>
            `;
            
            // Add to container
            feedContainer.appendChild(card);
        });
        
        // Add a "View all on Medium" link at the end
        const viewAllCard = document.createElement('div');
        viewAllCard.className = 'text-center mt-6';
        viewAllCard.innerHTML = `
            <a href="https://medium.com/@${username}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center justify-center py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                <span>View all on Medium</span>
                <i class="fas fa-external-link-alt ml-2 text-xs"></i>
            </a>
        `;
        feedContainer.appendChild(viewAllCard);
        
    } catch (error) {
        console.error('Error fetching Medium feed:', error);
        feedContainer.innerHTML = `
            <div class="glass-card p-6">
                <div class="text-center">
                    <i class="fas fa-exclamation-circle text-3xl text-red-500/60 mb-2"></i>
                    <p class="text-light-muted dark:text-dark-muted">Couldn't load Medium posts. Please try again later.</p>
                </div>
            </div>
        `;
    }
}

// --- Spotify Integration ---
function setupSpotifyWidget() {
    const spotifyMini = document.getElementById('spotify-mini');
    
    // Replace with your Spotify username
    const spotifyUsername = '31ttvfbabaimqzh6zgvilugqd7ya';
    const spotifyArtistId = '2aC7n1BaEOCEgJknWRnLAj';
    
    // Set up the link to your Spotify profile
    if (spotifyMini) {
        spotifyMini.addEventListener('click', () => {
            window.open(`https://open.spotify.com/user/${spotifyUsername}?si=39900551fc5d459b`, '_blank', 'noopener,noreferrer');
        });
        
        // Example songs from your actual Spotify/music catalog
        const songs = [
            "Currently vibing to: If Only You Knew - RTX09",
            "Currently vibing to: Second Song - RTX09",
            "Currently vibing to: Spotify Playlist by RTX09",
            "Currently listening to my own track: If Only You Knew"
        ];
        
        // Update every 10 seconds
        let currentSong = 0;
        
        function updateSong() {
            if (spotifyMini.querySelector('span')) {
                spotifyMini.querySelector('span').textContent = songs[currentSong];
                currentSong = (currentSong + 1) % songs.length;
            }
        }
        
        // Initialize and then update every 10 seconds
        updateSong();
        setInterval(updateSong, 10000);
    }
}

// --- Intersection Observer for Scroll Animations ---
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .glass-card, .section-heading');
    
    if (!animatedElements.length) return;
    
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in animation class
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all elements
    animatedElements.forEach(el => {
        // Set initial state (optional)
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// --- Quote Rotation ---
function setupQuoteRotation() {
    const quoteElement = document.getElementById('rotating-quote');
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    
    if (!quoteElement || !quoteTextElement || !quoteAuthorElement) return;
    
    // Add your favorite quotes here
    const quotes = [
        { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
        { text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.", author: "Patrick McKenzie" },
        { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
        { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
        { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" }
    ];
    
    let currentQuoteIndex = 0;
    
    function updateQuote() {
        // Fade out
        quoteElement.classList.add('opacity-0');
        
        setTimeout(() => {
            // Update content
            const quote = quotes[currentQuoteIndex];
            quoteTextElement.textContent = quote.text;
            quoteAuthorElement.textContent = quote.author;
            
            // Update index for next time
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            
            // Fade in
            quoteElement.classList.remove('opacity-0');
        }, 500); // Match this with the CSS transition time
    }
    
    // Initialize
    updateQuote();
    
    // Rotate quotes every 24 seconds
    setInterval(updateQuote, 24000);
}

// --- Color Changing Text Animation ---
function setupColorChangingText() {
    const textElements = document.querySelectorAll('.animate-text-shimmer');
    
    if (textElements.length === 0) return;
    
    const colors = [
        'text-primary',
        'text-secondary',
        'text-accent',
        'text-purple-500',
        'text-blue-500',
        'text-indigo-500',
        'text-green-500'
    ];
    
    textElements.forEach((element, index) => {
        // Create a smooth continuous color transition using hue rotation
        // This provides a smoother and more continuous color change than class swapping
        element.style.animation = `colorChange ${15 + (index * 5)}s linear infinite`;
        element.style.animationDelay = `${index * 3}s`;
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Setup mobile menu toggling
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Initialize API integrations
    // Replace with your actual GitHub and Medium usernames
    fetchGitHubRepos('Rtx09x');
    fetchMediumFeed('einstien56789');
    setupSpotifyWidget();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // New features
    setupQuoteRotation();
    setupColorChangingText();
}); 