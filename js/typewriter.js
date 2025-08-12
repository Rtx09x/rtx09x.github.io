// Typewriter Effect System
class TypewriterEffect {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.options = {
      typeSpeed: 100,
      deleteSpeed: 50,
      pauseTime: 2000,
      loop: true,
      cursor: true,
      ...options
    };
    
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.isPaused = false;
    
    this.init();
  }
  
  init() {
    if (this.element) {
      this.type();
    }
  }
  
  type() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (this.isDeleting) {
      // Deleting characters
      this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
      
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        setTimeout(() => this.type(), 500);
        return;
      }
    } else {
      // Typing characters
      this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      
      if (this.currentCharIndex === currentText.length) {
        this.isPaused = true;
        setTimeout(() => {
          this.isPaused = false;
          this.isDeleting = true;
          // Trigger callback when starting to delete (text change)
          if (this.options.onTextChange) {
            this.options.onTextChange();
          }
          this.type();
        }, this.options.pauseTime);
        return;
      }
    }
    
    const speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
    setTimeout(() => this.type(), speed);
  }
  
  updateTexts(newTexts) {
    this.texts = newTexts;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
  }
  
  pause() {
    this.isPaused = true;
  }
  
  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.type();
    }
  }
  
  destroy() {
    this.isPaused = true;
    if (this.element) {
      this.element.textContent = '';
    }
  }
}

// Enhanced Typewriter with Multiple Effects
class EnhancedTypewriter {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.options = {
      typeSpeed: 80,
      deleteSpeed: 40,
      pauseTime: 2000,
      scrambleTime: 300,
      effects: ['type', 'scramble', 'fade'],
      ...options
    };
    
    this.currentTextIndex = 0;
    this.currentEffect = 0;
    this.isActive = true;
    
