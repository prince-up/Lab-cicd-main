# CI/CD Pipeline Management System

A full-stack application to trigger and monitor Jenkins pipelines for GitHub repositories.

## Prerequisites

1.  **Jenkins** running on `http://localhost:8080`.
2.  **Maven** installed and configured in Jenkins.
3.  **Node.js** installed.
4.  **Jenkins Credentials**: You need your Jenkins User and API Token.

## Project Structure

- `backend/`: Node.js + Express Server.
- `frontend/`: React + Vite + TailwindCSS Client.
- `Jenkinsfile`: Pipeline definition.

## Setup Instructions

### 1. Jenkins Setup

1.  Open Jenkins.
2.  Create a new **Pipeline** job named `Universal-Builder`.
3.  In the job configuration:
    -   Check "This project is parameterized".
    -   Add a **String Parameter** named `REPO_URL`.
    -   In the **Pipeline** section, choose **Pipeline script from SCM**.
    -   SCM: **Git**.
    -   Repository URL: *Path to this project's git repo or the `Jenkinsfile` location*.
    -   Script Path: `Jenkinsfile`.
    -   **OR** simpler for testing: Copy the content of `Jenkinsfile` from this project and paste it into the **Pipeline Script** box.
4.  Ensure Maven is configured in "Global Tool Configuration" or available in PATH.

### 2. Backend Setup

1.  Navigate to `backend` folder.
2.  (Optional) Update `src/main/resources/application.properties` with your Jenkins credentials.
3.  Run the application using Maven:
    ```bash
    mvn spring-boot:run
    ```
    Server runs on `http://localhost:5000`.

### 3. Frontend Setup

1.  Navigate to `frontend` folder.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the dev server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173`.

## Usage

1.  Enter a GitHub Repository URL (e.g., a Maven project).
2.  Click **Build Now**.
3.  Watch the status update from `QUEUED` -> `RUNNING` -> `SUCCESS` / `FAILED`.
