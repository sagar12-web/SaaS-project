import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AuroraBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Aurora animation
    let time = 0;
    const animate = () => {
      time += 0.005;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsla(${200 + Math.sin(time) * 30}, 70%, 50%, 0.1)`);
      gradient.addColorStop(0.5, `hsla(${280 + Math.sin(time * 0.5) * 40}, 80%, 60%, 0.15)`);
      gradient.addColorStop(1, `hsla(${320 + Math.sin(time * 0.3) * 50}, 90%, 70%, 0.1)`);
      
      // Draw aurora
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Create flowing aurora shape
      for (let x = 0; x <= canvas.width; x += 10) {
        const y = canvas.height * 0.3 + 
                  Math.sin(x * 0.01 + time) * 100 +
                  Math.sin(x * 0.005 + time * 0.5) * 50;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Canvas Aurora */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* CSS Aurora Overlay */}
      <div className="absolute inset-0 aurora-bg opacity-20" />
      
      {/* Floating Light Orbs */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-aurora-green rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Gradient Mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-aurora-blue/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-radial from-aurora-purple/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-radial from-aurora-pink/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-bg" />
    </div>
  );
};

export default AuroraBackground; 