/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Scan HTML and JS files for classes
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Light Mode Palette
        light: {
          bg: '#ffffff',
          text: '#1f2937', // Slightly softer black (gray-800)
          accent: '#3b82f6', // Blue-500
          muted: '#6b7280', // Gray-500
          card: '#f9fafb', // Gray-50
          border: '#e5e7eb', // Gray-200
          'gradient-from': '#f9fafb',
          'gradient-via': '#ffffff',
          'gradient-to': '#f3f4f6',
        },
        // Dark Mode Palette (Example: GitHub Dimmed inspired)
        dark: {
          bg: '#0d1117',
          text: '#c9d1d9',
          accent: '#58a6ff', // Adjusted blue
          muted: '#8b949e',
          card: '#161b22',
          border: '#30363d',
          'gradient-from': '#0d1117',
          'gradient-via': '#111827',
          'gradient-to': '#1e293b',
        },
        // Accent Colors
        primary: '#3b82f6', // Blue
        secondary: '#8b5cf6', // Purple
        accent: '#ec4899', // Pink
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 10s ease-in-out infinite',
        'fadeIn': 'fadeIn 1s ease-in forwards',
        'fadeDown': 'fadeDown 0.3s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Enable backdrop blur for glassmorphism
      backdropBlur: {
        xs: '2px',
      },
      // Add typography plugin styles if using @tailwindcss/typography
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.light.text'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
            h1: { color: theme('colors.light.text') },
            h2: { color: theme('colors.light.text') },
            h3: { color: theme('colors.light.text') },
            strong: { color: theme('colors.light.text') },
            code: {
              color: theme('colors.secondary'),
              backgroundColor: theme('colors.light.card'),
              padding: '0.1em 0.4em',
              borderRadius: '0.375rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: theme('colors.light.card'),
              color: theme('colors.light.text'),
              overflow: 'auto',
              padding: '1rem',
              borderRadius: '0.5rem',
            },
          },
        },
        invert: { // Styles for dark mode using .prose-invert
          css: {
            color: theme('colors.dark.text'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
            h1: { color: theme('colors.dark.text') },
            h2: { color: theme('colors.dark.text') },
            h3: { color: theme('colors.dark.text') },
            strong: { color: theme('colors.dark.text') },
            code: {
              color: theme('colors.secondary'),
              backgroundColor: theme('colors.dark.card'),
            },
            pre: {
              backgroundColor: theme('colors.dark.card'),
              color: theme('colors.dark.text'),
            },
            blockquote: { 
              color: theme('colors.dark.muted'), 
              borderLeftColor: theme('colors.dark.border') 
            },
            thead: { 
              color: theme('colors.dark.text'), 
              borderBottomColor: theme('colors.dark.border') 
            },
            'tbody tr': { 
              borderBottomColor: theme('colors.dark.border') 
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add the typography plugin
    function({ addComponents }) {
      addComponents({
        // Glassmorphism Card
        '.glass-card': {
          'background-color': 'rgba(255, 255, 255, 0.08)',
          'backdrop-filter': 'blur(12px)',
          'border-radius': '0.75rem',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          '@apply dark:bg-black/10 dark:border-white/5': {},
        },
        // Section heading
        '.section-heading': {
          '@apply text-center': {},
        },
        '.section-tag': {
          '@apply inline-block px-3 py-1 mb-2 text-xs font-medium bg-primary/10 text-primary rounded-full': {},
        },
        '.section-title': {
          '@apply text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary': {},
        },
        // Navigation Links
        '.nav-link': {
          '@apply text-light-text/80 dark:text-dark-text/80 hover:text-primary dark:hover:text-primary font-medium transition-colors': {},
        },
        '.mobile-link': {
          '@apply block py-2 px-2 text-light-text/80 dark:text-dark-text/80 hover:text-primary dark:hover:text-primary font-medium transition-colors': {},
        },
        // Social icons
        '.social-icon': {
          '@apply w-10 h-10 flex items-center justify-center rounded-full bg-light-card dark:bg-dark-card text-light-text/70 dark:text-dark-text/70 hover:bg-primary/20 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-all duration-300': {},
        },
        // CTA Buttons
        '.cta-button': {
          '@apply flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1': {},
        },
        '.cta-button.primary': {
          '@apply bg-gradient-to-r from-primary to-primary/90 text-white': {},
        },
        '.cta-button.secondary': {
          '@apply bg-gradient-to-r from-secondary to-secondary/90 text-white': {},
        },
        '.cta-button.outline': {
          '@apply border border-light-border dark:border-dark-border bg-white/5 dark:bg-black/5 backdrop-blur-sm text-light-text dark:text-dark-text hover:bg-white/10 dark:hover:bg-black/10': {},
        },
        // Project Cards
        '.project-card': {
          '@apply glass-card overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1': {},
        },
        '.project-image': {
          '@apply h-48 flex items-center justify-center': {},
        },
        '.project-content': {
          '@apply p-6': {},
        },
        '.project-title': {
          '@apply text-xl font-semibold mb-2': {},
        },
        '.project-description': {
          '@apply text-light-muted dark:text-dark-muted mb-4': {},
        },
        '.project-tags': {
          '@apply flex flex-wrap gap-2 mb-4': {},
        },
        '.project-tags span': {
          '@apply bg-light-card dark:bg-dark-card text-xs px-3 py-1 rounded-full': {},
        },
        '.project-links': {
          '@apply flex justify-between items-center text-sm font-medium': {},
        },
      })
    }
  ],
} 