import type { NavItem, CarouselSlide, PersonalInfo, Partner, Project } from '@/types';

// 导航配置
export const navigationItems: NavItem[] = [
  {
    label: '联合库UNHub',
    href: '#home',
  },
  {
    label: '关于杖雍皓',
    href: '#about',
    submenu: [
      { 
        title: '个人简介', 
        description: '了解我的背景与经历', 
        href: '#about',
        image: '/src/assets/images/projects/gren.jpg'
      },
      { 
        title: '技能专长', 
        description: '我掌握的技术栈', 
        href: '#skills-visualization',
        image: '/src/assets/images/carousel/GTA_V_Artwork_GTAOnline_Lester.jpg'
      },
    ],
  },
  {
    label: '一些项目',
    href: '#projects',
    submenu: [
      { 
        title: '开源项目', 
        description: '我的开源贡献', 
        href: '#projects',
        image: '/src/assets/images/projects/chat.png'
      },
      { 
        title: '重点项目', 
        description: '参与的重点项目', 
        href: '#projects',
        image: '/src/assets/images/projects/wikipedia.jpg'
      },
      { 
        title: '个人作品', 
        description: '个人实验项目', 
        href: '#projects',
        image: '/src/assets/images/carousel/jingshiting.jpg'
      },
    ],
  },
  {
    label: '足迹',
    href: '#footprint',
  },
  {
    label: '联系我',
    href: '#contact',
  },
];

// 轮播图配置
export const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    image: '/src/assets/images/carousel/oberon-copeland-veryinformed-com-EtCxIuaG-zU-unsplash.jpg',
    title: '无需代理的中文维基百科',
    subtitle: 'wikipedia',
    description: '通过 Cloudflare Workers 实现中国大陆网络环境直接访问。',
    buttons: [
      {
        text: '立即访问',
        href: 'https://wikipedia.zyhorg.cn',
        type: 'primary',
        external: true,
      },
      {
        text: '了解技术实现',
        href: '#projects',
        type: 'secondary',
      },
    ],
  },
  {
    id: 2,
    image: '/src/assets/images/carousel/gta6.jpg',
    title: 'Grand Theft Auto VI',
    subtitle: 'GTA VI',
    description: '《侠盗猎车手 VI》现已定于 2026 年 11 月 19 日星期四发布。',
    buttons: [
      {
        text: '了解更多',
        href: 'https://www.rockstargames.com/VI',
        type: 'secondary',
        external: true,
      },
    ],
  },
  {
    id: 3,
    image: '/src/assets/images/carousel/hujing.jpg',
    title: '前往佩里科岛夺取猎豹雕像，赢取双倍奖励',
    subtitle: 'GTA Online',
    description: '在佩里科岛抢劫任务中，与亡命之徒帕维尔这位友好的潜艇兵合作，将潜望镜对准金发老大的岛屿堡垒，精心策划您的行动，然后满载珍贵财物逃离加勒比海。',
    buttons: [
      {
        text: '了解更多',
        href: 'https://www.rockstargames.com/zh/newswire/article/1798o995k979a8/plunder-cayo-perico-for-the-panther-statue-and-double-rewards',
        type: 'secondary',
        external: true,
      },
    ],
  },
];

// 个人信息配置
export const personalInfo: PersonalInfo = {
  name: '杖雍皓 · 张永豪',
  title: '计算机领域的永远学习者',
  bio: '热爱技术，专注于创造优秀的数字产品。擅长前端开发、Linux发行版操作系统、用户体验设计和产品规划。追求代码的优雅与产品的极致。',
  bio2: '从2025年伊始在中国软件与技术服务股份有限公司实习工作。',
  avatar: '/src/assets/images/avatar.jpg',
  skills: [
    { name: 'React', icon: '/src/assets/images/skills/react.svg', category: 'frontend' },
    { name: 'TypeScript', icon: '/src/assets/images/skills/typescript.svg', category: 'frontend' },
    { name: 'Vue.js', icon: '/src/assets/images/skills/vue.svg', category: 'frontend' },
    { name: 'Node.js', icon: '/src/assets/images/skills/nodejs.svg', category: 'backend' },
    { name: 'Python', icon: '/src/assets/images/skills/python.svg', category: 'backend' },
    { name: 'Docker', icon: '/src/assets/images/skills/docker.svg', category: 'devops' },
    { name: 'Figma', icon: '/src/assets/images/skills/figma.svg', category: 'design' },
    { name: 'Git', icon: '/src/assets/images/skills/git-bash.svg', category: 'tools' },
    { name: 'GitHub', icon: '/src/assets/images/skills/github.svg', category: 'frontend' },
    { name: 'Cloudflare', icon: '/src/assets/images/skills/cloudflare.svg', category: 'frontend' },
    { name: 'Linux', icon: '/src/assets/images/skills/linux.svg', category: 'linux' },
    { name: 'Hadoop', icon: '/src/assets/images/skills/hadoop.svg', category: 'frontend' },
  ],
};


