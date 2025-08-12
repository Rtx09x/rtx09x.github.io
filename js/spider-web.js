// Spider Web Animation System (Based on original spiderman_portfolio.html)
class SpiderWebAnimation {
  constructor() {
    this.canvas = document.getElementById('spider-web-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.points = [];
    this.animationId = null;
    this.isActive = true;
    this.w = 0;
    this.h = 0;
    
    this.init();
  }
  
  init() {
    this.resize();
    this.initPoints();
    this.setupEventListeners();
    this.draw();
  }
  
  resize() {
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;
    this.initPoints();
  }
  
  initPoints() {
    this.points = Array.from({length: 120}, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => this.resize());
    
    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
      if (this.isActive && !this.animationId) {
        this.draw();
      }
    });
  }
  
  draw() {
    if (!this.isActive) return;
    
    this.ctx.clearRect(0, 0, this.w, this.h);
    
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > this.w) p.vx *= -1;
      if (p.y < 0 || p.y > this.h) p.vy *= -1;
      
      for (let j = i + 1; j < this.points.length; j++) {
        const q = this.points[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 120) {
          this.ctx.strokeStyle = `rgba(79,140,255,${1 - dist / 120})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(q.x, q.y);
          this.ctx.stroke();
        }
      }
    }
    
    this.animationId = requestAnimationFrame(() => this.draw());
  }
  
  // Public methods
  pause() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  resume() {
    this.isActive = true;
    this.draw();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      window.spiderWeb = new SpiderWebAnimation();
    } else {
      // Create static web for accessibility
      const canvas = document.getElementById('spider-web-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Draw simple static pattern
        ctx.strokeStyle = 'rgba(79, 140, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 10; i++) {
          ctx.beginPath();
          ctx.moveTo(0, (canvas.height / 10) * i);
          ctx.lineTo(canvas.width, (canvas.height / 10) * i);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo((canvas.width / 10) * i, 0);
          ctx.lineTo((canvas.width / 10) * i, canvas.height);
          ctx.stroke();
        }
      }
    }
  }, 100);
});