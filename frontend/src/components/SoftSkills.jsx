import React from 'react';
import { motion } from 'framer-motion';
import { FaComments, FaLightbulb, FaUsers, FaBolt, FaBalanceScale, FaBullseye } from 'react-icons/fa';

const softSkills = [
  {
    name: "Communication",
    icon: <FaComments className="text-blue-400" />,
    description: "Articulating technical designs clearly, compiling thorough documentation, and facilitating positive client interactions."
  },
  {
    name: "Problem Solving",
    icon: <FaLightbulb className="text-yellow-400" />,
    description: "Analyzing algorithms, tracing database bottlenecks, and designing robust secure workarounds for application limits."
  },
  {
    name: "Teamwork",
    icon: <FaUsers className="text-emerald-400" />,
    description: "Working effectively in cross-functional agile sprints, code reviewing, and syncing developer modules via Git/GitHub."
  },
  {
    name: "Quick Learner",
    icon: <FaBolt className="text-indigo-400" />,
    description: "Adapting quickly to emerging frameworks, package shifts, and integrating secure API guidelines on the go."
  },
  {
    name: "Decision Making",
    icon: <FaBalanceScale className="text-cyan-400" />,
    description: "Evaluating framework strengths, choosing appropriate database architectures, and prioritizing user-centric flows."
  },
  {
    name: "Goal Oriented",
    icon: <FaBullseye className="text-rose-500" />,
    description: "Striving to deliver clean production-ready releases, meeting strict deadlines, and refining interface performance."
  }
];

const SoftSkills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="soft-skills" className="py-24 relative overflow-hidden bg-brand-bg/50">
      {/* Background glow decorator */}
      <div className="absolute top-1/2 right-[10%] w-[300px] h-[300px] bg-brand-primary glow-blob rounded-full"></div>

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
            Interpersonal Soft Skills
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Soft Skills Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {softSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              variants={cardVariants}
              className="glassmorphism p-6 rounded-2xl border border-white/5 glassmorphism-hover group flex flex-col justify-between"
            >
              <div>
                {/* Icon wrapper */}
                <div className="text-3xl p-4 bg-white/5 rounded-2xl w-fit mb-5 group-hover:scale-115 group-hover:bg-white/10 group-hover:rotate-6 transition-all duration-300 flex items-center justify-center">
                  {skill.icon}
                </div>
                
                {/* Skill Name */}
                <h3 className="text-xl font-bold text-brand-textPrimary mb-3 group-hover:text-brand-primary transition-colors">
                  {skill.name}
                </h3>

                {/* Skill description */}
                <p className="text-sm text-brand-textSecondary leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SoftSkills;
