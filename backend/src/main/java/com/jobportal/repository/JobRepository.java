package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jobportal.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByLocationContaining(String location);
    List<Job> findByTitleContaining(String title);

    // ✅ Custom query to fetch jobs not applied by the given user
    @Query("SELECT j FROM Job j WHERE j.jobId NOT IN " +
           "(SELECT a.job.jobId FROM Application a WHERE a.user.userId = :userId)")
    List<Job> findAvailableJobsForUser(@Param("userId") Long userId);
}
