// D:\unhub-official\src\data\config.ts

import type { NavItem, CarouselSlide, PersonalInfo, Partner, Project } from '@/types';

// ----------------------------------------------------
// 🌟 自动化图片导入：使用 import.meta.glob
// ----------------------------------------------------
// 导入所有 /src/assets/images 目录下的图片，并立即加载 (eager: true)
// 包含 jpg, png, svg, webp 等常见图片格式
const allImages = import.meta.glob('/src/assets/images/**/*.{jpg,png,svg,webp,jpeg}', { eager: true });


// ----------------------------------------------------
// 🛠️ 辅助函数：根据相对路径获取最终的图片 URL
// ----------------------------------------------------
/**
 * 将配置中的相对路径（例如：'/src/assets/images/projects/gren.jpg'）
 * 转换为 Vite 构建后的实际 URL。
 * @param path 配置中的图片路径字符串
 * @returns 图片的 URL 字符串
 */
const getAssetUrl = (path: string): string => {
  // allImages 的 key 就是您配置中的完整路径
  const module = allImages[path] as { default: string } | undefined;
  
  // 如果模块存在，返回 Vite 处理后的 default 属性（即最终 URL）
  // 否则返回原始路径或一个空字符串，以防报错 (注意：外部 URL 不应经过此函数处理)
  return module?.default ?? path; // 默认返回原始路径，以兼容外部 URL
};


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
        image: getAssetUrl('/src/assets/images/projects/gren.jpg')
      },
      { 
        title: '技能专长', 
        description: '我掌握的技术栈', 
        href: '#skills-visualization',
        image: getAssetUrl('/src/assets/images/carousel/GTA_V_Artwork_GTAOnline_Lester.jpg')
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
        image: getAssetUrl('/src/assets/images/projects/chat.png')
      },
      { 
        title: '重点项目', 
        description: '参与的重点项目', 
        href: '#projects',
        image: getAssetUrl('/src/assets/images/projects/wikipedia.jpg')
      },
      { 
        title: '个人作品', 
        description: '个人实验项目', 
        href: '#projects',
        image: getAssetUrl('/src/assets/images/carousel/jingshiting.jpg')
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
    image: getAssetUrl('https://cf-r2.zyhorg.ac.cn/videos/1763172353411-n04rga-byT3XAs3vG6Ktm4k.mp4'),
    mediaType: 'video',
    title: '名探偵コナン 2026🪽',
    subtitle: '名侦探柯南 2026🪽',
    description: '名侦探柯南2026年新剧场版预告片。',
    duration: 40000, // 视频 40 秒（也可以不设置，会自动获取视频时长）
    buttons: [],
  },
  {
    id: 2,
    image: getAssetUrl('https://cf-r2.zyhorg.ac.cn/images/1763171641668-6zzcc5-ai.jpg'),
    mediaType: 'image',
    title: '全球范围内主流的 AI',
    subtitle: 'AI Models',
    description: '系统梳理了当前全球范围内主流的 AI/大语言模型（LLM）、核心提供商及其代表性应用，涵盖开源与闭源模型、企业与研究机构、工具平台与终端产品。',
    duration: 5000, // 图片显示 5 秒
    buttons: [
      {
        text: '了解更多',
        href: 'https://docs.zyhorg.cn/docs/All-AILLM-models',
        type: 'secondary',
        external: true,
      },
    ],
  },
  {
    id: 3,
    image: getAssetUrl('https://cf-r2.zyhorg.ac.cn/images/1762948577753-mdc23h-Sequoia-Sunrise.jpg'),
    mediaType: 'image',
    title: 'Apple Wallpapers',
    subtitle: 'Apple Wallpapers',
    description: '精选自 Apple 官方的高质量壁纸合集，适用于各种设备。',
    duration: 5000, // 图片显示 5 秒
    buttons: [
      {
        text: '了解更多',
        href: 'https://t.co/FMmNEnAbzj',
        type: 'primary',
        external: true,
      },
      {
        text: '作者 X 账号',
        href: 'https://x.com/applewpapers',
        type: 'secondary',
        external: true,
      },
    ],
  },
  // 新增：视频背景示例
  {
    id: 4,
    image: getAssetUrl('https://cf-r2.zyhorg.ac.cn/images/1763173374520-gpmkaq-wiki.jpg'),
    mediaType: 'image',
    title: '无需代理的中文维基百科',
    subtitle: 'wikipedia',
    description: '通过 Cloudflare Workers 实现中国大陆网络环境直接访问。',
    duration: 5000, // 图片显示 5 秒
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
];

