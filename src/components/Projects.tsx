import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

type ProjectEntry = {
  id: number;
  title: string;
  bullets: string[];
  images: string[];
  technologies: string[];
  category: string;
  github?: string;
  featured: boolean;
  period: string;
  demo?: string;
  writeup?: string;
};

const isVideoAsset = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  const projects = useMemo<ProjectEntry[]>(() => [
    {
      id: 6,
      title: 'skAi | AI Ops Assistant (Admin Chatbot)',
      bullets: [
        'Built a Claude-powered chat assistant embedded in the Aeropay Admin Portal that lets ops perform account actions — lookups, phone updates, VIP/reputation changes, fraud lockdowns — via plain-English requests instead of multi-page forms.',
        'Designed a two-gate authorization system: a hardcoded high-risk keyword check runs before classification and a second check runs after, so a write action never executes unless both the raw message and Claude\'s resolved action agree it\'s safe.',
        'Orchestrated a 4-step fraud lockdown state machine (block reputation → void pending transactions → remove bank accounts → disable bank linking) with a live progress card and mid-run cancellation.',
        'Every write action stamps an audit trail and fires a Slack notification; the widget fails closed via a dev-only environment gate so it never renders outside local/dev.'
      ],
      images: [
        process.env.PUBLIC_URL + '/skai/chatbot-conversation.png',
        process.env.PUBLIC_URL + '/skai/lockdown.png',
        process.env.PUBLIC_URL + '/skai/declined-history.png',
        process.env.PUBLIC_URL + '/skai/update-phone.png',
        process.env.PUBLIC_URL + '/skai/slack-alert.png',
        process.env.PUBLIC_URL + '/skai/live-demo.mov'
      ],
      technologies: ['Claude API', 'Python', 'Flask', 'React', 'REST APIs', 'Slack API', 'AWS'],
      category: 'ai',
      writeup: process.env.PUBLIC_URL + '/skai/skai-briefing.html',
      featured: true,
      period: 'Summer 2026'
    },
    {
      id: 5,
      title: 'Care Equity | Full-Stack Healthcare Bias Tracker',
      bullets: [
        'Code2040 Hackathon — Engineered a full-stack Next.js and Node.js application to surface maternal healthcare inequities.',
        'Built responsive hospital discovery tool, interactive data visualizations (Recharts), and anonymous reporting system.',
        'Designed REST API with Express and MongoDB; implemented same-origin API proxy for cross-browser and mobile compatibility.',
        'Deployed on Vercel (Frontend) and Render (Backend) with environment-based routing and keep-awake strategies for high availability.'
      ],
      images: [
        `${process.env.PUBLIC_URL || ''}/care-equity/1.png`,
        `${process.env.PUBLIC_URL || ''}/care-equity/2.png`,
        `${process.env.PUBLIC_URL || ''}/care-equity/3.png`,
        `${process.env.PUBLIC_URL || ''}/care-equity/4.png`
      ],
      technologies: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Recharts', 'REST API', 'Vercel', 'Render'],
      category: 'web',
      github: 'https://github.com/sanajamkatel/Care-Equity',
      demo: 'https://care-equity.vercel.app/',
      featured: true,
      period: 'Feb 2026'
    },
    {
      id: 1,
      title: 'Predictive Maintenance System',
      bullets: [
        'Developed ML-powered predictive maintenance system achieving 96% accuracy (Random Forest on 876K sensor readings).',
        'Engineered 30+ temporal features from 4 raw sensors, improving baseline accuracy from 75% to 96%.',
        'Implemented SMOTE for class imbalance and cost-sensitive learning; achieved 95% recall with 4% false alarm rate.',
        'Built Flask REST API with O(1) prediction complexity (<1ms response) and Streamlit dashboard with real-time fleet analytics.'
      ],
      images: [
        process.env.PUBLIC_URL + '/PredictiveMaintenanceSystem/1.png',
        process.env.PUBLIC_URL + '/PredictiveMaintenanceSystem/2.png',
        process.env.PUBLIC_URL + '/PredictiveMaintenanceSystem/3.png'
      ],
      technologies: ['Python', 'scikit-learn', 'Flask', 'Streamlit', 'Random Forest', 'SMOTE', 'Data Analytics', 'REST API', 'Kaggle Dataset'],
      category: 'ai',
      github: 'https://github.com/sanajamkatel/Predictive-Maintenance-System',
      demo: 'https://sanajamkatel.github.io/Predictive-Maintenance-System/',
      featured: true,
      period: 'Sep 2025'
    },
    {
      id: 2,
      title: 'Medical Recommendation System',
      bullets: [
        'Developed healthcare system predicting diseases from symptoms using SVC, Random Forest, and Gradient Boosting.',
        'Built and deployed RESTful APIs with Flask for backend processing.',
        'Designed responsive web interface with AI-powered symptom matching and Google Search API for up-to-date treatment suggestions.'
      ],
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
      id: 3,
      title: 'Twitter Clone',
      bullets: [
        'Developed full-stack Twitter clone with user authentication, tweet posting, and following/unfollowing (React, Vite, Node.js, Express, MongoDB, Cloudinary).',
        'Designed and implemented RESTful APIs for secure authentication, profile management, and data storage.',
        'Utilized JWT for token-based auth, bcrypt for password encryption, and custom middleware for efficient routing.'
      ],
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
    },
    {
      id: 4,
      title: 'Tic-Tac-Toe Game',
      bullets: [
        'Developed two Tic-Tac-Toe implementations: C++ console (OOP, 2D array, input validation, win detection) and C++ web server with HTML frontend.',
        'Web server: C++ backend with HTTP API endpoints; HTML/CSS/JS frontend with glass-morphism design, animations, score tracking, and mobile-responsive layout.'
      ],
      images: [
        process.env.PUBLIC_URL + '/ttt/1.png'
      ],
      technologies: ['C++', 'HTML', 'CSS', 'JavaScript', 'RESTful API', 'Object-Oriented Programming', 'Makefile', 'cpp-httplib'],
      category: 'fun',
      github: 'https://github.com/sanajamkatel/TicTacToe-CPP',
      demo: 'https://tictactoe-cpp.onrender.com/',
      featured: true,
      period: 'Aug 2025'
    }
  ], []);

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
              <div className="relative overflow-hidden h-52">
                {isVideoAsset(project.images[currentImageIndex[project.id] || 0]) ? (
                  <video
                    src={project.images[currentImageIndex[project.id] || 0]}
                    controls
                    className="w-full h-full object-cover"
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

                {/* GitHub, Demo, and Writeup Links */}
                <div className="flex flex-wrap justify-center gap-3">
                  {project.github && (
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
                  )}
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
                  {project.writeup && (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.writeup}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-hot-pink to-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
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