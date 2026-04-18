import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.terms-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out'
        }
      );

      gsap.fromTo('.terms-content',
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
        <div className="terms-title text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan/30 mb-8">
            <FileText className="w-4 h-4 text-cyan" />
            <span className="text-sm text-cyan font-medium tracking-wider uppercase">法律声明</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            服务条款
          </h1>
          <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple font-medium mb-10">
            未来智酷服务使用协议
          </p>
          <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-5xl mx-auto border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan via-purple to-pink" />
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light text-center">
              本服务条款是您与未来智酷（以下简称“我们”）之间就使用我们的AI企业级应用咨询与技术服务达成的法律协议。请仔细阅读以下条款。
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="terms-content glass rounded-3xl p-8 md:p-12 border border-white/5 max-w-5xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            
            <div className="flex items-start gap-4 mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
              <AlertCircle className="w-6 h-6 text-cyan flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">重要提示</h3>
                <p className="text-gray-custom">
                  在开始使用我们的服务之前，请务必仔细阅读并理解本服务条款的全部内容。如果您不同意本服务条款的任何内容，请立即停止使用我们的服务。
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Shield className="w-7 h-7 text-cyan" />
                  一、服务概述
                </h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    未来智酷是一家专注于AI企业级应用的咨询与技术服务商，我们提供包括但不限于：
                  </p>
                  <ul className="space-y-3 pl-5">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span>AI企业战略咨询与转型规划服务</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span>AI数字员工部署与系统集成服务</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span>AI内容生产与GEO生成式引擎优化服务</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span>企业数智化转型与流程自动化服务</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-1" />
                      <span>AI影视漫剧、自媒体创作等全链路内容生产服务</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">二、用户权利与义务</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    <strong className="text-white">2.1 用户权利</strong><br />
                    您有权根据本条款使用我们提供的服务，并享受相应的技术支持与咨询服务。
                  </p>
                  <p>
                    <strong className="text-white">2.2 用户义务</strong><br />
                    您在使用我们的服务时，应当遵守中国法律法规，不得利用我们的服务从事任何违法违规活动。您应对使用服务过程中产生的所有内容、数据和行为承担全部责任。
                  </p>
                  <p>
                    <strong className="text-white">2.3 账户安全</strong><br />
                    您有责任妥善保管账户信息及密码，并对账户下的所有行为负责。如发现任何未经授权的使用，应立即通知我们。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">三、知识产权</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    3.1 未来智酷提供的所有服务内容，包括但不限于软件、代码、文档、设计、商标、Logo等，其知识产权均归未来智酷所有。
                  </p>
                  <p>
                    3.2 未经我们书面许可，您不得复制、修改、出租、出借、出售、传播或创建我们服务的衍生作品。
                  </p>
                  <p>
                    3.3 您在使用服务过程中产生的数据，其所有权归您所有。但我们有权在匿名化处理后，将这些数据用于服务优化与分析。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">四、服务费用与支付</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    4.1 部分服务可能需要支付费用，具体费用标准以双方签订的合同或协议为准。
                  </p>
                  <p>
                    4.2 我们保留调整服务费用的权利，但会提前通知您。如果您不同意新的费用标准，可以终止使用相关服务。
                  </p>
                  <p>
                    4.3 所有费用一旦支付，除非法律法规另有规定，否则不予退还。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">五、免责声明</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    5.1 我们尽最大努力确保服务的稳定性与安全性，但不保证服务不会中断或完全没有错误。
                  </p>
                  <p>
                    5.2 对于因不可抗力、第三方原因或您自身操作不当导致的服务中断、数据丢失等问题，我们不承担赔偿责任。
                  </p>
                  <p>
                    5.3 我们提供的AI生成内容仅供参考，不应作为专业决策的唯一依据。您应对AI生成内容的准确性、适用性进行独立判断。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">六、服务变更与终止</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    6.1 我们有权根据业务发展需要，变更、暂停或终止部分或全部服务，并会提前通知您。
                  </p>
                  <p>
                    6.2 您有权随时终止使用我们的服务。终止后，我们将停止向您提供服务，并依据适用法律处理相关数据。
                  </p>
                  <p>
                    6.3 如果我们发现您违反本服务条款，有权立即终止向您提供服务，且不承担任何责任。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">七、法律适用与争议解决</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    7.1 本服务条款的订立、执行、解释及争议解决均适用中华人民共和国法律。
                  </p>
                  <p>
                    7.2 如双方就本服务条款发生争议，应首先友好协商解决；协商不成的，任何一方均有权向我们所在地有管辖权的人民法院提起诉讼。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">八、其他条款</h2>
                <div className="space-y-4 text-gray-custom leading-relaxed">
                  <p>
                    8.1 本服务条款构成您与我们之间就服务使用达成的完整协议，取代任何先前或同期的口头或书面协议。
                  </p>
                  <p>
                    8.2 如果我们未执行本服务条款的任何权利或规定，不构成对该权利或规定的放弃。
                  </p>
                  <p>
                    8.3 如果本服务条款的任何条款被认定为无效或不可执行，不影响其他条款的效力。
                  </p>
                  <p className="text-white font-medium mt-6">
                    本服务条款最后更新日期：2025年4月18日
                  </p>
                </div>
              </section>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 pt-8 border-t border-white/10 text-center">
              <p className="text-gray-custom mb-6">
                如您对本服务条款有任何疑问，请通过以下方式联系我们：
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/#contact')}
                  className="btn-primary font-semibold"
                >
                  联系我们
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/5"
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

export default TermsOfService;
