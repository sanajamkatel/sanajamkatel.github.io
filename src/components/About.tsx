import React from 'react';
import { motion } from 'framer-motion';
import { Code, GraduationCap, Heart, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();
            const skills = [
            'Python', 'C++', 'JavaScript', 'TypeScript', 'Java', 'SQL',
            'React.js', 'Next.js', 'Node.js', 'NestJS', 'HTML/CSS', 'Bootstrap',
            'AWS S3', 'EC2', 'Lambda', 'CloudFront', 'CloudWatch', 'IAM', 'CDK',
            'Docker', 'Linux', 'GitHub Actions', 'OCLIF', 'Spring Boot',
            'MongoDB', 'PostgreSQL', 'Firestore', 'MySQL', 'RESTful APIs',
            'GraphQL', 'OAuth', 'WebSockets', 'Agile/Scrum', 'Jira', 'Figma',
            'Tableau', 'AI/ML', 'Business Analysis', 'Data Warehousing'
          ];

            const education = [
            {
              degree: 'Bachelor of Science in Computer Science',
              school: 'North Central College, Naperville, IL',
              year: 'Expected May 2027',
              concentration: 'Concentration in Ethical Leadership',
              minor: 'Minor in Economics',
              gpa: 'GPA: 3.808',
              coursework: [
                'Python', 'Data Structures', 'Discrete Structures', 
                'Computer Organization and Design', 'Software Development', 
                'Website Development', 'Data Mining', 'Calculus I & II', 
                'Database Systems'
              ]
            }
          ];



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="section-padding bg-white relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Personal Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                <Heart className="text-primary" size={28} />
                <span>Who I Am</span>
              </h3>
                                    <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed text-lg">
                  I'm majoring in Computer Science with a minor in Economics at North Central College, with a concentration in Ethical Leadership. I'm really passionate about <span className="text-hot-pink font-semibold">mentorship, inclusive tech, and building software that actually makes an impact</span>. I'm always looking for opportunities that will challenge me and grow me as a professional leader while also contributing my ideas and creativity.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  As an <span className="text-hot-pink font-semibold">underrepresented woman in tech</span>, my goal is to inspire and support others from similar backgrounds so that they can excel in this space too.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  I'm gearing up to start my 2026 internship search, open to DevOps or Software Engineering internships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/contact')}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Contact Me</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.open('/SadhanaJamkatel_Resume.pdf', '_blank');
                    }}
                    className="bg-hot-pink text-white px-6 py-3 rounded-lg font-medium hover:bg-hot-pink/80 transition-colors duration-300 flex items-center justify-center space-x-2 border-2 border-hot-pink hover:border-hot-pink/80"
                  >
                    <Download size={20} />
                    <span>View Resume</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>



            {/* Education */}
            <motion.div variants={itemVariants} className="space-y-6 mt-12">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                <GraduationCap className="text-primary" size={28} />
                <span>Education</span>
              </h3>
              {education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:ring-2 hover:ring-hot-pink/20 transition-all duration-500 ease-out border border-gray-100"
                >
                  <h4 className="font-semibold text-lg text-gray-800 leading-normal mb-2">{edu.degree}</h4>
                  <a 
                    href="https://www.northcentralcollege.edu/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-medium leading-normal mb-1 hover:text-hot-pink transition-colors duration-300"
                  >
                    {edu.school}
                  </a>
                  <p className="text-gray-500 text-sm leading-normal mb-2">{edu.year}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-hot-pink font-medium text-sm">{edu.concentration}</p>
                    <p className="text-hot-pink font-medium text-sm">{edu.minor}</p>
                    <p className="text-gray-600 font-medium text-sm">{edu.gpa}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium text-sm mb-2">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, courseIndex) => (
                        <span key={courseIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>




          </motion.div>

          {/* Right Column - Profile Picture & Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center items-center"
            >
              <div className="relative">
                {/* Static border */}
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-hot-pink via-primary to-baby-pink p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    {/* Profile Photo */}
                    <img
                      src="/profilepic.JPEG"
                      alt="Sadhana Jamkatel"
                      className="w-60 h-60 rounded-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Rotating sparkles */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-hot-pink rounded-full opacity-80"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-60"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-baby-pink rounded-full opacity-70"></div>
                  <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-hot-pink rounded-full opacity-90"></div>
                </motion.div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                <Code className="text-primary" size={28} />
                <span>Skills & Technologies</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Button */}
      {/* <ScrollButton targetId="work-experience" position="bottom-right" /> */}
    </section>
  );
};

export default About; 