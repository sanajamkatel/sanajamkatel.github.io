import React from 'react';
import { motion } from 'framer-motion';
import { Music, Palette, Gamepad2, BookOpen, Camera, Heart, Star } from 'lucide-react';
import ScrollButton from './ScrollButton';

const Interests: React.FC = () => {
  const interests = [
    {
      icon: Music,
      title: 'Music & Audio',
      description: 'I love music and audio! From playing guitar to creating Spotify playlists, attending concerts, and exploring different genres. Music is my creative escape.',
      color: 'bg-purple-100 text-purple-600',
      items: ['Guitar', 'Spotify Playlists', 'Concert Going', 'Music Production']
    },
    {
      icon: Palette,
      title: 'Digital Art & Design',
      description: 'Passionate about digital art and design! I love using Canva, Pinterest, and Figma to create flyers for my student clubs and explore creative expression.',
      color: 'bg-pink-100 text-pink-600',
      items: ['Canva', 'Pinterest', 'Figma', 'Club Flyers']
    },
    {
      icon: Gamepad2,
      title: 'Gaming & eSports',
      description: 'I love playing games! From eSports to PS5 gaming, I enjoy the competitive and immersive world of gaming. It\'s my way to unwind and have fun.',
      color: 'bg-blue-100 text-blue-600',
      items: ['eSports', 'PS5 Gaming', 'Competitive Gaming', 'Gaming Communities']
    },
    {
      icon: BookOpen,
      title: 'Reading & Learning',
      description: 'I love reading books! From sci-fi and vampire novels to detective stories and horror. I also enjoy enrolling in online courses, especially computer science courses.',
      color: 'bg-green-100 text-green-600',
      items: ['Sci-Fi Books', 'Vampire Novels', 'Detective Stories', 'Online Courses']
    },
    {
      icon: Camera,
      title: 'Photography & Videography',
      description: 'I love capturing moments! From nature photography to film, digital, and street photography. Every picture tells a story.',
      color: 'bg-yellow-100 text-yellow-600',
      items: ['Nature Photography', 'Film Photography', 'Digital Photography', 'Street Photography']
    }
  ];

  const funFacts = [
    'I can play guitar and love creating Spotify playlists',
    'I\'ve designed flyers for multiple student clubs using Canva',
    'I\'m a huge fan of eSports and PS5 gaming',
    'I love reading sci-fi and vampire novels',
    'I take nature photography whenever I can',
    'I\'m always enrolled in online CS courses',
    'I can spend hours on Pinterest finding design inspiration',
    'I\'ve attended 10+ concerts and counting!'
  ];

  return (
    <section id="interests" className="section-padding bg-white relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Interests & Fun Stuff
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            When I'm not coding, you can find me exploring these passions and hobbies. 
            Life is too short to not have fun while learning!
          </p>
        </motion.div>

        {/* Interests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-lg ${interest.color}`}>
                  <interest.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {interest.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {interest.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {interest.items.map((item) => (
                  <span
                    key={item}
                    className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border"
                  >
                    {item}
                  </span>
                ))}
              </div>
              

            </motion.div>
          ))}
        </div>

        {/* Fun Facts Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-3">
              <Star size={32} />
              <span>Fun Facts About Me</span>
              <Star size={32} />
            </h3>
            <p className="text-lg opacity-90">
              Here are some random facts that make me, well, me!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors duration-300"
              >
                <Heart size={20} className="mx-auto mb-2 text-pink-300" />
                <p className="text-sm font-medium">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Obsessions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            Currently Obsessed With
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              'Creating Spotify Playlists',
              'Designing Club Flyers',
              'PS5 Gaming Sessions',
              'Reading Sci-Fi Novels',
              'Nature Photography',
              'Online CS Courses'
            ].map((obsession, index) => (
              <motion.div
                key={obsession}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-primary text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {obsession}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Button */}
      {/* <ScrollButton targetId="contact" position="bottom-right" /> */}
    </section>
  );
};

export default Interests; 