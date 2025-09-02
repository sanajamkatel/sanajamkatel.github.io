import React from 'react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Footer />
    </div>
  );
};

export default Home; 