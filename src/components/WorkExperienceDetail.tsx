import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { workExperience } from '../data/workExperience';

const WorkExperienceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = workExperience.find((j) => j.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!job) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center py-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience not found</h2>
          <Link to="/experience" className="text-primary font-medium inline-flex items-center space-x-2">
            <ArrowLeft size={16} />
            <span>Back to Experience</span>
          </Link>
        </div>
      </section>
    );
  }

  const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

  return (
    <section className="section-padding">
      <div className="container-custom max-w-4xl">
        <Link
          to="/experience"
          className="inline-flex items-center space-x-2 text-primary font-medium mb-8 hover:text-primary-dark transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Experience</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{job.title}</h1>
              <p className="text-primary font-medium text-base sm:text-lg">{job.company}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>{job.period}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{job.description}</p>

          {/* Media Gallery */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Photos & Video</h2>
            {job.images.length > 0 ? (
              <div className="bg-gradient-to-br from-pale-pink to-baby-pink rounded-xl p-3">
                <div className="relative">
                  <div className="aspect-video bg-white rounded-lg overflow-hidden relative">
                    {isVideo(job.images[currentImageIndex].src) ? (
                      <video
                        src={job.images[currentImageIndex].src}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={job.images[currentImageIndex].src}
                        alt={job.images[currentImageIndex].alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="text-white">
                        <div className="text-sm font-medium">{job.images[currentImageIndex].alt}</div>
                        <div className="text-xs opacity-80">{job.images[currentImageIndex].type}</div>
                      </div>
                    </div>
                  </div>

                  {job.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) => (prev === 0 ? job.images.length - 1 : prev - 1))
                        }
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % job.images.length)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-300"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {job.images.length > 1 && (
                  <div className="flex justify-center space-x-2 mt-3">
                    {job.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentImageIndex === index ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
                  {job.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-video rounded-md overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      {isVideo(image.src) ? (
                        <video src={image.src} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-pale-pink to-baby-pink rounded-xl p-8 text-center">
                <div className="text-3xl mb-2">📸</div>
                <div className="text-sm font-medium text-gray-700">Photos & video coming soon</div>
                <div className="text-xs text-gray-500 mt-1">Check back for a look behind the scenes</div>
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Key Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Key Achievements</h2>
            <ul className="space-y-3">
              {job.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-600">
                  <ArrowRight className="text-primary mt-1 flex-shrink-0" size={16} />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* System Design Deep Dive */}
          {job.deepDive && job.deepDive.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-1">System Architecture & Design Deep Dive</h2>
              <p className="text-sm text-gray-500 mb-6">
                How the systems were architected, the data flows, and the technical mechanisms behind each achievement.
              </p>
              <div className="space-y-8">
                {job.deepDive.map((section, index) => (
                  <div key={index} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">
                      {index + 1}. {section.title}
                    </h3>

                    <div className="mb-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                        The Problem
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{section.problem}</p>
                    </div>

                    {section.diagram && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                          Architecture
                        </h4>
                        <pre className="bg-gray-900 text-gray-100 text-[11px] leading-relaxed rounded-lg p-4 overflow-x-auto">
                          {section.diagram}
                        </pre>
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Architecture & System Design
                      </h4>
                      <ul className="space-y-2">
                        {section.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                            <ArrowRight className="text-primary mt-0.5 flex-shrink-0" size={14} />
                            <span>
                              {point.label && <span className="font-semibold text-gray-700">{point.label}: </span>}
                              {point.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary/5 rounded-lg px-3 py-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                        Key Result
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{section.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {job.toBeDone && (
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">To Be Done</h2>
              <ul className="space-y-3">
                {job.toBeDone.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperienceDetail;
