import React from 'react';
import WorkExperience from '../components/WorkExperience';
import Footer from '../components/Footer';

const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <WorkExperience />
      <Footer />
    </div>
  );
};

export default ExperiencePage; 