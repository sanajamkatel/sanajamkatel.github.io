import React from 'react';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Projects />
      <Footer />
    </div>
  );
};

export default ProjectsPage; 