package com.cicd.manager.controller;

import com.cicd.manager.service.JenkinsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite frontend
public class PipelineController {

    @Autowired
    private JenkinsService jenkinsService;

    @PostMapping("/build")
    public ResponseEntity<?> triggerBuild(@RequestBody Map<String, String> payload) {
        String repoUrl = payload.get("repoUrl");
        if (repoUrl == null || repoUrl.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "GitHub Repository URL is required"));
        }

        try {
            Map<String, Object> result = jenkinsService.triggerBuild(repoUrl);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/status/{jobName}")
    public ResponseEntity<?> getStatus(@PathVariable String jobName) {
        try {
            Map<String, Object> status = jenkinsService.getBuildStatus(jobName);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/logs/{jobName}/{buildNumber}")
    public ResponseEntity<?> getBuildLogs(@PathVariable String jobName, @PathVariable int buildNumber) {
        try {
            String logs = jenkinsService.getBuildLogs(jobName, buildNumber);
            return ResponseEntity.ok(Map.of("logs", logs));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/builds/{jobName}")
    public ResponseEntity<?> getAllBuilds(@PathVariable String jobName) {
        try {
            var builds = jenkinsService.getAllBuilds(jobName);
            return ResponseEntity.ok(builds);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
