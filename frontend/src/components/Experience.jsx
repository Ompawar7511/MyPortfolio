import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const defaultExperience = [
  {
    role: "Web Development Intern",
    company: "Unified Mentor",
    duration: "June 2023 - July 2023",
    location: "Remote, India",
    responsibilities: [
      "Developed and styled responsive, layout-friendly web pages, ensuring browser compatibility.",
      "Improved UI/UX experiences using standard semantic HTML, CSS, and modern JavaScript features.",
      "Collaborated and version-controlled codebase efficiently using Git and GitHub workflows.",
      "Worked on multiple real-world front-end web development sprints and projects."
    ]
  }
];

const Experience = () => {
  const [experienceData, setExperienceData] = useState(defaultExperience);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/experience`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data.length > 0) setExperienceData(data);
      })
      .catch(err => {
        console.log("Using static fallback for Experience section.");
      });
  }, []);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-brand-bg/50">
      {/* Background Glow */}
      <div className="absolute bottom-1/4 left-[5%] w-[300px] h-[300px] bg-brand-accent glow-blob rounded-full"></div>

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
            Work Experience
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-3xl mx-auto relative pl-6 md:pl-0">
          
          {/* Vertical Center Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line opacity-50"></div>

          {experienceData.map((exp, idx) => (
            <motion.div 
              key={idx}
              className="relative flex flex-col md:flex-row items-start md:justify-between mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              
              {/* Left side spacer for desktop */}
              <div className="hidden md:block w-5/12 text-right pr-8 pt-4">
                <span className="text-xs font-mono font-bold text-brand-primary tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full">
                  Internship
                </span>
              </div>

              {/* Central Circle Indicator */}
              <div className="absolute left-[-21px] md:left-1/2 md:-ml-[19px] w-10 h-10 rounded-full bg-brand-bg border-2 border-brand-primary flex items-center justify-center text-brand-primary z-10 shadow-lg shadow-brand-primary/20">
                <FaBriefcase className="text-sm" />
              </div>

              {/* Right side content */}
              <div className="w-full md:w-5/12 pl-6 md:pl-8">
                <div className="glassmorphism p-6 rounded-2xl border border-white/5 glassmorphism-hover">
                  
                  {/* Meta details */}
                  <span className="inline-block md:hidden text-xs font-mono font-bold text-brand-primary tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full mb-3">
                    Internship
                  </span>

                  <h3 className="text-xl font-bold text-brand-textPrimary group-hover:text-brand-primary transition-colors">
                    {exp.role}
                  </h3>
                  
                  <h4 className="text-md font-semibold text-brand-secondary mt-1">
                    {exp.company}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-brand-textSecondary mt-3 mb-4 border-b border-white/5 pb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt /> {exp.location}
                    </span>
                  </div>

                  {/* Job Duties list */}
                  <ul className="space-y-2.5 text-sm text-brand-textSecondary">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-brand-primary mr-2">▹</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
              
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Experience;