    this.init();
  }
  
  init() {
    if (this.element) {
      this.startEffect();
    }
  }
  
  startEffect() {
    if (!this.isActive) return;
    
    const effectName = this.options.effects[this.currentEffect % this.options.effects.length];
    
    switch (effectName) {
      case 'type':
        this.typeEffect();
        break;
      case 'scramble':
        this.scrambleEffect();
        break;
      case 'fade':
        this.fadeEffect();
        break;
      default:
        this.typeEffect();
    }
  }
  
  typeEffect() {
    const text = this.texts[this.currentTextIndex];
    let charIndex = 0;
    
    const typeChar = () => {
      if (!this.isActive) return;
      
      this.element.textContent = text.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex < text.length) {
        setTimeout(typeChar, this.options.typeSpeed + Math.random() * 50);
      } else {
        setTimeout(() => this.deleteEffect(), this.options.pauseTime);
      }
    };
    
    typeChar();
  }
  
  deleteEffect() {
    const currentText = this.element.textContent;
    let charIndex = currentText.length;
    
    const deleteChar = () => {
      if (!this.isActive) return;
      
      this.element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex > 0) {
        setTimeout(deleteChar, this.options.deleteSpeed);
      } else {
        this.nextText();
      }
    };
    
    deleteChar();
  }
  
  scrambleEffect() {
    const text = this.texts[this.currentTextIndex];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let iterations = 0;
    const maxIterations = text.length;
    
    const scramble = () => {
      if (!this.isActive) return;
      
      let scrambledText = '';
      for (let i = 0; i < text.length; i++) {
        if (i < iterations) {
          scrambledText += text[i];
        } else {
          scrambledText += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      this.element.textContent = scrambledText;
      iterations++;
      
      if (iterations <= maxIterations) {
        setTimeout(scramble, 50);
      } else {
        setTimeout(() => this.deleteEffect(), this.options.pauseTime);
      }
    };
    
    scramble();
  }
  
  fadeEffect() {
    const text = this.texts[this.currentTextIndex];
    this.element.style.opacity = '0';
    
    setTimeout(() => {
      if (!this.isActive) return;
      
      this.element.textContent = text;
      this.element.style.transition = 'opacity 0.5s ease';
      this.element.style.opacity = '1';
      
      setTimeout(() => {
        if (!this.isActive) return;
        
        this.element.style.opacity = '0';
        setTimeout(() => this.nextText(), 500);
      }, this.options.pauseTime);
    }, 500);
  }
  
  nextText() {
    this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
    this.currentEffect = (this.currentEffect + 1) % this.options.effects.length;
    
    // Trigger callback if provided
    if (this.options.onTextChange) {
      this.options.onTextChange();
    }
    
    setTimeout(() => {
      if (this.isActive) {
        this.startEffect();
      }
    }, 300);
  }
  
  pause() {
    this.isActive = false;
  }
  
  resume() {
    this.isActive = true;
    this.startEffect();
  }
  
  destroy() {
    this.isActive = false;
    if (this.element) {
      this.element.textContent = '';
      this.element.style.opacity = '1';
      this.element.style.transition = '';
    }
  }
}

// Glitch Text Effect
class GlitchText {
  constructor(element, text, options = {}) {
    this.element = element;
    this.originalText = text;
    this.options = {
      intensity: 0.1,
      speed: 50,
      duration: 2000,
      ...options
    };
    
    this.isGlitching = false;
    this.glitchInterval = null;
  }
  
  start() {
    if (this.isGlitching) return;
    
    this.isGlitching = true;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    this.glitchInterval = setInterval(() => {
      let glitchedText = '';
      
      for (let i = 0; i < this.originalText.length; i++) {
        if (Math.random() < this.options.intensity) {
          glitchedText += chars[Math.floor(Math.random() * chars.length)];
        } else {
          glitchedText += this.originalText[i];
        }
      }
      
      this.element.textContent = glitchedText;
    }, this.options.speed);
    
    setTimeout(() => this.stop(), this.options.duration);
  }
  
  stop() {
    if (this.glitchInterval) {
      clearInterval(this.glitchInterval);
      this.glitchInterval = null;
    }
    
    this.isGlitching = false;
    this.element.textContent = this.originalText;
  }
}

// Initialize typewriter effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Main hero typewriter
  const typewriterElement = document.getElementById('typewriter-text');
  const heroTitle = document.getElementById('hero-title');
  
  if (typewriterElement) {
    // Wait for config to be available
    const initTypewriter = () => {
      let texts = [];
      
      if (window.siteConfig && window.siteConfig.personal && window.siteConfig.personal.subtitle) {
        texts = window.siteConfig.personal.subtitle;
      } else {
        // Fallback texts if config doesn't load
        texts = [
          "Full-stack Developer",
          "Research Enthusiast", 
          "Music Producer",
          "AI Explorer",
          "Creative Thinker"
        ];
      }
      
      const typewriter = new TypewriterEffect(
        typewriterElement,
        texts,
        {
          typeSpeed: 100,
          deleteSpeed: 50,
          pauseTime: 2000,
          loop: true,
          onTextChange: () => {
            // Trigger glitch effect on name when text changes
            if (heroTitle && window.nameGlitch) {
              window.nameGlitch.start();
            }
          }
        }
      );
      
      // Make globally available
      window.typewriter = typewriter;
    };
    
    initTypewriter();
  }
  
  // Hero title glitch effect
  if (heroTitle) {
    const glitch = new GlitchText(heroTitle, heroTitle.textContent, {
      intensity: 0.04,
      speed: 120,
      duration: 600
    });
    
    // Make globally available for syncing
    window.nameGlitch = glitch;
    
    // Also trigger on hover
    heroTitle.addEventListener('mouseenter', () => {
      glitch.start();
    });
  }
});

// Export classes for external use
window.TypewriterEffect = TypewriterEffect;
window.EnhancedTypewriter = EnhancedTypewriter;
window.GlitchText = GlitchText;