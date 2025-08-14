---
sidebar_position: 7
---

# 📧 Email System & Providers

Constellation uses **SendGrid** to send emails with comprehensive email management capabilities. The system supports both template-based and dynamic email generation with secure delivery and tracking.

---

## **SendGrid Integration**

### **Overview**
SendGrid is a cloud-based email service that provides reliable email delivery, analytics, and template management. Constellation integrates with SendGrid to handle all email communications including authentication, notifications, and transactional emails.

### **Key Features**
- **High Deliverability**: Professional email infrastructure with 99.9%+ delivery rates
- **Template Management**: Drag-and-drop template editor and custom HTML templates
- **Email Analytics**: Track opens, clicks, bounces, and delivery statistics
- **API Integration**: RESTful API for programmatic email sending
- **Webhook Support**: Real-time delivery and engagement notifications

---

## **Configuration**

### **Environment Variables**
```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.your-api-key-here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_CLIENT_HOST=https://yourdomain.com
```

### **Application Configuration**
```yaml
spring:
  sendgrid:
    api-key: '${SENDGRID_API_KEY}'

sendgrid:
  from-email: '${SENDGRID_FROM_EMAIL}'
  client-host: '${SENDGRID_CLIENT_HOST}'
```

---

## **Email Service Implementation**

### **Core Email Service**
```java
@Service
public class EmailService {
    
    private final SendGrid sendGrid;
    private final SendGridConfigurationProperties config;
    
    public void sendSingleEmail(EmailTemplate emailTemplate) {
        // Implementation for sending individual emails
    }
    
    public void sendBulkEmails(List<EmailTemplate> emailTemplates) {
        // Implementation for bulk email sending
    }
}
```

### **Email Template Model**
```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailTemplate {
    private String subject;
    private String receiverEmail;
    private String templateName;
    private Map<String, Object> templateVariables;
    private String htmlContent;
    private String textContent;
}
```

---

## **Email Templates**

Constellation supports two approaches for email templates, giving you flexibility in how you manage email content and design.

### **1. Thymeleaf HTML Templates**

Email templates are stored in `resources/templates/emails` and use Thymeleaf for dynamic content generation.

#### **Template Location**
```
src/main/resources/templates/emails/
├── forgot-password.html
├── welcome.html
├── subscription-confirmation.html
└── password-reset.html
```

#### **Template Features**
- **Dynamic Content**: Use Thymeleaf expressions for personalized content
- **HTML Support**: Full HTML email design capabilities
- **Variable Substitution**: Pass dynamic data from Java code
- **Conditional Rendering**: Show/hide content based on conditions
- **Loop Support**: Iterate over collections of data

#### **Example Template**
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Password Reset</title>
</head>
<body>
    <h1>Hello <span th:text="${name}">User</span>!</h1>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a th:href="${resetUrl}" th:text="${resetUrl}">Reset Password</a>
    <p>This link will expire in 24 hours.</p>
