import type { SkillCategory, SkillRadarData } from '@/types';

// Apple 风格配色
export const appleColors = {
  blue: '#0071e3',
  darkGray: '#1d1d1f',
  mediumGray: '#86868b',
  lightGray: '#cccccc',
  ultraLight: '#f5f5f7',
  dark2: '#1b1b1c',
  dark3: '#323232',
};

// 技能雷达图数据
export const skillRadarData: SkillRadarData[] = [
  { category: '前端开发', value: 90 },
  { category: '后端开发', value: 80 },
  { category: '大数据技术', value: 93 },
  { category: '数据库', value: 88 },
  { category: '系统运维', value: 92 },
  { category: '数据分析', value: 82 },
];

// 详细技能分类数据
export const skillCategories: SkillCategory[] = [
  {
    name: '系统运维',
    color: appleColors.blue,
    skills: [
      { name: 'Linux', level: 95 },
      { name: 'CentOS', level: 92 },
      { name: 'Ubuntu', level: 85 },
      { name: 'Docker', level: 88 },
    ],
  },
  {
    name: '后端开发',
    color: '#34C759', // Apple Green
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Flask', level: 88 },
      { name: 'Django', level: 85 },
      { name: 'Node.js', level: 82 },
    ],
  },
  {
    name: '前端开发',
    color: '#FF9500', // Apple Orange
    skills: [
      { name: 'JavaScript', level: 92 },
      { name: 'TypeScript', level: 86 },
      { name: 'React', level: 90 },
      { name: 'Vue.js', level: 88 },
      { name: 'HTML/CSS', level: 93 },
    ],
  },
  {
    name: '大数据技术',
    color: '#AF52DE', // Apple Purple
    skills: [
      { name: 'Hadoop', level: 93 },
      { name: 'Spark', level: 95 },
      { name: 'Kafka', level: 90 },
      { name: 'Flink', level: 88 },
      { name: 'Hive', level: 92 },
      { name: 'HBase', level: 87 },
      { name: 'Hudi', level: 85 },
      { name: 'ClickHouse', level: 86 },
      { name: 'Flume', level: 84 },
      { name: 'Zookeeper', level: 89 },
    ],
  },
  {
    name: '数据库',
    color: '#FF2D55', // Apple Pink
    skills: [
      { name: 'MySQL', level: 92 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis', level: 80 },
    ],
  },
];

// 技能熟练度分布数据（用于饼图）
export const skillLevelDistribution = [
  { name: '精通 (90-100)', value: 12 },
  { name: '熟练 (80-89)', value: 15 },
  { name: '了解 (70-79)', value: 6 },
];