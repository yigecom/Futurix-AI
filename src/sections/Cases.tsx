import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    id: 1,
    title: '某在线教育独角兽',
    subtitle: 'AI 即时交互数字人 + AI 自媒体闭环',
    challenge: '获客成本高，客服响应慢',
    solution: 'AI 数字人直播 + AI 自媒体全自动获客',
    results: [
      { label: '获客成本降低', value: '77%', from: '350元', to: '80元' },
      { label: '品牌提及率提升', value: '4倍' }
    ],
    tags: ['AI数字人', '自媒体', '获客']
  },
  {
    id: 2,
    title: '某头部小说平台',
    subtitle: 'AI影视漫剧系统',
    challenge: 'IP视频化能力缺失',
    solution: 'AI影视漫剧系统（漫剧+短剧）',
    results: [
      { label: '作品转化', value: '120部' },
      { label: '总播放量', value: '5.2亿' },
      { label: '会员转化提升', value: '80%' }
    ],
    tags: ['AI漫剧', 'IP转化', '内容生产']
  },
  {
    id: 3,
    title: '某美妆品牌',
    subtitle: 'AI自媒体创作 + GEO优化',
    challenge: '新品推广成本高，内容产能不足',
    solution: 'AI短视频自动化制作 + GEO内容优化',
    results: [
      { label: '日更短视频', value: '50条' },
      { label: '爆款率', value: '15%' },
      { label: '获客成本降低', value: '65%' }
    ],
    tags: ['AI短视频', 'GEO优化', '品牌推广']
  }
];

const Cases = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cases-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.case-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.case-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const activeCase = cases[activeIndex];

  const renderScene = (index: number, compact = false) => {
    const base = compact ? 'h-full w-full' : 'h-full w-full';
    const vignetteToneClass = index === 1
      ? 'bg-[radial-gradient(circle_at_center,transparent_40%,rgba(130,162,188,0.24)_100%)]'
      : index === 2
        ? 'bg-[radial-gradient(circle_at_center,transparent_40%,rgba(130,162,188,0.2)_100%)]'
        : 'bg-[radial-gradient(circle_at_center,transparent_40%,rgba(130,162,188,0.28)_100%)]';
    const dronePositionClasses = [
      'left-[12%] top-[20%]',
      'left-[24%] top-[38%]',
      'left-[36%] top-[58%]',
      'left-[48%] top-[28%]',
      'left-[60%] top-[50%]',
      'left-[72%] top-[34%]',
      'left-[84%] top-[44%]',
    ];
    return (
      <div className={`relative ${base} overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(187,211,230,0.24),transparent_34%),radial-gradient(circle_at_82%_76%,rgba(236,180,149,0.18),transparent_36%),linear-gradient(145deg,#0a0f16_8%,#121927_54%,#0b1119_100%)]`}>
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(171,194,214,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(171,194,214,0.18)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="absolute inset-[9%] rounded-full border border-slate-200/25 opacity-65" />
        <div className="absolute inset-[3%] rounded-full opacity-60 [background-image:radial-gradient(circle_at_center,transparent_58%,rgba(177,201,222,0.26)_59%,transparent_60%)]" />
        <div className="absolute left-1/2 top-1/2 w-[36%] h-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/35 bg-[radial-gradient(circle_at_36%_32%,rgba(201,220,236,0.35),transparent_60%),radial-gradient(circle_at_64%_68%,rgba(232,183,154,0.24),transparent_58%)]" />
        <div className="absolute left-1/2 top-1/2 w-[40%] h-[40%] -translate-x-1/2 -translate-y-1/2 opacity-55 [background-image:repeating-conic-gradient(from_0deg,rgba(192,214,231,0.22)_0deg_8deg,transparent_8deg_16deg)] rounded-full" />
        {dronePositionClasses.map((positionClass, i) => (
          <div key={`drone-${i}`} className={`absolute w-2.5 h-2.5 rounded-full border border-slate-200/45 bg-slate-200/25 ${positionClass}`} />
        ))}
        <div className={`absolute inset-0 pointer-events-none ${vignetteToneClass}`} />
      </div>
    )
  };

  return (
    <section 
      id="cases"
      ref={sectionRef}
      className="section relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-radial-cyan opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="cases-title text-center mb-16">
          <p className="text-slate-200 text-sm uppercase tracking-[0.28em] mb-4">成功案例</p>
          <h2 className="ink-title text-4xl md:text-5xl font-semibold text-white mb-6">
            见证AI驱动的
            <span className="text-gradient"> 增长奇迹</span>
          </h2>
        </div>

        {/* 3D Carousel */}
        <div 
          ref={carouselRef}
          className="relative"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {/* Main Case Card */}
          <div className="case-card glass rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Visual */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                {renderScene(activeIndex)}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent lg:bg-gradient-to-t" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/25 transition-colors border border-white/20">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {activeCase.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="text-xs px-3 py-1 rounded-full glass text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-slate-200 text-sm mb-2">{activeCase.subtitle}</p>
                <h3 className="ink-title text-2xl lg:text-3xl font-semibold text-white mb-6">
                  {activeCase.title}
                </h3>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-xs text-gray-custom uppercase tracking-wider mb-1">挑战</p>
                    <p className="text-white/80">{activeCase.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-custom uppercase tracking-wider mb-1">解决方案</p>
                    <p className="text-white/80">{activeCase.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeCase.results.map((result, i) => (
                    <div key={i} className="glass rounded-xl p-4">
                      <div className="flex items-center gap-1 text-slate-200 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xl font-bold">{result.value}</span>
                      </div>
                      <p className="text-xs text-gray-custom">{result.label}</p>
                      {result.from && result.to && (
                        <p className="text-xs text-white/60 mt-1">
                          {result.from} → {result.to}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              aria-label="查看上一条案例"
              title="上一条案例"
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-slate-300/45 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {cases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`切换到第${i + 1}条案例`}
                  title={`第${i + 1}条案例`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIndex 
                      ? 'w-8 bg-[linear-gradient(90deg,#d9e2eb,#9ec2d8,#e6b699)]' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="查看下一条案例"
              title="下一条案例"
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-slate-300/45 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Thumbnail previews */}
        <div className="flex justify-center gap-4 mt-8">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIndex(i)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden transition-all ${
                i === activeIndex 
                  ? 'ring-2 ring-slate-200/60 scale-110' 
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              {renderScene(i, true)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
