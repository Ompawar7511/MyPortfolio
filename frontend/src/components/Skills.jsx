import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaBootstrap, 
  FaNodeJs, FaJava, FaGitAlt, FaGithub, FaCode, 
  FaCubes, FaServer, FaUserShield 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiSpringboot, SiMongodb, SiMysql, 
  SiJsonwebtokens, SiPostman, SiExpress 
} from 'react-icons/si';

const iconMap = {
  FaReact: <FaReact className="text-blue-400" />,
  FaJs: <FaJs className="text-yellow-400" />,
  FaHtml5: <FaHtml5 className="text-orange-500" />,
  FaCss3Alt: <FaCss3Alt className="text-blue-500" />,
  SiTailwindcss: <SiTailwindcss className="text-cyan-400" />,
  FaBootstrap: <FaBootstrap className="text-purple-500" />,
  FaJava: <FaJava className="text-red-400" />,
  SiSpringboot: <SiSpringboot className="text-green-500" />,
  FaNodeJs: <FaNodeJs className="text-green-400" />,
  SiExpress: <SiExpress className="text-gray-300" />,
  SiMongodb: <SiMongodb className="text-emerald-500" />,
  SiMysql: <SiMysql className="text-blue-400" />,
  SiJsonwebtokens: <SiJsonwebtokens className="text-pink-500" />,
  FaUserShield: <FaUserShield className="text-indigo-400" />,
  FaGitAlt: <FaGitAlt className="text-orange-600" />,
  FaGithub: <FaGithub className="text-gray-100" />,
  SiPostman: <SiPostman className="text-orange-500" />,
  FaCode: <FaCode className="text-teal-400" />,
  FaCubes: <FaCubes className="text-amber-400" />,
  FaServer: <FaServer className="text-violet-400" />
};

const defaultSkillsData = {
  Frontend: [
    { name: "React.js", level: 90, iconName: "FaReact" },
    { name: "JavaScript", level: 85, iconName: "FaJs" },
    { name: "HTML5", level: 95, iconName: "FaHtml5" },
    { name: "CSS3", level: 90, iconName: "FaCss3Alt" },
    { name: "Tailwind CSS", level: 90, iconName: "SiTailwindcss" },
    { name: "Bootstrap", level: 80, iconName: "FaBootstrap" },
  ],
  Backend: [
    { name: "Java", level: 85, iconName: "FaJava" },
    { name: "Spring Boot", level: 85, iconName: "SiSpringboot" },
    { name: "Node.js", level: 80, iconName: "FaNodeJs" },
    { name: "Express.js", level: 80, iconName: "SiExpress" },
  ],
  Database: [
    { name: "MongoDB", level: 80, iconName: "SiMongodb" },
    { name: "MySQL", level: 85, iconName: "SiMysql" },
  ],
  Authentication: [
    { name: "JWT Authentication", level: 90, iconName: "SiJsonwebtokens" },
    { name: "Role Based Control", level: 85, iconName: "FaUserShield" },
  ],
  "Tools & Concepts": [
    { name: "Git", level: 85, iconName: "FaGitAlt" },
    { name: "GitHub", level: 90, iconName: "FaGithub" },
    { name: "Postman", level: 90, iconName: "SiPostman" },
    { name: "DSA", level: 80, iconName: "FaCode" },
    { name: "OOP Principles", level: 85, iconName: "FaCubes" },
    { name: "REST APIs", level: 95, iconName: "FaServer" },
  ],
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  const [skillsData, setSkillsData] = useState(defaultSkillsData);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/skills`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(rows => {
        // Group rows by category
        const grouped = {};
        rows.forEach(row => {
          if (!grouped[row.category]) {
            grouped[row.category] = [];
          }
          grouped[row.category].push({
            name: row.name,
            level: row.level,
            iconName: row.icon // DB stores icon name as string
          });
        });
        setSkillsData(grouped);
      })
      .catch(err => {
        console.log("Using static fallback for Skills section.");
      });
  }, []);

  const getIcon = (name) => {
    return iconMap[name] || <FaCode className="text-gray-400" />;
  };

  const currentSkillsList = skillsData[activeTab] || [];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-[10%] w-[350px] h-[350px] bg-brand-secondary glow-blob rounded-full"></div>
      
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
            My Technical Skills
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Tabs navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl mx-auto bg-white/5 p-1.5 rounded-full border border-white/5">
          {Object.keys(skillsData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === tab 
                  ? 'text-brand-bg font-extrabold' 
                  : 'text-brand-textSecondary hover:text-white'
              }`}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="activeSkillTab"
                  className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentSkillsList.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glassmorphism p-6 rounded-2xl border border-white/5 glassmorphism-hover group flex flex-col justify-between"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  {getIcon(skill.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-textPrimary">{skill.name}</h3>
                  <span className="text-xs font-semibold text-brand-textSecondary tracking-wider font-mono uppercase">
                    Proficiency: {skill.level}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