// 个人信息配置
export const personalInfo: PersonalInfo = {
  name: '杖雍皓 · 张永豪',
  title: '计算机领域的永远学习者',
  bio: '热爱技术，专注于创造优秀的数字产品。擅长Python开发、前端开发、Linux发行版操作系统、用户体验设计和产品规划。追求代码的优雅与产品的极致。',
  bio2: '从2025年开始在中国软件与技术服务股份有限公司实习工作。从事湖北省税务系统核心征管的运维工作，积累了丰富的实战经验。',
  avatar: getAssetUrl('/src/assets/images/avatar.jpg'),
  skills: [
    { name: 'React', icon: getAssetUrl('/src/assets/images/skills/React.svg'), category: 'frontend' },
    { name: 'TypeScript', icon: getAssetUrl('/src/assets/images/skills/typescript.svg'), category: 'frontend' },
    { name: 'Vue.js', icon: getAssetUrl('/src/assets/images/skills/Vue.svg'), category: 'frontend' },
    { name: 'Node.js', icon: getAssetUrl('/src/assets/images/skills/nodejs.svg'), category: 'backend' },
    { name: 'Python', icon: getAssetUrl('/src/assets/images/skills/Python.svg'), category: 'backend' },
    { name: 'Docker', icon: getAssetUrl('/src/assets/images/skills/docker.svg'), category: 'devops' },
    { name: 'Figma', icon: getAssetUrl('/src/assets/images/skills/Figma.svg'), category: 'design' },
    { name: 'Git', icon: getAssetUrl('/src/assets/images/skills/git-bash.svg'), category: 'tools' },
    { name: 'GitHub', icon: getAssetUrl('/src/assets/images/skills/github.svg'), category: 'frontend' },
    { name: 'Cloudflare', icon: getAssetUrl('/src/assets/images/skills/cloudflare.svg'), category: 'frontend' },
    { name: 'Linux', icon: getAssetUrl('/src/assets/images/skills/linux.svg'), category: 'linux' },
    { name: 'Hadoop', icon: getAssetUrl('/src/assets/images/skills/hadoop.svg'), category: 'frontend' },
  ],
};


// 合作伙伴配置 - 使用 CDN Logo
export const partners: Partner[] = [
  {
    id: '1',
    name: 'Microsoft',
    logo: getAssetUrl('/src/assets/images/partners/microsoft.svg'),
    website: 'https://microsoft.com',
  },
  {
    id: '2',
    name: 'Google',
    logo: getAssetUrl('/src/assets/images/partners/google.svg'),
    website: 'https://google.com',
  },
  {
    id: '3',
    name: 'Apple',
    logo: getAssetUrl('/src/assets/images/partners/apple-13.svg'),
    website: 'https://apple.com',
  },
  {
    id: '4',
    name: 'Meta',
    logo: getAssetUrl('/src/assets/images/partners/meta-3.svg'),
    website: 'https://meta.com',
  },
  {
    id: '5',
    name: 'Amazon',
    logo: getAssetUrl('/src/assets/images/partners/amazon-web-services-2.svg'),
    website: 'https://amazon.com',
  },
  {
    id: '6',
    name: 'Cloudflare',
    logo: getAssetUrl('/src/assets/images/partners/cloudflare.svg'),
    website: 'https://cloudflare.com',
  },
  {
    id: '7',
    name: 'Nvidia',
    logo: getAssetUrl('/src/assets/images/partners/nvidia-7.svg'),
    website: 'https://www.nvidia.cn/',
  },
  {
    id: '8',
    name: 'OpenAI',
    logo: getAssetUrl('/src/assets/images/partners/openai-2.svg'),
    website: 'https://openai.com',
  },
  {
    id: '9',
    name: 'QWen',
    logo: getAssetUrl('/src/assets/images/partners/QWen.svg'),
    website: 'https://qwen.ai/qwenchat',
  },
  {
    id: '10',
    name: 'Duolingo',
    logo: getAssetUrl('/src/assets/images/partners/duolingo-1.svg'),
    website: 'https://www.duolingo.cn/',
  },
  {
    id: '11',
    name: 'GitHub',
    logo: getAssetUrl('/src/assets/images/partners/github-icon-1.svg'),
    website: 'https://github.com/',
  },
  {
    id: '12',
    name: 'Steam',
    logo: getAssetUrl('/src/assets/images/partners/steam-icon-logo.svg'),
    website: 'https://store.steampowered.com',
  },
  {
    id: '13',
    name: 'RockStar-Games',
    logo: getAssetUrl('/src/assets/images/partners/rockstar-games.svg'),
    website: 'https://www.rockstargames.com/',
  },
  {
    id: '14',
    name: '阿里云',
    logo: getAssetUrl('/src/assets/images/partners/阿里云.svg'),
    website: 'https://cn.aliyun.com/',
  },
  {
    id: '15',
    name: '腾讯云',
    logo: getAssetUrl('/src/assets/images/partners/腾讯云.svg'),
    website: 'https://cloud.tencent.com/',
  },
  {
    id: '16',
    name: 'Hong_Kong_Police_Force',
    logo: getAssetUrl('/src/assets/images/partners/Hong_Kong_Police_Force.svg'),
    website: 'https://www.police.gov.hk/',
  },
  {
    id: '17',
    name: 'wikipedia',
    logo: getAssetUrl('/src/assets/images/partners/wikipedia.svg'),
    website: 'https://zh.wikipedia.org/',
  },
  {
    id: '18',
    name: 'Hugging Face',
    logo: getAssetUrl('/src/assets/images/partners/huggingface-2.svg'),
    website: 'https://huggingface.co/',
  },
];

