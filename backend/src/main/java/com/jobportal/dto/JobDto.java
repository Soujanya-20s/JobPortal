package com.jobportal.dto;

import com.jobportal.model.Job;

public class JobDto {

	 private Long jobId;
	    private String title;
	    private String description;
	    private String location;
	    private String salary;

	    // Constructor to map from Job entity
	    public JobDto(Job job) {
	        this.jobId = job.getJobId();
	        this.title = job.getTitle();
	        this.description = job.getDescription();
	        this.location = job.getLocation();
	        this.salary = job.getSalary();
	    }

	    // Getters
	    public Long getJobId() {
	        return jobId;
	    }

	    public String getTitle() {
	        return title;
	    }

	    public String getDescription() {
	        return description;
	    }

	    public String getLocation() {
	        return location;
	    }

	    public String getSalary() {
	        return salary;
	    }
	
}
