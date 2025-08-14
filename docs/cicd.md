---
sidebar_position: 4
---

# 🔄 CI/CD Pipeline

---

## Workflow Overview

The CI/CD workflow is focused on the **Backend CI/CD Pipeline** only. The frontend has its own independent CI/CD pipeline in the separate frontend repository.

The main workflow is defined in the `cicd.yml` file and leverages the reusable workflow:
- `pipeline-ci-backend.yml`

---

## Backend CI/CD Pipeline

### Trigger Conditions
- Triggered on `push` and `pull_request` events to the `main` branch.
- Monitors changes in the following paths:
    - `server/**`
    - `docker-compose.yml`
    - `.github/workflows/*-backend.yml`

### Feature Flags (Inputs)
| Input                         | Description                 | Default Value |
|-------------------------------|-----------------------------|---------------|
| BACKEND_COMPILE_ENABLED       | Enable compile job          | `true`        |
| BACKEND_CHECKSTYLE_ENABLED    | Enable checkstyle job       | `true`        |
| BACKEND_UNIT_TESTS_ENABLED    | Enable unit tests job       | `true`        |
| BACKEND_BUILD_ENABLED         | Enable build job            | `true`        |

### Jobs

1. **Compile** (compiles gradle application)
2. **Checkstyle** (runs checkstyle analysis)
3. **Unit tests** (runs unit tests)
4. **Build** (build Spring Boot application)

---

## Additional Jobs

### Changes Detection
Identifies whether changes occurred in backend paths.

### Docker Compose
Builds and starts backend services using Docker Compose if changes are detected.

| Input                    | Description                   | Default Value |
|--------------------------|-------------------------------|---------------|
| DOCKER_COMPOSE_ENABLED   | Enable Docker Compose job     | `true`        |
| DEPLOY_ENABLED           | Enable Coolify deployment job | `false`       |

### Deployment
Triggers deployment to Coolify (two `SECRET` variables are needed: `COOLIFY_WEBHOOK` and `COOLIFY_TOKEN`).

---

## Secrets

The workflows rely on the following secrets:
- `COOLIFY_WEBHOOK`: URL for triggering deployment.
- `COOLIFY_TOKEN`: Authorization token for Coolify.

---

## **Current Architecture**

### **Repository Structure**
- **Backend Repository**: Independent Spring Boot API with backend-only CI/CD
- **Frontend Repository**: Independent Ionic/Angular app with its own CI/CD pipeline
- **Integration**: Both repos can run independently while maintaining API connectivity

### **CI/CD Independence**
- **Backend**: Uses `pipeline-ci-backend.yml` only
- **Frontend**: Has independent CI (`ci.yml`) and CD (`cicd.yml`) pipelines in its own repository
- **No Cross-Repository Dependencies**: Each repository manages its own CI/CD independently

### **Benefits of Current Structure**
- **Independent Development**: Backend and frontend teams can work independently
- **Focused Pipelines**: Each repository has optimized CI/CD for its specific technology stack
- **Faster Builds**: No waiting for cross-repository dependencies
- **Easier Maintenance**: Simpler pipeline configuration and debugging
- **Technology-Specific Optimization**: Backend uses Gradle/Java tools, frontend uses Node.js/Angular tools

---

## **Workflow Files**

### **Main Workflow**
- `cicd.yml` - Main orchestrator workflow that triggers backend CI/CD

### **Reusable Workflows**
- `pipeline-ci-backend.yml` - Backend-specific CI/CD pipeline

### **Removed Workflows**
- `pipeline-ci-frontend.yml` - Moved to frontend repository
- Frontend-related jobs in main `cicd.yml` - Moved to frontend repository

---

## **Integration Notes**

### **What Changed**
- **Architecture**: Monorepo → Multi-repository
- **CI/CD**: Single orchestrator → Independent pipelines
- **Frontend**: Moved to separate repository with enhanced CI/CD
- **Backend**: Now backend-only, removed frontend dependencies

### **Current State**
- **Backend**: Uses `pipeline-ci-backend.yml` only
- **Frontend**: Has independent CI (`ci.yml`) and CD (`cicd.yml`) pipelines
- **Integration**: Both repos can run independently while maintaining API connectivity

### **Deployment Coordination**
- **Backend**: Deploys to backend services via Coolify
- **Frontend**: Deploys to frontend services via its own pipeline
- **Coordination**: Services communicate via Docker networking and environment variables
