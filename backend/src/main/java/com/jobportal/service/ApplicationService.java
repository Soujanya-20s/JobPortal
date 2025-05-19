
package com.jobportal.service;

import com.jobportal.model.Application;
import com.jobportal.model.Job;
import com.jobportal.model.User;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    // Directory where resumes will be saved
    private final String uploadDir = "uploads/";

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public Application applyJob(Long userId, Long jobId, MultipartFile resume) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found with ID: " + jobId));

        Application application = new Application();
        application.setUser(user);
        application.setJob(job);
        application.setAppliedAt(LocalDateTime.now());

        if (resume != null && !resume.isEmpty()) {
            try {
                // Ensure upload directory exists
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Create a unique file name
                String fileName = System.currentTimeMillis() + "_" + resume.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                Files.write(filePath, resume.getBytes());

                // Save the resume path in the database
                application.setResumeLink(filePath.toString());

            } catch (IOException e) {
                throw new RuntimeException("Failed to save resume file", e);
            }
        } else {
            throw new RuntimeException("Resume file is missing");
        }

        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByUser(Long userId) {
        return applicationRepository.findByUserUserId(userId);
    }
}



