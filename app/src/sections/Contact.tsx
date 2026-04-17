import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, MapPin, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactArt } from '@/components/ui/Artworks';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-title',
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

      gsap.fromTo('.contact-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    { icon: Phone, label: '电话', value: '可发邮箱' },
    { icon: Mail, label: '邮箱', value: 'yigecom@126.com' },
    { icon: MapPin, label: '地址', value: '北京' },
  ];

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="section relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-radial-cyan opacity-10" />
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-radial-purple opacity-10" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="contact-title text-center mb-16">
          <p className="text-slate-200 text-sm uppercase tracking-[0.28em] mb-4">联系我们</p>
          <h2 className="ink-title text-4xl md:text-5xl font-semibold text-white mb-6">
            开启您的
            <span className="text-gradient"> AI未来</span>
          </h2>
          <p className="text-gray-custom max-w-2xl mx-auto">
            无论您是想了解我们的服务，还是准备开始AI转型，我们都期待与您的交流
          </p>
        </div>

        {/* Content */}
        <div className="contact-content grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: 3D Image & Contact Info */}
          <div className="space-y-8">
            {/* 3D Art */}
            <div className="relative flex items-center justify-center w-full h-[300px] md:h-[400px]">
              <ContactArt />
            </div>

            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="glass rounded-xl p-4 text-center card-hover border border-slate-200/15"
                >
                  <div className="w-10 h-10 rounded-lg icon-shell-soft flex items-center justify-center mx-auto mb-3">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-gray-custom mb-1">{info.label}</p>
                  <p className="text-sm text-white font-medium">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass rounded-2xl p-8 lg:p-10 border border-slate-200/15">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full icon-shell flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="ink-title text-2xl font-semibold text-white mb-4">提交成功！</h3>
                <p className="text-gray-custom mb-6">
                  感谢您的咨询，我们的AI顾问将在24小时内与您联系
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary text-white"
                >
                  继续咨询
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="name" 
                      className={`text-sm transition-colors ${focusedField === 'name' ? 'text-slate-200' : 'text-gray-custom'}`}
                    >
                      姓名
                    </Label>
                    <Input
                      id="name"
                      placeholder="您的姓名"
                      required
                      className="bg-white/5 border-slate-200/15 text-white placeholder:text-white/30 focus:border-slate-300/45 focus:ring-slate-300/20"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label 
                      htmlFor="phone"
                      className={`text-sm transition-colors ${focusedField === 'phone' ? 'text-slate-200' : 'text-gray-custom'}`}
                    >
                      电话
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="您的电话"
                      required
                      className="bg-white/5 border-slate-200/15 text-white placeholder:text-white/30 focus:border-slate-300/45 focus:ring-slate-300/20"
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="email"
                    className={`text-sm transition-colors ${focusedField === 'email' ? 'text-slate-200' : 'text-gray-custom'}`}
                  >
                    邮箱
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="您的邮箱"
                    required
                    className="bg-white/5 border-slate-200/15 text-white placeholder:text-white/30 focus:border-slate-300/45 focus:ring-slate-300/20"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="company"
                    className={`text-sm transition-colors ${focusedField === 'company' ? 'text-slate-200' : 'text-gray-custom'}`}
                  >
                    公司名称
                  </Label>
                  <Input
                    id="company"
                    placeholder="您的公司名称"
                    className="bg-white/5 border-slate-200/15 text-white placeholder:text-white/30 focus:border-slate-300/45 focus:ring-slate-300/20"
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="message"
                    className={`text-sm transition-colors ${focusedField === 'message' ? 'text-slate-200' : 'text-gray-custom'}`}
                  >
                    咨询内容
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="请描述您的需求或问题..."
                    rows={4}
                    className="bg-white/5 border-slate-200/15 text-white placeholder:text-white/30 focus:border-slate-300/45 focus:ring-slate-300/20 resize-none"
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      提交咨询
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-custom text-center">
                  提交即表示您同意我们的隐私政策和服务条款
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
