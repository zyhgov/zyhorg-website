import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiCode } from 'react-icons/hi';
import { projects } from '@/data/config';
import type { Project } from '@/types';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '全部项目' },
    { id: 'commercial', label: '重要项目' },
    { id: 'opensource', label: '开源项目' },
    { id: 'personal', label: '个人作品' },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 lg:py-32 bg-apple-gray1" id="projects">
      <div className="container-apple">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm lg:text-base font-bold text-apple-gray4 uppercase tracking-wider mb-4">
            来点更硬的。
          </h2>
          <p className="text-4xl lg:text-5xl font-bold text-apple-dark1 mb-6">
            献丑了🤡 <br />
            一些项目作品
          </p>
          <p className="text-lg lg:text-xl text-apple-gray4 max-w-2xl mx-auto">
            看我闲着无聊的时候都搞过些什么东西
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-apple-dark1 text-white apple-shadow-lg scale-105'
                  : 'bg-white text-apple-dark1 hover:bg-apple-gray2 apple-shadow'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project: Project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96] 
              }}
              className="group bg-white rounded-3xl overflow-hidden apple-shadow hover:apple-shadow-lg transition-all duration-500 hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="relative h-48 lg:h-56 overflow-hidden bg-gradient-to-br from-apple-blue/20 to-apple-blue/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-apple-dark1">
                  {project.category === 'commercial' && '重要'}
                  {project.category === 'opensource' && '开源'}
                  {project.category === 'personal' && '个人'}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-apple-dark1 mb-3 group-hover:text-apple-blue transition-colors">
                  {project.title}
                </h3>

                <p className="text-apple-gray4 text-sm lg:text-base leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-apple-gray1 text-apple-gray4 rounded-lg text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-apple-blue text-white rounded-full font-semibold text-sm hover:bg-[#0077ED] transition-all duration-300 apple-shadow group/btn"
                    >
                      <span>查看项目</span>
                      <HiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  )}
                  
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-apple-gray1 hover:bg-apple-dark1 text-apple-dark1 hover:text-white rounded-full transition-all duration-300 apple-shadow group/github"
                      aria-label="GitHub Repository"
                    >
                      <HiCode className="w-5 h-5 group-hover/github:scale-110 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-apple-gray4 text-lg">暂无该分类的项目</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;