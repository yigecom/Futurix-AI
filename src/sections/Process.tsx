import { useEffect, useRef } from 'react';
import { MessageSquare, FileText, Settings, GraduationCap, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: '需求对话',
    description: '免费咨询，深度诊断企业痛点与AI转型机会',
    details: ['业务流程梳理', '痛点识别', 'AI机会点分析']
  },
  {
    id: 2,
    icon: FileText,
    title: '方案设计',
    description: '定制化AI转型路线图，明确ROI目标与里程碑',
    details: ['技术架构设计', '实施路线图', 'ROI测算']
  },
  {
    id: 3,
    icon: Settings,
    title: '系统部署',
    description: '快速集成，数据迁移，员工培训与系统上线',
    details: ['系统搭建', '数据对接', '员工培训']
  },
  {
    id: 4,
    icon: GraduationCap,
    title: '培训优化',
    description: '人类团队与AI团队协同工作坊，持续优化',
    details: ['协同流程设计', 'KPI重构', '效果追踪']
  },
  {
    id: 5,
    icon: RefreshCw,
    title: '持续迭代',
    description: '月度复盘，模型微调，新功能升级与扩展',
    details: ['月度复盘', '模型优化', '功能升级']
  }
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.process-title',
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

      // Path drawing animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1
          }
        });
      }

      // Steps animation
      const stepElements = stepsRef.current?.querySelectorAll('.process-step');
      if (stepElements) {
        stepElements.forEach((step, i) => {
          gsap.fromTo(step,
            { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="process"
      ref={sectionRef}
      className="section relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-radial-purple opacity-10" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="process-title text-center mb-20">
          <p className="text-slate-200 text-sm uppercase tracking-[0.28em] mb-4">合作流程</p>
          <h2 className="ink-title text-4xl md:text-5xl font-semibold text-white mb-6">
            五步开启
            <span className="text-gradient"> AI转型之旅</span>
          </h2>
          <p className="text-gray-custom max-w-2xl mx-auto">
            从需求诊断到持续优化，我们提供端到端的AI转型服务
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* SVG Path - Desktop only */}
          <svg 
            className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 hidden lg:block"
            viewBox="0 0 4 800"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M2 0 L2 800"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dce8f2" />
                <stop offset="50%" stopColor="#9bc5d8" />
                <stop offset="100%" stopColor="#e8b79c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`process-step relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:direction-rtl'
                }`}
              >
                {/* Content */}
                <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:order-2 lg:pl-16'}`}>
                  <div className={`glass rounded-2xl p-8 inline-block border border-slate-200/15 ${index % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-xl icon-shell flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-200 text-sm tracking-wide">步骤 {step.id}</p>
                        <h3 className="ink-title text-xl font-semibold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-custom mb-4">{step.description}</p>
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      {step.details.map((detail, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-200/75 border border-slate-200/10"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Node - Desktop only */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full icon-shell flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.id}</span>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className={`hidden lg:block ${index % 2 === 0 ? 'lg:order-2' : ''}`} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button 
            className="btn-primary font-semibold text-lg px-10 py-5"
            onClick={scrollToContact}
          >
            开启您的AI转型之旅
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;
