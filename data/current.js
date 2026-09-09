window.CURRENT_BRIEF = {
  meta: {
    version: "v0.5 阅读版",
    date: "2026年9月9日",
    dataMode: "正式核验",
    dataNote: "观察截至北京时间 2026-09-09 09:25。共采集 27 个源、534 条原始结果并形成 1,111 个事件候选；正式发布 23 条，均保留事实、公司自报、媒体报道与研判的证据边界。",
    automation: "每日北京时间 05:00 更新，普通完成不发送完整日报",
  },
  managerBrief: {
    label: "中国＋世界｜2026.09.09",
    verdict: "胡塞武装袭击沙特吉赞炼化与公用设施，把红海冲突重新推向能源基础设施；中国8月出口同比增长25%，政策性金融工具首笔资金同步落地；美国多部门则正式指控中国AI企业蒸馏美国前沿模型，技术竞争进一步安全化。",
    context: "本期同时看到AI落地与风险治理并行加速：Google披露攻击者开始用智能体在数小时内收割云凭据，Mistral完成30亿欧元融资，OpenAI发布更快的图像模型。直销频道经监管与企业定向检索未见足以改变判断的新信号。",
    mustRead: [
      { id: "01", signalId: "must-world-jazan-0909", title: "胡塞袭击沙特能源设施", detail: "袭击造成73人受伤，吉赞油品设施和公用系统起火。", tone: "risk" },
      { id: "02", signalId: "must-china-trade-0909", title: "中国8月出口同比增长25%", detail: "美元口径进出口双双加速，汽车和半导体出口尤强。", tone: "warning" },
      { id: "03", signalId: "must-ai-distillation-0909", title: "美方升级AI蒸馏指控", detail: "NSA、FBI与CISA联合发布针对中国AI企业的安全通告。", tone: "risk" },
    ],
    channelStatus: [
      { name: "中国", status: "本期已更新", note: "外贸、医保、政策性金融与AI知识产权" },
      { name: "世界", status: "本期已更新", note: "红海、伊朗制裁、巴以贸易与气候风险" },
      { name: "AI", status: "本期已更新", note: "攻击自动化、融资、模型、科研与工程工具" },
      { name: "直销", status: "本批未更新", note: "监管与企业定向检索未见高价值变化" },
    ],
  },
  channels: [
    { name: "中国", state: "本期已更新", cadence: "正式：每日", count: 4 },
    { name: "世界", state: "本期已更新", cadence: "正式：每日", count: 6 },
    { name: "AI", state: "本期已更新", cadence: "周报 + 重大事件", count: 13 },
    { name: "直销", state: "本批未更新", cadence: "计划：周一、周五", count: 0 },
  ],
  signals: [
    {
      id: "must-world-jazan-0909", sourceEventId: "evt-dc56c8bb39e5c4", tier: "必看", category: "世界", status: "confirmed", statusLabel: "独立报道＋官方通报", changeType: "升级",
      title: "胡塞袭击沙特吉赞油品与公用设施，至少73人受伤", summary: "胡塞武装以导弹和无人机袭击沙特西南部吉赞；AP报道油品设施与公用系统起火，沙特称至少73人受伤。",
      change: "红海与也门战事重新外溢到沙特能源和民用基础设施。", impact: "若袭击持续，能源设施、红海替代航线、保险与区域防空成本都将上升。", recommendation: "优先跟踪设施停产、后续袭击频率和Bab el-Mandeb实际船流。",
      topics: ["也门", "沙特", "能源设施", "红海"], evidence: [
        { type: "独立报道", label: "AP：吉赞设施遭袭", url: "https://apnews.com/article/4ad9446f0bb8c096750c84b6e1ba86b8", note: "核验伤亡、目标与替代航线背景。" },
        { type: "官方", label: "沙特通讯社：巴林谴责袭击", url: "https://www.spa.gov.sa/en/N2671431", note: "核验官方对事件的确认。" },
      ], tracking: "设施运行、伤亡更新、后续袭击与红海船流", featured: true,
    },
    {
      id: "must-china-trade-0909", sourceEventId: "evt-38b77c1a6aa41d", tier: "必看", category: "中国", status: "confirmed", statusLabel: "海关数据＋独立报道", changeType: "新增",
      title: "中国8月出口同比增长25%，进口增长28.2%", summary: "美元口径8月出口和进口明显加速，贸易顺差1191亿美元；汽车出口增长43%，半导体出口增长129.8%。",
      change: "8月外贸强于此前节奏，且进口同步上升，不只是顺差扩张。", impact: "出口韧性支撑制造业，但高增速也可能加大外部贸易摩擦与基数回落风险。", recommendation: "结合目的地、价格、抢出口和9月订单判断持续性。",
      topics: ["外贸", "出口", "进口", "制造业"], evidence: [
        { type: "官方数据", label: "中国政府网：前8个月外贸数据", url: "https://english.www.gov.cn/archive/statistics/202609/08/content_WS6aa002e6c6d00ca5f9a0d112.html", note: "核验人民币口径与累计数据。" },
        { type: "独立报道", label: "AP：中国8月贸易", url: "https://apnews.com/article/77c208d1f62270bba66b8241b1b14a4c", note: "核验美元口径和结构变化。" },
      ], tracking: "9月订单、目的地结构、价格因素与贸易措施", featured: true,
    },
    {
      id: "must-ai-distillation-0909", sourceEventId: "evt-8e31da62ce33d5", tier: "必看", category: "AI", status: "judgment", statusLabel: "美国多部门指控＋独立报道", changeType: "升级",
      title: "美国多部门指控中国AI企业蒸馏美国前沿模型", summary: "NSA、FBI、CISA等联合通告称中国AI企业通过蒸馏复制美国前沿模型能力，并警告相关供应链和安全风险。",
      change: "相关争议从企业间质疑升级为美国国家安全机构联合发布正式通告。", impact: "模型访问限制、身份核验、出口管制和跨境AI合作的合规压力可能继续加大。", recommendation: "把通告视为美方正式立场，不把尚未公开审计的指控写成已证实事实。",
      topics: ["模型蒸馏", "中美科技", "AI安全", "出口管制"], evidence: [
        { type: "官方", label: "NSA：联合安全通告", url: "https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4592113/nsa-and-others-warn-china-based-ai-companies-are-distilling-us-frontier-ai-mode/", note: "核验机构范围与指控口径。" },
        { type: "独立报道", label: "Reuters转引：美方指控", url: "https://tribune.com.pk/story/2628191/us-accuses-chinese-ai-firms-of-malicious-copying-of-ai-technology?amp=1", note: "交叉核验事件背景。" },
      ], tracking: "涉事企业回应、技术证据、访问限制与监管措施", featured: true,
    },
    {
      id: "important-ai-google-threat-0909", sourceEventId: "evt-bf3475e04468cd", tier: "重要", category: "AI", status: "judgment", statusLabel: "Google威胁情报观察", changeType: "升级",
      title: "Google称攻击者已用智能体在6小时内批量收割云凭据", summary: "Google Threat Intelligence Group称，攻击者入侵云资源后使用智能体自动发现目标并大规模获取凭据，完整链条不足6小时。",
      change: "攻击者对AI的使用从生成诱饵和脚本推进到多步骤云环境执行。", impact: "凭据轮换、最小权限、异常行为检测和AI资产防护需要按机器速度重设。", recommendation: "按公司观察处理规模结论，但立即检查临时凭据、权限边界和批量访问告警。",
      topics: ["网络安全", "云安全", "智能体", "凭据"], evidence: [{ type: "公司安全研究", label: "Google：Adversarial AI演进", url: "https://cloud.google.com/blog/topics/threat-intelligence/from-prompting-to-autonomy-the-evolution-of-adversarial-ai", note: "含Q2攻击链案例，来自Google自身遥测。" }], tracking: "攻击样本、IOC、独立复现与防御规则",
    },
    {
      id: "important-china-flex-medical-0909", sourceEventId: "evt-e622754f4eef42", tier: "重要", category: "中国", status: "confirmed", statusLabel: "国家医保局正式行动", changeType: "新增",
      title: "中国启动灵活就业人员和新业态人员医保参保三年行动", summary: "国家医保局部署2026—2028年专项行动，目标是扩大灵活就业、新就业形态劳动者参保覆盖并改善转移接续。",
      change: "相关群体医保从地方探索进入全国三年行动。", impact: "平台用工、异地就业和自由职业群体的参保便利性与政策衔接将成为执行重点。", recommendation: "关注各省细则、缴费负担、等待期和异地接续。",
      topics: ["医保", "灵活就业", "平台经济", "社会保障"], evidence: [
        { type: "官方", label: "国家医保局：专项行动", url: "https://www.nhsa.gov.cn/art/2026/9/8/art_104_22045.html", note: "核验三年行动范围。" },
        { type: "官方报道", label: "中国政府网：医保覆盖行动", url: "https://english.www.gov.cn/news/202609/08/content_WS6a9fec11c6d00ca5f9a0d10d.html", note: "交叉核验政策目标。" },
      ], tracking: "省级细则、参保人数、缴费与转移接续",
    },
    {
      id: "important-china-finance-tool-0909", sourceEventId: "evt-a60c0dff7706f3", tier: "重要", category: "中国", status: "confirmed", statusLabel: "地方发改部门披露", changeType: "新增",
      title: "8000亿元新型政策性金融工具首笔资金落地", summary: "辽宁和武汉等地披露首批项目资本金已投放，覆盖基础设施、产业升级等方向。",
      change: "政策性金融工具从额度部署进入首笔资金落地。", impact: "可缓解重大项目资本金约束并带动配套融资，但实际投资拉动取决于项目质量和资金到位速度。", recommendation: "只确认已披露投放，不把潜在撬动规模当成已实现投资。",
      topics: ["政策性金融", "投资", "基础设施", "项目资本金"], evidence: [
        { type: "地方官方", label: "武汉：首笔资金落地", url: "https://jrj.wuhan.gov.cn/ynzx_57/xwzx/202609/t20260908_2844820.shtml", note: "核验首笔投放。" },
        { type: "地方官方", label: "辽宁发改委：项目进展", url: "https://fgw.ln.gov.cn/fgw/index/wndt/2026090816573683245/index.shtml", note: "交叉核验地方项目。" },
      ], tracking: "项目清单、实际到位、配套贷款与开工率",
    },
    {
      id: "important-world-iran-airlines-0909", sourceEventId: "evt-ac149040062d79", tier: "重要", category: "世界", status: "confirmed", statusLabel: "美国财政部正式制裁", changeType: "升级",
      title: "美国制裁伊朗剩余活跃航空公司等36个目标", summary: "美国财政部宣布针对伊朗航空与采购网络的36个制裁目标，并由FinCEN发布配套金融风险提示。",
      change: "美国对伊朗交通与采购网络的压力继续扩大。", impact: "航空运营、保险、结算和第三方供应商的制裁风险上升。", recommendation: "关注被列实体、次级制裁执行和航班实际变化。",
      topics: ["伊朗", "制裁", "航空", "金融合规"], evidence: [{ type: "官方", label: "美国财政部：伊朗航空网络制裁", url: "https://home.treasury.gov/news/press-releases/sb0623/", note: "核验36个目标及FinCEN提示。" }], tracking: "航班、保险、供应链和后续执法",
    },
    {
      id: "important-world-settlement-trade-0909", sourceEventId: "evt-d7fbe5bb0dfabd", tier: "重要", category: "世界", status: "confirmed", statusLabel: "12国外长联合声明", changeType: "升级",
      title: "英国、法国和加拿大拟禁止与以色列定居点相关贸易", summary: "12国外长联合声明重申两国方案；英、法、加表示将推进对定居点相关贸易的国家禁令。",
      change: "对定居点的外交批评开始向具体贸易限制转换。", impact: "相关进口商、零售商和供应链可能面临来源识别与合规调整。", recommendation: "等待三国国内法文本、商品范围和生效安排。",
      topics: ["以色列", "定居点", "贸易限制", "两国方案"], evidence: [{ type: "官方联合声明", label: "英国政府：12国外长声明", url: "https://www.gov.uk/government/news/joint-foreign-ministers-statement-on-the-two-state-solution", note: "核验国家范围和政策意向。" }], tracking: "国内立法、商品范围、执行日期与以方回应",
    },
    {
      id: "important-ai-mistral-0909", sourceEventId: "evt-2234098b9c7aa9", tier: "重要", category: "AI", status: "confirmed", statusLabel: "公司公告＋独立报道", changeType: "新增",
      title: "Mistral完成30亿欧元融资，投后估值超过210亿欧元", summary: "Mistral宣布由Samsung、Scaleup Europe和PSG Equity共同领投D轮，资金将投入开放权重模型、基础设施与主权AI。",
      change: "欧洲头部模型公司获得迄今最大一轮资本补给。", impact: "欧洲主权AI、开放权重路线和算力基础设施竞争获得更强资本支撑。", recommendation: "关注资金实际投入、收入增长、算力采购和政府客户。",
      topics: ["Mistral", "融资", "欧洲AI", "开放权重"], evidence: [
        { type: "公司", label: "Mistral：D轮融资", url: "https://mistral.ai/news/mistral-makes-sovereign-open-weight-ai-to-frontier/", note: "核验金额、估值与投资方。" },
        { type: "独立报道", label: "Reuters转引：Mistral估值", url: "https://live.euronext.com/en/financial-news/french-ai-company-mistral-hits-24-billion-valuation-funding-round", note: "交叉核验美元估值。" },
      ], tracking: "收入、算力、模型发布与主权AI合同",
    },
    {
      id: "important-ai-images25-0909", sourceEventId: "evt-adb9842bfa45a0", tier: "重要", category: "AI", status: "judgment", statusLabel: "OpenAI产品发布", changeType: "升级",
      title: "OpenAI发布Images 2.5，称延迟最多降低50%", summary: "新图像系统提高精细编辑、文字与空间一致性，并面向ChatGPT、Work与Codex开放；性能数字来自公司。",
      change: "图像生成重点从一次性出图进一步转向可控编辑和工作流速度。", impact: "视觉生产迭代成本下降，但品牌一致性、版权与人工验收仍不可省。", recommendation: "用真实编辑任务比较成功率和总耗时，不只看单次延迟。",
      topics: ["OpenAI", "图像生成", "多模态", "创意工作流"], evidence: [{ type: "公司", label: "OpenAI：ChatGPT Images 2.5", url: "https://openai.com/index/introducing-chatgpt-images-2-5/", note: "产品与性能主张来自公司。" }], tracking: "独立评测、编辑成功率、定价与版权政策",
    },
    {
      id: "important-ai-alphagenome-0909", sourceEventId: "evt-8eb175749a8a77", tier: "重要", category: "AI", status: "judgment", statusLabel: "Google DeepMind科研发布", changeType: "新增",
      title: "AlphaGenome Atlas公开90亿个DNA单碱基变异预测", summary: "Google DeepMind发布研究门户，为人类基因组可能的单核苷酸变异提供功能效应预测。",
      change: "AlphaGenome从模型能力展示扩展到可查询的大规模预测图谱。", impact: "可加快罕见病与功能基因组研究假设生成，但不能替代临床验证。", recommendation: "明确研究用途，重点看独立验证、群体覆盖和误差分布。",
      topics: ["AlphaGenome", "基因组", "生物AI", "科研"], evidence: [{ type: "公司科研", label: "Google DeepMind：AlphaGenome Atlas", url: "https://deepmind.google/blog/alphagenome-atlas-a-predictive-map-of-every-possible-dna-letter-change-in-the-human-genome/", note: "规模和能力来自项目方。" }], tracking: "论文、独立验证、群体偏差与临床边界",
    },
    {
      id: "important-world-huawei-trial-0909", sourceEventId: "evt-e54e9abbcd6c29", tier: "重要", category: "世界", status: "confirmed", statusLabel: "庭审进展＋独立报道", changeType: "新增",
      title: "华为在美涉伊业务刑事案进入陪审团审判", summary: "纽约联邦法院开始遴选陪审员；美方指控涉及银行欺诈、制裁和敲诈，华为否认指控，预计审理约三个月。",
      change: "持续多年的刑事诉讼正式进入实体审判阶段。", impact: "判决可能影响华为美国法律风险、金融合作和中美科技关系。", recommendation: "严格区分检方指控、法庭证据与最终判决。",
      topics: ["华为", "美国司法", "伊朗制裁", "科技竞争"], evidence: [
        { type: "独立报道", label: "AP：华为刑事案开审", url: "https://apnews.com/article/ed66f29aa8539941aa8fad311d511cc2", note: "核验庭审和双方立场。" },
        { type: "独立报道", label: "Reuters转引：华为审判", url: "https://ca.marketscreener.com/news/huawei-heads-to-trial-in-us-over-its-business-dealings-in-iran-ce785bd8da8efe21", note: "交叉核验预计时长。" },
      ], tracking: "法庭证据、关键裁决、陪审团结果与上诉",
    },
    {
      id: "important-ai-meta-muse-0909", sourceEventId: "evt-22aba1482b0800", tier: "重要", category: "AI", status: "judgment", statusLabel: "公司发布＋独立报道", changeType: "新增",
      title: "Meta推出可执行多步骤任务的个人智能体Muse", summary: "Muse先在美国向18岁以上用户开放，可在独立应用和WhatsApp中执行研究、预订和长期计划；安全与隔离主张来自公司。",
      change: "Meta把消费级助手推进到跨步骤执行和持续计划。", impact: "大型平台的个人智能体竞争将转向权限、支付、记忆和责任边界。", recommendation: "在敏感账户或支付授权前，先核验权限提示、日志、撤销和人工确认。",
      topics: ["Meta", "Muse", "个人智能体", "WhatsApp"], evidence: [
        { type: "公司", label: "Meta：Muse发布", url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/", note: "功能和安全主张来自公司。" },
        { type: "独立报道", label: "AP：Meta推出Muse", url: "https://apnews.com/article/3a4572eb4cf4e95d8a0dfdad6e6ca065", note: "交叉核验开放范围。" },
      ], tracking: "权限机制、事故、地区开放、商业模式与用户采用",
    },
    {
      id: "radar-china-ai-ip-0909", sourceEventId: "evt-62d478df70a38d", tier: "雷达", category: "中国", status: "confirmed", statusLabel: "国家知识产权局部署", changeType: "观察",
      title: "中国拟完善算法、生成式AI与平台知识产权规则", summary: "国家知识产权局公布AI知识产权工作方向，涉及算法、生成内容和平台责任等规则研究。",
      change: "AI知识产权治理开始形成更明确的政策议题清单。", impact: "训练数据、生成内容归属与平台责任可能迎来更具体边界。", recommendation: "等待正式规则，不把工作方向等同已生效制度。",
      topics: ["知识产权", "生成式AI", "算法", "平台治理"], evidence: [{ type: "官方", label: "中国政府网：AI知识产权工作方向", url: "https://english.www.gov.cn/news/202609/08/content_WS6a9fb5f1c6d00ca5f9a0d105.html", note: "核验政策方向。" }], tracking: "征求意见、正式规则、训练数据与生成内容案例",
    },
    {
      id: "radar-ai-cognition-0909", sourceEventId: "evt-d906a1d6acdf2d", tier: "雷达", category: "AI", status: "judgment", statusLabel: "媒体转引，未见公司正式公告", changeType: "观察",
      title: "Cognition据报洽谈20亿美元融资、估值480亿美元", summary: "媒体引述Bloomberg称，Devin开发商Cognition正在洽谈新融资；金额、条款和完成状态均未获公司确认。",
      change: "编码智能体的资本定价可能继续快速上行。", impact: "若完成，将提高行业融资和人才竞争门槛，但不能据洽谈估值推断业务质量。", recommendation: "等待公司或投资方公告，并结合收入、留存与推理成本判断。",
      topics: ["Cognition", "Devin", "融资", "编码智能体"], evidence: [{ type: "媒体转引", label: "Axios：Cognition融资报道", url: "https://www.axios.com/newsletters/axios-closer-1dcc799f-a1f9-40af-ab6b-0939a6abc396", note: "转引Bloomberg，交易尚未确认。" }], tracking: "正式公告、投资方、收入与客户留存",
    },
    {
      id: "radar-ai-deepseek-cve-0909", sourceEventId: "evt-e1f2a4d512e400", tier: "雷达", category: "AI", status: "confirmed", statusLabel: "NVD漏洞记录", changeType: "新增",
      title: "DeepSeek工具链曝Host Header认证绕过漏洞", summary: "CVE-2026-82533影响0.1.2-alpha.1之前版本，攻击者可利用Host Header处理缺陷绕过认证。",
      change: "AI开发工具的网络边界出现可追踪的具体漏洞。", impact: "暴露到不可信网络的旧版本可能遭未授权访问。", recommendation: "核对版本并升级，限制管理界面网络暴露，勿将其泛化为模型本身漏洞。",
      topics: ["DeepSeek", "CVE", "认证绕过", "AI安全"], evidence: [{ type: "漏洞库", label: "NVD：CVE-2026-82533", url: "https://vulners.com/nvd/NVD%3ACVE-2026-82533", note: "核验影响版本与漏洞类型。" }], tracking: "厂商公告、修复版本、利用代码与受影响资产",
    },
    {
      id: "radar-ai-cuda-rust-0909", sourceEventId: "evt-96fafa78eff328", tier: "雷达", category: "AI", status: "judgment", statusLabel: "NVIDIA早期项目", changeType: "新增",
      title: "NVIDIA推出两条CUDA Rust GPU内核路线", summary: "NVIDIA介绍编译器与库两种Rust内核开发路径，均处早期阶段，官方明确不建议生产使用。",
      change: "Rust开始获得更正式的CUDA GPU编程入口。", impact: "长期可能改善内存安全和工具生态，但现阶段成熟度不足。", recommendation: "仅在实验环境评估，不提前迁移生产CUDA代码。",
      topics: ["CUDA", "Rust", "GPU", "开发工具"], evidence: [{ type: "公司工程", label: "NVIDIA：CUDA Rust", url: "https://developer.nvidia.com/blog/introducing-cuda-rust-two-tracks-for-writing-gpu-kernels/", note: "官方明确为早期阶段。" }], tracking: "稳定版本、性能、生态与生产支持",
    },
    {
      id: "radar-ai-gitlab-sandbox-0909", sourceEventId: "evt-da44bb10dae567", tier: "雷达", category: "AI", status: "judgment", statusLabel: "二手技术分析", changeType: "观察",
      title: "GitLab智能体沙箱被指存在白名单代理信任转移风险", summary: "InfoQ分析认为，沙箱允许访问的代理端点可能成为间接扩大外部访问的通道，风险取决于具体配置。",
      change: "智能体沙箱的安全焦点从进程隔离转向网络代理和可信端点。", impact: "仅靠域名白名单可能不足以限制具备工具调用能力的智能体。", recommendation: "审计代理转发、DNS、身份继承和出站日志，等待GitLab官方回应。",
      topics: ["GitLab", "智能体", "沙箱", "供应链安全"], evidence: [{ type: "行业分析", label: "InfoQ：AI Sandbox访问风险", url: "https://www.infoq.com/news/2026/09/gitlab-ai-sandbox-access/", note: "为二手分析，需结合官方文档验证。" }], tracking: "GitLab回应、修复、可复现路径与默认配置",
    },
    {
      id: "radar-ai-hypertau-0909", sourceEventId: "evt-911cfe302efc1f", tier: "雷达", category: "AI", status: "judgment", statusLabel: "预印本基准", changeType: "观察",
      title: "Hyper-τ基准显示前沿模型的长时序研究成功率仍低", summary: "53项任务中最佳系统得分23.9%，专家参考为82.2%；结果来自预印本，尚未同行评审。",
      change: "新的基准把模型测试扩展到长时序、可验证研究任务。", impact: "“能持续运行”不等于“能可靠完成研究”，人工监督仍是核心约束。", recommendation: "关注任务构成、评分方法和外部复现，不用单一分数外推全部能力。",
      topics: ["智能体评测", "长期任务", "研究自动化", "基准"], evidence: [{ type: "预印本", label: "arXiv：Hyper-τ", url: "https://arxiv.org/abs/2609.04611", note: "53项任务，尚未同行评审。" }], tracking: "代码、数据集、独立复现与模型更新",
    },
    {
      id: "radar-ai-google-accenture-0909", sourceEventId: "evt-88a73c38002f94", tier: "雷达", category: "AI", status: "confirmed", statusLabel: "双方联合公告", changeType: "升级",
      title: "Google Cloud与埃森哲拟部署1000名AI前线工程师", summary: "双方深化合作，成立Gemini Enterprise业务组，并计划配置1000名前线部署工程师帮助企业落地。",
      change: "大型AI供应商开始用成建制现场工程团队补齐企业实施。", impact: "竞争将从模型能力延伸到流程改造、数据接入和交付产能。", recommendation: "关注实际招聘、客户项目周期与可量化业务结果。",
      topics: ["Google Cloud", "Accenture", "企业AI", "交付"], evidence: [{ type: "公司联合公告", label: "Accenture：深化Google Cloud合作", url: "https://newsroom.accenture.com/news/2026/accenture-and-google-cloud-deepen-partnership-with-formation-of-new-accenture-gemini-enterprise-business-group", note: "核验1000人计划。" }], tracking: "人员到位、客户案例、项目周期与收入",
    },
    {
      id: "radar-ai-social-bias-0909", sourceEventId: "evt-9114c5ded6d2c8", tier: "雷达", category: "AI", status: "judgment", statusLabel: "开放评审论文", changeType: "观察",
      title: "研究提示社会偏见评测可能低估模型的情境性偏差", summary: "论文认为静态问答难以捕捉模型在互动和角色条件下的偏见表现；结论仍处开放评审阶段。",
      change: "偏见评测开始从固定提示转向情境化、交互式测试。", impact: "企业现有安全评测可能漏掉多轮任务中的行为漂移。", recommendation: "把角色、工具、记忆和长对话纳入内部红队集。",
      topics: ["AI安全", "社会偏见", "评测", "多轮交互"], evidence: [{ type: "开放评审论文", label: "OpenReview：情境性社会偏见", url: "https://openreview.net/forum?id=pc7fqaOcAH", note: "早期研究，尚未形成稳定共识。" }], tracking: "评审结果、数据集开放与外部复现",
    },
    {
      id: "radar-world-canada-climate-0909", sourceEventId: "evt-16ae1de318fef5", tier: "雷达", category: "世界", status: "confirmed", statusLabel: "加拿大政府科学报告", changeType: "观察",
      title: "加拿大报告称现行政策情景下本世纪末平均升温或达5℃", summary: "相对1850—1900年，2081—2100年加拿大平均升温中值为5.0℃、范围3.8—6.6℃；这是政策情景推演，不是确定预报。",
      change: "最新国家评估把高纬度增温和政策缺口量化到更长周期。", impact: "基础设施、保险、农业和北方社区的适应成本可能继续上升。", recommendation: "按情景使用数字，关注地区差异和适应投资。",
      topics: ["加拿大", "气候变化", "适应", "基础设施"], evidence: [{ type: "官方科学报告", label: "加拿大：Changing Climate Report 2026", url: "https://www.canada.ca/en/environment-climate-change/services/science-technology/changing-climate-report-2026/cccr-report-summary-en.html", note: "核验情景、基准期与区间。" }], tracking: "减排政策、地区风险、保险损失与适应预算",
    },
    {
      id: "radar-world-digital-trade-0909", sourceEventId: "evt-717f3543f2c2ab", tier: "雷达", category: "世界", status: "confirmed", statusLabel: "UNCTAD专题更新", changeType: "观察",
      title: "UNCTAD：数字服务占全球服务出口56%，最不发达国家份额仍低", summary: "UNCTAD称服务占全球中间投入71%，数字服务占服务出口56%；最不发达国家仅占全球服务出口0.6%。",
      change: "服务与数字贸易继续重塑全球价值链，但参与差距显著。", impact: "增长机会越来越依赖数字基础设施、技能和跨境规则。", recommendation: "观察各国数字服务出口、数据规则和最不发达国家能力建设。",
      topics: ["数字贸易", "服务贸易", "UNCTAD", "发展差距"], evidence: [{ type: "国际组织", label: "UNCTAD：Global Trade Update", url: "https://unctad.org/publication/global-trade-update-september-2026-services-are-reshaping-global-trade", note: "9月4日发布，本期补充确认。" }], tracking: "数字服务出口、跨境数据规则与发展中经济体份额",
    },
  ],
  watchlist: [
    { topic: "直销与完美中国", note: "本批定向检索未见可独立核验的制度或经营拐点；继续监测监管、渠道政策和公司正式披露。" },
    { topic: "沙特与红海能源设施", note: "设施运行、后续袭击和Bab el-Mandeb船流决定风险是否继续升级。" },
    { topic: "中美AI模型争议", note: "关注涉事企业回应、可审计技术证据和新增监管措施。" },
  ],
  brief: {
    id: "daily-2026-09-09", date: "09.09", kind: "日报", title: "中国＋世界每日情报",
    summary: "胡塞袭击沙特油设施，中国外贸继续强扩张，美方升级对中国AI企业的蒸馏指控。",
    state: "正式核验",
    detail: "观察截至北京时间2026年9月9日09:25。完整正文和来源链接已写入项目的情报简报目录。",
  },
};
