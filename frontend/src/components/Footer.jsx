import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

const Footer = () => {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-brand-bg border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Logo */}
        <a 
          href="#home"
          onClick={(e) => handleScrollTo(e, '#home')}
          className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent mb-6"
        >
          &lt;OM PAWAR /&gt;
        </a>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 max-w-2xl text-center">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm text-brand-textSecondary hover:text-brand-primary transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 mb-8">
          <a
            href="https://www.linkedin.com/in/om-pawar-425b40286/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-brand-textSecondary hover:text-brand-secondary transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Ompawar7511"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-brand-textSecondary hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:ompawar7511@gmail.com"
            className="text-xl text-brand-textSecondary hover:text-brand-primary transition-colors duration-200"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl h-[1px] bg-white/5 mb-6"></div>

        {/* Copyright */}
        <div className="text-center text-xs text-brand-textSecondary font-mono">
          <p>© 2026 Om Pawar. All Rights Reserved.</p>
          <p className="mt-1 opacity-70">Designed & Engineered with React & Tailwind</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
