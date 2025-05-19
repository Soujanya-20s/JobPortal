
package com.jobportal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.model.Application;
import com.jobportal.service.ApplicationService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Application>> getApplicationsByUserId(@PathVariable Long id) {
        List<Application> applications = applicationService.getApplicationsByUser(id);
        return ResponseEntity.ok(applications);
    }

    // ✅ Updated to support file upload
    @PostMapping("/upload")
    public ResponseEntity<Application> applyJob(
            @RequestParam("resume") MultipartFile resume,
            @RequestParam("userId") Long userId,
            @RequestParam("jobId") Long jobId
    ) {
        Application savedApplication = applicationService.applyJob(userId, jobId, resume);
        return ResponseEntity.ok(savedApplication);
    }

}
