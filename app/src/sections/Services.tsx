import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers,
  Database, 
  Users, 
  UserCircle, 
  Search,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    icon: Layers,
    title: 'AI企业咨询服务',
    subtitle: 'consult.futureai.com',
    route: 'ai-consulting',
    description: '从战略到落地，AI转型领航者。提供AI战略规划、技术选型、组织赋能、落地陪跑等全栈咨询服务。同时涵盖AI自媒体创作、AI影视漫剧等全链路内容生产服务。',
    features: ['AI战略规划', '技术架构设计', 'AI内容生产', '自媒体创作', '影视漫剧'],
    color: 'cyan'
  },
  {
    id: 2,
    icon: Database,
    title: 'AI企业数智化',
    subtitle: 'digital.futureai.com',
    route: 'ai-digital',
    description: '重塑企业架构，数据驱动未来。通过RPA+AI实现业务流程自动化，构建企业专属知识库。',
    features: ['业务流程自动化', '数据中台建设', '组织架构重塑', '智能决策系统'],
    color: 'purple'
  },
  {
    id: 3,
    icon: Users,
    title: 'AI数字团队',
    subtitle: 'team.futureai.com',
    route: 'ai-team',
    description: '永不掉线的AI员工矩阵。拥有持久身份、长期记忆、自主意识的数字员工团队，像人类一样协作、学习、进化。',
    features: ['自适应自主意识', '多智能体协作', '组织级管控', '自我进化'],
    color: 'pink'
  },
  {
    id: 4,
    icon: UserCircle,
    title: 'AI即时交互数字人',
    subtitle: 'avatar.futureai.com',
    route: 'ai-avatar',
    description: '7x24小时智能交互生命体。支持AI直播、AI客服、AI播客等多场景应用，毫秒级响应。',
    features: ['AI直播带货', '智能客服', 'AI播客', '多语言支持'],
    color: 'cyan'
  },
  {
    id: 5,
    icon: Search,
    title: 'GEO生成式引擎优化',
    subtitle: 'geo.futureai.com',
    route: 'geo',
    description: '抢占AI生成答案的第一席位。系统化优化内容，使ChatGPT、DeepSeek等AI优先、准确、可信地推荐您的品牌。',
    features: ['关键词蒸馏', '结构化创作', '多模型验证', '负面监控'],
    color: 'purple'
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.services-title',
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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="section relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="services-title text-center mb-16">
          <p className="text-slate-200 text-sm uppercase tracking-[0.28em] mb-4">核心服务</p>
          <h2 className="ink-title text-4xl md:text-5xl font-semibold text-white mb-6">
            五大AI解决方案
            <span className="text-gradient"> 矩阵</span>
          </h2>
          <p className="text-gray-custom max-w-2xl mx-auto">
            从战略咨询到技术落地，从数字员工到内容生产，我们提供全方位的AI企业级解决方案
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card glass rounded-2xl p-6 card-hover group cursor-pointer relative overflow-hidden ${
                activeService === service.id ? 'ring-2 ring-slate-200/55' : ''
              } ${
                index < 3 
                  ? 'md:col-span-2 lg:col-span-2' 
                  : 'md:col-span-2 lg:col-span-3'
              }`}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              onClick={() => navigate(`/service/${service.route}`)}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100/8 via-slate-300/5 to-orange-200/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-xl icon-shell flex items-center justify-center mb-4 transition-shadow">
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <div className="relative">
                <p className="text-xs text-gray-custom mb-1">{service.subtitle}</p>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gradient transition-all">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-custom mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>了解更多</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              {/* External link icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-gray-custom" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-custom mb-4">需要定制化解决方案？</p>
          <button className="btn-primary font-semibold">
            联系我们获取专属方案
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
