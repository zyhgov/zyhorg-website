import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiPause } from 'react-icons/hi';
import { carouselSlides } from '@/data/config';
import type { CarouselSlide, CarouselButton } from '@/types';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const SLIDE_DURATION = 5000;

  // 预加载图片
  useEffect(() => {
    carouselSlides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setImagesLoaded((prev) => new Set([...prev, index]));
      };
    });
  }, []);

  // 清除所有定时器
  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  // 启动自动播放
  const startAutoPlay = () => {
    clearTimers();
    setProgress(0);
    const startTime = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / SLIDE_DURATION) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        clearTimers();
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      } else {
        setProgress(newProgress);
      }
    }, 16);
  };

  // 监听播放状态
  useEffect(() => {
    if (isPlaying) {
      startAutoPlay();
    } else {
      clearTimers();
    }

    return () => clearTimers();
  }, [isPlaying, currentSlide]);

  // 切换到指定幻灯片
  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setProgress(0);
  };

  const currentSlideData: CarouselSlide = carouselSlides[currentSlide];

  // 优化后的滑动动画
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  // 渲染按钮
  const renderButton = (button: CarouselButton, index: number) => {
    const buttonProps = button.external
      ? {
          href: button.href,
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {
          href: button.href,
        };

    if (button.type === 'primary') {
      return (
        <motion.a
          key={index}
          {...buttonProps}
          className="inline-flex items-center justify-center gap-2 bg-white text-apple-dark1 px-6 py-3 lg:px-8 lg:py-4 rounded-full font-semibold text-sm lg:text-base hover:bg-apple-gray1 transition-all duration-300 apple-shadow-lg group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{button.text}</span>
        </motion.a>
      );
    } else {
      return (
        <motion.a
          key={index}
          {...buttonProps}
          className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-semibold text-sm lg:text-base hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{button.text}</span>
        </motion.a>
      );
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-apple-dark1" id="home">
      {/* Background Images with smooth transition */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { 
                type: 'tween',
                duration: 0.7,
                ease: [0.32, 0.72, 0, 1] // Apple 的缓动曲线
              },
              opacity: { duration: 0.5 },
              scale: { duration: 0.7 }
            }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              {/* 图片 */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${currentSlideData.image})`,
                  willChange: 'transform',
                }}
              >
                {/* 加载状态 */}
                {!imagesLoaded.has(currentSlide) && (
                  <div className="absolute inset-0 bg-apple-dark1 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* 渐变遮罩 - 从深到浅 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 container-apple h-full flex flex-col justify-center items-start text-white px-4 sm:px-6 pt-20 pb-32 lg:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="max-w-4xl w-full"
          >
            {/* Subtitle */}
            <motion.p
              className="text-apple-gray3 text-xs sm:text-sm lg:text-base font-bold mb-4 lg:mb-6 tracking-[0.2em] lg:tracking-[0.3em] uppercase"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {currentSlideData.subtitle}
            </motion.p>

            {/* Title */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              {currentSlideData.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base lg:text-xl xl:text-2xl text-apple-gray1 font-medium max-w-2xl leading-relaxed mb-6 lg:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              {currentSlideData.description}
            </motion.p>

            {/* Buttons */}
            {currentSlideData.buttons && currentSlideData.buttons.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-3 lg:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {currentSlideData.buttons.map((button, index) => renderButton(button, index))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls - 移动端在底部，桌面端在右侧 */}
      <div className="absolute bottom-6 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-6 lg:left-auto z-20">
        {/* 移动端布局 */}
        <div className="lg:hidden flex items-center justify-center gap-6 px-4">
          {/* Progress Indicators - 移动端 */}
          <div className="flex items-center space-x-3">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className="relative group"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide ? (
                  // Active - Progress Ring
                  <div className="relative w-10 h-10">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray={`${2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                  </div>
                ) : (
                  // Inactive - Small Dot
                  <div className="w-10 h-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/60 group-hover:scale-125 transition-all duration-300" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Play/Pause Button - 移动端 */}
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 flex items-center justify-center apple-shadow"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <HiPause className="w-5 h-5 text-white" />
            ) : (
              <HiPlay className="w-5 h-5 text-white ml-0.5" />
            )}
          </motion.button>
        </div>

        {/* 桌面端布局 */}
        <div className="hidden lg:flex flex-col items-center space-y-4">
          {/* Play/Pause Button - 桌面端 */}
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 flex items-center justify-center apple-shadow"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <HiPause className="w-6 h-6 text-white" />
            ) : (
              <HiPlay className="w-6 h-6 text-white ml-0.5" />
            )}
          </motion.button>

          {/* Progress Indicators - 桌面端 */}
          <div className="flex flex-col space-y-3">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className="relative group"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide ? (
                  // Active - Progress Ring
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray={`${2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                  </div>
                ) : (
                  // Inactive - Small Dot
                  <div className="w-12 h-12 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/60 group-hover:scale-125 transition-all duration-300" />
                  </div>
                )}

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-white whitespace-nowrap bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg pointer-events-none">
                  {slide.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 优化的渐变过渡 - 更丝滑的渐变到 #f5f5f7 */}
      <div className="absolute bottom-0 left-0 right-0 h-64 z-20 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            background: `linear-gradient(
              to bottom, 
              rgba(29, 29, 31, 0) 0%,
              rgba(29, 29, 31, 0.03) 15%,
              rgba(245, 245, 247, 0.1) 30%,
              rgba(245, 245, 247, 0.3) 45%,
              rgba(245, 245, 247, 0.5) 60%,
              rgba(245, 245, 247, 0.7) 75%,
              rgba(245, 245, 247, 0.9) 90%,
              rgba(245, 245, 247, 1) 100%
            )`,
          }}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;