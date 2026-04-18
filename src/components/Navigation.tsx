import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '首页', href: '#hero' },
    { label: '关于我们', href: '#about' },
    { label: '服务', href: '#services' },
    { label: '案例', href: '#cases' },
    { label: '流程', href: '#process' },
    { label: '咨询', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-strong py-3 border-b border-slate-200/20' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center transition-all group-hover:shadow-[0_0_28px_rgba(181,210,231,0.35)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="ink-title text-xl font-semibold text-white leading-tight tracking-wide">未来智酷</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="text-sm text-white/72 hover:text-slate-100 transition-colors relative group tracking-wide"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[linear-gradient(90deg,#d5dce8,#8fc8d8,#e9b69b)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              className="btn-primary font-semibold text-sm"
              size="sm"
              onClick={scrollToContact}
            >
              预约咨询
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white/90 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="打开导航菜单"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-[#090d14]/95 backdrop-blur-xl" />
        <div className={`relative h-full flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              className="mobile-nav-item text-2xl font-medium text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button 
            className="btn-primary text-dark font-semibold mt-8"
            size="lg"
            onClick={scrollToContact}
          >
            预约咨询
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
