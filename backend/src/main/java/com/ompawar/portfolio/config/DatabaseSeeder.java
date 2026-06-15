package com.ompawar.portfolio.config;

import com.ompawar.portfolio.model.*;
import com.ompawar.portfolio.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final AboutRepository aboutRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final ProjectRepository projectRepository;

    public DatabaseSeeder(AboutRepository aboutRepository, SkillRepository skillRepository,
                          ExperienceRepository experienceRepository, EducationRepository educationRepository,
                          ProjectRepository projectRepository) {
        this.aboutRepository = aboutRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed About bio
        if (aboutRepository.count() == 0) {
            About about = About.builder()
                .title("Designing High-Performance Applications with Modern Frameworks")
                .bio("Full Stack Developer passionate about building secure, scalable, and user-friendly web applications. Skilled in Java, Spring Boot, React.js, MERN Stack, REST APIs, JWT Authentication, MySQL, and MongoDB. Strong problem-solving abilities with a passion for learning emerging technologies and delivering impactful software solutions.")
                .details(Arrays.asList("Language: Java, JS (ES6)", "Frameworks: Spring Boot, React", "Location: Pune, MH, India"))
                .build();
            aboutRepository.save(about);
            System.out.println("Seeded About section in MySQL.");
        }

        // 2. Seed Skills
        if (skillRepository.count() == 0) {
            skillRepository.saveAll(Arrays.asList(
                // Frontend
                Skill.builder().name("React.js").level(90).category("Frontend").icon("FaReact").build(),
                Skill.builder().name("JavaScript").level(85).category("Frontend").icon("FaJs").build(),
                Skill.builder().name("HTML5").level(95).category("Frontend").icon("FaHtml5").build(),
                Skill.builder().name("CSS3").level(90).category("Frontend").icon("FaCss3Alt").build(),
                Skill.builder().name("Tailwind CSS").level(90).category("Frontend").icon("SiTailwindcss").build(),
                Skill.builder().name("Bootstrap").level(80).category("Frontend").icon("FaBootstrap").build(),
                // Backend
                Skill.builder().name("Java").level(85).category("Backend").icon("FaJava").build(),
                Skill.builder().name("Spring Boot").level(85).category("Backend").icon("SiSpringboot").build(),
                Skill.builder().name("Node.js").level(80).category("Backend").icon("FaNodeJs").build(),
                Skill.builder().name("Express.js").level(80).category("Backend").icon("SiExpress").build(),
                // Database
                Skill.builder().name("MongoDB").level(80).category("Database").icon("SiMongodb").build(),
                Skill.builder().name("MySQL").level(85).category("Database").icon("SiMysql").build(),
                // Authentication
                Skill.builder().name("JWT Authentication").level(90).category("Authentication").icon("SiJsonwebtokens").build(),
                Skill.builder().name("Role Based Control").level(85).category("Authentication").icon("FaUserShield").build(),
                // Tools & Concepts
                Skill.builder().name("Git").level(85).category("Tools & Concepts").icon("FaGitAlt").build(),
                Skill.builder().name("GitHub").level(90).category("Tools & Concepts").icon("FaGithub").build(),
                Skill.builder().name("Postman").level(90).category("Tools & Concepts").icon("SiPostman").build(),
                Skill.builder().name("DSA").level(80).category("Tools & Concepts").icon("FaCode").build(),
                Skill.builder().name("OOP Principles").level(85).category("Tools & Concepts").icon("FaCubes").build(),
                Skill.builder().name("REST APIs").level(95).category("Tools & Concepts").icon("FaServer").build()
            ));
            System.out.println("Seeded Skills section in MySQL.");
        }

        // 3. Seed Experience
        if (experienceRepository.count() == 0) {
            Experience exp = Experience.builder()
                .role("Web Development Intern")
                .company("Unified Mentor")
                .duration("June 2023 - July 2023")
                .location("Remote, India")
                .responsibilities(Arrays.asList(
                    "Developed and styled responsive, layout-friendly web pages, ensuring browser compatibility.",
                    "Improved UI/UX experiences using standard semantic HTML, CSS, and modern JavaScript features.",
                    "Collaborated and version-controlled codebase efficiently using Git and GitHub workflows.",
                    "Worked on multiple real-world front-end web development sprints and projects."
                ))
                .build();
            experienceRepository.save(exp);
            System.out.println("Seeded Experience section in MySQL.");
        }

        // 4. Seed Education
        if (educationRepository.count() == 0) {
            educationRepository.saveAll(Arrays.asList(
                Education.builder()
                    .degree("Bachelor of Computer Engineering")
                    .institution("Savitribai Phule Pune University (SPPU)")
                    .duration("2021 - 2025")
                    .grade("67.00%")
                    .details("Focused on core computing fundamentals including Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, and Software Engineering. Built web development prototypes and collaborated on project modules.")
                    .build(),
                Education.builder()
                    .degree("HSC (Higher Secondary Certificate)")
                    .institution("State Board of Maharashtra")
                    .duration("2020 - 2021")
                    .grade("77.33%")
                    .details("Specialized in Science (Physics, Chemistry, Mathematics) with introductory courses in computer application sciences and computer logic.")
                    .build(),
                Education.builder()
                    .degree("SSC (Secondary School Certificate)")
                    .institution("State Board of Maharashtra")
                    .duration("2018 - 2019")
                    .grade("78.20%")
                    .details("Completed secondary education with high standings in mathematics, science, and languages.")
                    .build()
            ));
            System.out.println("Seeded Education section in MySQL.");
        }

        // 5. Seed Projects
        if (projectRepository.count() == 0) {
            projectRepository.saveAll(Arrays.asList(
                Project.builder()
                    .title("Fly Mail")
                    .subtitle("Full Stack Email Application")
                    .description("A secure and responsive email platform built using MERN Stack, offering optimized message workflows and session control.")
                    .features(Arrays.asList(
                        "JWT Authentication",
                        "Two Factor Authentication (2FA)",
                        "Protected Routes & Navigation",
                        "User Session Management",
                        "CRUD Operations on Mails",
                        "RESTful APIs",
                        "Responsive User Interface"
                    ))
                    .technologies(Arrays.asList("React.js", "Node.js", "Express.js", "MongoDB", "JWT"))
                    .category("MERN Stack")
                    .github("https://github.com/Ompawar7511")
                    .demo("#")
                    .build(),
                Project.builder()
                    .title("BookBazzar")
                    .subtitle("Full Stack Book Store Application")
                    .description("Secure e-commerce platform for books featuring granular role-based authorization and smooth transaction handling.")
                    .features(Arrays.asList(
                        "JWT Authentication",
                        "Interactive Shopping Cart",
                        "Order Management System",
                        "Admin Dashboard for Books",
                        "Inventory Management",
                        "Robust REST APIs"
                    ))
                    .technologies(Arrays.asList("Spring Boot", "React.js", "MySQL", "JWT"))
                    .category("Java & Spring Boot")
                    .github("https://github.com/Ompawar7511")
                    .demo("#")
                    .build(),
                Project.builder()
                    .title("Krishi Bridge")
                    .subtitle("Farmer & Transporter Platform")
                    .description("Web platform connecting farmers with local transport providers to ease distribution logistics and coordinate vehicle booking.")
                    .features(Arrays.asList(
                        "Vehicle Booking Schedulers",
                        "Transport Route Matching",
                        "Farmer Operations Dashboard",
                        "Transporter Job Dashboard",
                        "Secure System Authentication",
                        "Real-Time Data Management"
                    ))
                    .technologies(Arrays.asList("React.js", "Node.js", "Express.js", "MongoDB"))
                    .category("MERN Stack")
                    .github("https://github.com/Ompawar7511")
                    .demo("#")
                    .build(),
                Project.builder()
                    .title("B2B E-Commerce Platform")
                    .subtitle("Enterprise Transaction Platform")
                    .description("A robust secure enterprise portal enabling business transactions and real-time pricing negotiations between vendors and shopkeepers.")
                    .features(Arrays.asList(
                        "Product Inventory Management",
                        "Vendor Order Processing",
                        "PDF Invoice Generation",
                        "Real-Time Negotiation & Chat",
                        "JWT Auth & Role-Based Control"
                      ))
                    .technologies(Arrays.asList("J2EE", "MySQL", "JWT"))
                    .category("J2EE & MySQL")
                    .github("https://github.com/Ompawar7511")
                    .demo("#")
                    .build()
            ));
            System.out.println("Seeded Projects section in MySQL.");
        }
    }
}
