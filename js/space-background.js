// Space background implementation for portfolio
class SpaceBackground {
  constructor() {
    this.canvas = document.getElementById('space-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseRadius = 150;
    this.animationId = null;

    // Initialize
    this.init();
    this.setupEventListeners();
  }

  init() {
    // Set canvas to full window size
    this.resizeCanvas();

    // Create stars with realistic properties
    this.createStars(1500);

    // Start animation
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars(count) {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      // Create stars with realistic distribution
      const star = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 1.5 + 0.2, // Small to medium stars
        brightness: Math.random() * 0.8 + 0.2, // Varying brightness
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        originalSize: Math.random() * 1.5 + 0.2,
        originalBrightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2
      };

      // Make some stars larger (representing brighter stars)
      if (Math.random() > 0.9) {
        star.size *= 2;
        star.brightness = 1;
        star.originalBrightness = 1;
      }

      this.stars.push(star);
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());

    // Mouse tracking
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Mouse leave to reset
    this.canvas.addEventListener('mouseleave', () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    });

    // Click interaction (optional)
    this.canvas.addEventListener('click', (e) => {
      // Could implement star interaction here
    });
  }

  updateStars() {
    const now = Date.now();

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];

      // Update position with subtle movement
      star.x += star.speedX;
      star.y += star.speedY;

      // Add slight twinkling effect
      star.brightness = star.originalBrightness + Math.sin(now * star.twinkleSpeed + star.twinklePhase) * 0.3;
      star.brightness = Math.max(0.1, Math.min(1, star.brightness));

      // Reset position if out of bounds
      if (star.x < -50 || star.x > this.canvas.width + 50 ||
          star.y < -50 || star.y > this.canvas.height + 50) {
        star.x = Math.random() * this.canvas.width;
        star.y = Math.random() * this.canvas.height;
      }

      // Mouse interaction
      const dx = this.mouseX - star.x;
      const dy = this.mouseY - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.mouseRadius) {
        const intensity = 1 - (distance / this.mouseRadius);
        star.brightness = Math.min(1, star.brightness + intensity * 0.7);
        star.size = star.originalSize + intensity * 2;
      } else {
        star.size = star.originalSize;
      }
    }
  }

  draw() {
    // Clear canvas with deep space background
    this.ctx.fillStyle = '#000814';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw stars
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];

      // Create radial gradient for star glow effect
      const gradient = this.ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 3
      );

      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw the star itself
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  animate() {
    this.updateStars();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create space background instance
  const spaceBackground = new SpaceBackground();
});