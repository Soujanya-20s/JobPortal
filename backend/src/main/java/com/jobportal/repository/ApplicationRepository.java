package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserUserId(Long userId);
    List<Application> findByJobJobId(Long jobId);
}