// 项目配置 - 使用 Unsplash 占位图
export const projects: Project[] = [
  {
    id: '1',
    title: '无需代理的中文维基百科',
    description: '我们通过先进的 Cloudflare Workers 边缘计算技术，构建了一个稳定、高速、零延迟的中文维基百科访问网关。无需任何代理工具，即可自由探索人类知识的海洋。',
    image: getAssetUrl('/src/assets/images/projects/wikipedia.jpg'),
    tags: ['Cloudflare', 'Node.js', 'Workers', 'Docker'],
    link: 'https://wikipedia.zyhorg.cn/',
    github: 'https://github.com/zyhgov/Wikipedia-Proxy-Gateway',
    category: 'commercial',
  },
  {
    id: '2',
    title: 'UNHub P2P 屏幕共享',
    description: '创建一个房间，分享代码，并在几秒钟内开始向观众演示您的屏幕内容。',
    image: getAssetUrl('/src/assets/images/projects/p2p.png'),
    tags: ['React', 'TypeScript', 'Storybook', 'CSS'],
    link: 'https://p2p.zyhorg.cn/',
    category: 'opensource',
  },
  {
    id: '3',
    title: '名探偵コナン警視庁百科',
    description: '警视厅名侦探柯南的官方档案集合。',
    image: getAssetUrl('/src/assets/images/carousel/jingshiting.jpg'),
    tags: ['Vue.js', 'ECharts', 'Python', 'FastAPI'],
    link: 'https://mpd.zyhorg.cn',
    category: 'personal',
  },
  {
    id: '4',
    title: 'UNHub 数据中心',
    description: '基于GitHub仓库和Cloudflare R2对象存储的大型高可用持续化文件存储与分享集中转运站。',
    // 注意：外部 URL 不需要使用 getAssetUrl
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8', 
    tags: ['Cloudflare R2','Next.js', 'MDX', 'Tailwind'],
    link: 'https://asset.zyhorg.cn/',
    category: 'commercial',
  },
  {
    id: '5',
    title: '自搭建AI协作平台',
    description: '基于lobeHub搭建，可使用chatgpt、grok、qwen、deepseek等大模型',
    image: getAssetUrl('/src/assets/images/projects/chat.png'),
    tags: ['React', 'WebSocket', 'Canvas', 'Redis'],
    link: 'https://chat.zyhorg.cn/',
    category: 'opensource',
  },
  {
    id: '6',
    title: 'UNHub 联合库 知识库',
    description: 'NHub 联合库（United Knowledge Hub）是由技术架构师 杖雍皓 发起并主导开发的开源知识平台。',
    image: getAssetUrl('/src/assets/images/projects/unhub.png'),
    tags: ['React', 'Node.js', 'Docusaurus', 'Cloudflare R2'],
    link: 'https://docs.zyhorg.cn/',
    category: 'commercial',
  },
];