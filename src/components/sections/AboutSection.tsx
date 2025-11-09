import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { personalInfo } from '@/data/config';
import type { Skill } from '@/types';

// 生成随机堆叠位置
const generateStackPosition = (index: number, total: number) => {
  const cols = 4;
  const rows = Math.ceil(total / cols);
  const col = index % cols;
  const row = Math.floor(index / rows);
  
  // 添加随机偏移，模拟自然堆叠
  const randomX = (Math.random() - 0.5) * 20;
  const randomY = (Math.random() - 0.5) * 10;
  const randomRotate = (Math.random() - 0.5) * 15;
  
  return {
    x: col * 25 + randomX,
    y: row * 25 + randomY,
    rotate: randomRotate,
  };
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated && skillsContainerRef.current) {
      const skillElements = skillsContainerRef.current.querySelectorAll('.skill-item');
      
      // 从上方掉落的动画
      gsap.fromTo(
        skillElements,
        {
          y: -800,
          x: () => gsap.utils.random(-100, 100),
          rotation: () => gsap.utils.random(-180, 180),
          opacity: 0,
          scale: 0.3,
        },
        {
          y: 0,
          x: 0,
          rotation: () => gsap.utils.random(-8, 8),
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'bounce.out',
          stagger: {
            amount: 0.8,
            from: 'random',
          },
          onComplete: () => {
            // 添加微小的漂浮动画
            gsap.to(skillElements, {
              y: '+=10',
              rotation: '+=3',
              duration: 2,
              ease: 'sine.inOut',
              stagger: {
                amount: 0.5,
                repeat: -1,
                yoyo: true,
              },
            });
          },
        }
      );
      
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-apple-gray1 relative"
      id="about"
    >
      <div className="container-apple">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="bg-white rounded-[2.5rem] apple-shadow-lg overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Avatar & Info */}
            <div className="p-10 lg:p-16 flex flex-col items-center lg:items-start text-center lg:text-left bg-gradient-to-br from-white via-apple-gray1/30 to-white">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative mb-8"
              >
                <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full overflow-hidden apple-shadow-lg ring-4 ring-white/50">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div 
                  className="absolute -bottom-3 -right-3 w-14 h-14 bg-apple-blue rounded-full flex items-center justify-center apple-shadow"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-white text-3xl">✌️</span>
                </motion.div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-3xl lg:text-4xl font-bold text-apple-dark1 mb-4"
              >
                {personalInfo.name}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg lg:text-xl text-apple-blue font-semibold mb-8"
              >
                {personalInfo.title}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-apple-gray4 text-base lg:text-lg leading-relaxed mb-10"
              >
                {personalInfo.bio}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-apple-gray4 text-base lg:text-lg leading-relaxed mb-10"
              >
                {personalInfo.bio2}
              </motion.p>
            </div>

            {/* Right Side - Skills Dropping Effect */}
            <div className="p-10 lg:p-16 bg-gradient-to-br from-apple-dark1 to-apple-dark3 relative overflow-hidden min-h-[500px]">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-12 relative z-10">
                技能专长
              </h3>
              
              {/* Skills Container */}
              <div
                ref={skillsContainerRef}
                className="relative h-[400px] lg:h-[450px]"
              >
                {personalInfo.skills.map((skill: Skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item absolute"
                    style={{
                      left: `${(index % 4) * 23}%`,
                      top: `${Math.floor(index / 4) * 30}%`,
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 0,
                      zIndex: 50,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 lg:p-6 flex flex-col items-center justify-center aspect-square hover:bg-white/25 transition-all duration-300 apple-shadow border border-white/10 cursor-pointer group">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-12 h-12 lg:w-14 lg:h-14 mb-3 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${skill.name}&size=64&background=0071e3&color=fff&bold=true`;
                        }}
                      />
                      <span className="text-white text-xs lg:text-sm font-bold text-center leading-tight">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-apple-blue/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
              
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-apple-dark1 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;