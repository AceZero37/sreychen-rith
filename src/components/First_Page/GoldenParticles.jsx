import React, { useEffect, useRef } from "react";

const GoldenParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse interaction
    let mouse = { x: null, y: null, radius: 100 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Particle class
    const colors = [
      "rgba(255, 232, 115, ", // #ffe873 - Primary gold
      "rgba(255, 215, 0, ",   // #ffd700 - Pure gold
      "rgba(245, 215, 110, ", // Soft champagne
      "rgba(255, 248, 220, ", // Cornsilk highlight
      "rgba(255, 255, 255, ", // Star white shimmer
    ];

    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);

    class Particle {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.x = Math.random() * width;
        this.y = isInitial ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.8 + 1.0;
        this.baseSize = this.size;
        this.speedY = Math.random() * 0.7 + 0.3; // Gentle upward drift
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.baseAlpha = Math.random() * 0.6 + 0.25;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleAngle = Math.random() * Math.PI * 2;
        this.isBokeh = Math.random() < 0.15; // 15% are larger soft orbs
        if (this.isBokeh) {
          this.size = Math.random() * 5 + 4;
          this.baseAlpha = Math.random() * 0.2 + 0.08;
        }
      }

      update() {
        // Move upward
        this.y -= this.speedY;
        this.wobbleAngle += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobbleAngle) * 0.35;

        // Twinkle
        this.twinkleOffset += this.twinkleSpeed;
        this.alpha =
          this.baseAlpha + Math.sin(this.twinkleOffset) * (this.baseAlpha * 0.4);

        // Mouse gentle push
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 2;
            this.y += (dy / dist) * force * 2;
          }
        }

        // Reset if drifted off screen
        if (this.y < -15 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        if (this.isBokeh) {
          // Soft radial glow for bokeh orbs
          const grad = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size
          );
          grad.addColorStop(0, `${this.colorPrefix}${this.alpha})`);
          grad.addColorStop(1, `${this.colorPrefix}0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          // Sharp glowing particle
          ctx.shadowBlur = this.size * 3.5;
          ctx.shadowColor = "#ffe873";
          ctx.fillStyle = `${this.colorPrefix}${Math.max(0, this.alpha)})`;
          ctx.fill();

          // Little cross flare on brightest particles
          if (this.alpha > 0.65 && this.size > 2.2) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.5})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(this.x - this.size * 2, this.y);
            ctx.lineTo(this.x + this.size * 2, this.y);
            ctx.moveTo(this.x, this.y - this.size * 2);
            ctx.lineTo(this.x, this.y + this.size * 2);
            ctx.stroke();
          }
        }
        ctx.restore();
      }
    }

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(true));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="golden-particles-canvas"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
};

export default GoldenParticles;