// 合作伙伴配置 - 使用 CDN Logo
export const partners: Partner[] = [
  {
    id: '1',
    name: 'Microsoft',
    logo: '/src/assets/images/partners/microsoft.svg',
    website: 'https://microsoft.com',
  },
  {
    id: '2',
    name: 'Google',
    logo: '/src/assets/images/partners/google.svg',
    website: 'https://google.com',
  },
  {
    id: '3',
    name: 'Apple',
    logo: '/src/assets/images/partners/apple-13.svg',
    website: 'https://apple.com',
  },
  {
    id: '4',
    name: 'Meta',
    logo: '/src/assets/images/partners/meta-3.svg',
    website: 'https://meta.com',
  },
  {
    id: '5',
    name: 'Amazon',
    logo: '/src/assets/images/partners/amazon-web-services-2.svg',
    website: 'https://amazon.com',
  },
  {
    id: '6',
    name: 'Cloudflare',
    logo: '/src/assets/images/partners/cloudflare.svg',
    website: 'https://cloudflare.com',
  },
  {
    id: '7',
    name: 'Nvidia',
    logo: '/src/assets/images/partners/nvidia-7.svg',
    website: 'https://www.nvidia.cn/',
  },
  {
    id: '8',
    name: 'OpenAI',
    logo: '/src/assets/images/partners/openai-2.svg',
    website: 'https://openai.com',
  },
  {
    id: '9',
    name: 'QWen',
    logo: '/src/assets/images/partners/QWen.svg',
    website: 'https://qwen.ai/qwenchat',
  },
  {
    id: '10',
    name: 'Duolingo',
    logo: '/src/assets/images/partners/duolingo-1.svg',
    website: 'https://www.duolingo.cn/',
  },
  {
    id: '11',
    name: 'GitHub',
    logo: '/src/assets/images/partners/github-icon-1.svg',
    website: 'https://github.com/',
  },
  {
    id: '12',
    name: 'Steam',
    logo: '/src/assets/images/partners/steam-icon-logo.svg',
    website: 'https://store.steampowered.com',
  },
  {
    id: '13',
    name: 'RockStar-Games',
    logo: '/src/assets/images/partners/rockstar-games.svg',
    website: 'https://www.rockstargames.com/',
  },
  {
    id: '14',
    name: '阿里云',
    logo: '/src/assets/images/partners/阿里云.svg',
    website: 'https://cn.aliyun.com/',
  },
  {
    id: '15',
    name: '腾讯云',
    logo: '/src/assets/images/partners/腾讯云.svg',
    website: 'https://cloud.tencent.com/',
  },
  {
    id: '16',
    name: 'Hong_Kong_Police_Force',
    logo: '/src/assets/images/partners/Hong_Kong_Police_Force.svg',
    website: 'https://www.police.gov.hk/',
  },
  {
    id: '17',
    name: 'wikipedia',
    logo: '/src/assets/images/partners/wikipedia.svg',
    website: 'https://zh.wikipedia.org/',
  },
  {
    id: '18',
    name: 'Hugging Face',
    logo: '/src/assets/images/partners/huggingface-2.svg',
    website: 'https://huggingface.co/',
  },
];

// 项目配置 - 使用 Unsplash 占位图
export const projects: Project[] = [
  {
    id: '1',
    title: '无需代理的中文维基百科',
    description: '我们通过先进的 Cloudflare Workers 边缘计算技术，构建了一个稳定、高速、零延迟的中文维基百科访问网关。无需任何代理工具，即可自由探索人类知识的海洋。',
    image: '/src/assets/images/projects/wikipedia.jpg',
    tags: ['Cloudflare', 'Node.js', 'Workers', 'Docker'],
    link: 'https://wikipedia.zyhorg.cn/',
    github: 'https://github.com/zyhgov/Wikipedia-Proxy-Gateway',
    category: 'commercial',
  },
  {
    id: '2',
    title: 'UNHub P2P 屏幕共享',
    description: '创建一个房间，分享代码，并在几秒钟内开始向观众演示您的屏幕内容。',
    image: '/src/assets/images/projects/p2p.png',
    tags: ['React', 'TypeScript', 'Storybook', 'CSS'],
    link: 'https://p2p.zyhorg.cn/',
    category: 'opensource',
  },
  {
    id: '3',
    title: '名探偵コナン警視庁百科',
    description: '警视厅名侦探柯南的官方档案集合。',
    image: '/src/assets/images/carousel/jingshiting.jpg',
    tags: ['Vue.js', 'ECharts', 'Python', 'FastAPI'],
    link: 'https://mpd.zyhorg.cn',
    category: 'personal',
  },
  {
    id: '4',
    title: 'UNHub 数据中心',
    description: '基于GitHub仓库和Cloudflare R2对象存储的大型高可用持续化文件存储与分享集中转运站。',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8',
    tags: ['Cloudflare R2','Next.js', 'MDX', 'Tailwind'],
    link: 'https://asset.zyhorg.cn/',
    category: 'commercial',
  },
  {
    id: '5',
    title: '自搭建AI协作平台',
    description: '基于lobeHub搭建，可使用chatgpt、grok、qwen、deepseek等大模型',
    image: '/src/assets/images/projects/chat.png',
    tags: ['React', 'WebSocket', 'Canvas', 'Redis'],
    link: 'https://chat.zyhorg.cn/',
    category: 'opensource',
  },
  {
    id: '6',
    title: 'UNHub 联合库 知识库',
    description: 'NHub 联合库（United Knowledge Hub）是由技术架构师 杖雍皓 发起并主导开发的开源知识平台。',
    image: '/src/assets/images/projects/unhub.png',
    tags: ['React', 'Node.js', 'Docusaurus', 'Cloudflare R2'],
    link: 'https://docs.zyhorg.cn/',
    category: 'commercial',
  },
];