import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiHeart, 
  HiShieldCheck, 
  HiGlobe, 
  HiMail,
  HiChevronUp,
  HiX
} from 'react-icons/hi';
import { 
  SiCloudflare,
  SiGithub,
  SiGitlab,
  SiCsdn
} from 'react-icons/si';


import logo from '@/assets/logo.svg'; // 导入 Logo
import icp from '@/assets/icp.png';   // 导入 ICP 备案图标
import ga from '@/assets/gonganbeian.png'; // 导入 公安备案图标

// 使用导入的变量（Vite 会提供正确的 URL 字符串）
const logoPath = logo;
const icpPath = icp;
const gaPath = ga; 
// ------------------------------------

// 弹窗内容数据
const modalContents = {
  privacy: {
    title: '隐私政策',
    content: `
      <h3>信息收集与使用</h3>
      <p>我们重视您的隐私保护。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。</p>
      
      <h3>我们收集的信息</h3>
      <ul>
        <li><strong>访问数据：</strong>当您访问本网站时，我们会自动收集您的 IP 地址、浏览器类型、访问时间等基本信息。</li>
        <li><strong>联系信息：</strong>当您通过邮件或表单与我们联系时，我们会收集您提供的姓名、邮箱等信息。</li>
        <li><strong>Cookies：</strong>我们使用 Cookies 来改善用户体验和分析网站流量。</li>
      </ul>

      <h3>信息使用目的</h3>
      <ul>
        <li>改进网站功能和用户体验</li>
        <li>回复您的咨询和请求</li>
        <li>发送技术更新和重要通知</li>
        <li>进行网站分析和统计</li>
      </ul>

      <h3>信息保护</h3>
      <p>我们采用行业标准的安全措施来保护您的个人信息，包括但不限于：</p>
      <ul>
        <li>SSL/TLS 加密传输</li>
        <li>Cloudflare 安全防护</li>
        <li>定期安全审计</li>
        <li>严格的访问控制</li>
      </ul>

      <h3>第三方服务</h3>
      <p>本网站使用以下第三方服务：</p>
      <ul>
        <li><strong>Cloudflare：</strong>提供 CDN 和安全防护服务</li>
        <li><strong>Google Analytics：</strong>用于网站流量分析（如适用）</li>
      </ul>

      <h3>您的权利</h3>
      <p>您有权：</p>
      <ul>
        <li>访问、更正或删除您的个人信息</li>
        <li>撤回同意或反对某些数据处理</li>
        <li>要求数据可携带性</li>
      </ul>

      <h3>联系我们</h3>
      <p>如果您对隐私政策有任何疑问，请通过 <a href="mailto:info@zyhorg.cn">info@zyhorg.cn</a> 联系我们。</p>

      <p class="text-muted">最后更新时间：2025 年 6 月</p>
    `,
  },
  terms: {
    title: '使用条款',
    content: `
      <h3>接受条款</h3>
      <p>欢迎访问联合库 UNHub 官方网站。通过访问和使用本网站，您同意遵守以下使用条款。</p>

      <h3>知识产权</h3>
      <ul>
        <li>本网站的所有内容，包括但不限于文字、图片、代码、设计，均受版权法保护。</li>
        <li>未经授权，不得复制、修改、分发或商业使用本网站的任何内容。</li>
        <li>开源项目遵循其各自的开源协议。</li>
      </ul>

      <h3>用户行为规范</h3>
      <p>使用本网站时，您同意：</p>
      <ul>
        <li>不进行任何非法或未经授权的活动</li>
        <li>不尝试破坏网站安全或干扰服务</li>
        <li>不发布恶意代码、病毒或有害内容</li>
        <li>尊重他人的知识产权和隐私</li>
      </ul>

      <h3>内容准确性</h3>
      <ul>
        <li>我们努力确保网站内容的准确性，但不保证信息的完整性和时效性。</li>
        <li>技术文章和教程仅供参考，使用时请自行验证。</li>
        <li>我们保留随时修改或删除内容的权利。</li>
      </ul>

      <h3>免责声明</h3>
      <ul>
        <li>本网站按"现状"提供，不提供任何明示或暗示的保证。</li>
        <li>我们不对因使用本网站而产生的任何直接或间接损失负责。</li>
        <li>外部链接由第三方提供，我们不对其内容负责。</li>
      </ul>

      <h3>链接政策</h3>
      <ul>
        <li>欢迎链接到本网站，但不得暗示我们的认可或关联。</li>
        <li>禁止使用框架或内嵌方式展示本网站内容。</li>
      </ul>

      <h3>条款变更</h3>
      <p>我们保留随时修改这些条款的权利。重大变更将在网站上公告。继续使用本网站即表示您接受修订后的条款。</p>

      <h3>适用法律</h3>
      <p>本条款受中华人民共和国法律管辖。</p>

      <h3>联系方式</h3>
      <p>如有任何疑问，请联系：<a href="mailto:info@zyhorg.cn">info@zyhorg.cn</a></p>

      <p class="text-muted">生效日期：2022 年 12 月 1 日</p>
    `,
  },
  sitemap: {
    title: '网站地图',
    content: `
      <h3>主要导航</h3>
      <ul>
        <li><a href="#home">首页</a> - 欢迎页面与核心信息展示</li>
        <li><a href="#about">关于我</a> - 个人简介与技能展示</li>
        <li><a href="#projects">项目作品</a> - 商业项目、开源项目与个人作品</li>
        <li><a href="#skills-visualization">技能专长</a> - 技术栈与能力可视化</li>
        <li><a href="#footprint">我的足迹</a> - 旅行轨迹地图</li>
        <li><a href="#contact">联系我</a> - 社交平台与联系方式</li>
      </ul>

      <h3>技术平台</h3>
      <ul>
        <li><a href="https://github.com/zyhgov" target="_blank">GitHub</a> - 开源项目托管</li>
        <li><a href="https://gitlab.com/zyhgov" target="_blank">GitLab</a> - 代码仓库</li>
        <li><a href="https://gitee.com/zyhgov/" target="_blank">Gitee</a> - 国内代码托管</li>
      </ul>

      <h3>技术博客</h3>
      <ul>
        <li><a href="https://blog.csdn.net/hdheh554694" target="_blank">CSDN 博客</a> - 技术文章分享</li>
        <li><a href="https://devpress.csdn.net/user/hdheh554694" target="_blank">CSDN DevPress</a> - 开发者社区</li>
      </ul>

      <h3>云社区</h3>
      <ul>
        <li><a href="https://developer.aliyun.com/profile/klutravz4w7to" target="_blank">阿里云开发者</a> - 技术分享平台</li>
        <li><a href="https://cloud.tencent.com/developer/user/10089337" target="_blank">腾讯云开发者</a> - 云计算社区</li>
      </ul>

      <h3>官方域名</h3>
      <ul>
        <li><a href="https://zyhorg.cn" target="_blank">zyhorg.cn</a> - 主域名</li>
        <li><a href="https://zyhorg.ac.cn" target="_blank">zyhorg.ac.cn</a> - 备用域名</li>
      </ul>

      <h3>联系方式</h3>
      <ul>
        <li>主要邮箱：<a href="mailto:info@zyhorg.cn">info@zyhorg.cn</a></li>
        <li>Outlook：<a href="mailto:zyh040410@outlook.com">zyh040410@outlook.com</a></li>
        <li>Gmail：<a href="mailto:zyh040410@gmail.com">zyh040410@gmail.com</a></li>
      </ul>

      <h3>法律信息</h3>
      <ul>
        <li><a href="#" onclick="return false;">隐私政策</a></li>
        <li><a href="#" onclick="return false;">使用条款</a></li>
        <li>ICP 备案：鄂ICP备2025151647号</li>
        <li>公安备案：鄂公网安备42011002025860号</li>
      </ul>

      <h3>技术支持</h3>
      <ul>
        <li>框架：React + TypeScript + Vite</li>
        <li>样式：Tailwind CSS</li>
        <li>动画：GSAP + Framer Motion</li>
        <li>图表：ECharts</li>
        <li>安全：Cloudflare</li>
      </ul>

      <p class="text-muted">最后更新：2025 年 6 月</p>
    `,
  },
};

