import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { partners } from '@/data/config';
import type { Partner } from '@/types';

const PartnersSection = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scroller = scrollerRef.current;
    const scrollerContent = scroller.querySelector('.scroller-content') as HTMLElement;
    
    if (!scrollerContent) return;

    // 复制内容以实现无缝循环
    const scrollerInner = Array.from(scrollerContent.children);
    scrollerInner.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerContent.appendChild(duplicatedItem);
    });

    // GSAP 无限滚动动画
    const totalWidth = scrollerContent.scrollWidth / 2;
    
    animationRef.current = gsap.to(scrollerContent, {
      x: -totalWidth,
      duration: 60,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // 鼠标悬停暂停
  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container-apple mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-sm lg:text-base font-bold text-apple-gray4 uppercase tracking-wider mb-3">
            合作伙伴
          </h2>
          <p className="text-3xl lg:text-4xl font-bold text-apple-dark1">
            跟懂行的人，玩真的。
          </p>
        </motion.div>
      </div>

      {/* Scrolling Logos */}
      <div
        ref={scrollerRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="scroller-content flex items-center gap-12 lg:gap-20">
          {partners.map((partner: Partner) => (
            <div
              key={partner.id}
              className="flex-shrink-0 w-32 lg:w-40 h-16 lg:h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${partner.name}&size=120&background=1d1d1f&color=fff&bold=true`;
                }}
              />
            </div>
          ))}
        </div>

        {/* Gradient Fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default PartnersSection;