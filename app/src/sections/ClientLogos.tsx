import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  '天艺人品牌策划',
  '超前文化',
  '未来之酷',
  '艺格网',
  '智云科技',
  '创想未来',
  '数字先锋',
  '一格书社',
];

const ClientLogos = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Speed up marquee on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const speed = Math.min(velocity / 500, 3);
          if (marqueeRef.current) {
            gsap.to(marqueeRef.current, {
              '--marquee-speed': `${30 / (1 + speed)}s`,
              duration: 0.3
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
    >
      {/* Title */}
      <div className="container-custom mb-12">
        <p className="text-center text-gray-custom text-sm uppercase tracking-widest">
          已服务企业
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />

        <div 
          ref={marqueeRef}
          className="flex animate-marquee"
          style={{ '--marquee-speed': '30s' } as React.CSSProperties}
        >
          {/* Double the items for seamless loop */}
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 px-8 py-4 glass rounded-xl group cursor-pointer hover:border-cyan/50 transition-all duration-300"
            >
              <span className="text-lg font-medium text-white/50 group-hover:text-white transition-colors whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="container-custom mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10+', label: '服务企业' },
            { value: '10+', label: '覆盖行业' },
            { value: '170%', label: '效率提升' },
            { value: '1万+', label: 'AI内容生成小时' },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm text-gray-custom">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
