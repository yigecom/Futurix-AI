import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Zap, Users, Brain, TrendingDown, UserX, Package, Users2, Coins } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutArt } from '@/components/ui/Artworks';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const painPointsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, rotateZ: -10 },
        {
          opacity: 1,
          scale: 1,
          rotateZ: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Pain points animation
      const painPoints = painPointsRef.current?.querySelectorAll('.pain-point-card');
      if (painPoints) {
        gsap.fromTo(painPoints,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: painPointsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.value-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Sphere rotation on scroll
      const imgElement = imageRef.current?.querySelector('img');
      if (imgElement) {
        gsap.to(imgElement, {
          rotateZ: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const painPoints = [
    {
      icon: UserX,
      title: '客户不好找',
      description: '传统获客渠道成本高昂，精准客户难以触达'
    },
    {
      icon: Package,
      title: '产品不好卖',
      description: '市场竞争激烈，产品同质化严重，缺乏差异化优势'
    },
    {
      icon: Users2,
      title: '团队无战力',
      description: '人效低下，协作效率差，难以形成核心竞争力'
    },
    {
      icon: TrendingDown,
      title: '人才难招',
      description: 'AI人才稀缺，招聘成本高，团队建设困难重重'
    },
    {
      icon: Coins,
      title: '利润增长乏力',
      description: '成本持续上升，利润空间被压缩，增长遇到瓶颈'
    }
  ];

  const values = [
    {
      icon: Target,
      title: '全栈能力',
      description: '从企业战略咨询到AI系统部署，再到持续迭代优化'
    },
    {
      icon: Users,
      title: '组织级方案',
      description: '不仅提供工具，更重塑企业架构与团队协作方式'
    },
    {
      icon: Brain,
      title: '未来前瞻',
      description: '聚焦GEO、多智能体协作、AI短剧等前沿领域'
    },
    {
      icon: Zap,
      title: '快速落地',
      description: '6-12个月深度陪跑，敏捷迭代，效果追踪与调优'
    }
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="section relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-purple opacity-30" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <p className="text-slate-200 text-sm uppercase tracking-[0.28em] mb-4">关于我们</p>
              <h2 className="ink-title text-4xl md:text-5xl font-semibold text-white mb-6">
                用AI释放人类潜能的
                <span className="text-gradient"> 杠杆</span>
              </h2>
            </div>

            <div className="space-y-4 text-gray-custom leading-relaxed">
              <p>
                未来智酷，是一家专注于<strong className="text-white">AI企业级应用</strong>的咨询与技术服务商。我们坚信，AI不是替代人类的工具，而是释放人类潜能的杠杆。
              </p>
              <p>
                自成立以来，未来智酷为您提供从<strong className="text-white">战略咨询到技术落地</strong>，应用开发，技术支持，培训等的全栈AI解决方案，涵盖AI数智化转型、数字员工部署、AI内容生产、GEO搜索引擎优化等领域。
              </p>
              <p>
                旗下核心业务线<strong className="text-white">"未来智酷"</strong>，致力于用最前沿的AI技术，帮助企业构建"人机协同"的超级组织，共赴未至之域。
              </p>
            </div>

            <Button 
              className="btn-secondary text-white group"
              size="lg"
              onClick={scrollToServices}
            >
              了解更多
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right: 3D Sphere */}
          <div 
            ref={imageRef}
            className="relative flex items-center justify-center w-full h-[400px] md:h-[500px]"
          >
            <AboutArt />
          </div>
        </div>

        {/* Pain Points Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="text-slate-200 text-sm uppercase tracking-[0.24em] mb-2">想你所想</p>
            <h3 className="ink-title text-2xl md:text-3xl font-semibold text-white">
              您的企业是否面临这些<span className="text-gradient">挑战</span>？
            </h3>
          </div>
          <div 
            ref={painPointsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="pain-point-card glass rounded-2xl p-5 card-hover group border-slate-200/15"
              >
                <div className="w-10 h-10 rounded-xl icon-shell-soft flex items-center justify-center mb-3 transition-shadow">
                  <point.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{point.title}</h3>
                <p className="text-xs text-gray-custom">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Advantages Title Section */}
        <div className="mt-20 text-center">
          <p className="text-slate-200 text-sm uppercase tracking-[0.28em] mb-4">核心优势</p>
          <h3 className="ink-title text-2xl md:text-3xl font-semibold text-white">
            新时代数智化引擎
          </h3>
          <p className="text-lg md:text-xl text-gray-custom max-w-3xl mx-auto leading-relaxed">
            未来智酷，与你共享，共创未来无限可能
          </p>
        </div>

        {/* Value cards */}
        <div 
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {values.map((value, index) => (
            <div 
              key={index}
              className="value-card glass rounded-2xl p-6 card-hover group"
            >
              <div className="w-12 h-12 rounded-xl icon-shell flex items-center justify-center mb-4 transition-shadow">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-sm text-gray-custom">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
