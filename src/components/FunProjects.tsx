import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const FunProjects: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  const funProjects = useMemo(() => [
    {
      id: 1,
      title: 'Tic-Tac-Toe Game',
      description: 'Developed two implementations of Tic-Tac-Toe showcasing different programming paradigms: a C++ console version with object-oriented design and a C++ web server with HTML frontend. The console version features 2D array board representation, input validation, and comprehensive win detection. The web server version includes a C++ backend with HTTP API endpoints, HTML/CSS/JS frontend with glass-morphism design, floating animations, score tracking, and mobile responsive design.',
      images: [
        process.env.PUBLIC_URL + '/ttt/1.png'
      ],
      technologies: ['C++', 'HTML', 'CSS', 'JavaScript', 'RESTful API', 'Object-Oriented Programming', 'Makefile', 'cpp-httplib'],
      github: 'https://github.com/sanajamkatel/TicTacToe-CPP',
      demo: 'https://tictactoe-cpp.onrender.com/',
      period: 'Aug 2025'
    }
  ], []);

  const nextImage = useCallback((projectId: number) => {
    const project = funProjects.find(p => p.id === projectId);
    if (project) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [projectId]: ((prev[projectId] || 0) + 1) % project.images.length
      }));
    }
  }, [funProjects]);

  const prevImage = useCallback((projectId: number) => {
    const project = funProjects.find(p => p.id === projectId);
    if (project) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [projectId]: prev[projectId] === 0 ? project.images.length - 1 : (prev[projectId] || 0) - 1
      }));
    }
  }, [funProjects]);

  return (
    <div className="min-h-screen flex flex-col">
      <section className="section-padding bg-gradient-to-br from-baby-pink to-white relative flex-grow">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Sparkles className="text-hot-pink" size={40} />
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800">
                  Fun Projects
                </h1>
                <Sparkles className="text-hot-pink" size={40} />
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-hot-pink to-primary mx-auto mb-8"></div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Creative and interactive projects that showcase my passion for building fun applications!
              </p>
            </motion.div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {funProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  {project.images.length > 1 && (
                    <>
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
                    </>
                  )}
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
                        className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium border border-pink-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* GitHub and Demo Links */}
                  <div className="flex justify-center gap-3">
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-hot-pink to-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-hot-pink/90 hover:to-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Github size={16} />
                      <span>View Code</span>
                    </motion.a>
                    {project.demo && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink size={16} />
                        <span>Let's Play</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-12 text-center"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-hot-pink to-primary text-white px-8 py-4 rounded-full font-medium hover:from-hot-pink/90 hover:to-primary/90 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl mx-auto"
              >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FunProjects; 