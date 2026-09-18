import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, FileText, ChevronLeft, ChevronRight, ArrowRight, Layers } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { projects } from '../data/projects';

const isVideoAsset = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  const filters = useMemo(() => [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'web', label: 'Web Development' },
    { id: 'fun', label: 'Fun Projects' }
  ], []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const nextImage = useCallback((projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [projectId]: ((prev[projectId] || 0) + 1) % project.images.length
      }));
    }
  }, [projects]);

  const prevImage = useCallback((projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [projectId]: prev[projectId] === 0 ? project.images.length - 1 : (prev[projectId] || 0) - 1
      }));
    }
  }, [projects]);

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      filteredProjects.forEach(project => {
        nextImage(project.id);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredProjects, nextImage]);

  return (
    <section id="projects" className="section-padding bg-gray-50 relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Main Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Here are my main professional projects that showcase my technical skills and experience. 
            Each project represents significant learning and development work.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Project Image Carousel */}
              <div className="relative overflow-hidden h-52 bg-black">
                {isVideoAsset(project.images[currentImageIndex[project.id] || 0]) ? (
                  <VideoPlayer
                    key={project.images[currentImageIndex[project.id] || 0]}
                    src={project.images[currentImageIndex[project.id] || 0]}
                    containerClassName="w-full h-full"
                    videoClassName="max-h-full"
                  />
                ) : (
                  <img
                    src={project.images[currentImageIndex[project.id] || 0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                )}
                
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage(project.id);
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage(project.id);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {project.images.map((_, imageIndex) => (
                    <button
                      key={imageIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev => ({
                          ...prev,
                          [project.id]: imageIndex
                        }));
                      }}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        (currentImageIndex[project.id] || 0) === imageIndex
                          ? 'bg-white'
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>


              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {project.title}
                  </h3>
                  {project.period && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                      {project.period}
                    </span>
                  )}
                </div>
                
                <ul className="text-gray-600 mb-4 text-sm leading-relaxed space-y-1.5">
                  {project.bullets.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="text-primary mt-0.5 flex-shrink-0" size={14} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs font-medium border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub, Demo, Writeup, and Case Study Links */}
                <div className="flex flex-wrap justify-center gap-3">
                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Github size={16} />
                      <span>View Code</span>
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <ExternalLink size={16} />
                        <span>Let's See</span>
                    </motion.a>
                  )}
                  {project.hasDetailPage && (
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center space-x-2 bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Layers size={16} />
                        <span>View Case Study</span>
                      </Link>
                    </motion.div>
                  )}
                  {project.writeup && (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.writeup}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-hot-pink text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <FileText size={16} />
                        <span>Technical Deep Dive</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Button */}
      {/* <ScrollButton targetId="interests" position="bottom-right" /> */}
    </section>
  );
};

export default Projects; 