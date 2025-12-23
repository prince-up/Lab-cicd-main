package com.cicd.manager.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class JenkinsService {

    @Value("${jenkins.url}")
    private String jenkinsUrl;

    @Value("${jenkins.user}")
    private String jenkinsUser;

    @Value("${jenkins.token}")
    private String jenkinsToken;

    private final RestTemplate restTemplate = new RestTemplate();

    private HttpHeaders createHeaders() {
        return new HttpHeaders() {{
            String auth = jenkinsUser + ":" + jenkinsToken;
            byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes(StandardCharsets.US_ASCII));
            String authHeader = "Basic " + new String(encodedAuth);
            set("Authorization", authHeader);
        }};
    }

    public Map<String, Object> triggerBuild(String repoUrl) {
        String jobName = "Universal-Builder";
        String triggerUrl = jenkinsUrl + "/job/" + jobName + "/buildWithParameters?REPO_URL=" + repoUrl;

        try {
            ResponseEntity<Void> response = restTemplate.exchange(
                triggerUrl, 
                HttpMethod.POST, 
                new HttpEntity<>(createHeaders()), 
                Void.class
            );

            Map<String, Object> result = new HashMap<>();
            if (response.getStatusCode().is2xxSuccessful()) {
                 result.put("message", "Build triggered successfully");
                 result.put("jobName", jobName);
                 // Jenkins returns Location header for Queue Item, simpler to just return jobName for polling
                 return result;
            }
            throw new RuntimeException("Failed to trigger build: " + response.getStatusCode());
            
        } catch (Exception e) {
            throw new RuntimeException("Error communicating with Jenkins: " + e.getMessage());
        }
    }

    public Map<String, Object> getBuildStatus(String jobName) {
        String statusUrl = jenkinsUrl + "/job/" + jobName + "/lastBuild/api/json";

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                statusUrl,
                HttpMethod.GET,
                new HttpEntity<>(createHeaders()),
                Map.class
            );

            Map<String, Object> body = response.getBody();
            if (body == null) throw new RuntimeException("No body in response");

            boolean building = (Boolean) body.get("building");
            String result = (String) body.get("result");
            int number = (Integer) body.get("number");

            String status = "RUNNING";
            if (!building) {
                status = result != null ? result : "UNKNOWN";
            }

            Map<String, Object> statusMap = new HashMap<>();
            statusMap.put("status", status);
            statusMap.put("buildNumber", number);
            
            return statusMap;

        } catch (Exception e) {
             // If 404, maybe no build yet
             if (e.getMessage().contains("404")) {
                 Map<String, Object> empty = new HashMap<>();
                 empty.put("status", "QUEUED");
                 return empty;
             }
             throw new RuntimeException("Error fetching status: " + e.getMessage());
        }
    }

    public String getBuildLogs(String jobName, int buildNumber) {
        String logsUrl = jenkinsUrl + "/job/" + jobName + "/" + buildNumber + "/consoleText";

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                logsUrl,
                HttpMethod.GET,
                new HttpEntity<>(createHeaders()),
                String.class
            );
            return response.getBody() != null ? response.getBody() : "";
        } catch (Exception e) {
            throw new RuntimeException("Error fetching logs: " + e.getMessage());
        }
    }

    public Map<String, Object> getAllBuilds(String jobName) {
        String buildsUrl = jenkinsUrl + "/job/" + jobName + "/api/json?tree=builds[number,result,building,timestamp,duration,url]";

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                buildsUrl,
                HttpMethod.GET,
                new HttpEntity<>(createHeaders()),
                Map.class
            );
            return response.getBody() != null ? response.getBody() : new HashMap<>();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching builds: " + e.getMessage());
        }
    }
}
