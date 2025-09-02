import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const FunProjects: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="section-padding bg-gradient-to-br from-baby-pink to-white relative flex-grow flex items-center justify-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
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
            </motion.div>

            {/* Coming Soon Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Clock Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex justify-center mb-8"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-hot-pink to-primary rounded-full flex items-center justify-center shadow-2xl">
                  <Clock className="text-white" size={64} />
                </div>
              </motion.div>

              {/* Coming Soon Text */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Coming Soon! 
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  I'm working on some exciting fun projects that will showcase my creativity and passion for building cute, interactive applications!
                </p>
                
                

                {/* Floating Sparkles */}
                <div className="relative">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-hot-pink rounded-full opacity-60"
                      style={{
                        left: `${20 + (i * 15)}%`,
                        top: `${10 + (i * 20)}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-8"
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
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FunProjects; 