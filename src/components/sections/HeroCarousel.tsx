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
  const [videosLoaded, setVideosLoaded] = useState<Set<number>>(new Set());
  const [videoDurations, setVideoDurations] = useState<Map<number, number>>(new Map());
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const DEFAULT_IMAGE_DURATION = 5000; // 图片默认显示 5 秒

  // 获取当前幻灯片的显示时长
  const getCurrentSlideDuration = (): number => {
    const slide = carouselSlides[currentSlide];
    
    // 1. 优先使用配置中的自定义时长
    if (slide.duration) {
      return slide.duration;
    }
    
    // 2. 如果是视频且已获取到视频时长
    if (slide.mediaType === 'video') {
      const videoDuration = videoDurations.get(currentSlide);
      if (videoDuration) {
        return videoDuration * 1000; // 转换为毫秒
      }
      // 视频时长未获取到，使用默认值（等待加载）
      return DEFAULT_IMAGE_DURATION;
    }
    
    // 3. 图片使用默认时长
    return DEFAULT_IMAGE_DURATION;
  };

  // 预加载媒体资源
  useEffect(() => {
    carouselSlides.forEach((slide, index) => {
      if (slide.mediaType === 'video') {
        // 视频会通过 video 元素自动加载
        return;
      } else {
        // 预加载图片
        const img = new Image();
        img.src = slide.image;
        img.onload = () => {
          setImagesLoaded((prev) => new Set([...prev, index]));
        };
      }
    });
  }, []);

  // 视频加载完成处理
  const handleVideoLoaded = (index: number, video: HTMLVideoElement) => {
    setVideosLoaded((prev) => new Set([...prev, index]));
    
    // 获取视频时长
    if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
      setVideoDurations((prev) => new Map(prev).set(index, video.duration));
    }
  };

  // 控制视频播放
  useEffect(() => {
    const currentSlideData = carouselSlides[currentSlide];
    
    // 暂停所有视频
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });

    // 播放当前视频
    if (currentSlideData.mediaType === 'video') {
      const currentVideo = videoRefs.current[currentSlide];
      if (currentVideo) {
        currentVideo.currentTime = 0;
        currentVideo.play().catch((err) => {
          console.log('Video autoplay failed:', err);
        });
      }
    }
  }, [currentSlide]);

  // 清除动画帧
  const clearAnimation = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // 启动自动播放（使用 RAF 实现丝滑进度）
  const startAutoPlay = () => {
    clearAnimation();
    startTimeRef.current = performance.now();
    setProgress(0);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const slideDuration = getCurrentSlideDuration(); // 动态获取当前幻灯片时长
      const newProgress = Math.min((elapsed / slideDuration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        // 进度完成，切换到下一张
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      } else {
        // 继续动画
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // 监听播放状态和幻灯片变化
  useEffect(() => {
    if (isPlaying) {
      startAutoPlay();
    } else {
      clearAnimation();
      // 暂停时也暂停视频
      videoRefs.current.forEach((video) => {
        if (video) video.pause();
      });
    }

    return () => clearAnimation();
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
          className="inline-flex items-center justify-center gap-2 bg-white text-apple-dark1 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full font-semibold text-xs sm:text-sm lg:text-base hover:bg-apple-gray1 transition-all duration-300 apple-shadow-lg group whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="truncate">{button.text}</span>
        </motion.a>
      );
    } else {
      return (
        <motion.a
          key={index}
          {...buttonProps}
          className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full font-semibold text-xs sm:text-sm lg:text-base hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="truncate">{button.text}</span>
        </motion.a>
      );
    }
  };

  // 渲染进度指示器（支持深色和浅色主题）
  const renderProgressIndicator = (slide: CarouselSlide, index: number, isMobile = false) => {
    const size = isMobile ? 32 : 48; // 移动端更小
    const center = size / 2;
    const radius = isMobile ? 13 : 19; // 移动端更小
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    // 移动端使用深色主题，桌面端使用浅色主题
    const strokeColor = isMobile ? 'rgba(29, 29, 31, 1)' : 'white';
    const strokeBgColor = isMobile ? 'rgba(29, 29, 31, 0.3)' : 'rgba(255,255,255,0.3)';
    const dotColor = isMobile ? 'bg-apple-dark1' : 'bg-white';
    const dotInactiveColor = isMobile ? 'bg-apple-dark1/40' : 'bg-white/40';
    const dotHoverColor = isMobile ? 'group-hover:bg-apple-dark1/60' : 'group-hover:bg-white/60';

    return (
      <button
        key={slide.id}
        onClick={() => goToSlide(index)}
        className="relative group flex-shrink-0"
        aria-label={`Go to slide ${index + 1}`}
      >
        {index === currentSlide ? (
          // Active - Progress Ring
          <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full -rotate-90" width={size} height={size}>
              {/* 背景圆圈 */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={strokeBgColor}
                strokeWidth="2"
              />
              {/* 进度圆圈 */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            {/* 中心点 */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 ${dotColor} rounded-full`} />
          </div>
        ) : (
          // Inactive - Small Dot
          <div style={{ width: size, height: size }} className="flex items-center justify-center">
            <div className={`w-1.5 h-1.5 ${dotInactiveColor} rounded-full ${dotHoverColor} group-hover:scale-125 transition-all duration-300`} />
          </div>
        )}

        {/* Tooltip - 仅桌面端 */}
        {!isMobile && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-white whitespace-nowrap bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg pointer-events-none">
            {slide.subtitle}
          </div>
        )}
      </button>
    );
  };

  // 渲染媒体背景（图片或视频）
  const renderMediaBackground = (slide: CarouselSlide, index: number) => {
    const isVideo = slide.mediaType === 'video';
    const isLoaded = isVideo ? videosLoaded.has(index) : imagesLoaded.has(index);

    return (
      <div className="relative w-full h-full">
        {isVideo ? (
          // 视频背景
          <>
            <video
              ref={(el) => { videoRefs.current[index] = el; }}
              className="absolute inset-0 w-full h-full object-cover"
              src={slide.image}
              muted
              loop={false}
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => handleVideoLoaded(index, e.currentTarget)}
            />
            {/* 加载状态 */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-apple-dark1 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </>
        ) : (
          // 图片背景
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                willChange: 'transform',
              }}
            >
              {/* 加载状态 */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-apple-dark1 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>
          </>
        )}

        {/* 渐变遮罩 - 从深到浅 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
      </div>
    );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-apple-dark1" id="home">
      {/* Background Images/Videos with smooth transition */}
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
            {renderMediaBackground(currentSlideData, currentSlide)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-white px-4 sm:px-6 lg:px-8 pt-20 pb-32 lg:pb-20 max-w-7xl mx-auto w-full">
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
              className="text-apple-gray3 text-xs sm:text-sm lg:text-base font-bold mb-3 sm:mb-4 lg:mb-6 tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.3em] uppercase break-words"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {currentSlideData.subtitle}
            </motion.p>

            {/* Title */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-8 leading-[1.1] break-words"
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
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-apple-gray1 font-medium max-w-full lg:max-w-2xl leading-relaxed mb-4 sm:mb-6 lg:mb-10 break-words"
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
                className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4"
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
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-4 xl:right-6 lg:left-auto z-20">
        {/* 移动端布局 - 深色主题 */}
        <div className="lg:hidden flex items-center justify-center gap-3 sm:gap-4 px-3 sm:px-4">
          {/* Progress Indicators - 移动端 */}
          <div className="flex items-center gap-2">
            {carouselSlides.map((slide, index) => renderProgressIndicator(slide, index, true))}
          </div>

          {/* Play/Pause Button - 移动端（深色主题）*/}
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-apple-dark1/80 backdrop-blur-md hover:bg-apple-dark1 transition-all duration-300 flex items-center justify-center shadow-lg border border-apple-dark1/20 flex-shrink-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <HiPause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <HiPlay className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
            )}
          </motion.button>
        </div>

        {/* 桌面端布局 - 浅色主题 */}
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
            {carouselSlides.map((slide, index) => renderProgressIndicator(slide, index, false))}
          </div>
        </div>
      </div>

      {/* 优化的渐变过渡 - 响应式高度 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 lg:h-64 xl:h-80 z-20 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(29, 29, 31, 0) 0%,
              rgba(50, 50, 52, 0.008) 5%,
              rgba(70, 70, 75, 0.018) 10%,
              rgba(95, 95, 100, 0.032) 15%,
              rgba(120, 120, 125, 0.055) 20%,
              rgba(145, 145, 150, 0.085) 25%,
              rgba(170, 170, 175, 0.125) 30%,
              rgba(190, 190, 195, 0.175) 35%,
              rgba(208, 208, 213, 0.235) 40%,
              rgba(220, 220, 225, 0.305) 45%,
              rgba(230, 230, 235, 0.385) 50%,
              rgba(236, 236, 240, 0.475) 55%,
              rgba(240, 240, 243, 0.57) 60%,
              rgba(242, 242, 245, 0.665) 65%,
              rgba(243, 243, 246, 0.755) 70%,
              rgba(244, 244, 246, 0.835) 75%,
              rgba(244, 244, 247, 0.9) 80%,
              rgba(245, 245, 247, 0.945) 85%,
              rgba(245, 245, 247, 0.975) 90%,
              rgba(245, 245, 247, 0.99) 95%,
              rgb(245, 245, 247) 100%
            )`,
          }}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;