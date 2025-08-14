---
sidebar_position: 9
---

# 🚀 Deployment & Production

---

## **Deployment Architecture**

Constellation uses a **multi-repository deployment strategy** with separate backend and frontend repositories, each with their own deployment pipeline. This approach provides independent deployment capabilities while maintaining service integration.

---

## **Deployment Strategy**

By default, Constellation uses **Coolify** to manage the application and deploy it to the server (in this case, a VPS). This approach provides a self-hosted Platform-as-a-Service (PaaS) solution that's both powerful and cost-effective.

### **Why Coolify/Dokploy?**

These platforms significantly speed up workflows, reduce maintenance time to nearly zero, and eliminate the need to wrestle with IAM and other "conveniences" of the cloud. Plus, they are **free and open source**!

If you've never tried a self-hosted PaaS (Platform-as-a-Service), you'll be amazed at how easy and efficient it is to use. The only small drawback is that for a seamless experience, you need at least **2 CPUs** and **2 GB of RAM**. Personally, I use **2 CPUs** and **8 GB of RAM**.

---

## **Repository Structure**

### **Backend Repository**
- **Location**: `backend/` directory
- **Technology**: Spring Boot with Docker
- **Services**: API server, database, AI service
- **Deployment**: Independent deployment via Coolify

### **Frontend Repository**
- **Location**: `frontend/` directory  
- **Technology**: Ionic/Angular with Capacitor
- **Services**: Web application, mobile app
- **Deployment**: Independent deployment via Coolify

---

## **VPS Requirements**

### **Minimum Specifications**
- **CPU**: 2 cores minimum
- **RAM**: 2 GB minimum (8 GB recommended)
- **Storage**: 20 GB minimum
- **Network**: Stable internet connection

### **Recommended Providers**

