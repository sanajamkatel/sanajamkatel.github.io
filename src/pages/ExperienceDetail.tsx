import React from 'react';
import WorkExperienceDetail from '../components/WorkExperienceDetail';
import Footer from '../components/Footer';

const ExperienceDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <WorkExperienceDetail />
      <Footer />
    </div>
  );
};

export default ExperienceDetailPage;
