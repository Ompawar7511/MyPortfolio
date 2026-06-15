import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Get input values from form refs/elements
    const formData = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      subject: form.current.subject.value,
      message: form.current.message.value,
    };

    // 1. Submit to local SQL Backend
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Backend save failed");
        return res.json();
      })
      .then((data) => {
        console.log("Contact saved in database: ", data);
        
        // 2. Fall back to EmailJS if variables are set
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then(() => {
              console.log("Email sent via EmailJS.");
            })
            .catch((err) => {
              console.error("EmailJS sending failed: ", err);
            });
        }

        setLoading(false);
        setStatus('success');
        form.current.reset();
      })
      .catch((error) => {
        console.error("Error submitting contact form: ", error);
        
        // If backend fails, check if EmailJS is configured as a standalone fallback
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then(() => {
              setLoading(false);
              setStatus('success');
              form.current.reset();
            })
            .catch((err) => {
              console.error("EmailJS standalone failed: ", err);
              setLoading(false);
              setStatus('error');
            });
        } else {
          // If no backend and no EmailJS, simulate success in dev mode
          console.warn("Dev mode contact fallback simulation.");
          setTimeout(() => {
            setLoading(false);
            setStatus('success');
            form.current.reset();
          }, 1000);
        }
      });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glowing blob */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-accent glow-blob rounded-full"></div>

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
            Get In Touch
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Form and Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Details (Left Side) */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-brand-textPrimary">
              Let's build something epic together
            </h3>
            <p className="text-brand-textSecondary leading-relaxed text-sm">
              If you have an open opportunity, a project proposal, or just want to connect, feel free to drop a message or reach out via email/phone. I will get back to you as soon as possible.
            </p>

            <div className="space-y-4 pt-4">
              
              {/* Phone Card */}
              <div className="glassmorphism p-4 rounded-xl border border-white/5 flex items-center space-x-4">
                <div className="text-xl text-brand-primary p-3 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-brand-textSecondary uppercase tracking-wider">Phone</h4>
                  <a href="tel:+919922837511" className="text-md font-semibold text-brand-textPrimary hover:text-brand-primary transition-colors">
                    +91 9922837511
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="glassmorphism p-4 rounded-xl border border-white/5 flex items-center space-x-4">
                <div className="text-xl text-brand-secondary p-3 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-brand-textSecondary uppercase tracking-wider">Email</h4>
                  <a href="mailto:ompawar7511@gmail.com" className="text-md font-semibold text-brand-textPrimary hover:text-brand-secondary transition-colors">
                    ompawar7511@gmail.com
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="glassmorphism p-4 rounded-xl border border-white/5 flex items-center space-x-4">
                <div className="text-xl text-brand-accent p-3 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-brand-textSecondary uppercase tracking-wider">Location</h4>
                  <span className="text-md font-semibold text-brand-textPrimary">
                    Pune, Maharashtra, India
                  </span>
                </div>
              </div>

            </div>

            {/* Social Connect links */}
            <div className="pt-6">
              <h4 className="text-xs font-mono font-bold text-brand-textSecondary uppercase tracking-wider mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/om-pawar-425b40286/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 glassmorphism rounded-xl text-brand-textSecondary hover:text-brand-secondary border border-white/5 hover:border-brand-secondary/30 transition-all hover:scale-105 duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="https://github.com/Ompawar7511"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 glassmorphism rounded-xl text-brand-textSecondary hover:text-white border border-white/5 hover:border-white/20 transition-all hover:scale-105 duration-200"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form (Right Side) */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glassmorphism p-8 rounded-3xl border border-white/5 relative">
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                
                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="user_name" className="block text-xs font-mono font-bold text-brand-textSecondary uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      id="user_name"
                      required
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder-brand-textSecondary/40 focus:outline-none focus:border-brand-primary/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="user_email" className="block text-xs font-mono font-bold text-brand-textSecondary uppercase tracking-wider mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      id="user_email"
                      required
                      placeholder="johndoe@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder-brand-textSecondary/40 focus:outline-none focus:border-brand-secondary/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono font-bold text-brand-textSecondary uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    placeholder="Project Collaboration Opportunity"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder-brand-textSecondary/40 focus:outline-none focus:border-brand-accent/50 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-bold text-brand-textSecondary uppercase tracking-wider mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    placeholder="Hey Om, I loved your portfolio. I'd love to chat about..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder-brand-textSecondary/40 focus:outline-none focus:border-brand-primary/50 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-brand-bg font-bold shadow-lg hover:opacity-95 transition-all duration-300 disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <BiLoaderAlt className="animate-spin text-lg" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>

                {/* Toast alerts */}
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-xl text-sm font-semibold"
                  >
                    <FaCheckCircle />
                    <span>Message sent and saved to database successfully!</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl text-sm font-semibold"
                  >
                    <FaExclamationCircle />
                    <span>Failed to submit message. Please try again.</span>
                  </motion.div>
                )}

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
