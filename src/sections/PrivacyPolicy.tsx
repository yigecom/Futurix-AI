import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.privacy-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out'
        }
      );

      gsap.fromTo('.privacy-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          delay: 0.2
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#05050A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-[0.15]" />
      <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-cyan/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-purple/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 pt-8 pb-4">
        <div className="container-custom">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="text-gray-custom hover:text-cyan hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="container-custom relative z-10 pb-32 pt-10">
        {/* Hero Section */}
        <div className="privacy-title text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan/30 mb-8">
            <Shield className="w-4 h-4 text-cyan" />
            <span className="text-sm text-cyan font-medium tracking-wider uppercase">隐私保护</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            隐私政策
          </h1>
          <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple font-medium mb-10">
            未来智酷用户隐私保护协议
          </p>
          <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-5xl mx-auto border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan via-purple to-pink" />
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light text-center">
              本隐私政策阐述了未来智酷（以下简称"我们"）如何收集、使用、存储和保护您的个人信息。我们致力于保护您的隐私，请您仔细阅读本政策。
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="privacy-content glass rounded-3xl p-8 md:p-12 border border-white/5 max-w-5xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            
            <div className="flex items-start gap-4 mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
              <AlertCircle className="w-6 h-6 text-cyan flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">隐私承诺</h3>
                <p className="text-gray-custom">
                  我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们承诺采取相应的安全保护措施来保护您的个人信息。
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Eye className="w-7 h-7 text-cyan" />
                  一、我们收集的信息
                </h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    为了向您提供我们的服务，我们可能会收集以下类型的信息：
                  </p>
                  <ul className="space-y-3 pl-5">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span><strong className="text-white">身份信息：</strong>当您注册账户或使用我们的服务时，我们可能会收集您的姓名、电子邮件地址、电话号码等。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span><strong className="text-white">企业信息：</strong>当您申请企业服务时，我们可能会收集公司名称、职位、行业等企业相关信息。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span><strong className="text-white">使用数据：</strong>我们可能会收集您使用我们服务时的数据，包括IP地址、浏览器类型、访问时间、页面浏览记录等。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span><strong className="text-white">咨询内容：</strong>当您通过我们的咨询表单联系我们时，我们可能会收集您提供的咨询内容及相关信息。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span><strong className="text-white">AI交互数据：</strong>在使用我们的AI服务时，我们可能会收集您与AI的交互数据，用于改进服务质量。</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Database className="w-7 h-7 text-cyan" />
                  二、我们如何使用信息
                </h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    我们收集的信息可能用于以下目的：
                  </p>
                  <ul className="space-y-3 pl-5">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs text-cyan">1</span>
                      </div>
                      <span>提供、维护和改进我们的服务</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs text-cyan">2</span>
                      </div>
                      <span>处理您的咨询请求并提供客户支持</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs text-cyan">3</span>
                      </div>
                      <span>发送重要的服务通知，如政策变更、安全更新等</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs text-cyan">4</span>
                      </div>
                      <span>进行数据分析，以了解用户需求并优化服务体验</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs text-cyan">5</span>
                      </div>
                      <span>防止欺诈和滥用行为，确保服务安全</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Lock className="w-7 h-7 text-cyan" />
                  三、信息共享与披露
                </h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    我们不会将您的个人信息出售给第三方。但在以下情况下，我们可能会共享您的信息：
                  </p>
                  <ul className="space-y-3 pl-5">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs text-cyan">A</span>
                      </div>
                      <span><strong className="text-white">获得您的明确同意：</strong>在获得您的明确同意后，我们会与其他方共享您的信息。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs text-cyan">B</span>
                      </div>
                      <span><strong className="text-white">法律要求：</strong>根据法律法规、法律程序或政府机关的强制性要求，我们可能会披露您的信息。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs text-cyan">C</span>
                      </div>
                      <span><strong className="text-white">保护权益：</strong>为保护未来智酷、我们的用户或公众的权益、财产或安全免遭损害，我们可能会披露信息。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs text-cyan">D</span>
                      </div>
                      <span><strong className="text-white">服务提供商：</strong>我们可能会与为我们提供服务的第三方共享必要的信息，但这些第三方必须遵守严格的保密义务。</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">四、数据安全</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    我们采取合理的技术和管理措施来保护您的个人信息，防止未经授权的访问、使用、修改、披露或破坏。这些措施包括：
                  </p>
                  <ul className="space-y-3 pl-5">
                    <li>使用加密技术保护数据传输</li>
                    <li>实施访问控制，限制员工访问个人信息的权限</li>
                    <li>定期进行安全审计和漏洞扫描</li>
                    <li>对员工进行隐私保护培训</li>
                  </ul>
                  <p>
                    尽管我们采取了合理的措施，但没有任何安全措施是完美的。我们无法保证信息的绝对安全。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <UserCheck className="w-7 h-7 text-cyan" />
                  五、您的权利
                </h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    根据相关法律法规，您对自己的个人信息享有以下权利：
                  </p>
                  <ul className="space-y-3 pl-5">
                    <li><strong className="text-white">访问权：</strong>您有权访问我们持有的关于您的个人信息。</li>
                    <li><strong className="text-white">更正权：</strong>您有权要求更正不准确或不完整的个人信息。</li>
                    <li><strong className="text-white">删除权：</strong>在某些情况下，您有权要求删除您的个人信息。</li>
                    <li><strong className="text-white">撤回同意权：</strong>您有权随时撤回之前给出的同意。</li>
                    <li><strong className="text-white">投诉权：</strong>如果您认为我们对您个人信息的处理违反了法律法规，您有权向监管机构投诉。</li>
                  </ul>
                  <p>
                    如您希望行使上述权利，请通过本政策末尾的联系方式与我们联系。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">六、Cookie和类似技术</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    我们使用Cookie和类似技术来收集信息，改善用户体验。Cookie是存储在您设备上的小文本文件，帮助我们识别您的浏览器并记住您的偏好。
                  </p>
                  <p>
                    您可以通过浏览器设置拒绝或管理Cookie。但请注意，禁用Cookie可能会影响您使用我们网站的部分功能。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">七、未成年人保护</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    我们的服务主要面向企业客户，不面向未成年人。我们不会故意收集未成年人的个人信息。如果您是未成年人，请在家长或监护人的指导下使用我们的服务。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">八、政策变更</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    我们可能会不时更新本隐私政策。更新后，我们会在网站上发布新的隐私政策，并更新顶部的"最后更新"日期。我们建议您定期查看本政策以了解任何变更。
                  </p>
                  <p>
                    对于重大变更，我们可能会通过电子邮件或其他显著方式通知您。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">九、联系我们</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式联系我们：
                  </p>
                  <ul className="space-y-2">
                    <li><strong className="text-white">邮箱：</strong>yigecom@126.com</li>
                    <li><strong className="text-white">地址：</strong>北京市</li>
                  </ul>
                  <p className="text-white font-medium mt-6">
                    本隐私政策最后更新日期：2025年4月18日
                  </p>
                </div>
              </section>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 pt-8 border-t border-white/10 text-center">
              <p className="text-gray-custom mb-6">
                如需了解更多信息或行使您的权利，请随时联系我们
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/#contact')}
                  className="btn-primary font-semibold"
                >
                  联系我们
                </Button>
                <Button 
                  onClick={() => navigate('/terms')}
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/5"
                >
                  查看服务条款
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  variant="ghost"
                  className="text-gray-custom hover:text-white hover:bg-white/5"
                >
                  返回首页
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
