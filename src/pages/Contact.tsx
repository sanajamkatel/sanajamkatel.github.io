import React from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage; 