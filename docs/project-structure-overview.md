---
sidebar_position: 2
---

# 🏗️ Project Architecture Overview

---

## **Current Architecture**

Constellation is organized as a **monorepo** with clear separation between backend and frontend applications:

```
constellation/
├── backend/          # Spring Boot backend application
├── frontend/         # Ionic/Angular frontend application
└── docs/            # Project documentation
```

---

### **Backend Directory (`backend/`)**

The backend contains the Spring Boot application with the following structure:

- **`server/`** - Spring Boot application
    - **`src/main/java/com/saas/springular`**: Main application code, following a **Hybrid package structure**:
        - **`common`**: Shared utilities and logic.
            - **`security`**: Authentication, JWT, OAuth2, and security configuration
            - **`stripe`**: Everything related to Stripe integration is encapsulated in this folder. Classes here are **package-private**, ensuring better encapsulation and easier maintenance.
            - **`ai`**: AI and embeddings foundation (ongoing development)
            - **`email`**: Email service integration with SendGrid
            - **`exception`**: Global exception handling and custom exceptions
            - **`util`**: Utility classes and helpers
            - **`config`**: Application configuration classes
            - **`health`**: Health check endpoints
            - **`revenuecat`**: RevenueCat integration for mobile subscriptions
        - **`user`**: Domain-specific logic for user management.
        - _&lt;new packages for each domain/feature, not by layer&gt;_
      - **`src/main/resources`**:
          - **`db/migration`**: Flyway migration scripts in SQL format.
          - **`templates/emails`**: Email templates (can use Thymeleaf HTML or SendGrid templates).
          - **`application.yml`**: The main configuration file for the backend application.
    - **`docker-compose.yml`** - Backend services orchestration
    - **`Dockerfile`** - Backend container configuration

### **Frontend Directory (`frontend/`)**

The frontend contains the Ionic/Angular application with the following structure:

- **`src/app/`** - Angular application code
    - **`core/`**: Shared services, guards, interceptors, and constants
    - **`domains/`**: Feature modules organized by domain
        - **`auth/`**: Authentication pages and components
        - **`home/`**: Home page and related components
        - **`tasks/`**: Task management functionality
        - **`settings/`**: User settings and preferences
        - **`tabs/`**: Main navigation tabs
    - **`shared/`**: Shared components, directives, and modules
    - **`store/`**: State management using @ngneat/elf
    - **`widgets/`**: Cross-cutting concerns like internationalization
- **`src/assets/`** - Static assets and internationalization files
- **`src/theme/`** - Theme and styling configuration
- **`android/`** - Android-specific configuration
- **`ios/`** - iOS-specific configuration
- **`Dockerfile`** - Frontend container configuration
- **`docker-compose.yml`** - Frontend standalone setup

---

### **Documentation Directory (`docs/`)**

- **`docs/`**: Markdown files for the documentation.
- **`docusaurus.config.ts`**: Configuration for Docusaurus.
- **`sidebars.ts`**: Documentation navigation structure.

---

## **Important Files**

- **`backend/docker-compose.yml`** - Defines the infrastructure of the backend services. This file is used for deploying **Constellation** to a VPS using **Coolify**.

- **`frontend/docker-compose.yml`** - Frontend standalone setup for development and testing.

- **`.env`** - Stores all environment variables.  
  _You can initialize the base `.env` file using the following command:_
  ```bash
  cp .env.example .env
  ```

---

## **Integration Architecture**

### **Current Structure**
- **Backend Repository**: Contains Spring Boot server with backend-specific files
- **Frontend Repository**: Contains complete Ionic/Angular application with Docker setup
- **Integration**: Maintained through Docker networking and API proxy configuration

### **Service Communication**
- **Backend API**: Runs on port 8081 with context path `/api`
- **Frontend**: Runs on port 4200, proxies API calls to backend
- **Database**: PostgreSQL running on port 5432
- **AI Service**: Ollama running on port 11434

### **Docker Networking**
- Backend services use `constellation-network`
- Frontend services use `frontend-network`
- Services communicate through Docker networking and environment variables

---

## **Development Workflow**

### **Local Development**
1. **Backend**: Run `docker-compose up` in `backend/` directory
2. **Frontend**: Run `docker-compose up` in `frontend/` directory
3. **Individual Services**: Can be run independently for development

### **CI/CD Pipeline**
- **Backend**: Independent CI/CD pipeline for Spring Boot application
- **Frontend**: Independent CI/CD pipeline for Ionic/Angular application
- **Integration**: Coordinated through Docker Compose and environment configuration

---

## **Key Benefits of Current Architecture**

- **Independent Development**: Backend and frontend can be developed independently
- **Clear Separation**: Clear boundaries between different application layers
- **Scalability**: Each service can be scaled independently
- **Technology Flexibility**: Different teams can work on different technologies
- **Maintenance**: Easier to maintain and update individual components