</body>
</html>
```

#### **Usage in Code**
```java
private void sendForgotPasswordEmail(HttpServletRequest request, String userEmail, String token) {
    var url = request.getScheme() + "://" + 
              sendGridConfigurationProperties.getClientHost() + 
              "/auth/new-password?token=" + token;

    var emailTemplate = EmailTemplate.builder()
            .subject("Reset Your Password")
            .receiverEmail(userEmail)
            .templateName("emails/forgot-password")
            .templateVariables(Map.of(
                    "name", "User",
                    "resetUrl", url
            ))
            .build();

    emailService.sendSingleEmail(emailTemplate);
}
```

### **2. SendGrid Templates**

You can also use SendGrid's built-in template system to create and manage email designs.

#### **Template Creation**
- **Drag-and-Drop Editor**: Use SendGrid's visual template editor
- **Custom HTML**: Write custom HTML templates in SendGrid
- **Template Versioning**: Manage multiple versions of templates
- **A/B Testing**: Test different template variations

#### **Integration Steps**
1. Create a template in SendGrid dashboard
2. Note the template ID
3. Use the template ID in your email service calls
4. Pass dynamic data as template variables

#### **Usage Example**
```java
public void sendWelcomeEmail(String userEmail, String userName) {
    var emailTemplate = EmailTemplate.builder()
            .subject("Welcome to Constellation!")
            .receiverEmail(userEmail)
            .templateName("d-1234567890abcdef") // SendGrid template ID
            .templateVariables(Map.of(
                    "userName", userName,
                    "loginUrl", "https://yourdomain.com/login"
            ))
            .build();
    
    emailService.sendSingleEmail(emailTemplate);
}
```

---

## **Email Types and Use Cases**

### **Authentication Emails**
- **Welcome Email**: Sent after successful user registration
- **Password Reset**: Sent when user requests password reset
- **Email Verification**: Sent for email address verification
- **Login Notification**: Sent for suspicious login attempts

### **Subscription Emails**
- **Subscription Confirmation**: Sent after successful subscription
- **Payment Reminders**: Sent before payment due dates
- **Subscription Updates**: Sent when subscription changes
- **Cancellation Confirmation**: Sent when subscription is cancelled

### **Notification Emails**
- **System Updates**: Important system announcements
- **Feature Notifications**: New feature announcements
- **Security Alerts**: Security-related notifications
- **Maintenance Notices**: Scheduled maintenance notifications

---

## **Email Content Management**

### **Dynamic Content Generation**
```java
// Template variables for dynamic content
Map<String, Object> variables = Map.of(
    "userName", user.getName(),
    "resetUrl", generateResetUrl(token),
    "expiryTime", "24 hours",
    "supportEmail", "support@yourdomain.com"
);
```

### **Localization Support**
- **Multi-language Templates**: Support for multiple languages
- **Locale-specific Content**: Content adapted to user's locale
- **Time Zone Handling**: Proper time zone formatting
- **Currency Formatting**: Localized currency display

### **Personalization Features**
- **User-specific Content**: Personalized greetings and content
- **Behavioral Targeting**: Content based on user actions
- **Preference-based Content**: Content based on user preferences
- **Dynamic Subject Lines**: Personalized email subjects

---

## **Email Delivery and Tracking**

### **Delivery Management**
- **Bounce Handling**: Automatic bounce processing and list cleaning
- **Spam Filtering**: Integration with spam filtering services
- **Delivery Optimization**: Best practices for email delivery
- **Retry Logic**: Automatic retry for failed deliveries

### **Analytics and Reporting**
- **Delivery Rates**: Track successful email deliveries
- **Open Rates**: Monitor email open rates
- **Click Rates**: Track link click-through rates
- **Bounce Rates**: Monitor email bounce rates
- **Unsubscribe Rates**: Track user opt-outs

### **Webhook Integration**
```java
// SendGrid webhook endpoint for delivery tracking
@PostMapping("/sendgrid/webhook")
public ResponseEntity<String> handleSendGridWebhook(
    @RequestBody String payload,
    @RequestHeader("X-Twilio-Signature") String signature
) {
    // Verify webhook signature
    // Process delivery events
    // Update email tracking data
}
```

---

## **Security and Compliance**

### **Email Security**
- **SPF Records**: Sender Policy Framework implementation
- **DKIM Signing**: DomainKeys Identified Mail signing
- **DMARC Policy**: Domain-based Message Authentication
- **TLS Encryption**: Transport Layer Security for email

### **Privacy Compliance**
- **GDPR Compliance**: European privacy regulation compliance
- **CAN-SPAM Compliance**: US anti-spam law compliance
- **Opt-out Management**: Proper unsubscribe handling
- **Data Protection**: Secure handling of personal data

---

## **Testing and Development**

### **Local Development**
- **SendGrid Test Mode**: Use test API keys for development
- **Template Testing**: Test templates with sample data
- **Email Preview**: Preview emails before sending
- **Sandbox Environment**: Isolated testing environment

### **Email Testing Tools**
```bash
# SendGrid CLI for testing
npm install -g @sendgrid/cli

# Test email sending
sendgrid email send --to test@example.com --from noreply@yourdomain.com --subject "Test" --text "Test content"
```

---

## **Production Considerations**

### **Scalability**
- **Bulk Email Support**: Handle large email volumes
- **Rate Limiting**: Respect SendGrid rate limits
- **Queue Management**: Implement email queuing for high volumes
- **Load Balancing**: Distribute email sending across multiple instances

### **Monitoring and Alerting**
- **Delivery Monitoring**: Real-time delivery status monitoring
- **Error Alerting**: Alerts for email delivery failures
- **Performance Metrics**: Track email sending performance
- **Capacity Planning**: Monitor email sending capacity

### **Backup and Recovery**
- **Template Backup**: Regular template backup and versioning
- **Service Redundancy**: Backup email service providers
- **Data Recovery**: Email data backup and recovery procedures
- **Disaster Recovery**: Email service disaster recovery plan

---

## **Future Enhancements**

### **Planned Features**
- **Advanced Templates**: More sophisticated template engine
- **Email Scheduling**: Scheduled email sending
- **A/B Testing**: Built-in A/B testing capabilities
- **Advanced Analytics**: Enhanced email analytics and reporting

### **Integration Expansion**
- **Marketing Automation**: Integration with marketing automation tools
- **CRM Integration**: Customer relationship management integration
- **Social Media**: Social media integration for email campaigns
- **Mobile Optimization**: Enhanced mobile email optimization
