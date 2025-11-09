import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  HiMail, 
  HiExternalLink, 
  HiClipboardCopy, 
  HiCheckCircle,
  HiCode,
  HiPencilAlt,
  HiCloud
} from 'react-icons/hi';
import { 
  SiGithub, 
  SiGitlab,
  SiCsdn,
  SiAlibabacloud,
  SiTencentqq
} from 'react-icons/si';
import { socialLinks, contactInfo, categoryLabels } from '@/data/contactData';
import type { SocialLink, ContactInfo } from '@/types';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // 复制邮箱到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedEmail(text);
      setTimeout(() => setCopiedEmail(null), 2000);
    });
  };

  // 获取图标组件
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      github: <SiGithub className="w-6 h-6" />,
      gitlab: <SiGitlab className="w-6 h-6" />,
      gitee: <span className="w-6 h-6 flex items-center justify-center text-lg font-bold">G</span>,
      csdn: <SiCsdn className="w-6 h-6" />,
      alicloud: <SiAlibabacloud className="w-6 h-6" />,
      tencentcloud: <SiTencentqq className="w-6 h-6" />,
    };
    return iconMap[iconName] || <HiExternalLink className="w-6 h-6" />;
  };

  // 获取分类图标
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      code: <HiCode className="w-5 h-5" />,
      blog: <HiPencilAlt className="w-5 h-5" />,
      cloud: <HiCloud className="w-5 h-5" />,
    };
    return iconMap[category] || <HiExternalLink className="w-5 h-5" />;
  };

  // 按分类分组
  const groupedLinks = socialLinks.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {} as Record<string, SocialLink[]>);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 lg:py-32 bg-white" 
      id="contact"
    >
      <div className="container-apple">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm lg:text-base font-bold text-apple-gray4 uppercase tracking-wider mb-4">
            Get in Touch
          </h2>
          <p className="text-4xl lg:text-5xl font-bold text-apple-dark1 mb-6">
            与我交流联系
          </p>
          <p className="text-lg lg:text-xl text-apple-gray4 max-w-2xl mx-auto">
            期待与你交流技术、分享经验、探讨合作
          </p>
        </motion.div>

        {/* 社交媒体和开发平台 */}
        <div className="space-y-12 mb-16">
          {Object.entries(groupedLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
            >
              {/* 分类标题 */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-apple-blue/10 rounded-full">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-2xl font-bold text-apple-dark1">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-apple-gray3 to-transparent" />
              </div>

              {/* 链接卡片网格 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {links.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3 + categoryIndex * 0.1 + index * 0.05 
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    className="group relative bg-apple-gray1 hover:bg-white rounded-2xl p-5 apple-shadow hover:apple-shadow-lg transition-all duration-300 border border-apple-gray3 overflow-hidden"
                  >
                    {/* 背景装饰 */}
                    <div 
                      className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ backgroundColor: link.color }}
                    />

                    <div className="relative flex items-center gap-4">
                      {/* 图标 */}
                      <div 
                        className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          backgroundColor: link.color + '15',
                          color: link.color,
                        }}
                      >
                        {getIcon(link.icon)}
                      </div>

                      {/* 信息 */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-apple-dark1 mb-1 truncate group-hover:text-apple-blue transition-colors">
                          {link.name}
                        </h4>
                        <p className="text-xs text-apple-gray4 truncate">
                          {link.platform}
                        </p>
                      </div>

                      {/* 外链图标 */}
                      <HiExternalLink className="w-5 h-5 text-apple-gray4 group-hover:text-apple-blue group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 联系方式卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-br from-apple-blue to-[#0077ED] rounded-3xl p-8 lg:p-12 apple-shadow-lg text-white overflow-hidden relative"
        >
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative">
            {/* 标题 */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm">
                <HiMail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold">邮箱联系</h3>
                <p className="text-white/80 text-sm mt-1">随时欢迎你的来信</p>
              </div>
            </div>

            {/* 邮箱列表 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                      {contact.label}
                    </span>
                    <button
                      onClick={() => copyToClipboard(contact.value)}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors group"
                      title="复制邮箱"
                    >
                      {copiedEmail === contact.value ? (
                        <HiCheckCircle className="w-4 h-4 text-green-300" />
                      ) : (
                        <HiClipboardCopy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      )}
                    </button>
                  </div>
                  <a 
                    href={`mailto:${contact.value}`}
                    className="text-sm font-semibold break-all hover:text-white/90 transition-colors block"
                  >
                    {contact.value}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* 底部提示 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 flex items-center justify-center gap-2 text-sm text-white/70"
            >
              <HiMail className="w-4 h-4" />
              <span>通常在 24 小时内回复</span>
            </motion.div>
          </div>
        </motion.div>

        {/* 底部引导 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-apple-gray4 text-sm lg:text-base">
            也可以通过以上社交平台找到我，期待与你的交流 ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;