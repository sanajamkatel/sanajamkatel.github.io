import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Calendar, MapPin, ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { workExperience } from '../data/workExperience';

const WorkExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  const tabs = [
    { id: 'all', label: 'All Experience' },
    { id: 'internship', label: 'Internships' },
    { id: 'bootcamp', label: 'Bootcamps' }
  ];

  const filteredExperience = activeTab === 'all' 
    ? workExperience 
    : workExperience.filter(job => job.type === activeTab);

  const nextImage = useCallback((jobId: string) => {
    const job = workExperience.find(j => j.id === jobId);
    if (job && job.images) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [jobId]: ((prev[jobId] || 0) + 1) % job.images.length
      }));
    }
  }, [workExperience]);

  const prevImage = useCallback((jobId: string) => {
    const job = workExperience.find(j => j.id === jobId);
    if (job && job.images) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [jobId]: prev[jobId] === 0 ? job.images.length - 1 : (prev[jobId] || 0) - 1
      }));
    }
  }, [workExperience]);

  // Auto-slide effect
  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};

    filteredExperience.forEach((job) => {
      if (job.images && job.images.length > 1) {
        intervals[job.id] = setInterval(() => {
          setCurrentImageIndex(prev => {
            const currentJob = workExperience.find(j => j.id === job.id);
            if (currentJob && currentJob.images) {
              return {
                ...prev,
                [job.id]: ((prev[job.id] || 0) + 1) % currentJob.images.length
              };
            }
            return prev;
          });
        }, 5000); // 5 seconds
      }
    });

    // Cleanup intervals on unmount or when filteredExperience changes
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [filteredExperience, workExperience]);

  return (
    <section id="work-experience" className="section-padding bg-gray-50 relative">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-1"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-2">
            My professional journey in software development
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-500 ease-in-out text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary border border-gray-200'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Work Experience Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredExperience.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{job.title}</h3>
                      <p className="text-primary font-medium text-sm sm:text-base">{job.company}</p>
                    </div>
                  </div>
                  {job.link && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{job.period}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              {/* Work Image Carousel */}
              <div className="p-4 border-b border-gray-100">
                <div className="bg-gradient-to-br from-pale-pink to-baby-pink rounded-lg p-3">
                  <div className="relative">
                    {/* Main Image */}
                    <div className="aspect-video bg-white rounded-lg overflow-hidden relative">
                      {job.images && job.images.length > 0 ? (
                        <div className="relative h-full">
                          <img
                            src={job.images[currentImageIndex[job.id] || 0]?.src}
                            alt={job.images[currentImageIndex[job.id] || 0]?.alt}
                            className="w-full h-full object-cover"
                          />
                          {/* Image Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="text-white">
                              <div className="text-sm font-medium">{job.images[currentImageIndex[job.id] || 0]?.alt}</div>
                              <div className="text-xs opacity-80">{job.images[currentImageIndex[job.id] || 0]?.type}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center text-gray-500">
                            <div className="text-3xl mb-2">📸</div>
                            <div className="text-sm font-medium">Add Work Photos</div>
                            <div className="text-xs text-gray-400 mt-1">Screenshots, team photos, or project images</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Navigation Arrows */}
                    {job.images && job.images.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => prevImage(job.id)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300"
                        >
                          <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => nextImage(job.id)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300"
                        >
                          <ChevronRight size={20} />
                        </motion.button>
                      </>
                    )}

                    {/* Image Indicators */}
                    {job.images && job.images.length > 1 && (
                      <div className="flex justify-center space-x-2 mt-3">
                        {job.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(prev => ({ ...prev, [job.id]: index }))}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              (currentImageIndex[job.id] || 0) === index
                                ? 'bg-primary scale-125'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>

                {/* Know More Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to={`/experience/${job.id}`}
                    className="w-full bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Know More</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredExperience.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Briefcase size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No experience found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later!</p>
          </motion.div>
        )}
      </div>
      
      {/* Scroll Button */}
      {/* <ScrollButton targetId="projects" position="bottom-right" /> */}
    </section>
  );
};

export default WorkExperience; 