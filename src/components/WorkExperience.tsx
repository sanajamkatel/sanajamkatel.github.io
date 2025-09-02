import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink, ArrowRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';


const WorkExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  const workExperience = useMemo(() => [
            {
              id: 'aeropay',
              title: 'DevOps Engineer Intern',
              company: 'Aeropay',
              location: 'Chicago, IL',
              period: 'June 2025 - August 2025',
              type: 'internship',
              description: 'Building internal documentation sites, setting up AWS infrastructure, and developing CLI tools for automation. Working with CI/CD pipelines and cloud technologies.',
              technologies: ['Docusaurus', 'MDX', 'GitHub Actions', 'AWS S3', 'CloudFront', 'IAM', 'TypeScript', 'OCLIF', 'JumpCloud SSO'],
              achievements: [
                'Built an internal documentation site using Docusaurus (MDX, charts, search), used by 30+ engineers. Deployed to GitHub Pages and integrated CI/CD with GitHub Actions to automate updates and version control. Reduced average search time from 30 minutes to under a minute',
                'Set up infrastructure on AWS (S3, CloudFront, IAM) with access control via JumpCloud SSO. Improved site security and availability while supporting a fast-moving engineering team',
                'Developed a CLI tool in TypeScript with OCLIF for automating login, role-based access, and token generation for AWS and databases. Reduced setup time by 70% and made onboarding easier',
                'Automated CLI doc publishing using OCLIF\'s markdown generator and GitHub Actions, removing the need for manual updates and keeping docs accurate with every release'
              ],
              images: [
                { src: process.env.PUBLIC_URL + '/aeropay/screenshot.png', alt: 'Documentation Site', type: 'Website' },
                { src: process.env.PUBLIC_URL + '/aeropay/aeropay1.png', alt: 'Interns' },
                { src: process.env.PUBLIC_URL + '/aeropay/2.png', alt: 'Build a Bear'},
                { src: process.env.PUBLIC_URL + '/aeropay/IMG_9274.jpg', alt: 'Service Day '},
                { src: process.env.PUBLIC_URL + '/aeropay/IMG_5240 2.png', alt: 'First Day' }
              ],
              link: null
            },
            {
              id: 'argonne',
              title: 'High Performance Computing Bootcamp Participant',
              company: 'Argonne National Laboratory',
              location: 'Lemont, IL',
              period: 'August 2025',
              type: 'bootcamp',
              description: 'Participated in an intensive bootcamp focused on supercomputing systems and their applications in high-performance computing.',
              technologies: ['Large Language Models (LLM)', 'Retrieval-Augmented Generation (RAG)', 'LangChain', 'Gemini', 'Data Visualization', 'Machine Learning', 'AI for Scientific Computing'],
              achievements: [
                'Gained hands-on exposure to supercomputing systems like Aurora and their applications in HPC',
                'Participated in workshops on data visualization, machine learning, and AI for scientific computing',
                'Collaborated on a team project to build an interactive HPC chatbot, using both RAG-based and non-RAG approaches with LangChain and Gemini'
              ],
              images: [
                { src: process.env.PUBLIC_URL + '/argonne/IMG_8658 2.jpg', alt: 'Argonne Bootcamp', type: 'Bootcamp' },
                { src: process.env.PUBLIC_URL + '/argonne/1.png', alt: 'Aurora Systems', type: 'System' },
                { src: process.env.PUBLIC_URL + '/argonne/2.png', alt: 'Supercomputing Session', type: 'Learning' },
                { src: process.env.PUBLIC_URL + '/argonne/3.png', alt: 'HPC Workshop', type: 'Workshop' },
                { src: process.env.PUBLIC_URL + '/argonne/4.png', alt: 'Advanced HPC', type: 'Advanced' }
              ],
              link: null
            },
                        {
              id: 'safari',
              title: 'Web Developer',
              company: 'Safari Strives',
              location: 'Remote',
              period: '2024 – 2025',
              type: 'freelance',
              description: 'Built and maintained Safari Strives\' website from the ground up, delivering custom pages, forms, and a secure donation experience.',
              technologies: [
                'HTML/CSS',
                'JavaScript',
                'React',
                'Node.js',
                'Netlify',
                'Stripe (Payment Intents API)'
              ],
              achievements: [
                'Built a professional React website with modular components and npm packages according to team requirements'
              ],
              toBeDone: [
                'Research cost-effective payment solutions (Stripe vs PayPal vs GoFundMe vs Donorbox) for nonprofit donations',
                'Implement secure donation flow using chosen payment processor with 3D Secure and fraud prevention',
                'Build serverless functions (Netlify Functions) and webhooks to verify payment events and enable receipts, success/cancel routes, and audit-friendly logs',
                'Deploy website to Netlify and configure environment variables and secret management',
                'Design clear donation UI with suggested amounts and validation, improving usability on mobile and desktop',
                'Implement secure donation line with enhanced fraud detection',
                'Verify payment events with real-time webhook monitoring',
                'End-to-end payment test mode integration for all donation flows',
                'Generate automated weekly/monthly email reports to organization members',
                'Add multi-currency support for international donations',
                'Implement advanced analytics dashboard for donation tracking'
              ],
              images: [
                { src: process.env.PUBLIC_URL + '/safari-website.png', alt: 'Safari Strive Website', type: 'Website' }
              ],
              link: null
            }
          ], []);

  const tabs = [
    { id: 'all', label: 'All Experience' },
    { id: 'internship', label: 'Internships' },
    { id: 'bootcamp', label: 'Bootcamps' },
    { id: 'freelance', label: 'Freelance' }
  ];

  const filteredExperience = activeTab === 'all' 
    ? workExperience 
    : workExperience.filter(job => job.type === activeTab);
  
  console.log('🔍 Current activeTab:', activeTab);
  console.log('🔍 Filtered experience count:', filteredExperience.length);
  console.log('🔍 Filtered experience:', filteredExperience);

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
            My professional journey in software development, from internships to freelance work
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
              onClick={() => {
                console.log('🔍 Clicking tab:', tab.id);
                setActiveTab(tab.id);
              }}
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
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredExperience.map((job, index) => (
            <motion.div
              key={job.id}
              layout
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center space-x-2 mb-4"
                >
                  <span>{expandedJob === job.id ? 'Show Less' : 'Know More'}</span>
                  {expandedJob === job.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </motion.button>

                {/* Expanded Content */}
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >


                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                            <ArrowRight className="text-primary mt-0.5 flex-shrink-0" size={14} />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* To Be Done */}
                    {job.toBeDone && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 mt-4">To Be Done:</h4>
                        <ul className="space-y-2">
                          {job.toBeDone.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-2 text-sm text-gray-500">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
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