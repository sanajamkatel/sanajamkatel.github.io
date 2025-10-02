import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, ChevronLeft, ChevronRight } from 'lucide-react';


const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  const projects = useMemo(() => [
    {
      id: 1,
      title: 'Medical Recommendation System',
      description: 'Developed a healthcare-focused system predicting diseases based on symptoms using ML models that predicts diseases based on symptoms and suggests treatments using machine learning models such as SVC, Random Forest, and Gradient Boosting. Built and deployed RESTful APIs with Flask for backend processing and designed a responsive web interface and AI-powered symptom matching and Google Search API to fetch up-to-date treatment suggestions.',
      images: [
        process.env.PUBLIC_URL + '/projects/ML/careconnect%20cover.png',
        process.env.PUBLIC_URL + '/projects/ML/careconnect-1st.png',
        process.env.PUBLIC_URL + '/projects/ML/careconnect1st.png',
        process.env.PUBLIC_URL + '/projects/ML/careconnect%20cover1.png'
      ],
      technologies: ['Python', 'Machine Learning', 'Flask', 'SVC', 'Random Forest', 'Gradient Boosting', 'Google Search API', 'RESTful APIs'],
      category: 'ai',
      github: 'https://github.com/sanajamkatel/End-to-End-Medical-Recommendation-System',
      featured: true,
      period: 'Jan 2025 - Feb 2025'
    },
    {
      id: 2,
      title: 'Twitter Clone',
      description: 'Developed a full-stack Twitter clone designed for good user experience that supports user authentication, tweet posting, and social interactions like following/unfollowing, using technologies such as React, Vite, Node.js, Express.js, MongoDB, and Cloudinary. Designed and implemented RESTful APIs for secure user authentication, profile management, and data storage, utilizing JWT for token-based authentication, bcrypt for password encryption, and custom middleware for efficient routing.',
      images: [
        process.env.PUBLIC_URL + '/projects/twitter/cover.png',
        process.env.PUBLIC_URL + '/projects/twitter/dashboard.png',
        process.env.PUBLIC_URL + '/projects/twitter/posts.png'
      ],
      technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'JWT', 'bcrypt', 'RESTful APIs'],
      category: 'web',
      github: 'https://github.com/sanajamkatel/twitter-clone',
      featured: true,
      period: 'May 2024 - Dec 2024'
    }
  ], []);

  const filters = useMemo(() => [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'game', label: 'Games' },
    { id: 'data', label: 'Data Science' }
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
              <div className="relative overflow-hidden h-52">
                <img
                  src={project.images[currentImageIndex[project.id] || 0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                
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
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

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

                {/* GitHub Link */}
                <div className="flex justify-center">
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Github size={16} />
                    <span>View Code</span>
                  </motion.a>
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