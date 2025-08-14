---
sidebar_position: 5
---

# 🔐 Authentication & Security

Constellation provides a complete authentication system built with **Spring Security** and uses **JWT** for managing authentication via **access** and **refresh tokens**. The implementation includes comprehensive security features and follows industry best practices.

---

## **Core Authentication Features**

### **Email/Password Authentication**
- **User Registration**: Allows new users to create accounts with email validation
- **User Login**: Authenticates existing users using email and password
- **Password Reset**: Enables users to reset their passwords via email
- **Remember Me**: Optional persistent authentication across sessions

### **Social Login Integration**
- **Google OAuth2**: Supports login using Google accounts
- **Provider Management**: Tracks authentication provider for each user
- **Seamless Integration**: Combines social and traditional authentication

---

## **Technical Implementation**

### **JWT Token Management**

#### **Token Structure**
- **Access Token**: Short-lived token for API authentication
- **Refresh Token**: Long-lived token for token renewal
- **Token Claims**: User email, roles, and authentication metadata

#### **Token Configuration**
```yaml
auth:
  jwt-secret: '${AUTH_JWT_SECRET}'
  jwt-expiration-ms: '${AUTH_JWT_EXPIRATION_MS:600000}'        # 10 minutes
  refresh-token-expiration-ms: '${AUTH_REFRESH_TOKEN_EXPIRATION_MS:604800000}'  # 7 days
```

#### **Token Security Features**
- **HMAC-SHA256** signing algorithm
- **Base64-encoded** secret keys
- **Configurable expiration** times
- **Automatic token refresh** via interceptor

### **Security Configuration**

#### **Spring Security Setup**
- **Stateless Sessions**: No server-side session storage
- **CORS Configuration**: Environment-driven origins
- **CSRF Protection**: Disabled for API endpoints
- **Method Security**: `@PreAuthorize` and `@Secured` annotations

#### **Protected Endpoints**
```java
// Public endpoints (no authentication required)
.requestMatchers(
    "/swagger-ui/**",
    "/v3/api-docs/**",
    "/users/login",
    "/users/signup",
    "/users/forgot-password",
    "/users/reset-password",
    "/webhook",
    "/oauth2/**",
    "/auth/**",
    "/api/oauth2/**",
    "/oauth2/callback/**",
    "/api/health/**"
).permitAll()
.anyRequest().authenticated()
```

#### **CORS Configuration**
```java
// Environment-driven CORS origins
String frontendHost = System.getenv("FRONTEND_CLIENT_HOST");
if (frontendHost != null && !frontendHost.isEmpty()) {
    corsConfiguration.setAllowedOrigins(List.of(
        "http://localhost:4200",
        "http://localhost:8081",
        frontendHost
    ));
}
```

---

## **User Management**

### **User Entity Structure**
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Email
    @Column(unique = true, nullable = false)
    private String email;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<UserRole> roles = new HashSet<>();
    
    private String stripeCustomerId;
    private boolean hasAccess;
    
    @Enumerated(EnumType.STRING)
    private SecurityEnums.AuthProviderId registeredProviderName;
    
    private String registeredProviderId;
}
```

### **User Roles and Permissions**
- **ROLE_USER**: Basic authenticated user
- **ROLE_ADMIN**: Administrative privileges
- **Extensible**: Easy to add new roles and permissions

### **Authentication Provider Tracking**
- **email_password**: Traditional email/password authentication
- **google**: Google OAuth2 authentication
- **Extensible**: Support for additional providers

---

## **OAuth2 Integration**

### **Google OAuth2 Setup**
```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            clientId: ${GOOGLE_CLIENT_ID}
            clientSecret: ${GOOGLE_CLIENT_SECRET}
            redirectUri: "${BACKEND_BASE_URL}/oauth2/callback/{registrationId}"
            scope: email, profile
