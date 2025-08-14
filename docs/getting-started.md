---
slug: /
sidebar_position: 1
---

# 🚀 Quick Start Guide

Welcome to **Constellation**! This guide will help you set up and run Constellation locally. You'll find instructions on requirements, setup, and how to run each service individually or all at once.

---

## Requirements

Before you begin, ensure you have the following tools installed on your system:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (for frontend development)
- [NPM](https://www.npmjs.com/) (for frontend development)
- [Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) (for backend development)
- [Gradle](https://gradle.org/) (Backend application includes a Gradle wrapper, so no installation is required)

---

## Running Constellation Using Docker Compose

### **Option 1: Run All Services Together**

To run all services together, you'll need to start both backend and frontend:

```bash
# Terminal 1 - Backend Services
cd backend
docker-compose up

# Terminal 2 - Frontend Services  
cd frontend
docker-compose up
```

### **Option 2: Run Backend Services Only**

To run only the backend services (API, database, AI service):

```bash
cd backend
docker-compose up
```

This will start:
- **Backend (constellation-server)** - Spring Boot API
- **Database (constellation-db)** - PostgreSQL database
- **AI Service (constellation-ollama)** - Ollama AI service

### **Option 3: Run Frontend Services Only**

To run only the frontend services:

```bash
cd frontend
docker-compose up
```

This will start:
- **Frontend (constellation-frontend)** - Ionic/Angular application

---

## Environment Configuration

Before running, ensure you have the necessary environment variables set up. Copy the example `.env` file to create your configuration:

```bash
# Backend environment
cd backend
cp .env.example .env

# Frontend environment (if needed)
cd frontend
cp .env.local.example .env.local
```

---

## Service Ports and Access

When running all services, they will be accessible on their respective ports:

- **Frontend**: `http://localhost:4200`
- **Backend API**: `http://localhost:8081/api`
- **Database**: `localhost:5432`
- **AI Service**: `http://localhost:11434`
- **Documentation**: `http://localhost:3000` (if running docs separately)

---

## Running Each Service Individually

### 1. **Database (Backend)**

To start the PostgreSQL database:

```bash
cd backend
docker-compose up constellation-db -d
```

This launches the database container in detached mode.

---

### 2. **Backend (Server)**

The backend is a Spring Boot application. To run it locally using IntelliJ IDEA:

1. Open your project in IntelliJ IDEA.

2. In the toolbar, click on `Run` -> `Edit Configurations`.

3. Click on the `+` button to create a new configuration.

4. Select `Spring Boot` as the configuration type.

5. Check the Enable EnvFile checkbox and add the path to the .env file in the table below.

6. Click `Apply` and then `OK`.

7. Now you can run the backend by clicking on the `Run` button.

The backend will be accessible at `http://localhost:8081`.

**Note**: Make sure the EnvFile plugin is installed and enabled in your IntelliJ IDEA.

**Alternative**: Run via Docker Compose
```bash
cd backend
docker-compose up constellation-server
```

---

### 3. **Frontend (Frontend)**

The frontend is an Ionic/Angular application. To run it locally:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

The frontend will be accessible at `http://localhost:4200`.

**Alternative**: Run via Docker Compose
```bash
cd frontend
docker-compose up
```

---

### 4. **AI Service (Ollama)**

To start the Ollama AI service:

```bash
cd backend
docker-compose up constellation-ollama -d
```

This launches the Ollama container in detached mode, accessible at `http://localhost:11434`.

---

### 5. **Documentation (Docs)**

The documentation is built using Docusaurus. To run it locally:

1. Navigate to the `docs` directory:
   ```bash
   cd docs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The documentation will be accessible at `http://localhost:3000`.

---

## Development Workflow

### **Full-Stack Development**
1. Start backend services: `cd backend && docker-compose up -d`
2. Start frontend services: `cd frontend && docker-compose up -d`
3. Access frontend at `http://localhost:4200`
4. Frontend will automatically proxy API calls to backend at `http://localhost:8081`

### **Backend-Only Development**
1. Start database: `cd backend && docker-compose up constellation-db -d`
2. Run Spring Boot application in your IDE
3. Access API at `http://localhost:8081/api`

### **Frontend-Only Development**
1. Ensure backend is running or update `frontend/.env.local` with backend URL
2. Run `ng serve` in frontend directory
3. Access at `http://localhost:4200`

---

## Troubleshooting

### **Port Conflicts**
If you encounter port conflicts:
- Check which services are using the ports: `lsof -i :8081` or `lsof -i :4200`
- Stop conflicting services or change ports in docker-compose files

### **Database Connection Issues**
- Ensure PostgreSQL container is running: `docker ps | grep constellation-db`
- Check environment variables in `.env` file
- Verify database health: `docker-compose exec constellation-db pg_isready`

### **Frontend-Backend Communication**
- Verify backend is running and accessible at `http://localhost:8081/api`
- Check CORS configuration in backend
- Ensure environment variables are properly set in frontend

---

## Next Steps

Once you have the basic services running, you can:

1. **Explore the API**: Visit `http://localhost:8081/api` to see available endpoints
2. **Test Authentication**: Use the frontend to register/login users
3. **Configure External Services**: Set up SendGrid, Stripe, and Google OAuth2
4. **Explore AI Features**: Test Ollama integration at `http://localhost:11434`

For detailed configuration of external services, see the respective documentation sections.
