-- ==========================================================
-- SQL DATABASE SETUP AND SEEDING SCRIPT (FOR MYSQL)
-- Run this script in MySQL Workbench, phpMyAdmin, or your SQL client.
-- ==========================================================

-- 1. Create and select Database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- 2. Drop existing tables if they exist to avoid conflicts
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS experience;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS about;

-- 3. Create 'about' table
CREATE TABLE about (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    details TEXT -- String List serialized with ';;'
);

-- 4. Create 'skills' table
CREATE TABLE skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL
);

-- 5. Create 'experience' table
CREATE TABLE experience (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL,
    responsibilities TEXT NOT NULL, -- String List serialized with ';;'
    location VARCHAR(255) NOT NULL
);

-- 6. Create 'education' table
CREATE TABLE education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    details TEXT
);

-- 7. Create 'projects' table
CREATE TABLE projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT NOT NULL,
    features TEXT, -- String List serialized with ';;'
    technologies TEXT, -- String List serialized with ';;'
    category VARCHAR(255) NOT NULL,
    github VARCHAR(255),
    demo VARCHAR(255)
);

-- 8. Create 'contacts' table (to store incoming message forms)
CREATE TABLE contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp VARCHAR(100) NOT NULL,
    ip_address VARCHAR(255),
    user_agent TEXT
);

-- ==========================================================
-- SEED DATA INSERTIONS
-- ==========================================================

-- Seed About Section
INSERT INTO about (title, bio, details) VALUES (
    'Designing High-Performance Applications with Modern Frameworks',
    'Full Stack Developer passionate about building secure, scalable, and user-friendly web applications. Skilled in Java, Spring Boot, React.js, MERN Stack, REST APIs, JWT Authentication, MySQL, and MongoDB. Strong problem-solving abilities with a passion for learning emerging technologies and delivering impactful software solutions.',
    'Language: Java, JS (ES6);;Frameworks: Spring Boot, React;;Location: Pune, MH, India'
);

-- Seed Skills
INSERT INTO skills (name, level, category, icon) VALUES 
('React.js', 90, 'Frontend', 'FaReact'),
('JavaScript', 85, 'Frontend', 'FaJs'),
('HTML5', 95, 'Frontend', 'FaHtml5'),
('CSS3', 90, 'Frontend', 'FaCss3Alt'),
('Tailwind CSS', 90, 'Frontend', 'SiTailwindcss'),
('Bootstrap', 80, 'Frontend', 'FaBootstrap'),
('Java', 85, 'Backend', 'FaJava'),
('Spring Boot', 85, 'Backend', 'SiSpringboot'),
('Node.js', 80, 'Backend', 'FaNodeJs'),
('Express.js', 80, 'Backend', 'SiExpress'),
('MongoDB', 80, 'Database', 'SiMongodb'),
('MySQL', 85, 'Database', 'SiMysql'),
('JWT Authentication', 90, 'Authentication', 'SiJsonwebtokens'),
('Role Based Control', 85, 'Authentication', 'FaUserShield'),
('Git', 85, 'Tools & Concepts', 'FaGitAlt'),
('GitHub', 90, 'Tools & Concepts', 'FaGithub'),
('Postman', 90, 'Tools & Concepts', 'SiPostman'),
('DSA', 80, 'Tools & Concepts', 'FaCode'),
('OOP Principles', 85, 'Tools & Concepts', 'FaCubes'),
('REST APIs', 95, 'Tools & Concepts', 'FaServer');

-- Seed Experience
INSERT INTO experience (role, company, duration, responsibilities, location) VALUES (
    'Web Development Intern',
    'Unified Mentor',
    'June 2023 - July 2023',
    'Developed and styled responsive, layout-friendly web pages, ensuring browser compatibility.;;Improved UI/UX experiences using standard semantic HTML, CSS, and modern JavaScript features.;;Collaborated and version-controlled codebase efficiently using Git and GitHub workflows.;;Worked on multiple real-world front-end web development sprints and projects.',
    'Remote, India'
);

-- Seed Education
INSERT INTO education (degree, institution, duration, grade, details) VALUES 
('Bachelor of Computer Engineering', 'Savitribai Phule Pune University (SPPU)', '2021 - 2025', '67.00%', 'Focused on core computing fundamentals including Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, and Software Engineering. Built web development prototypes and collaborated on project modules.'),
('HSC (Higher Secondary Certificate)', 'State Board of Maharashtra', '2020 - 2021', '77.33%', 'Specialized in Science (Physics, Chemistry, Mathematics) with introductory courses in computer application sciences and computer logic.'),
('SSC (Secondary School Certificate)', 'State Board of Maharashtra', '2018 - 2019', '78.20%', 'Completed secondary education with high standings in mathematics, science, and languages.');

-- Seed Projects
INSERT INTO projects (title, subtitle, description, features, technologies, category, github, demo) VALUES 
(
    'Fly Mail', 
    'Full Stack Email Application', 
    'A secure and responsive email platform built using MERN Stack, offering optimized message workflows and session control.',
    'JWT Authentication;;Two Factor Authentication (2FA);;Protected Routes & Navigation;;User Session Management;;CRUD Operations on Mails;;RESTful APIs;;Responsive User Interface',
    'React.js;;Node.js;;Express.js;;MongoDB;;JWT',
    'MERN Stack',
    'https://github.com/Ompawar7511',
    '#'
),
(
    'BookBazzar', 
    'Full Stack Book Store Application', 
    'Secure e-commerce platform for books featuring granular role-based authorization and smooth transaction handling.',
    'JWT Authentication;;Interactive Shopping Cart;;Order Management System;;Admin Dashboard for Books;;Inventory Management;;Robust REST APIs',
    'Spring Boot;;React.js;;MySQL;;JWT',
    'Java & Spring Boot',
    'https://github.com/Ompawar7511',
    '#'
),
(
    'Krishi Bridge', 
    'Farmer & Transporter Platform', 
    'Web platform connecting farmers with local transport providers to ease distribution logistics and coordinate vehicle booking.',
    'Vehicle Booking Schedulers;;Transport Route Matching;;Farmer Operations Dashboard;;Transporter Job Dashboard;;Secure System Authentication;;Real-Time Data Management',
    'React.js;;Node.js;;Express.js;;MongoDB',
    'MERN Stack',
    'https://github.com/Ompawar7511',
    '#'
),
(
    'B2B E-Commerce Platform', 
    'Enterprise Transaction Platform', 
    'A robust secure enterprise portal enabling business transactions and real-time pricing negotiations between vendors and shopkeepers.',
    'Product Inventory Management;;Vendor Order Processing;;PDF Invoice Generation;;Real-Time Negotiation & Chat;;JWT Auth & Role-Based Control',
    'J2EE;;MySQL;;JWT',
    'J2EE & MySQL',
    'https://github.com/Ompawar7511',
    '#'
);
