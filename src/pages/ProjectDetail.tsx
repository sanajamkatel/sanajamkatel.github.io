import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Github, ExternalLink, FileText } from 'lucide-react';
import Footer from '../components/Footer';
import VideoPlayer from '../components/VideoPlayer';
import { projects } from '../data/projects';

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center py-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project not found</h2>
          <Link to="/projects" className="text-primary font-medium inline-flex items-center space-x-2">
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="section-padding flex-1">
        <div className="container-custom max-w-4xl">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-primary font-medium mb-8 hover:text-primary-dark transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{project.title}</h1>
              {project.period && (
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium w-fit">
                  {project.period}
                </span>
              )}
            </div>

            {/* Media Gallery */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Photos & Video</h2>
              {project.images.length > 0 ? (
                <div className="bg-gradient-to-br from-pale-pink to-baby-pink rounded-xl p-3">
                  <div className="relative">
                    {isVideo(project.images[currentImageIndex]) ? (
                      <VideoPlayer
                        key={project.images[currentImageIndex]}
                        src={project.images[currentImageIndex]}
                        containerClassName="rounded-lg overflow-hidden w-full"
                      />
                    ) : (
                      <div className="aspect-video bg-white rounded-lg overflow-hidden relative">
                        <img
                          src={project.images[currentImageIndex]}
                          alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {project.images.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          onClick={() =>
                            setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
                          }
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-colors duration-200"
                        >
                          <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % project.images.length)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-colors duration-200"
                        >
                          <ChevronRight size={20} />
                        </motion.button>
                      </>
                    )}
                  </div>

                  {project.images.length > 1 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
                      {project.images.map((image, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`aspect-video rounded-md overflow-hidden border-2 transition-colors duration-200 ${
                            currentImageIndex === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          {isVideo(image) ? (
                            <video src={image} className="w-full h-full object-contain bg-black" muted />
                          ) : (
                            <img src={image} alt="" className="w-full h-full object-cover" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-pale-pink to-baby-pink rounded-xl p-8 text-center">
                  <div className="text-3xl mb-2">📸</div>
                  <div className="text-sm font-medium text-gray-700">Photos & video coming soon</div>
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Overview</h2>
              <ul className="space-y-3">
                {project.bullets.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-600">
                    <ArrowRight className="text-primary mt-1 flex-shrink-0" size={16} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case Study */}
            {project.caseStudy && (
              <>
                {/* Quick Summary */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Project Overview & Quick Summary</h2>
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 space-y-3">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-semibold text-gray-700">Role: </span>{project.caseStudy.role}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-semibold text-gray-700">What It Is: </span>{project.caseStudy.whatItIs}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-semibold text-gray-700">Core Technical Problem: </span>{project.caseStudy.coreProblem}
                    </p>
                    <div className="bg-primary/5 rounded-lg px-3 py-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">Design Principle</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{project.caseStudy.designPrinciple}</p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Full Tech Stack</h2>
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[560px]">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <th className="px-4 py-2 font-semibold text-gray-700 whitespace-nowrap">Layer</th>
                          <th className="px-4 py-2 font-semibold text-gray-700 whitespace-nowrap">Technology</th>
                          <th className="px-4 py-2 font-semibold text-gray-700">Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.caseStudy.techStack.map((row, index) => (
                          <tr key={index} className="border-b border-gray-50 last:border-0 align-top">
                            <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">{row.layer}</td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.technology}</td>
                            <td className="px-4 py-3 text-gray-600">{row.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* System Architecture & Request Flow */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">System Architecture & Request Flow</h2>
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                    <div className="overflow-x-auto mb-5">
                      <pre className="bg-gray-900 text-gray-100 text-[11px] leading-relaxed rounded-lg p-4 min-w-[520px]">
                        {project.caseStudy.architectureDiagram}
                      </pre>
                    </div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Execution Lifecycle</h4>
                    <ol className="space-y-2">
                      {project.caseStudy.executionLifecycle.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-primary font-semibold flex-shrink-0">{index + 1}.</span>
                          <span>
                            {point.title && <span className="font-semibold text-gray-700">{point.title}: </span>}
                            {point.text}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Defense-in-Depth Safety Architecture */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Defense-in-Depth Safety Architecture</h2>
                  <p className="text-sm text-gray-500 italic mb-4">Design Principle: "The LLM is an untrusted parser, not an execution engine."</p>
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                    <ol className="space-y-3">
                      {project.caseStudy.safetyArchitecture.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-primary font-semibold flex-shrink-0">{index + 1}.</span>
                          <span>
                            {point.title && <span className="font-semibold text-gray-700">{point.title}: </span>}
                            {point.text}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Every Capability Built */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Every Capability Built</h2>

                  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Read-Only (no data mutation)</h4>
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto mb-5">
                    <table className="w-full text-sm text-left min-w-[480px]">
                      <tbody>
                        {project.caseStudy.readCapabilities.map((row, index) => (
                          <tr key={index} className="border-b border-gray-50 last:border-0 align-top">
                            <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap w-1/3">{row.capability}</td>
                            <td className="px-4 py-3 text-gray-600">{row.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Write (modifies data — all require authorization + explicit confirmation)</h4>
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-x-auto mb-4">
                    <table className="w-full text-sm text-left min-w-[480px]">
                      <tbody>
                        {project.caseStudy.writeCapabilities.map((row, index) => (
                          <tr key={index} className="border-b border-gray-50 last:border-0 align-top">
                            <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap w-1/3">{row.capability}</td>
                            <td className="px-4 py-3 text-gray-600">{row.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm text-gray-500 italic">
                    <span className="font-semibold not-italic text-gray-600">Side-effect only: </span>
                    {project.caseStudy.sideEffectNote}
                  </p>
                </div>

                {/* Key Engineering Decisions */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Key Engineering Decisions Worth Highlighting</h2>
                  <ul className="space-y-3">
                    {project.caseStudy.keyDecisions.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-600">
                        <ArrowRight className="text-primary mt-1 flex-shrink-0" size={16} />
                        <span>
                          {point.title && <span className="font-semibold text-gray-700">{point.title} — </span>}
                          {point.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Known Gaps */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">Known Gaps / Honest Limitations</h2>
                  <p className="text-sm text-gray-500 mb-4">Worth stating plainly — this shows engineering judgment, not just feature output.</p>
                  <ul className="space-y-3">
                    {project.caseStudy.knownGaps.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-500">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Future Roadmap */}
                <div className="mb-10">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Future Architectural Roadmap</h2>
                  <ul className="space-y-3">
                    {project.caseStudy.futureRoadmap.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-600">
                        <ArrowRight className="text-primary mt-1 flex-shrink-0" size={16} />
                        <span>
                          {point.title && <span className="font-semibold text-gray-700">{point.title}: </span>}
                          {point.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Technologies */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Key Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors duration-300"
                >
                  <Github size={16} />
                  <span>View Code</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors duration-300"
                >
                  <ExternalLink size={16} />
                  <span>Let's See</span>
                </a>
              )}
              {project.writeup && (
                <a
                  href={project.writeup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-hot-pink text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-colors duration-300"
                >
                  <FileText size={16} />
                  <span>Technical Deep Dive</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
