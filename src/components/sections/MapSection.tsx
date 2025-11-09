import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiLocationMarker, HiGlobeAlt, HiExternalLink } from 'react-icons/hi';

const MapSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 lg:py-32 bg-apple-gray1" 
      id="footprint"
    >
      <div className="container-apple">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm lg:text-base font-bold text-apple-gray4 uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
            <HiGlobeAlt className="w-5 h-5" />
            <span>My Footprint</span>
          </h2>
          <p className="text-4xl lg:text-5xl font-bold text-apple-dark1 mb-6">
            不积跬步，无以至千里 <br />
            我的行踪足迹
          </p>
          <p className="text-lg lg:text-xl text-apple-gray4 max-w-2xl mx-auto">
            行走，即是证明
          </p>
        </motion.div>

        {/* Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* 主卡片容器 */}
          <div className="bg-white rounded-3xl overflow-hidden apple-shadow-lg border border-apple-gray3">
            {/* Map Container */}
            <div className="relative w-full h-[500px] lg:h-[600px] xl:h-[700px] bg-apple-gray1">
              {/* Loading Overlay */}
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-apple-gray1 to-apple-gray2 flex items-center justify-center z-10">
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <HiLocationMarker className="w-12 h-12 text-apple-blue mx-auto mb-4" />
                    </motion.div>
                    <p className="text-apple-gray4 font-semibold">加载地图中...</p>
                  </div>
                </div>
              )}

              {/* Iframe */}
              <iframe
                src="https://map.zyhorg.cn/"
                title="我的足迹地图"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                allow="geolocation"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                onLoad={() => setIsMapLoaded(true)}
              />

              {/* 顶部装饰条 */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-apple-blue via-purple-500 to-pink-500 z-20" />
            </div>

            {/* Bottom Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-apple-gray1 to-white px-6 py-4 lg:px-8 lg:py-6 border-t border-apple-gray3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Left Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-apple-blue/10 rounded-full flex items-center justify-center">
                    <HiLocationMarker className="w-5 h-5 text-apple-blue" />
                  </div>
                  <div>
                    <p className="text-sm lg:text-base font-bold text-apple-dark1">
                      探索世界，记录生活
                    </p>
                    <p className="text-xs text-apple-gray4">
                      每一个标记都是一段故事
                    </p>
                  </div>
                </div>
                
                {/* Action Button */}
                <motion.a
                  href="https://map.zyhorg.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-apple-blue hover:bg-[#0077ED] text-white text-sm font-semibold rounded-full transition-all duration-300 apple-shadow group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiGlobeAlt className="w-4 h-4" />
                  <span>查看完整地图</span>
                  <HiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {[
            { label: '到访城市', value: '30+', icon: '🏙️', color: '#0071e3' },
            { label: '旅行国家', value: '5+', icon: '🌏', color: '#34C759' },
            { label: '行程公里', value: '50K+', icon: '🚀', color: '#FF9500' },
            { label: '精彩瞬间', value: '∞', icon: '📸', color: '#AF52DE' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-2xl p-5 lg:p-6 text-center apple-shadow hover:apple-shadow-lg transition-all duration-300 border border-apple-gray3 cursor-pointer"
            >
              <div className="text-3xl lg:text-4xl mb-3">{stat.icon}</div>
              <div 
                className="text-2xl lg:text-3xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs lg:text-sm text-apple-gray4 font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
};

export default MapSection;