#### **For Testing/Short-term**
**[Digital Ocean](https://www.digitalocean.com/?refcode=6b5a58087031&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)** is a great option for testing or short-term setups.

#### **For Long-term/Cost-effective**
For cost-effective long-term hosting, consider providers like **[Hostinger](https://hostinger.pl?REFERRALCODE=EISABRAMOPJU)**, which are more budget-friendly.

---

## **Deployment Setup**

### **1. Backend Deployment**

#### **Configure VPS with Coolify**
1. Set up your VPS with Coolify
2. Configure the backend repository
3. Set up environment variables
4. Configure Docker services

#### **Required Environment Variables**
```bash
# Database Configuration
POSTGRES_DB=constellation
POSTGRES_USER=constellation_user
POSTGRES_PASSWORD=secure_password

# JWT Configuration
AUTH_JWT_SECRET=your-secret-key-here
AUTH_JWT_EXPIRATION_MS=600000
AUTH_REFRESH_TOKEN_EXPIRATION_MS=604800000

# External Services
SENDGRID_API_KEY=your-sendgrid-key
STRIPE_PRIVATE_KEY=your-stripe-key
STRIPE_WEBHOOK_SECRET_KEY=your-webhook-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Frontend Integration
FRONTEND_CLIENT_HOST=https://yourdomain.com
BACKEND_BASE_URL=https://yourdomain.com
```

#### **Docker Services**
```yaml
# Backend services
constellation-db: PostgreSQL database
constellation-server: Spring Boot API
constellation-ollama: AI service
```

### **2. Frontend Deployment**

#### **Configure Frontend Repository**
1. Set up frontend repository in Coolify
2. Configure build environment
3. Set up environment variables
4. Configure deployment strategy

#### **Required Environment Variables**
```bash
# Backend API Configuration
BACKEND_API_URL=https://yourdomain.com:8081
FRONTEND_CLIENT_HOST=https://yourdomain.com

# Build Configuration
SOURCE_COMMIT=${GIT_COMMIT}
BUILD_TIMESTAMP=${BUILD_TIMESTAMP}
```

#### **Build Configuration**
```json
{
  "scripts": {
    "build": "npm run sync:environment && ng build",
    "build:docker": "SKIP_SYNC_ENV=1 ng build"
  }
}
```

---

## **CI/CD Integration**

### **Backend CI/CD**
- **Trigger**: Changes in `backend/` directory
- **Pipeline**: `pipeline-ci-backend.yml`
- **Deployment**: Automatic deployment to Coolify
- **Environment**: Production environment variables

### **Frontend CI/CD**
- **Trigger**: Changes in `frontend/` directory
- **Pipeline**: Independent CI/CD pipeline
- **Deployment**: Automatic deployment to Coolify
- **Environment**: Production environment variables

---

## **Deployment Steps**

### **1. Initial Setup**
```bash
# Clone repositories
git clone <backend-repo-url>
git clone <frontend-repo-url>

# Configure environment variables
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# Update environment variables with production values
```

### **2. Backend Deployment**
```bash
# Navigate to backend directory
cd backend

# Update docker-compose.yml with production values
# Set environment variables
# Deploy via Coolify
```

### **3. Frontend Deployment**
```bash
# Navigate to frontend directory
cd frontend

# Update environment variables
# Configure build settings
# Deploy via Coolify
```

---

## **Environment Configuration**

### **Production Environment**
```yaml
# Backend production configuration
spring:
  profiles:
    active: production
  datasource:
    url: jdbc:postgresql://constellation-db:5432/${POSTGRES_DB}
  
server:
  port: 8081
  servlet:
    context-path: /api

# Frontend production configuration
BACKEND_API_URL=https://yourdomain.com:8081
FRONTEND_CLIENT_HOST=https://yourdomain.com
```

### **Development Environment**
```yaml
# Backend development configuration
spring:
  profiles:
    active: development
  datasource:
    url: jdbc:postgresql://localhost:5432/constellation_dev

server:
  port: 8081
  servlet:
    context-path: /api

# Frontend development configuration
BACKEND_API_URL=http://localhost:8081
FRONTEND_CLIENT_HOST=http://localhost:4200
```

---

## **Service Integration**

### **Network Configuration**
- **Backend Network**: `constellation-network`
- **Frontend Network**: `frontend-network`
- **Service Communication**: Via environment variables and Docker networking

### **API Integration**
- **Backend API**: `https://yourdomain.com:8081/api`
- **Frontend Proxy**: Frontend proxies API calls to backend
- **CORS Configuration**: Properly configured for production domains

---

## **Monitoring and Maintenance**

### **Health Checks**
```yaml
# Backend health checks
healthcheck:
  test: ["CMD-SHELL", "curl -s -o /dev/null -w '%{http_code}' http://localhost:8081/api/health | grep -q '200' || exit 1"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 60s

# Frontend health checks
healthcheck:
  test: ["CMD-SHELL", "./health-check.sh"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 30s
```

### **Logging and Monitoring**
- **Application Logs**: Centralized logging via Coolify
- **Performance Monitoring**: Resource usage and response times
- **Error Tracking**: Application error monitoring and alerting
- **Uptime Monitoring**: Service availability monitoring

---

## **Security Considerations**

### **Production Security**
- **HTTPS**: SSL/TLS encryption for all communications
- **Firewall**: Proper firewall configuration for VPS
- **Access Control**: Limited SSH access and secure key management
- **Regular Updates**: Keep system and dependencies updated

### **Environment Security**
- **Secret Management**: Secure storage of API keys and secrets
- **Database Security**: Secure database access and encryption
- **API Security**: Rate limiting and authentication
- **Webhook Security**: Secure webhook endpoints

---

## **Backup and Recovery**

### **Data Backup**
- **Database**: Regular PostgreSQL backups
- **Configuration**: Environment variable backups
- **Application**: Docker image backups
- **User Data**: User preferences and settings backup

### **Recovery Procedures**
- **Service Recovery**: Automated service restart procedures
- **Data Recovery**: Database restoration procedures
- **Configuration Recovery**: Environment restoration procedures
- **Disaster Recovery**: Complete system recovery procedures

---

## **Scaling Considerations**

### **Horizontal Scaling**
- **Load Balancing**: Multiple backend instances
- **Database Clustering**: PostgreSQL read replicas
- **CDN Integration**: Content delivery network for static assets
- **Auto-scaling**: Automatic scaling based on load

### **Vertical Scaling**
- **Resource Allocation**: Increase CPU and RAM allocation
- **Storage Scaling**: Expand storage capacity
- **Network Optimization**: Optimize network configuration
- **Performance Tuning**: Application and database optimization

---

## **Troubleshooting**

### **Common Issues**
- **Service Startup**: Check environment variables and dependencies
- **Network Issues**: Verify Docker networking and firewall configuration
- **Database Connection**: Check database credentials and connectivity
- **API Integration**: Verify CORS and proxy configuration

### **Debugging Tools**
- **Docker Logs**: `docker-compose logs <service-name>`
- **Service Status**: `docker-compose ps`
- **Network Inspection**: `docker network inspect <network-name>`
- **Health Checks**: Manual health check verification

---

## **Future Enhancements**

### **Planned Improvements**
- **Kubernetes Support**: Container orchestration platform
- **Multi-region Deployment**: Geographic distribution
- **Advanced Monitoring**: Prometheus and Grafana integration
- **Automated Testing**: End-to-end testing in deployment pipeline

### **Integration Expansion**
- **CI/CD Enhancement**: Advanced deployment strategies
- **Infrastructure as Code**: Terraform or Pulumi integration
- **Service Mesh**: Advanced service communication
- **Observability**: Enhanced logging and tracing  