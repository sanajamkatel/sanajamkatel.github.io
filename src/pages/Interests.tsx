import React from 'react';
import Interests from '../components/Interests';
import Footer from '../components/Footer';

const InterestsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Interests />
      <Footer />
    </div>
  );
};

export default InterestsPage; 