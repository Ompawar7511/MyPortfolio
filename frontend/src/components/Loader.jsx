import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const loadingStatuses = [
    "Initializing system components...",
    "Loading Java & Spring Boot libraries...",
    "Setting up React framework...",
    "Securing API integrations...",
    "Retrieving experience records...",
    "Rendering visual environment...",
    "Welcome to Om Pawar's portfolio..."
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        const diff = Math.floor(Math.random() * 10) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 120);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    if (progress < 100) {
      const statusTimer = setInterval(() => {
        setStatusIndex((prev) => (prev + 1) % loadingStatuses.length);
      }, 500);
      return () => clearInterval(statusTimer);
    }
  }, [progress, loadingStatuses.length]);

  useEffect(() => {
    if (progress === 100) {
      const completionTimer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(completionTimer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-brand-bg z-50 flex flex-col items-center justify-center font-sans p-6 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-primary glow-blob rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-secondary glow-blob rounded-full"></div>

      <div className="max-w-md w-full glassmorphism p-8 rounded-2xl border border-white/10 relative z-10 flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center space-x-2 pb-4 mb-6 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-brand-textSecondary pl-2 font-mono">portfolio_loader.sh</span>
        </div>

        {/* Developer Logo */}
        <div className="flex items-center justify-center mb-8">
          <motion.div 
            className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            &lt;OM PAWAR /&gt;
          </motion.div>
        </div>

        {/* Terminal Logging */}
        <div className="font-mono text-sm text-left h-24 mb-6 flex flex-col justify-end text-brand-textSecondary">
          <div className="text-brand-primary/80">
            $ npm run bootstrap_portfolio
          </div>
          <div className="text-white mt-1">
            &gt; {loadingStatuses[statusIndex]}
          </div>
          <div className="text-xs text-white/50 mt-1">
            Progress: {progress}%
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeInOut' }}
          />
        </div>
        
        <div className="flex justify-between items-center text-xs text-brand-textSecondary font-mono mt-2">
          <span>SYSTEM ONLINE</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
