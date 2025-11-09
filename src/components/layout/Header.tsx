import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown, HiExternalLink } from 'react-icons/hi';
import { navigationItems } from '@/data/config';
import type { NavItem } from '@/types';
import logo from '@/assets/logo.svg';
const logoPath = logo;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 关闭所有菜单
  const closeAllMenus = () => {
    setActiveMenu(null);
  };

  // 切换菜单
  const toggleMenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  // 判断是否应该显示背景（滚动或有菜单打开）
  const shouldShowBackground = isScrolled || activeMenu !== null || isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-apple ${
          shouldShowBackground
            ? 'glass-nav-active'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-apple">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeAllMenus}
            >
              <img
                src={logoPath}
                alt="UNHub Logo"
                className="h-10 w-10 lg:h-12 lg:w-12 drop-shadow-lg"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 relative z-10">
              {navigationItems.map((item: NavItem) => (
                <div key={item.label} className="relative">
                  {item.submenu ? (
                    // Has Submenu - Click to Toggle
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`flex items-center space-x-1 px-5 py-2.5 font-semibold text-sm transition-all duration-300 rounded-lg ${
                        activeMenu === item.label
                          ? 'bg-white/80 text-apple-blue'
                          : shouldShowBackground
                          ? 'text-apple-dark1 hover:bg-white/40'
                          : 'text-white hover:bg-white/20'
                      }`}
                    >
                      <span>{item.label}</span>
                      <HiChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeMenu === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    // Direct Link
                    <a
                      href={item.href}
                      className={`flex items-center space-x-1.5 px-5 py-2.5 font-semibold text-sm transition-all duration-300 rounded-lg ${
                        shouldShowBackground
                          ? 'text-apple-dark1 hover:text-apple-blue hover:bg-white/40'
                          : 'text-white hover:bg-white/20'
                      }`}
                      onClick={closeAllMenus}
                    >
                      <span>{item.label}</span>
                      <HiExternalLink className="w-3.5 h-3.5 opacity-50" />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors relative z-10 ${
                shouldShowBackground
                  ? 'text-apple-dark1 hover:bg-white/40'
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenuAlt3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* 导航栏底部边框 - 优化版本 */}
        {shouldShowBackground && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
          />
        )}
      </header>

      {/* Full Width Dropdown Menus */}
      <AnimatePresence>
        {activeMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={closeAllMenus}
            />

            {/* Dropdown Content */}
            {navigationItems.map((item: NavItem) => {
              if (item.label === activeMenu && item.submenu) {
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed left-0 right-0 z-40 glass-dropdown-active apple-shadow-lg"
                    style={{ top: shouldShowBackground && !isScrolled ? '80px' : isScrolled ? '64px' : '80px' }}
                  >
                    <div className="container-apple py-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {item.submenu.map((subItem, index) => (
                          <motion.a
                            key={subItem.title}
                            href={subItem.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            className="group block rounded-2xl p-6 transition-all duration-300 apple-shadow bg-white/90 hover:bg-white overflow-hidden"
                            onClick={closeAllMenus}
                          >
                            {/* Icon/Image */}
                            <div className="w-full h-48 lg:h-56 bg-gradient-to-br from-apple-blue/20 to-apple-blue/5 rounded-xl mb-4 overflow-hidden">
                              {subItem.image ? (
                                <img
                                  src={subItem.image}
                                  alt={subItem.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-5xl opacity-50">
                                    {index === 0 ? '👤' : index === 1 ? '⚡' : '💼'}
                                  </span>
                                </div>
                              )}
                            </div>

                            <h3 className="font-bold text-lg mb-2 group-hover:text-apple-blue transition-colors text-apple-dark1">
                              {subItem.title}
                            </h3>

                            {subItem.description && (
                              <p className="text-sm leading-relaxed text-apple-gray4">
                                {subItem.description}
                              </p>
                            )}

                            {/* Hover Arrow */}
                            <div className="mt-4 flex items-center text-apple-blue opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-sm font-semibold">查看详情</span>
                              <HiChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* 下拉菜单底部边框 */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  </motion.div>
                );
              }
              return null;
            })}
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden glass-dropdown-active apple-shadow-lg"
          >
            <div className="container-apple py-4">
              {navigationItems.map((item: NavItem) => (
                <div key={item.label} className="border-b border-apple-gray3 last:border-0">
                  <a
                    href={item.href}
                    className="flex items-center justify-between px-4 py-4 font-semibold transition-colors rounded-lg text-apple-dark1 hover:bg-white/60"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    {!item.submenu && <HiExternalLink className="w-4 h-4 opacity-50" />}
                  </a>
                  {item.submenu && (
                    <div className="bg-apple-gray1 px-4 pb-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.href}
                          className="block py-3 px-4 text-sm transition-colors rounded-lg text-apple-gray4 hover:text-apple-blue hover:bg-white/40"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 移动菜单底部边框 */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;