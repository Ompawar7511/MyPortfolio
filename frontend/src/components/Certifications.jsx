import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaAward } from 'react-icons/fa';

const certsData = [
  {
    id: 1,
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Forage / Deloitte",
    date: "Completed",
    skills: ["Data Analysis", "Data Visualization", "Client Presentation", "Insights Extraction"],
    details: [
      "Analyzed simulation datasets to extract actionable business performance metrics.",
      "Prepared dashboards and presentations communicating technology findings and optimization recommendations.",
      "Identified trends in user and transaction engagement metrics to deliver client value."
    ],
    credentialUrl: "#"
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute bottom-1/4 left-[10%] w-[350px] h-[350px] bg-brand-accent glow-blob rounded-full"></div>

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
            Certifications & Achievements
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Certificates Grid */}
        <div className="max-w-3xl mx-auto">
          {certsData.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glassmorphism rounded-3xl p-8 border border-white/5 relative overflow-hidden glassmorphism-hover group"
            >
              {/* Internal Accent Glow */}
              <div className="absolute right-0 top-0 w-48 h-48 bg-gradient-to-bl from-brand-primary/10 to-brand-secondary/10 opacity-50 filter blur-2xl rounded-full"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl text-brand-primary p-4 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 flex items-center justify-center shadow-lg shadow-brand-primary/10 group-hover:scale-110 transition-transform duration-300">
                    <FaAward />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-widest bg-brand-secondary/10 border border-brand-secondary/20 px-3 py-1 rounded-full">
                      {cert.issuer}
                    </span>
                    <h3 className="text-2xl font-bold text-brand-textPrimary mt-2 group-hover:text-brand-primary transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col md:items-end justify-center">
                  <span className="text-xs font-mono font-semibold text-brand-textSecondary">
                    {cert.date}
                  </span>
                  <a
                    href={cert.credentialUrl}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-secondary hover:text-brand-primary font-bold mt-2 transition-colors duration-200"
                  >
                    <span>Verify Credentials</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              </div>

              {/* Skills gained */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono font-semibold px-3 py-1 bg-white/5 text-brand-textSecondary border border-white/10 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Certificate details */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-brand-textPrimary tracking-widest mb-1">Key Experience & Scope:</h4>
                <ul className="space-y-2.5 text-sm text-brand-textSecondary">
                  {cert.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-brand-primary mr-2.5 mt-0.5 font-bold">▹</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
