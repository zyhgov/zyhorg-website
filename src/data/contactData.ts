import type { SocialLink, ContactInfo } from '@/types';

// 社交媒体和开发平台链接
export const socialLinks: SocialLink[] = [
  {
    id: '1',
    name: 'GitHub',
    platform: 'GitHub',
    url: 'https://github.com/zyhgov',
    icon: 'github',
    color: '#1d1d1f',
    category: 'code',
  },
  {
    id: '2',
    name: 'GitLab',
    platform: 'GitLab',
    url: 'https://gitlab.com/zyhgov',
    icon: 'gitlab',
    color: '#FC6D26',
    category: 'code',
  },
  {
    id: '3',
    name: 'Gitee',
    platform: 'Gitee',
    url: 'https://gitee.com/zyhgov/',
    icon: 'gitee',
    color: '#C71D23',
    category: 'code',
  },
  {
    id: '4',
    name: 'CSDN 博客',
    platform: 'CSDN Blog',
    url: 'https://blog.csdn.net/hdheh554694',
    icon: 'csdn',
    color: '#FC5531',
    category: 'blog',
  },
  {
    id: '5',
    name: 'CSDN DevPress',
    platform: 'CSDN DevPress',
    url: 'https://devpress.csdn.net/user/hdheh554694',
    icon: 'csdn',
    color: '#FF6B00',
    category: 'blog',
  },
  {
    id: '6',
    name: '阿里云开发者',
    platform: 'Alibaba Cloud',
    url: 'https://developer.aliyun.com/profile/klutravz4w7to',
    icon: 'alicloud',
    color: '#FF6A00',
    category: 'cloud',
  },
  {
    id: '7',
    name: '腾讯云开发者',
    platform: 'Tencent Cloud',
    url: 'https://cloud.tencent.com/developer/user/10089337',
    icon: 'tencentcloud',
    color: '#0052D9',
    category: 'cloud',
  },
];

// 联系方式
export const contactInfo: ContactInfo[] = [
  {
    type: 'email',
    value: 'info@zyhorg.cn',
    label: '主要邮箱',
    icon: 'mail',
  },
  {
    type: 'email',
    value: 'zyh040410@outlook.com',
    label: 'Outlook',
    icon: 'mail',
  },
  {
    type: 'email',
    value: 'zyh040410@gmail.com',
    label: 'Gmail',
    icon: 'mail',
  },
];

// 分类标签
export const categoryLabels = {
  code: '代码云托管',
  blog: '技术博客',
  cloud: '云开发社区',
};