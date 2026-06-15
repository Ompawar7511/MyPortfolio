import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const categories = ["All", "MERN Stack", "Java & Spring Boot", "J2EE & MySQL"];

const defaultProjects = [
  {
    id: 1,
    title: "Fly Mail",
    subtitle: "Full Stack Email Application",
    description: "A secure and responsive email platform built using MERN Stack, offering optimized message workflows and session control.",
    features: [
      "JWT Authentication",
      "Two Factor Authentication (2FA)",
      "Protected Routes & Navigation",
      "User Session Management",
      "CRUD Operations on Mails",
      "RESTful APIs",
      "Responsive User Interface"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    category: "MERN Stack",
    github: "https://github.com/Ompawar7511",
    demo: "#"
  },
  {
    id: 2,
    title: "BookBazzar",
    subtitle: "Full Stack Book Store Application",
    description: "Secure e-commerce platform for books featuring granular role-based authorization and smooth transaction handling.",
    features: [
      "JWT Authentication",
      "Interactive Shopping Cart",
      "Order Management System",
      "Admin Dashboard for Books",
      "Inventory Management",
      "Robust REST APIs"
    ],
    technologies: ["Spring Boot", "React.js", "MySQL", "JWT"],
    category: "Java & Spring Boot",
    github: "https://github.com/Ompawar7511",
    demo: "#"
  },
  {
    id: 3,
    title: "Krishi Bridge",
    subtitle: "Farmer & Transporter Platform",
    description: "Web platform connecting farmers with local transport providers to ease distribution logistics and coordinate vehicle booking.",
    features: [
      "Vehicle Booking Schedulers",
      "Transport Route Matching",
      "Farmer Operations Dashboard",
      "Transporter Job Dashboard",
      "Secure System Authentication",
      "Real-Time Data Management"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    category: "MERN Stack",
    github: "https://github.com/Ompawar7511",
    demo: "#"
  },
  {
    id: 4,
    title: "B2B E-Commerce Platform",
    subtitle: "Enterprise Transaction Platform",
    description: "A robust secure enterprise portal enabling business transactions and real-time pricing negotiations between vendors and shopkeepers.",
    features: [
      "Product Inventory Management",
      "Vendor Order Processing",
      "PDF Invoice Generation",
      "Real-Time Negotiation & Chat",
      "JWT Auth & Role-Based Control"
    ],
    technologies: ["J2EE", "MySQL", "JWT"],
    category: "J2EE & MySQL",
    github: "https://github.com/Ompawar7511",
    demo: "#"
  }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projectsList, setProjectsList] = useState(defaultProjects);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data.length > 0) setProjectsList(data);
      })
      .catch(err => {
        console.log("Using static fallback for Projects section.");
      });
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projectsList 
    : projectsList.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Ambient background blob */}
      <div className="absolute top-1/4 left-[10%] w-[350px] h-[350px] bg-brand-primary glow-blob rounded-full"></div>

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
            My Projects
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-xl mx-auto bg-white/5 p-1 rounded-full border border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                activeFilter === cat 
                  ? 'text-brand-bg font-extrabold' 
                  : 'text-brand-textSecondary hover:text-white'
              }`}
            >
              {activeFilter === cat && (
                <motion.span
                  layoutId="activeProjectFilter"
                  className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id || project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glassmorphism rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col justify-between glassmorphism-hover relative group overflow-hidden"
              >
                {/* Background ambient lighting */}
                <div className="absolute -right-10 -top-10 w-36 h-36 bg-gradient-to-br from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full filter blur-xl"></div>

                <div>
                  {/* Category Header */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono font-bold text-brand-secondary bg-brand-secondary/10 border border-brand-secondary/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-brand-textPrimary group-hover:text-brand-primary transition-colors">
                    {project.title}
                  </h3>
                  <h4 className="text-sm font-medium text-brand-textSecondary mt-0.5 mb-4">
                    {project.subtitle}
                  </h4>

                  <p className="text-brand-textSecondary text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <h5 className="text-xs font-mono font-bold uppercase text-brand-textPrimary tracking-widest mb-3">Key Features:</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-brand-textSecondary">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-brand-primary mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stacks & Action Links */}
                <div>
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-6 border-t border-white/5 pt-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] md:text-xs font-mono px-2.5 py-1 bg-white/5 text-brand-textSecondary border border-white/10 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.demo}
                      className="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-bg rounded-lg hover:opacity-95 shadow-md hover:shadow-brand-primary/10 transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.03]"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-xs font-bold glassmorphism border border-white/10 text-brand-textPrimary rounded-lg hover:border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.03]"
                    >
                      <FaGithub className="text-sm" />
                      <span>GitHub Code</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
