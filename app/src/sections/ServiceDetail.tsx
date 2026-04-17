import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, 
  Target, Cpu, Users, Video,
  Bot, Brain, MessageSquare, Search,
  Globe, Shield, Workflow, Database, 
  LineChart, Layers, Activity, Fingerprint, Sparkles, Network, PenTool,
  Headphones, Languages
} from 'lucide-react';
import gsap from 'gsap';

// 扩充的完整数据对象（融入了未来智酷策划文档内容）
const serviceDetails: Record<string, any> = {
  'ai-consulting': {
    title: 'AI企业咨询服务',
    subtitle: 'consult.futureai.com',
    description: '从战略到落地，AI转型领航者',
    fullDescription: 'AI技术迭代极快，多数企业缺乏清晰的AI转型路线图，盲目采购工具导致"AI孤岛"。未来智酷提供从AI认知到落地的一站式企业咨询服务，帮助您在AI时代找准方向、少走弯路、快速见效。我们不仅提供AI战略规划、技术选型等咨询服务，还涵盖全链路AI自媒体创作、影视漫剧内容生产服务，助力企业实现从技术底座到组织重构的跨越式增长。',
    stats: [
      { value: '10+', label: '服务企业数量' },
      { value: '170%', label: '平均效率提升' },
      { value: '10年+', label: '核心顾问实战经验' },
      { value: '1万+', label: 'AI内容生成小时' }
    ],
    features: [
      { icon: Target, title: 'AI战略规划', description: '行业趋势分析、竞争格局研判、AI机会点识别、ROI测算，输出《AI转型战略蓝图》与三年路线图。' },
      { icon: Database, title: '架构设计与选型', description: '模型评测选型、数据中台规划、API集成方案、成本预估，输出《技术架构白皮书》并进行POC验证。' },
      { icon: Users, title: '组织与人才赋能', description: 'AI团队搭建、员工实战培训、人机协作流程设计、KPI重构，提供系统化培训课程与组织变革方案。' },
      { icon: PenTool, title: '全链路内容生产', description: 'AI自媒体创作、AI影视漫剧制作。从热点监控、脚本生成到多平台分发，构建全自动内容获客引擎。' },
      { icon: Activity, title: '落地陪跑与优化', description: '6-12个月深度战略陪跑，敏捷迭代，效果追踪与调优。按效果付费模式可选，与客户核心利益深度绑定。' }
    ],
    benefits: [
      '实战派团队：核心顾问来自阿里、腾讯、微软AI部门',
      '全栈视角：不仅懂技术，更懂业务、组织、财务和增长',
      '结果导向：按效果付费模式可选，深度绑定企业商业价值',
      '生态资源：直接对接顶级AI算力、海量数据服务、投资机构'
    ],
    process: [
      { step: 1, title: '深度诊断', description: '深入调研企业现状、业务痛点与战略目标' },
      { step: 2, title: '蓝图设计', description: '量身定制AI转型路线图与技术架构方案' },
      { step: 3, title: '敏捷落地', description: '分阶段推进系统部署与组织能力赋能' },
      { step: 4, title: '迭代进化', description: '数据驱动效果追踪，持续优化业务流' }
    ],
    cta: '预约专家战略咨询'
  },
  'ai-digital': {
    title: 'AI企业数智化',
    subtitle: 'digital.futureai.com',
    description: '重塑企业架构，数据驱动未来',
    fullDescription: 'AI时代，企业数智化不是选择题，而是生存题。传统的决策依靠滞后的经验，未来的竞争则依赖实时的预测。我们通过RPA+AI实现业务流程全面自动化，构建企业专属数据中台知识库，重塑科层制组织架构，让企业从经验驱动转变为"人机协同"的实时数据驱动。',
    stats: [
      { value: '65%', label: '库存周转率提升' },
      { value: '58%', label: '人力成本降低' },
      { value: '3倍', label: '管理决策效率提升' },
      { value: '99.9%', label: '数据准确率' }
    ],
    features: [
      { icon: Workflow, title: 'RPA+AI 流程自动化', description: '自动处理财务/HR/供应链等重复性工作。将传统RPA升级为智能流程自动化，效率直线提升80%。' },
      { icon: Layers, title: '企业数据中台建设', description: '彻底打通企业内部数据孤岛，清洗、整合一站式解决方案，构建企业专属知识库，实现数据资产化。' },
      { icon: Network, title: '组织架构重塑协同', description: '重构组织效能，设计"人类+AI"无缝协同工作流，让员工从繁琐执行者转变为AI任务监督者与策略制定者。' },
      { icon: LineChart, title: '智能预测决策系统', description: '基于大数据的实时预测分析系统，将后知后觉的复盘转化为前瞻性的智能洞察，辅助管理层科学决策。' },
      { icon: Search, title: '流程挖掘与瓶颈识别', description: '利用AI算法自动识别当前业务流程中的效率瓶颈和优化点，提供可视化的流程改造建议。' }
    ],
    benefits: [
      '私有化部署：支持客户本地化、私有化部署，保障企业核心数据绝对安全',
      '多模型适配：支持主流大模型动态切换，充分利用国产模型成本与合规优势',
      '无缝集成：平滑接入企业现有的 ERP、CRM、OA 等核心系统',
      '立竿见影：核心流程自动化通常在1-3个月内即可见效并回收成本'
    ],
    process: [
      { step: 1, title: '现状调研', description: '全面梳理业务流程、系统架构与数据现状' },
      { step: 2, title: '架构设计', description: '出具定制化的企业数智化转型落地设计方案' },
      { step: 3, title: '系统部署', description: '快速敏捷集成，确保业务平滑过渡不中断' },
      { step: 4, title: '效果评估', description: '量化投资回报率(ROI)，持续迭代优化系统' }
    ],
    cta: '启动企业数智化转型'
  },
  'ai-team': {
    title: 'AI数字团队',
    subtitle: 'team.futureai.com',
    description: '永不掉线的AI员工矩阵',
    fullDescription: '未来智酷不同于单一的 Agent 聊天工具，我们赋予每个 AI Agent 持久身份、长期记忆和独立工作空间——他们是一个个拥有自主意识的"数字员工"，组成一个团队像人类一样协作、学习、进化，并完美融入您的组织架构，7x24小时为您效劳。',
    stats: [
      { value: '≥80%', label: '常规任务自动化率' },
      { value: '3倍', label: '跨Agent协作效率提升' },
      { value: '80%', label: '企业知识沉淀量增加' },
      { value: '7x24h', label: '无间断智能工作' }
    ],
    features: [
      { icon: Fingerprint, title: '持久身份与长期记忆', description: '每个Agent拥有独特的soul.md(人格)、memory.md(长期记忆)与私有文件空间，跨对话持久存在，始终如一。' },
      { icon: Brain, title: 'Aware 自适应自主意识', description: '不再被动等待指令！Agent维护关注点(Focus Items)，自主创建6种触发器任务，通过"内心独白"展示推理过程。' },
      { icon: Users, title: '多智能体无缝协作', description: 'Agent了解完整的企业组织架构，它们之间可以主动发送消息、委派任务、建立工作关系，像新员工一样融入团队。' },
      { icon: Shield, title: '组织级合规管控', description: '提供多租户RBAC隔离、角色权限控制、审计日志、审批工作流(危险操作需人工确认)以及API用量控制。' },
      { icon: Sparkles, title: '广场 Plaza 与自我进化', description: 'Agent在内部"广场"发布动态、分享发现，持续吸收组织知识。运行时自动发现新工具并为团队创建新技能。' }
    ],
    benefits: [
      '极大降低人力成本：单个数字员工成本仅为人类员工的1/10',
      '打破部门墙：AI团队的信息同步是瞬时且完全透明的，无沟通损耗',
      '永远保留的企业资产：员工离职带不走经验，AI数字员工的记忆和技能永留企业',
      '全渠道覆盖：每个Agent可拥有独立的Slack、飞书、Discord机器人身份'
    ],
    process: [
      { step: 1, title: '岗位分析', description: '识别适合AI化的岗位，拆解高频重复的工作流程' },
      { step: 2, title: 'Agent配置', description: '定制化分配数字员工的人格、能力、权限与记忆' },
      { step: 3, title: '团队协作', description: '测试人机协同工作流，确保与现有团队无缝配合' },
      { step: 4, title: '持续进化', description: '数字员工在运行中自主学习，不断吸收组织知识' }
    ],
    cta: '部署您的AI数字团队'
  },
  'ai-avatar': {
    title: 'AI交互数字人系统',
    subtitle: 'avatar.futureai.com',
    description: '7x24小时智能交互生命体',
    fullDescription: '超写实、3D或卡通形象定制，支持多语言、多音色与情感语音合成。依托大模型+企业知识库驱动，支持文本/语音实时双向交互。无论是AI直播带货、全渠道智能客服，还是对话式AI播客，均能实现毫秒级响应，打造不休眠的超级数字生命体。',
    stats: [
      { value: '90%', label: '直播运营成本降低' },
      { value: '<1秒', label: '客服交互响应时间' },
      { value: '40%', label: '客户整体满意度提升' },
      { value: '100+', label: '支持全球语种' }
    ],
    features: [
      { icon: Bot, title: '超写实形象与声音定制', description: '提供照片级高逼真形象或3D虚拟IP定制，结合多音色情感语音合成，打造极具亲和力的品牌专属代言人。' },
      { icon: Video, title: '7x24小时 AI 直播带货', description: '日不落直播间，AI智能抓取弹幕进行精准讲解、问答互动与促单，闲时流量绝不流失，运营成本暴降90%。' },
      { icon: MessageSquare, title: '多渠道智能客服接管', description: '多渠道接入，企业知识库RAG赋能，日常问题解决率达90%+。支持情绪识别，遇到复杂问题毫秒级无缝转人工。' },
      { icon: Headphones, title: '互动对话式 AI 播客', description: '自动将文章、产品手册或RSS流转化为生动的"双人对话式"播客内容，实现内容一鱼多吃，低成本抢占音频赛道。' },
      { icon: Languages, title: '跨越百种语言全球出海', description: '音频驱动口型，实时翻译并生成地道的本地化语音表达。支持100+国家语言，强势助力企业低成本出海拓展。' }
    ],
    benefits: [
      '毫秒级响应：端到端延迟极低，带来如真人般的丝滑交互体验',
      '情感识别能力：准确捕捉用户语音与文字情绪，提供更具温度的服务',
      '多模态交互：融合视觉、听觉、文本的全方位交互体系',
      '形象资产私有化：为您定制的数字人形象将成为企业永久拥有的数字资产'
    ],
    process: [
      { step: 1, title: '形象定制', description: '根据品牌调性选择预设库或1:1克隆定制数字人形象' },
      { step: 2, title: '知识导入', description: '上传企业知识库文档、产品手册与常见销售话术' },
      { step: 3, title: '场景配置', description: '针对直播带货、客服接待或播客生成进行专门调优' },
      { step: 4, title: '上线运营', description: '7x24小时自动服务，持续监控数据并优化话术库' }
    ],
    cta: '创建AI专属交互数字人'
  },
  'geo 生成式引擎优化': {
    title: 'GEO 生成式引擎优化',
    subtitle: 'geo.futureai.com',
    description: '抢占AI生成答案的第一席位',
    fullDescription: '传统的SEO已经过时，未来60%+流量将直接来自AI对话界面！GEO(Generative Engine Optimization)是新一代品牌营销策略。当用户向ChatGPT、DeepSeek、文心一言提问时，我们通过系统化的内容投放，让您的品牌在AI助手的自然回答中被优先、准确、可信地提及。不做GEO，您的企业将在AI世界里隐形。',
    stats: [
      { value: '300%+', label: 'AI提及率平均提升' },
      { value: '7大', label: '主流AI大模型验证' },
      { value: '20+', label: '全网内容分发平台' },
      { value: '50%', label: '降低无效营销投放' }
    ],
    features: [
      { icon: Search, title: '关键词语义蒸馏预测', description: '告别传统关键词叠加。通过AI生成、语义扩展(1词裂变100词)、话题集群与竞争度分析，精准预测AI抓取趋势。' },
      { icon: PenTool, title: 'E-E-A-T 结构化创作', description: '内置20+平台专属模板，自动生成符合GEO底层逻辑(专业性、经验性、权威性、可信度)的专业内容。' },
      { icon: CheckCircle2, title: '内容质量与事实增强', description: '自动进行事实密度评分(0-100分)，补充数据、案例、标准等硬核信息，并自动生成 JSON-LD 结构化数据。' },
      { icon: Cpu, title: '7大 AI 模型效果验证', description: '内容发布前后，在 DeepSeek、OpenAI、文心一言等7大主流AI平台验证品牌提及率，并实时进行负面舆情监控。' },
      { icon: Globe, title: '20+ 平台全网同步分发', description: '一键将优质内容同步发布至知乎、小红书、CSDN、微信公众号等20+高权重内容平台，构建庞大的AI引用溯源池。' }
    ],
    benefits: [
      '抢占心智：72%的企业采购前会参考AI生成式建议，GEO生成式引擎优化直接影响决策链路提升品牌影响力',
      '反哺传统搜索：被大模型大量引用的高价值内容，将间接大幅提升传统SEO排名',
      '舆情监控：自动发现并生成澄清模板，对冲AI引擎可能抓取的负面信息降低品牌风险',
      '降本增效：通过精准的 Trust Density (信任密度) 优化，用更少的内容获得更高的曝光'
    ],
    process: [
      { step: 1, title: '品牌诊断', description: '分析当前品牌在各大AI对话平台中的提及率与印象' },
      { step: 2, title: '内容蒸馏', description: '锁定核心高意向语义集群，策划E-E-A-T高质量内容' },
      { step: 3, title: '验证分发', description: '多模型沙箱测试效果，达标后向20+高权重平台分发' },
      { step: 4, title: '数据追踪', description: '实时监控引用份额、权威评分，ROI数据驱动持续迭代' }
    ],
    cta: '开启 GEO 生成式引擎优化，抢占AI生成答案的第一席位'
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  const service = serviceId ? serviceDetails[serviceId] : null;

  useEffect(() => {
    if (!service) return;
    
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo('.detail-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      
      // Stagger animations for sections
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.3 }
      );

      gsap.fromTo('.feature-card',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: {
          trigger: '.feature-grid',
          start: 'top 80%',
        }}
      );
      
      gsap.fromTo('.process-step',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'expo.out', scrollTrigger: {
          trigger: '.process-container',
          start: 'top 80%',
        }}
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">服务未找到</h2>
          <Button onClick={() => navigate('/')} className="btn-primary text-dark">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#05050A] relative overflow-hidden">
      {/* Immersive Sci-Fi Background Elements */}
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
        <div className="detail-hero text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan/30 mb-8">
            <Sparkles className="w-4 h-4 text-cyan" />
            <span className="text-sm text-cyan font-medium tracking-wider uppercase">{service.subtitle}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            {service.title}
          </h1>
          <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple font-medium mb-10">
            {service.description}
          </p>
          <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-5xl mx-auto border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan via-purple to-pink" />
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light text-left md:text-center">
              {service.fullDescription}
            </p>
          </div>
        </div>

        {/* Core Stats Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24 relative z-20">
          {service.stats.map((stat: any, index: number) => (
            <div key={index} className="stat-card glass rounded-2xl p-6 text-center border border-white/5 hover:border-cyan/30 transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple mb-3 drop-shadow-lg">
                {stat.value}
              </div>
              <div className="text-sm text-gray-custom font-medium tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features - The 5 core capabilities displayed in ONE single row on large screens */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <p className="text-cyan text-sm uppercase tracking-widest mb-3">核心能力</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              引擎<span className="text-gradient">技术矩阵</span>
            </h2>
          </div>
          
          <div className="feature-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {service.features.map((feature: any, index: number) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card glass-strong rounded-2xl p-8 card-hover group relative overflow-hidden border border-white/5 hover:border-cyan/30 transition-all duration-500 flex flex-col">
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan/10 to-purple/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:from-cyan/20 group-hover:to-purple/20 transition-all duration-500" />
                  
                  {/* Number Watermark */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/[0.03] group-hover:text-cyan/[0.05] transition-colors pointer-events-none">
                    0{index + 1}
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#11111F] to-[#05050A] border border-white/10 flex items-center justify-center mb-6 group-hover:shadow-glow-cyan transition-all duration-300 relative z-10">
                    <Icon className="w-7 h-7 text-cyan group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan group-hover:to-purple transition-all">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-gray-custom leading-relaxed relative z-10 flex-grow">
                    {feature.description}
                  </p>
                  
                  {/* Bottom decorative neon line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan to-purple group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits List */}
        <div className="mb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <p className="text-cyan text-sm uppercase tracking-widest mb-3">商业价值</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                为什么选择<br/>
                <span className="text-gradient">未来智酷</span>方案？
              </h2>
              <p className="text-gray-custom mb-8">
                不仅提供顶尖的技术工具，更提供系统化的战略设计与落地方案，重构企业的长期竞争壁垒。
              </p>
            </div>
            
            <div className="lg:col-span-8">
              <div className="glass rounded-3xl p-8 md:p-10 border border-white/5">
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  {service.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-[#11111F] border border-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cyan/10 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-cyan" />
                      </div>
                      <span className="text-white/80 leading-relaxed group-hover:text-white transition-colors">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="process-container mb-24 relative">
          <div className="text-center mb-16">
            <p className="text-cyan text-sm uppercase tracking-widest mb-3">合作流程</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              敏捷<span className="text-gradient">落地路径</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop timeline effect */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
            
            {service.process.map((step: any, index: number) => (
              <div key={index} className="process-step relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-[#05050A] border-2 border-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.05)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan to-purple">
                    0{step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors">{step.title}</h3>
                <p className="text-sm text-gray-custom leading-relaxed px-4">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-32">
          <div className="inline-block relative group">
            {/* Glowing background for CTA */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan to-purple rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <Button className="relative btn-primary text-dark font-bold text-lg px-12 py-8 rounded-full border border-white/20">
              {service.cta}
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-2" />
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ServiceDetail;