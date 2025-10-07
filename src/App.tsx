import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/About';
import ExperiencePage from './pages/Experience';
import ProjectsPage from './pages/Projects';
import InterestsPage from './pages/Interests';
import ContactPage from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-kufi">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/interests" element={<InterestsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
