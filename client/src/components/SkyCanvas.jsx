import React, { useEffect, useRef } from 'react';

const SkyCanvas = ({ condition = 'Clear' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle setup based on weather condition
    const isRain = /rain|drizzle|thunder/i.test(condition);
    const isSnow = /snow/i.test(condition);
    const isClear = /clear|sun/i.test(condition);
    const isCloudy = /cloud|mist|fog|haze/i.test(condition);

    const particles = [];
    const count = isRain ? 120 : isSnow ? 80 : isClear ? 35 : 50;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: isRain ? Math.random() * 20 + 10 : Math.random() * 4 + 2,
        speed: isRain ? Math.random() * 12 + 10 : isSnow ? Math.random() * 1.5 + 0.5 : Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.6 + 0.2,
        radius: isSnow ? Math.random() * 3 + 1 : isClear ? Math.random() * 3 + 1 : 1,
        angle: Math.random() * Math.PI * 2
      });
    }

    let lightningTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Thunderstorm Lightning Flash
      if (/thunder/i.test(condition)) {
        lightningTimer++;
        if (lightningTimer % 180 === 0 && Math.random() > 0.4) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      particles.forEach(p => {
        if (isRain) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(147, 197, 253, ${p.opacity})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 2, p.y + p.length);
          ctx.stroke();

          p.y += p.speed;
          p.x -= 0.5;

          if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
        } else if (isSnow) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.y += p.speed;
          p.x += Math.sin(p.y * 0.02) * 0.5;

          if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
          }
        } else if (isClear) {
          // Sunny floating golden ambient particles
          ctx.beginPath();
          ctx.fillStyle = `rgba(253, 224, 71, ${p.opacity * 0.5})`;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.y -= p.speed * 0.3;
          p.x += Math.cos(p.angle) * 0.2;
          p.angle += 0.01;

          if (p.y < 0) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
        } else {
          // Soft cloud mist particles
          ctx.beginPath();
          ctx.fillStyle = `rgba(226, 232, 240, ${p.opacity * 0.25})`;
          ctx.arc(p.x, p.y, p.radius * 8, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.speed * 0.5;
          if (p.x > canvas.width) {
            p.x = -50;
            p.y = Math.random() * canvas.height;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [condition]);

  return <canvas id="sky-canvas" ref={canvasRef} />;
};

export default SkyCanvas;
