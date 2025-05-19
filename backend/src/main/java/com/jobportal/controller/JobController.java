
package com.jobportal.controller;

import com.jobportal.dto.JobDto;
import com.jobportal.model.Job;
import com.jobportal.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public List<JobDto> getAllJobs() {
        List<Job> jobs = jobService.getAllJobs();
        return jobs.stream().map(JobDto::new).collect(Collectors.toList());
    }

    @GetMapping("/available/user/{userId}")
    public List<JobDto> getAvailableJobsForUser(@PathVariable Long userId) {
        List<Job> jobs = jobService.getAvailableJobsForUser(userId);
        return jobs.stream().map(JobDto::new).collect(Collectors.toList());
    }
}
