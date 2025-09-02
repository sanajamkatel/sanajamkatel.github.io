import React from 'react';
import About from '../components/About';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage; 