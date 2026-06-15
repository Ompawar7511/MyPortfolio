import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const defaultStats = [
  { value: "2025", label: "Graduation Year" },
  { value: "12+", label: "Projects Built" },
  { value: "300+", label: "DSA Problems Solved" },
  { value: "1", label: "Internship Completed" }
];

const About = () => {
  const [bioData, setBioData] = useState({
    title: "Designing High-Performance Applications with Modern Frameworks",
    bio: "Full Stack Developer passionate about building secure, scalable, and user-friendly web applications. Skilled in Java, Spring Boot, React.js, MERN Stack, REST APIs, JWT Authentication, MySQL, and MongoDB. Strong problem-solving abilities with a passion for learning emerging technologies and delivering impactful software solutions.",
    details: ["Language: Java, JS (ES6)", "Frameworks: Spring Boot, React", "Location: Pune, MH, India"]
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/about`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setBioData(data);
      })
      .catch(err => {
        console.log("Using static fallback for About section.");
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-brand-bg/50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-brand-textPrimary to-brand-textSecondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text/Bio (Left Side) */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-brand-textPrimary">
              {bioData.title}
            </h3>
            
            <p className="text-brand-textSecondary leading-relaxed text-lg">
              {bioData.bio}
            </p>

            <p className="text-brand-textSecondary leading-relaxed text-lg">
              With a foundation in Computer Engineering, I specialize in connecting secure backends with dynamic, visual frontends. I focus on writing maintainable, clean code and employing solid OOP principles, data structures, and industry-standard patterns.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-sm font-mono text-brand-textSecondary">
              {bioData.details.map((detail, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                  <span className="text-brand-primary">▹</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats & Cards (Right Side) */}
          <motion.div 
            className="lg:col-span-5 grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {defaultStats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glassmorphism p-6 rounded-2xl flex flex-col justify-center items-center text-center border border-white/5 glassmorphism-hover group"
              >
                <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-brand-textSecondary uppercase tracking-widest font-mono mt-2">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
