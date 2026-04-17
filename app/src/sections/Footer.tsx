import { Sparkles, Github, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'AI企业咨询', href: '#' },
      { label: 'AI企业数智化', href: '#' },
      { label: 'AI数字团队', href: '#' },
      { label: 'AI即时交互数字人', href: '#' },
      { label: 'GEO生成式引擎优化', href: '#' },
      { label: 'AI影视漫剧', href: '#' },
      { label: 'AI自媒体创作', href: '#' },
      { label: 'AI数智课堂', href: '#' },
      { label: 'AI舆情监控', href: '#' },
    ],
    company: [
      { label: '关于我们', href: '#about' },
      { label: '成功案例', href: '#cases' },
      { label: '合作流程', href: '#process' },
      { label: '联系我们', href: '#contact' },
    ],
    resources: [
      { label: 'AI转型白皮书', href: '#' },
      { label: 'GEO生成式引擎优化', href: '#' },
      { label: 'AI交互数字人实操课', href: '#' },
      { label: '博客文章', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-[#090d14] border-t border-slate-200/10">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />

      <div className="container-custom py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="flex items-center gap-2 group mb-6"
            >
              <div className="w-10 h-10 rounded-xl icon-shell flex items-center justify-center transition-all group-hover:shadow-[0_0_28px_rgba(181,210,231,0.35)]">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="ink-title text-lg font-semibold text-white leading-tight tracking-wide">未来智酷</span>
                <span className="text-sm tracking-[0.22em] text-slate-200/80">FUTURIX</span>
              </div>
            </a>
            <p className="text-gray-custom text-sm leading-relaxed mb-6 max-w-sm">
              专注于AI企业级应用的咨询与技术服务商，助力企业构建人机协同的超级组织，共赴未至之域。
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-slate-300/45 hover:text-slate-200 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="ink-title text-white font-semibold mb-4">服务</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-custom hover:text-slate-100 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="ink-title text-white font-semibold mb-4">公司</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-sm text-gray-custom hover:text-slate-100 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="ink-title text-white font-semibold mb-4">资源</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-custom hover:text-slate-100 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partners */}
        <div className="border-t border-slate-200/10 pt-8 mb-8">
          <p className="text-xs text-gray-custom uppercase tracking-wider mb-4">合作伙伴</p>
          <div className="flex flex-wrap gap-6">
            {['天艺人品牌策划', '超前文化', '未来之酷', '艺格网','一格书社'].map((partner, index) => (
              <span 
                key={index}
                className="text-sm text-white/50 hover:text-slate-100 transition-colors cursor-pointer"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-custom">
            © {currentYear} 未来智酷 · 与你相邀. 共赴未至之域  (部分数据仅供参考 · 以实际落地数据为准，最终解释权归未来智酷所有)
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-custom hover:text-slate-100 transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-sm text-gray-custom hover:text-slate-100 transition-colors">
              服务条款
            </a>
            <a href="#" className="text-sm text-gray-custom hover:text-slate-100 transition-colors">
              Cookie设置
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
