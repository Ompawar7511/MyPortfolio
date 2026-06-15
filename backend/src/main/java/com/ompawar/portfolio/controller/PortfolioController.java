package com.ompawar.portfolio.controller;

import com.ompawar.portfolio.model.*;
import com.ompawar.portfolio.repository.*;
import com.ompawar.portfolio.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow React requests
public class PortfolioController {

    private final AboutRepository aboutRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final ProjectRepository projectRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    public PortfolioController(AboutRepository aboutRepository, SkillRepository skillRepository,
                               ExperienceRepository experienceRepository, EducationRepository educationRepository,
                               ProjectRepository projectRepository, ContactMessageRepository contactMessageRepository,
                               EmailService emailService) {
        this.aboutRepository = aboutRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.projectRepository = projectRepository;
        this.contactMessageRepository = contactMessageRepository;
        this.emailService = emailService;
    }

    // 1. GET /api/about
    @GetMapping("/about")
    public ResponseEntity<?> getAbout() {
        List<About> abouts = aboutRepository.findAll();
        if (abouts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("About details not found.");
        }
        return ResponseEntity.ok(abouts.get(0));
    }

    // 2. GET /api/skills
    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(skillRepository.findAll());
    }

    // 3. GET /api/experience
    @GetMapping("/experience")
    public ResponseEntity<List<Experience>> getExperience() {
        return ResponseEntity.ok(experienceRepository.findAll());
    }

    // 4. GET /api/education
    @GetMapping("/education")
    public ResponseEntity<List<Education>> getEducation() {
        return ResponseEntity.ok(educationRepository.findAll());
    }

    // 5. GET /api/projects
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(projectRepository.findAll());
    }

    // 6. POST /api/contact
    @PostMapping("/contact")
    public ResponseEntity<?> saveContact(@RequestBody Map<String, String> request, jakarta.servlet.http.HttpServletRequest httpRequest) {
        String name = request.get("user_name");
        String email = request.get("user_email");
        String subject = request.get("subject");
        String message = request.get("message");

        if (name == null || email == null || subject == null || message == null) {
            return ResponseEntity.badRequest().body("All fields are required.");
        }

        String ipAddress = httpRequest.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = httpRequest.getRemoteAddr();
        }
        if (ipAddress != null && ipAddress.contains(",")) {
            ipAddress = ipAddress.split(",")[0].trim();
        }

        String userAgent = httpRequest.getHeader("User-Agent");

        ContactMessage msg = ContactMessage.builder()
                .name(name)
                .email(email)
                .subject(subject)
                .message(message)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .timestamp(Instant.now().toString())
                .build();

        ContactMessage saved = contactMessageRepository.save(msg);

        // Send emails asynchronously to prevent blocking the REST API response
        java.util.concurrent.CompletableFuture.runAsync(() -> {
            try {
                emailService.sendOwnerNotification(saved);
                emailService.sendVisitorAcknowledgment(saved);
            } catch (Exception e) {
                // Logged in EmailService, catch here as safety net
            }
        });

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Contact message saved to MySQL successfully.");
        response.put("id", saved.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
