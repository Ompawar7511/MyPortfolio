import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaJava, FaNodeJs, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiSpringboot, SiMongodb, SiPostman } from 'react-icons/si';
import { HiArrowRight, HiDownload } from 'react-icons/hi';

const titles = [
  "Full Stack Developer",
  "Software Engineer",
  "Spring Boot Specialist",
  "MERN Stack Developer"
];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const fullText = titles[titleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause at end
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(150);
          return;
        }
      }

      setTypingSpeed(isDeleting ? 75 : 150);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex, typingSpeed]);

  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background Grid & Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0f1d_1px,transparent_1px),linear-gradient(to_bottom,#0c0f1d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary glow-blob rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-accent glow-blob rounded-full"></div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {/* React Icon */}
        <motion.div
          className="absolute top-[20%] left-[12%] p-4 glassmorphism rounded-2xl text-brand-secondary text-3xl shadow-lg flex items-center justify-center animate-float-slow"
        >
          <FaReact />
        </motion.div>

        {/* Java Icon */}
        <motion.div
          className="absolute top-[30%] right-[15%] p-4 glassmorphism rounded-2xl text-red-400 text-3xl shadow-lg flex items-center justify-center animate-float-medium"
        >
          <FaJava />
        </motion.div>

        {/* Spring Boot Icon */}
        <motion.div
          className="absolute bottom-[25%] left-[15%] p-4 glassmorphism rounded-2xl text-green-500 text-3xl shadow-lg flex items-center justify-center animate-float-fast"
        >
          <SiSpringboot />
        </motion.div>

        {/* MongoDB Icon */}
        <motion.div
          className="absolute bottom-[30%] right-[12%] p-4 glassmorphism rounded-2xl text-emerald-400 text-3xl shadow-lg flex items-center justify-center animate-float-slow"
        >
          <SiMongodb />
        </motion.div>

        {/* Node.js Icon */}
        <motion.div
          className="absolute top-[65%] left-[8%] p-4 glassmorphism rounded-2xl text-brand-primary text-3xl shadow-lg flex items-center justify-center animate-float-medium"
        >
          <FaNodeJs />
        </motion.div>

        {/* Postman Icon */}
        <motion.div
          className="absolute top-[60%] right-[8%] p-4 glassmorphism rounded-2xl text-orange-500 text-3xl shadow-lg flex items-center justify-center animate-float-fast"
        >
          <SiPostman />
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glassmorphism text-sm font-medium text-brand-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span>Available for Full Stack Opportunities</span>
          </div>

          {/* Large Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 text-brand-textPrimary">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
              Om Pawar
            </span>
          </h1>

          {/* Typing Subtitle */}
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 h-12 text-brand-textSecondary">
            I am a <span className="text-white font-mono typing-cursor bg-brand-bg/50 px-2 py-0.5 rounded border border-white/5">{currentText}</span>
          </h2>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-brand-textSecondary max-w-2xl mx-auto mb-10 leading-relaxed">
            "Building Secure, Scalable and User-Friendly Web Applications"
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => handleScrollTo('#projects')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-brand-bg font-bold shadow-lg shadow-brand-primary/10 hover:shadow-brand-primary/30 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 group"
            >
              <span>View Projects</span>
              <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="./resume.pdf"
              download="Om_Pawar_Resume.pdf"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glassmorphism text-brand-textPrimary font-semibold hover:border-brand-primary/30 hover:bg-white/5 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <HiDownload className="text-lg" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => handleScrollTo('#contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 text-brand-textSecondary hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/Ompawar7511"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-brand-textSecondary hover:text-white transition-colors hover:scale-110 duration-200"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/om-pawar-425b40286/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-brand-textSecondary hover:text-brand-secondary transition-colors hover:scale-110 duration-200"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => handleScrollTo('#about')}>
        <span className="text-xs text-brand-textSecondary tracking-widest font-mono mb-2 uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1 flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-brand-primary rounded-full"
            animate={{
              y: [0, 16, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
