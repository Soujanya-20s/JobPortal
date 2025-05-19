
package com.jobportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.model.Job;
import com.jobportal.repository.JobRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job postJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> searchByTitle(String title) {
        return jobRepository.findByTitleContaining(title);
    }

    public List<Job> searchByLocation(String location) {
        return jobRepository.findByLocationContaining(location);
    }

    // Method to get jobs available for a specific user
    public List<Job> getAvailableJobsForUser(Long userId) {
        return jobRepository.findAvailableJobsForUser(userId);
    }

    // New method to get a Job by its ID
    public Job getJobById(Long jobId) {
        return jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found with ID: " + jobId));
    }
}

