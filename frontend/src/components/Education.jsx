import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';

const defaultEducation = [
  {
    id: 1,
    degree: "Bachelor of Computer Engineering",
    institution: "Savitribai Phule Pune University (SPPU)",
    duration: "2021 - 2025",
    grade: "67.00%",
    details: "Focused on core computing fundamentals including Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, and Software Engineering. Built web development prototypes and collaborated on project modules."
  },
  {
    id: 2,
    degree: "HSC (Higher Secondary Certificate)",
    institution: "State Board of Maharashtra",
    duration: "2020 - 2021",
    grade: "77.33%",
    details: "Specialized in Science (Physics, Chemistry, Mathematics) with introductory courses in computer application sciences and computer logic."
  },
  {
    id: 3,
    degree: "SSC (Secondary School Certificate)",
    institution: "State Board of Maharashtra",
    duration: "2018 - 2019",
    grade: "78.20%",
    details: "Completed secondary education with high standings in mathematics, science, and languages."
  }
];

const Education = () => {
  const [educationList, setEducationList] = useState(defaultEducation);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/education`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data.length > 0) {
          // Sort items by ID or reverse order to maintain order
          const sorted = data.sort((a, b) => b.id - a.id);
          setEducationList(sorted);
        }
      })
      .catch(err => {
        console.log("Using static fallback for Education section.");
      });
  }, []);

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-brand-bg/50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-[5%] w-[350px] h-[350px] bg-brand-primary glow-blob rounded-full"></div>

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
            Education
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Timeline container */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-0">
          {/* Vertical central line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line opacity-50"></div>

          {educationList.map((edu, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={edu.id || idx}
                className={`relative flex flex-col md:flex-row items-start md:justify-between mb-16 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Desktop layout: Title / Organization alignment */}
                <div className={`hidden md:block w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'} pt-4`}>
                  <div className="flex items-center gap-2 font-mono text-sm text-brand-secondary justify-end">
                    {isEven && (
                      <>
                        <FaCalendarAlt />
                        <span>{edu.duration}</span>
                      </>
                    )}
                  </div>
                  {!isEven && (
                    <div className="flex items-center gap-2 font-mono text-sm text-brand-secondary">
                      <FaCalendarAlt />
                      <span>{edu.duration}</span>
                    </div>
                  )}
                  <div className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mt-1">
                    Grade: {edu.grade}
                  </div>
                </div>

                {/* Timeline node */}
                <div className="absolute left-[-21px] md:left-1/2 md:-ml-[19px] w-10 h-10 rounded-full bg-brand-bg border-2 border-brand-secondary flex items-center justify-center text-brand-secondary z-10 shadow-lg shadow-brand-secondary/20">
                  <FaGraduationCap className="text-lg" />
                </div>

                {/* Timeline Card */}
                <div className="w-full md:w-5/12 pl-6 md:pl-8">
                  <div className="glassmorphism p-6 rounded-2xl border border-white/5 glassmorphism-hover">
                    <div className="md:hidden flex flex-wrap items-center gap-4 text-xs font-mono text-brand-secondary mb-2">
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {edu.duration}</span>
                      <span className="font-bold">Grade: {edu.grade}</span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-textPrimary group-hover:text-brand-primary transition-colors">
                      {edu.degree}
                    </h3>
                    
                    <h4 className="text-md font-semibold text-brand-textSecondary mt-1 mb-3">
                      {edu.institution}
                    </h4>

                    <p className="text-sm text-brand-textSecondary leading-relaxed border-t border-white/5 pt-3">
                      {edu.details}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Education;
