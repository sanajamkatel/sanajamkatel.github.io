import React from 'react';
import { motion } from 'framer-motion';

interface ScrollButtonProps {
  targetId: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ 
  targetId, 
  position = 'bottom-right',
  className = ''
}) => {
  const handleScroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-8 left-8';
      case 'top-right':
        return 'top-8 right-8';
      case 'top-left':
        return 'top-8 left-8';
      default:
        return 'bottom-8 right-8';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className={`absolute ${getPositionClasses()} cursor-pointer ${className}`}
      onClick={handleScroll}
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
        {/* Main avocado circle */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-hot-pink to-primary-dark rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white">
          <img
            src={process.env.PUBLIC_URL + "/avacado.png"}
            alt="Scroll"
            className="w-8 h-8 sm:w-10 sm:h-10 filter brightness-0 invert drop-shadow-sm"
          />
        </div>

        {/* Cute sparkles around avocado */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-white rounded-full opacity-80"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-baby-pink rounded-full opacity-70"></div>
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-white rounded-full opacity-90"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollButton; 