import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import gsap from 'gsap';
import { HiChevronDown, HiCheckCircle } from 'react-icons/hi';
import { skillRadarData, skillCategories, skillLevelDistribution, appleColors } from '@/data/skillsData';
import type { SkillCategory, ExtendedSkillItem } from '@/types';

const SkillsVisualization = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const skillCardsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 所有类别选项
  const categoryOptions = [
    { id: 'all', label: '全部技能' },
    ...skillCategories.map(cat => ({ id: cat.name, label: cat.name })),
  ];

  // 获取当前选中类别的数据
  const getCurrentSkills = (): ExtendedSkillItem[] => {
    if (selectedCategory === 'all') {
      return skillCategories.flatMap(cat => 
        cat.skills.map(skill => ({ 
          ...skill, 
          category: cat.name, 
          color: cat.color 
        }))
      );
    }
    const category = skillCategories.find(cat => cat.name === selectedCategory);
    return category ? category.skills.map(skill => ({ 
      ...skill, 
      category: category.name, 
      color: category.color 
    })) : [];
  };

  const currentSkills = getCurrentSkills();

  // 条形图动画
  useEffect(() => {
    if (!isInView || selectedCategory === 'all') return;

    const timer = setTimeout(() => {
      if (skillsContainerRef.current) {
        const skillBars = skillsContainerRef.current.querySelectorAll('.skill-bar-fill');
        
        if (skillBars.length > 0) {
          gsap.killTweensOf(skillBars);
          
          gsap.fromTo(
            skillBars,
            {
              scaleX: 0,
              opacity: 0,
            },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.05,
              ease: 'power3.out',
              transformOrigin: 'left center',
            }
          );
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory, isInView]);

  // 卡片网格动画（全部技能时）
  useEffect(() => {
    if (!isInView || selectedCategory !== 'all') return;

    const timer = setTimeout(() => {
      if (skillCardsRef.current) {
        const cards = skillCardsRef.current.querySelectorAll('.skill-card');
        
        if (cards.length > 0) {
          gsap.killTweensOf(cards);
          
          gsap.fromTo(
            cards,
            {
              scale: 0.8,
              opacity: 0,
              y: 20,
            },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.03,
              ease: 'back.out(1.2)',
            }
          );
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory, isInView]);

  // 环形进度图
  const polarBarOption: EChartsOption = {
    backgroundColor: 'transparent',
    polar: {
      radius: ['30%', '80%'],
    },
    angleAxis: {
      max: 100,
      startAngle: 90,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    radiusAxis: {
      type: 'category',
      data: skillRadarData.map(item => item.category),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        fontWeight: 600,
        color: appleColors.darkGray,
        fontFamily: '"OpenAI Sans", -apple-system, sans-serif',
      },
    },
    series: [
      {
        type: 'bar',
        data: skillRadarData.map((item) => ({
          value: item.value,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: appleColors.blue + '40' },
                { offset: 1, color: appleColors.blue },
              ],
            } as any,
            borderRadius: [0, 20, 20, 0],
          },
        })),
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 20,
        label: {
          show: true,
          position: 'middle',
          formatter: '{c}%',
          fontSize: 11,
          fontWeight: 700,
          color: '#fff',
          fontFamily: '"OpenAI Sans", -apple-system, sans-serif',
        },
      },
    ],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: appleColors.lightGray,
      borderWidth: 1,
      textStyle: {
        color: appleColors.darkGray,
        fontSize: 13,
        fontFamily: '"OpenAI Sans", -apple-system, sans-serif',
      },
      padding: 12,
      extraCssText: 'border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);',
    },
  };

  // 饼图
  const pieOption: EChartsOption = {
    backgroundColor: 'transparent',
    series: [
      {
        name: '技能分布',
        type: 'pie',
        radius: ['50%', '75%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 3,
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{d}%',
          fontSize: 13,
          fontWeight: 600,
          color: appleColors.darkGray,
          fontFamily: '"OpenAI Sans", -apple-system, sans-serif',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 700,
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
        data: skillLevelDistribution.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: [appleColors.blue, '#34C759', appleColors.mediumGray][index],
          },
        })),
      },
    ],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: appleColors.lightGray,
      borderWidth: 1,
      textStyle: {
        color: appleColors.darkGray,
        fontSize: 13,
        fontFamily: '"OpenAI Sans", -apple-system, sans-serif',
      },
      padding: 12,
      extraCssText: 'border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);',
    },
  };

  // 圆形进度组件
  const CircularProgress = ({ percentage, color, size = 80 }: { percentage: number; color: string; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* 背景圆 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#eeeeee"
            strokeWidth="4"
          />
          {/* 进度圆 */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          />
        </svg>
        {/* 中心文字 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color }}>
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white" id="skills-visualization">
      <div className="container-apple">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm lg:text-base font-bold text-apple-gray4 uppercase tracking-wider mb-4">
            Skills & Expertise
          </h2>
          <p className="text-4xl lg:text-5xl font-bold text-apple-dark1 mb-6">
            新新技术不断发展 <br /> 学习不断学习
          </p>
          <p className="text-lg lg:text-xl text-apple-gray4 max-w-2xl mx-auto">
            大数据技术专业背景，全栈开发能力，涵盖系统运维、数据工程和应用开发
          </p>
        </motion.div>

        {/* 环形图 + 饼图 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 环形进度图 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-apple-gray1 rounded-3xl p-8 lg:p-10 apple-shadow"
          >
            <h3 className="text-2xl font-bold text-apple-dark1 mb-6">技术领域能力</h3>
            <ReactECharts
              option={polarBarOption}
              style={{ height: '400px' }}
              opts={{ renderer: 'svg' }}
            />
          </motion.div>

          {/* 饼图 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-apple-gray1 rounded-3xl p-8 lg:p-10 apple-shadow"
          >
            <h3 className="text-2xl font-bold text-apple-dark1 mb-6">技能熟练度分布</h3>
            <ReactECharts
              option={pieOption}
              style={{ height: '400px' }}
              opts={{ renderer: 'svg' }}
            />
            <div className="mt-6 space-y-2 text-sm text-apple-gray4">
              <p>• 精通：能够独立设计和实现复杂系统</p>
              <p>• 熟练：能够高效完成开发任务</p>
              <p>• 了解：具备基础使用能力</p>
            </div>
          </motion.div>
        </div>

        {/* 统一的技能展示容器 */}
        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-apple-gray1 to-white rounded-3xl p-8 lg:p-12 apple-shadow-lg border border-apple-gray3"
        >
          {/* 顶部：标题 + 下拉选择器 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-apple-dark1 mb-4 sm:mb-0">
              技术栈发布
            </h3>

            {/* 自定义下拉选择器 */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between min-w-[200px] px-5 py-3 bg-white hover:bg-apple-gray1 text-apple-dark1 font-semibold text-sm rounded-full apple-shadow transition-all duration-300 border border-apple-gray3"
              >
                <span>{categoryOptions.find(cat => cat.id === selectedCategory)?.label}</span>
                <HiChevronDown
                  className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* 下拉菜单 */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-full min-w-[200px] bg-white rounded-2xl apple-shadow-lg overflow-hidden z-20 border border-apple-gray3"
                    >
                      {categoryOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSelectedCategory(option.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-5 py-3 text-left text-sm font-semibold transition-colors duration-200 ${
                            selectedCategory === option.id
                              ? 'bg-apple-blue text-white'
                              : 'text-apple-dark1 hover:bg-apple-gray1'
                          }`}
                        >
                          <span>{option.label}</span>
                          {selectedCategory === option.id && (
                            <HiCheckCircle className="w-5 h-5" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 技能展示内容 */}
          <AnimatePresence mode="wait">
            {selectedCategory === 'all' ? (
              // 全部技能 - 网格卡片布局
              <motion.div
                key="all-skills-grid"
                ref={skillCardsRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {currentSkills.map((skill, index) => (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    className="skill-card group"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center apple-shadow hover:apple-shadow-lg transition-all duration-300 border border-apple-gray3 h-full min-h-[140px]">
                      {/* 圆形进度 */}
                      <CircularProgress 
                        percentage={skill.level} 
                        color={skill.color}
                        size={70}
                      />
                      
                      {/* 技能名称 */}
                      <h4 className="text-sm font-bold text-apple-dark1 mt-3 mb-1">
                        {skill.name}
                      </h4>
                      
                      {/* 分类标签 */}
                      <span 
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: skill.color + '15',
                          color: skill.color,
                        }}
                      >
                        {skill.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // 具体分类 - 条形图布局
              <motion.div
                key={`category-${selectedCategory}`}
                ref={skillsContainerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {currentSkills.length > 0 ? (
                  currentSkills.map((skill, index) => (
                    <div
                      key={`${skill.name}-${index}`}
                      className="group"
                    >
                      {/* 技能名称和百分比 */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base lg:text-lg font-bold text-apple-dark1">
                          {skill.name}
                        </span>
                        <span className="text-sm font-bold text-apple-gray4">
                          {skill.level}%
                        </span>
                      </div>

                      {/* 进度条容器 */}
                      <div className="relative h-3 bg-apple-gray2 rounded-full overflow-hidden">
                        {/* 进度条 */}
                        <div
                          className="skill-bar-fill absolute inset-y-0 left-0 h-full rounded-full transition-all duration-300 group-hover:shadow-lg"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${skill.color}80 0%, ${skill.color} 100%)`,
                          }}
                        />

                        {/* 高亮效果 */}
                        <div
                          className="absolute inset-y-0 left-0 h-full rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 shimmer-effect pointer-events-none"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, transparent 0%, ${skill.color} 50%, transparent 100%)`,
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-apple-gray4">
                    暂无技能数据
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 技能统计 */}
          {currentSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 pt-8 border-t border-apple-gray3 grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-apple-blue">
                  {currentSkills.length}
                </div>
                <div className="text-xs lg:text-sm text-apple-gray4 font-semibold mt-1">
                  技能总数
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-apple-blue">
                  {currentSkills.filter(s => s.level >= 90).length}
                </div>
                <div className="text-xs lg:text-sm text-apple-gray4 font-semibold mt-1">
                  精通技能
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-apple-blue">
                  {Math.max(...currentSkills.map(s => s.level))}%
                </div>
                <div className="text-xs lg:text-sm text-apple-gray4 font-semibold mt-1">
                  最高熟练度
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-apple-blue">
                  {Math.round(currentSkills.reduce((sum, s) => sum + s.level, 0) / currentSkills.length)}%
                </div>
                <div className="text-xs lg:text-sm text-apple-gray4 font-semibold mt-1">
                  平均熟练度
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsVisualization;