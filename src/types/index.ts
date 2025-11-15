export interface NavItem {
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
}

export interface SubMenuItem {
  title: string;
  description?: string;
  href: string;
  icon?: string;
  image?: string;
}

// 新增：轮播图按钮类型
export interface CarouselButton {
  text: string;
  href: string;
  type: 'primary' | 'secondary'; // primary: 实心, secondary: 空心
  external?: boolean; // 是否外部链接
}

// 更新：轮播图类型
export interface CarouselSlide {
  id: number;
  image: string;
  mediaType?: 'image' | 'video';
  title: string;
  subtitle: string;
  description: string;
  buttons?: CarouselButton[]; // 可选的按钮数组
  duration?: number; // 可选：自定义显示时长（毫秒），如果不设置则使用默认值或视频时长
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
  level?: number;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  bio2: string;
  avatar: string;
  skills: Skill[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  category: 'opensource' | 'commercial' | 'personal';
}

export interface Section {
  id: string;
  title: string;
  ref: React.RefObject<HTMLElement>;
}

export interface SkillCategory {
  name: string;
  color: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillRadarData {
  category: string;
  value: number;
}

export interface ExtendedSkillItem extends SkillItem {
  category: string;
  color: string;
}

export interface SocialLink {
  id: string;
  name: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
  category: 'code' | 'blog' | 'cloud';
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'wechat' | 'qq';
  value: string;
  label: string;
  icon: string;
}