```

### **OAuth2 Flow**
1. **Authorization**: User redirected to Google for consent
2. **Callback**: Google redirects back with authorization code
3. **Token Exchange**: Backend exchanges code for access token
4. **User Info**: Retrieves user information from Google
5. **Account Creation/Linking**: Creates or links existing account

### **OAuth2 Endpoints**
- **Authorization**: `/oauth2/authorize`
- **Callback**: `/oauth2/callback/*`
- **User Info**: Automatic user service integration

---

## **Password Management**

### **Password Security**
- **BCrypt Hashing**: Secure password storage using Spring Security's default encoder
- **Configurable Strength**: Adjustable password complexity requirements
- **Secure Reset**: Time-limited reset tokens with secure generation

### **Password Reset Flow**
1. **Request Reset**: User requests password reset via email
2. **Token Generation**: Secure random token generated and stored
3. **Email Delivery**: Reset link sent via SendGrid
4. **Token Validation**: Time-limited token validation
5. **Password Update**: Secure password update with new hash

### **Reset Token Security**
```java
// Secure token generation
private String generateSecureToken() {
    var randomBytes = new byte[32];
    secureRandom.nextBytes(randomBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
}

// Token expiration check
private boolean isTokenExpired(PasswordResetToken passToken) {
    var cal = Calendar.getInstance();
    return passToken.getExpiryDate().before(cal.getTime());
}
```

---

## **API Security**

### **JWT Interceptor**
- **Automatic Token Addition**: Adds Bearer token to all API requests
- **Token Refresh**: Automatic refresh of expired tokens
- **Error Handling**: Proper 401 handling and token refresh logic

### **Route Guards**
- **Functional Guards**: Modern Angular-style functional route guards
- **Authentication Check**: Automatic redirect to login for protected routes
- **Query Parameter Preservation**: Maintains original request URI for post-login redirect

### **Security Headers**
- **Authorization**: Bearer token for authenticated requests
- **CORS Headers**: Proper cross-origin resource sharing
- **Content Security**: Secure content type handling

---

## **Environment Configuration**

### **Required Environment Variables**
```bash
# JWT Configuration
AUTH_JWT_SECRET=your-secret-key-here
AUTH_JWT_EXPIRATION_MS=600000
AUTH_REFRESH_TOKEN_EXPIRATION_MS=604800000

# OAuth2 Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
BACKEND_BASE_URL=http://localhost:8081

# Frontend Configuration
FRONTEND_CLIENT_HOST=http://localhost:4200
```

### **Security Best Practices**
- **Strong Secrets**: Use cryptographically strong random secrets
- **Environment Isolation**: Different secrets for different environments
- **Secret Rotation**: Regular secret rotation for production environments
- **Access Control**: Limit access to environment variables

---

## **Testing and Development**

### **Local Development**
- **H2 Database**: In-memory database for testing
- **Test Profiles**: Separate configuration for testing
- **Mock Services**: Configurable external service mocking

### **Security Testing**
- **Authentication Tests**: Comprehensive authentication flow testing
- **Authorization Tests**: Role-based access control testing
- **Token Validation**: JWT token validation testing
- **OAuth2 Flow**: Complete OAuth2 integration testing

---

## **Monitoring and Logging**

### **Security Events**
- **Login Attempts**: Track successful and failed login attempts
- **Token Operations**: Monitor token creation, refresh, and validation
- **OAuth2 Flows**: Track OAuth2 authentication flows
- **Password Operations**: Monitor password changes and resets

### **Audit Trail**
- **User Actions**: Track user authentication and authorization events
- **Security Violations**: Log security-related violations and attempts
- **Token Usage**: Monitor JWT token usage patterns

---

## **Future Enhancements**

### **Planned Features**
- **Multi-Factor Authentication**: SMS or app-based 2FA
- **Social Login Expansion**: Additional OAuth2 providers
- **Advanced Role Management**: Hierarchical roles and permissions
- **Session Management**: Enhanced session tracking and control

### **Security Improvements**
- **Rate Limiting**: API rate limiting for authentication endpoints
- **Advanced Threat Detection**: Anomaly detection for suspicious activities
- **Compliance Features**: GDPR and privacy compliance tools