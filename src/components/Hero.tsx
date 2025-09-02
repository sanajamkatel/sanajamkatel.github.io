import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Github } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
            const fullText = "HI, MY NAME IS\nSadhana Jamkatel (Sana)\nComputer Science Student, Open to Work";
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Show button after typing is complete
      setTimeout(() => setShowButton(true), 500);
    }
  }, [currentIndex, fullText]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/files/SadhanaJamkatel_Resume.pdf';
    link.download = 'SadhanaJamkatel_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen bg-baby-pink flex items-center justify-center relative overflow-hidden">
      {/* Floating Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
        
        {/* Larger Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-hot-pink rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.5, 0.1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gray-800 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg min-h-[2rem]"
            >
              <motion.span
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(236, 72, 153, 0)",
                    "0 0 10px rgba(236, 72, 153, 0.3)",
                    "0 0 0px rgba(236, 72, 153, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {displayText.split('\n')[0] || ''}
              </motion.span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold leading-tight min-h-[4rem]"
            >
              <motion.span
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-r from-gray-800 via-hot-pink to-gray-800 bg-[length:200%_100%] bg-clip-text text-transparent"
              >
                {displayText.split('\n')[1] || ''}
              </motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-700 max-w-md min-h-[2rem]"
            >
              {displayText.split('\n')[2] || ''}
              {currentIndex < fullText.length && <span className="animate-pulse">|</span>}
            </motion.div>
            
            {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="bg-white text-hot-pink px-4 sm:px-6 py-3 rounded-full font-medium hover:bg-pale-pink transition-colors duration-300 flex items-center space-x-2 shadow-lg text-sm sm:text-base"
              >
                <Download size={20} />
                <span className="hidden sm:inline">Download My Resume</span>
                <span className="sm:hidden">Resume</span>
              </motion.button>
              
                                      <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href="https://github.com/Sadhanajx10"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-hot-pink transition-colors duration-300"
                        >
                          <Github size={32} />
                        </motion.a>
            </motion.div>
            )}
          </motion.div>

          {/* Right Content - Animated Character */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Girlish Character with Pink Bow and Headphones */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  y: { duration: 8 },
                  rotate: { duration: 16 }
                }}
                className="w-80 h-80 relative"
              >
                {/* Character Face */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Face Circle */}
                  <div className="w-64 h-64 bg-white rounded-full relative">
                    {/* Cute Eyes */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex space-x-6">
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Mouth - Happy Smile */}
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-black rounded-full" style={{borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%'}}></div>
                    
                    {/* Blush */}
                    <div className="absolute bottom-16 left-8 w-6 h-6 bg-baby-pink rounded-full opacity-80"></div>
                    <div className="absolute bottom-16 right-8 w-6 h-6 bg-baby-pink rounded-full opacity-80"></div>
                  </div>
                </div>
                
                {/* Hair - Cute flowing hair */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-50 bg-brown-600 rounded-full"></div>
                
                {/* Hair bangs */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-70 h-25 bg-brown-600 rounded-full"></div>
                
                {/* Side hair pieces */}
                <div className="absolute top-10 left-4 w-20 h-25 bg-brown-600 rounded-full"></div>
                <div className="absolute top-10 right-4 w-20 h-25 bg-brown-600 rounded-full"></div>
                
                {/* More hair volume */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-75 h-35 bg-brown-600 rounded-full"></div>
                
                {/* Pink Bow */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                  {/* Left bow loop */}
                  <div className="w-14 h-10 bg-hot-pink rounded-full transform rotate-12"></div>
                  {/* Bow center */}
                  <div className="w-8 h-8 bg-primary-dark rounded-full"></div>
                  {/* Right bow loop */}
                  <div className="w-14 h-10 bg-hot-pink rounded-full transform -rotate-12"></div>
                </div>
                
                {/* Bow ribbons */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-12">
                  <div className="w-2 h-12 bg-hot-pink rounded-full"></div>
                  <div className="w-2 h-12 bg-hot-pink rounded-full"></div>
                </div>
                

                
                {/* Hair strands falling naturally */}
                <div className="absolute top-15 left-1/2 transform -translate-x-1/2 flex space-x-16">
                  <div className="w-4 h-20 bg-brown-600 rounded-full transform rotate-12"></div>
                  <div className="w-4 h-18 bg-brown-600 rounded-full transform -rotate-6"></div>
                  <div className="w-4 h-22 bg-brown-600 rounded-full transform rotate-6"></div>
                  <div className="w-4 h-19 bg-brown-600 rounded-full transform -rotate-12"></div>
                </div>
                
                {/* More hair details */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-20">
                  <div className="w-5 h-12 bg-brown-600 rounded-full transform rotate-15"></div>
                  <div className="w-5 h-12 bg-brown-600 rounded-full transform -rotate-15"></div>
                </div>
                
                {/* Additional hair pieces */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex space-x-24">
                  <div className="w-3 h-16 bg-brown-600 rounded-full transform rotate-8"></div>
                  <div className="w-3 h-16 bg-brown-600 rounded-full transform -rotate-8"></div>
                </div>
                
                {/* Animated Sparkles for girlish effect */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <motion.div 
                    className="w-2 h-2 bg-hot-pink rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-baby-pink rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-hot-pink rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  />
                </div>
                
                {/* Orbiting Elements */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-hot-pink rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-2 h-2 bg-baby-pink rounded-full opacity-60"></div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-hot-pink rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-2 h-2 bg-baby-pink rounded-full opacity-60"></div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Super Cute Pink Avocado Scroll Indicator - Hidden for now */}
      {/*
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        className="absolute bottom-8 right-8 cursor-pointer"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ 
            behavior: 'smooth' 
          });
        }}
      >
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            y: { duration: 2 },
            rotate: { duration: 4 }
          }}
          className="relative"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-hot-pink to-primary-dark rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white">
            <img 
              src="/avacado.png" 
              alt="Scroll Down" 
              className="w-10 h-10 filter brightness-0 invert drop-shadow-sm"
            />
          </div>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-white rounded-full opacity-80"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-60"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full opacity-70"></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-white rounded-full opacity-90"></div>
          </motion.div>
        </motion.div>
      </motion.div>
      */}
    </section>
  );
};

export default Hero; 