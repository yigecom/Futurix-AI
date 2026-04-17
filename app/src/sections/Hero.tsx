import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { HeroArt } from '@/components/ui/Artworks';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = 80;
    const colors = ['#00F0FF', '#7B2F9D', '#FF3366'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Mouse influence
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - dist / 100) * 0.2;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - character by character
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(chars, 
          { opacity: 0, rotateX: 90, y: -50 },
          { 
            opacity: 1, 
            rotateX: 0, 
            y: 0, 
            duration: 1.2, 
            stagger: 0.05,
            ease: 'expo.out',
            delay: 0.3
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { 
          opacity: 1, 
          clipPath: 'inset(0 0% 0 0)', 
          duration: 1, 
          ease: 'expo.out',
          delay: 0.8
        }
      );

      // Description animation
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'expo.out',
          delay: 1
        }
      );

      // Buttons animation
      gsap.fromTo(buttonsRef.current,
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: 'back.out(1.7)',
          delay: 1.2
        }
      );

      // 3D image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, rotateY: -15 },
        { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0, 
          duration: 1.8, 
          ease: 'power3.out',
          delay: 0.5
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Parallax effect for 3D image
      if (imageRef.current) {
        const rect = heroRef.current?.getBoundingClientRect();
        if (rect) {
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
          gsap.to(imageRef.current, {
            rotateY: x * 15,
            rotateX: -y * 15,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleText = '未来智酷';
  const codeColumns = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${6 + i * 6.8}%`,
    duration: `${8 + (i % 5) * 1.7}s`,
    delay: `${(i % 7) * 0.9}s`,
  }));

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Particle canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-[1]" />
      <div className="cosmic-shell z-[2]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-300/10 rounded-full blur-[140px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/10 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="code-rain z-[2]">
        {codeColumns.map((col) => (
          <span
            key={col.id}
            style={{ left: col.left, animationDuration: col.duration, animationDelay: col.delay }}
          >
            01 10 01 10 01 10 01 10
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-20">
        {/* Left: Text content */}
        <div className="text-left space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-slate-200/30">
            <Sparkles className="w-4 h-4 text-slate-200" />
            <span className="text-sm text-slate-200">未来智酷 · AI企业咨询</span>
          </div>

          {/* Title */}
          <h1 
            ref={titleRef}
            className="ink-title text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {titleText.split('').map((char, i) => (
              <span 
                key={i} 
                className="char inline-block text-gradient"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl font-light text-slate-100/90"
          >
            未来已来，与你共享新时代AI数字引擎 · 共赴未至之域
          </p>

          {/* Description */}
          <p 
            ref={descRef}
            className="text-lg text-gray-custom max-w-xl leading-relaxed"
          >
            用AI重构企业增长极，从战略咨询到全自动执行。我们提供全栈AI解决方案，助力企业构建人机协同的超级组织。
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-4">
            <Button 
              className="btn-primary font-semibold group"
              size="lg"
            >
              探索AI未来·共赴未至之域
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline"
              className="btn-secondary text-white"
              size="lg"
            >
              预约咨询
            </Button>
          </div>
        </div>

        {/* Right: 3D Image */}
        <div 
          className="relative flex items-center justify-center w-full h-[400px] md:h-[600px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <HeroArt />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
