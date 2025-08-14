---
sidebar_position: 3
---

# 🛠️ Development Setup Guide

Complete guide for setting up your Constellation development environment, including environment configuration, local development, and testing.

---

## **🚀 Prerequisites**

### **Required Software**
- **Docker & Docker Compose**: For containerized development
- **Java 21**: For backend development
- **Node.js 20+**: For frontend development
- **Git**: Version control
- **IDE**: IntelliJ IDEA (recommended) or VS Code

### **System Requirements**
- **CPU**: 2+ cores
- **RAM**: 8+ GB recommended
- **Storage**: 20+ GB free space
- **OS**: macOS, Linux, or Windows with WSL2

---

## **🔧 Environment Configuration**

### **Backend Environment Variables**

Create a `.env` file in the `backend/` directory:

```bash
# Database Configuration
POSTGRES_DB=constellation
POSTGRES_USER=constellation_user
POSTGRES_PASSWORD=secure_password_here

# Server Configuration
FRONTEND_CLIENT_HOST=http://localhost:4200
BACKEND_BASE_URL=http://localhost:8081

# Authentication
AUTH_JWT_SECRET=your-super-secret-jwt-key-here
AUTH_JWT_EXPIRATION_MS=600000
AUTH_REFRESH_TOKEN_EXPIRATION_MS=604800000

# Google OAuth2
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe Configuration
STRIPE_PRIVATE_KEY=sk_test_your_stripe_private_key
STRIPE_WEBHOOK_SECRET_KEY=whsec_your_stripe_webhook_secret

# SendGrid Configuration
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_CLIENT_HOST=http://localhost:4200

# Ollama Configuration (Development)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2:7b
OLLAMA_TIMEOUT=30000
OLLAMA_MAX_TOKENS=2048
```

### **Frontend Environment Variables**

Create a `.env.local` file in the `frontend/` directory:

```bash
# Backend API Configuration
BACKEND_API_URL=http://localhost:8081
FRONTEND_CLIENT_HOST=http://localhost:4200

# Build Configuration
SOURCE_COMMIT=${GIT_COMMIT}
BUILD_TIMESTAMP=${BUILD_TIMESTAMP}
```

---

## **🏗️ Local Development Setup**

### **Option 1: Full Stack with Docker (Recommended)**

```bash
# Terminal 1 - Backend Services
cd backend
docker-compose up -d

# Terminal 2 - Frontend Services
cd frontend
docker-compose up -d
```

**Services Started:**
- **Backend API**: http://localhost:8081/api
- **Frontend**: http://localhost:4200
- **Database**: localhost:5432
- **AI Service**: http://localhost:11434

### **Option 2: Individual Service Development**

#### **Backend Development**
```bash
cd backend

# Start only database
docker-compose up constellation-db -d

# Run Spring Boot in IDE
./gradlew bootRun
```

#### **Frontend Development**
```bash
cd frontend

# Install dependencies
npm install

# Start development server
ng serve
```

---

## **🧪 Testing Setup**

### **Backend Testing**
```bash
cd backend

# Run unit tests
./gradlew test

# Run checkstyle
./gradlew checkstyleMain

# Run integration tests
./gradlew integrationTest
```

### **Frontend Testing**
```bash
cd frontend

# Run unit tests
npm test

# Run linting
npm run lint

# Run E2E tests
npm run e2e
```

---

## **🔍 Development Workflows**

### **Backend Development Workflow**
1. **Start Database**: `docker-compose up constellation-db -d`
2. **Run Application**: Use IDE or `./gradlew bootRun`
3. **Make Changes**: Edit Java/Kotlin code
4. **Test Changes**: Run tests and verify functionality
5. **Commit Changes**: Follow conventional commit format

### **Frontend Development Workflow**
1. **Start Backend**: Ensure backend is running
2. **Start Frontend**: `ng serve`
3. **Make Changes**: Edit TypeScript/SCSS/HTML
4. **Test Changes**: Verify in browser and run tests
5. **Mobile Testing**: Use Capacitor for mobile testing

### **Full-Stack Development Workflow**
1. **Start All Services**: Use Docker Compose
2. **Develop Features**: Work on both frontend and backend
3. **Integration Testing**: Test complete user flows
4. **Performance Testing**: Monitor response times and resource usage

---

## **📱 Mobile Development**

### **Capacitor Setup**
```bash
cd frontend

# Add platforms
npx cap add android
npx cap add ios

# Sync changes after build
npm run build
npx cap sync

# Open in native IDEs
npx cap open android
npx cap open ios
```

### **Mobile Testing**
- **Android**: Use Android Studio and emulator
- **iOS**: Use Xcode and iOS Simulator
- **Device Testing**: Test on physical devices
- **Performance**: Monitor mobile performance metrics

---

## **🔧 IDE Configuration**

### **IntelliJ IDEA (Recommended for Backend)**
1. **Import Project**: Open backend directory as Gradle project
2. **Enable EnvFile Plugin**: Load environment variables
3. **Configure Run Configuration**: Set up Spring Boot run config
4. **Enable Auto-Import**: Automatic dependency management

### **VS Code (Recommended for Frontend)**
1. **Install Extensions**: Angular, Ionic, TypeScript
2. **Configure Settings**: Set up workspace settings
3. **Enable Auto-Save**: Automatic file saving
4. **Configure Debugging**: Set up debugging for Angular

---

## **🚀 Performance Optimization**

### **Backend Performance**
- **Database Indexing**: Optimize PostgreSQL queries
- **Caching**: Implement Redis caching layer
- **Connection Pooling**: Optimize database connections
- **Async Processing**: Use async operations where possible

### **Frontend Performance**
- **Bundle Optimization**: Code splitting and lazy loading
- **Image Optimization**: Compress and optimize images
- **Caching**: Implement service worker caching
- **Lazy Loading**: Load components on demand

---

## **🐛 Troubleshooting**

### **Common Issues**

#### **Database Connection Issues**
```bash
# Check if PostgreSQL is running
docker ps | grep constellation-db

# Test database connection
docker-compose exec constellation-db pg_isready

# Check logs
docker-compose logs constellation-db
```

#### **Frontend Build Issues**
```bash
# Clear cache
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Angular version compatibility
ng version
```

#### **Port Conflicts**
```bash
# Check what's using the port
lsof -i :8081
lsof -i :4200

# Kill conflicting processes
kill -9 <PID>
```

### **Getting Help**
- **Documentation**: Check this documentation site
- **GitHub Issues**: Report bugs and request features
- **Community**: Join our developer community
- **Support**: Contact support for urgent issues

---

## **📚 Next Steps**

After setting up your development environment:

1. **Explore the Codebase**: Understand the architecture
2. **Run the Application**: Verify everything works
3. **Make Small Changes**: Start with simple modifications
4. **Read Documentation**: Understand the system better
5. **Join Development**: Contribute to the project

---

## **🔗 Additional Resources**

- **[Project Architecture](project-structure-overview.md)**: Understand the system design
- **[Getting Started](getting-started.md)**: Quick start guide
- **[Frontend Architecture](frontend-architecture.md)**: Frontend development details
- **[Deployment Guide](deployment.md)**: Production deployment instructions

---

**Happy Coding! 🚀** Your Constellation development environment is now ready for building amazing SaaS applications.