// Modal 组件
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const Modal = ({ isOpen, onClose, title, content }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal 内容 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="bg-white rounded-3xl apple-shadow-lg max-w-3xl w-full max-h-[80vh] overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-apple-gray3 px-6 lg:px-8 py-5 flex items-center justify-between z-10">
                <h3 className="text-2xl font-bold text-apple-dark1">{title}</h3>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-apple-gray1 transition-colors"
                  aria-label="关闭"
                >
                  <HiX className="w-6 h-6 text-apple-gray4" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 lg:px-8 py-6 overflow-y-auto max-h-[calc(80vh-80px)] modal-content">
                <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="prose prose-sm lg:prose-base max-w-none"
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 打开 Modal
  const openModal = (type: string) => {
    setActiveModal(type);
  };

  // 关闭 Modal
  const closeModal = () => {
    setActiveModal(null);
  };

  // 快速链接
  const quickLinks = [
    {
      title: '探索',
      links: [
        { label: '关于我', href: '#about' },
        { label: '项目作品', href: '#projects' },
        { label: '技能专长', href: '#skills-visualization' },
        { label: '我的足迹', href: '#footprint' },
      ],
    },
    {
      title: '联系方式',
      links: [
        { label: '邮箱联系', href: '#contact' },
        { label: 'info@zyhorg.cn', href: 'mailto:info@zyhorg.cn' },
        { label: 'zyh040410@gmail.com', href: 'mailto:zyh040410@gmail.com' },
      ],
    },
    {
      title: '官方域名',
      links: [
        { label: 'zyhorg.cn', href: 'https://zyhorg.cn' },
        { label: 'zyhorg.ac.cn', href: 'https://zyhorg.ac.cn' },
      ],
    },
  ];

  // 社交媒体链接
  const socialLinks = [
    { icon: <SiGithub />, href: 'https://github.com/zyhgov', label: 'GitHub' },
    { icon: <SiGitlab />, href: 'https://gitlab.com/zyhgov', label: 'GitLab' },
    { icon: <SiCsdn />, href: 'https://blog.csdn.net/hdheh554694', label: 'CSDN' },
    { icon: <HiMail />, href: 'mailto:info@zyhorg.cn', label: 'Email' },
  ];

  return (
    <>
      <footer className="bg-apple-gray1 border-t border-apple-gray3 relative">
        {/* 回到顶部按钮 */}
        <button
          onClick={scrollToTop}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white hover:bg-apple-blue text-apple-dark1 hover:text-white rounded-full apple-shadow-lg flex items-center justify-center transition-all duration-300 group z-10"
          aria-label="回到顶部"
        >
          <HiChevronUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* 主要内容区 */}
        <div className="container-apple pt-16 pb-12 lg:pt-20 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* 左侧品牌介绍 */}
            <div className="lg:col-span-5">
              {/* Logo 和品牌名 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                {/* 使用 logo.svg */}
                <img 
                  src={logoPath} 
                  alt="UNHub Logo" 
                  className="w-14 h-14 drop-shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-apple-dark1">联合库 UNHub</h3>
                  <p className="text-sm text-apple-gray4 mt-1">创立于 2022 年</p>
                </div>
              </motion.div>

              {/* 品牌介绍 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4 text-sm text-apple-gray4 leading-relaxed mb-8"
              >
                <p className="text-base">
                  <strong className="text-apple-dark1 font-bold">联合库 UNHub</strong> 是杖雍皓于 2022 年创建的专属技术品牌，专注于技术分享、项目开发与知识传播。
                </p>
                <p>
                  <strong className="text-apple-dark1 font-semibold">关于创始人：</strong>
                  杖雍皓与张永豪为同一人，杖雍皓是技术化名。致力于大数据技术、全栈开发和云计算领域的研究与实践，追求技术的极致与产品的优雅。
                </p>
              </motion.div>

              {/* 官方域名 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-5 apple-shadow border border-apple-gray3 mb-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <HiGlobe className="w-5 h-5 text-apple-blue" />
                  <h4 className="font-bold text-apple-dark1">官方域名</h4>
                </div>
                <div className="space-y-2">
                  <a 
                    href="https://zyhorg.cn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-sm text-apple-blue hover:text-[#0077ED] font-semibold transition-colors"
                  >
                    → zyhorg.cn
                  </a>
                  <a 
                    href="https://zyhorg.ac.cn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-sm text-apple-blue hover:text-[#0077ED] font-semibold transition-colors"
                  >
                    → zyhorg.ac.cn
                  </a>
                </div>
              </motion.div>

              {/* Cloudflare 标识 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-5 border border-orange-200"
              >
                <div className="flex items-center gap-3">
                  <SiCloudflare className="w-10 h-10 text-[#F38020] flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <HiShieldCheck className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-bold text-apple-dark1">安全防护</span>
                    </div>
                    <p className="text-xs text-apple-gray4 leading-relaxed">
                      由 <strong className="text-[#F38020]">Cloudflare</strong> 提供全面安全防护、DDoS 防御与全球 CDN 加速服务
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 右侧导航链接 */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-10">
                {quickLinks.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h4 className="text-sm font-bold text-apple-dark1 mb-4 uppercase tracking-wider">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-sm text-apple-gray4 hover:text-apple-blue transition-colors duration-200 inline-flex items-center gap-1 group"
                          >
                            <span>{link.label}</span>
                            {link.href.startsWith('http') && (
                              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                ↗
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* 社交媒体链接 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="text-sm font-bold text-apple-dark1 mb-4 uppercase tracking-wider">
                  关注我
                </h4>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white hover:bg-apple-blue text-apple-dark1 hover:text-white rounded-full flex items-center justify-center apple-shadow hover:apple-shadow-lg transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-apple-gray3" />

        {/* 底部版权信息 */}
        <div className="container-apple py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-apple-gray4">
            {/* 左侧版权 */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="flex items-center gap-1">
                © 2022-{currentYear} 联合库 UNHub. All rights reserved.
              </p>
              <p className="flex items-center gap-1.5">
                Made with <HiHeart className="w-3.5 h-3.5 text-red-500 animate-pulse" /> by 杖雍皓 · 张永豪
              </p>
            </div>

            {/* 右侧法律链接 */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => openModal('privacy')}
                className="hover:text-apple-blue transition-colors cursor-pointer"
              >
                隐私政策
              </button>
              <span className="text-apple-gray3">•</span>
              <button 
                onClick={() => openModal('terms')}
                className="hover:text-apple-blue transition-colors cursor-pointer"
              >
                使用条款
              </button>
              <span className="text-apple-gray3">•</span>
              <button 
                onClick={() => openModal('sitemap')}
                className="hover:text-apple-blue transition-colors cursor-pointer"
              >
                网站地图
              </button>
            </div>
          </div>

          {/* 备案信息 */}
          <div className="mt-4 pt-4 border-t border-apple-gray3 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-apple-gray4">
            {/* ICP 备案 */}
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-apple-blue transition-colors"
            >
              <img 
                src={icpPath} 
                alt="ICP" 
                className="w-4 h-4"
              />
              <span>鄂ICP备2025151647号</span>
            </a>

            <span className="hidden sm:inline text-apple-gray3">|</span>

            {/* 公安备案 */}
            <a 
              href="http://www.beian.gov.cn/portal/registerSystemInfo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-apple-blue transition-colors"
            >
              <img 
                src={gaPath} 
                alt="公安备案" 
                className="w-4 h-4"
              />
              <span>鄂公网安备42011002025860号</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Modal 弹窗 */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title={modalContents.privacy.title}
        content={modalContents.privacy.content}
      />
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title={modalContents.terms.title}
        content={modalContents.terms.content}
      />
      <Modal
        isOpen={activeModal === 'sitemap'}
        onClose={closeModal}
        title={modalContents.sitemap.title}
        content={modalContents.sitemap.content}
      />
    </>
  );
};

export default Footer;