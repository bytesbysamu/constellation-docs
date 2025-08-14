---
sidebar_position: 6
---

# 💳 Payment Processing & Subscriptions

Constellation integrates with **Stripe** to handle both **subscriptions** and **one-time payments**. This makes it easy to manage payments for your SaaS application with comprehensive payment processing capabilities.

---

## **Stripe Integration Overview**

Constellation supports **Stripe** out of the box, enabling easy management of customer subscriptions and one-time payments. The integration is built with security and scalability in mind.

### **Key Features**
- **Subscription Management**: Automated recurring billing
- **One-time Payments**: Single purchase transactions
- **Customer Portal**: Self-service billing management
- **Webhook Integration**: Real-time payment event processing
- **Secure Processing**: PCI-compliant payment handling

---

## **Setup and Configuration**

### **API Keys Configuration**
You can get your Stripe API keys by logging into your Stripe account and navigating to the [API keys section](https://dashboard.stripe.com/apikeys). Use the **Publishable Key** and **Secret Key** and set them up as environment variables for security and configuration purposes.

```bash
# Required environment variables
STRIPE_PRIVATE_KEY=sk_test_...  # Secret key for backend
STRIPE_WEBHOOK_SECRET_KEY=whsec_...  # Webhook secret for verification
```

### **Environment Configuration**
```yaml
stripe:
  private-key: '${STRIPE_PRIVATE_KEY}'
  webhook-secret-key: '${STRIPE_WEBHOOK_SECRET_KEY}'
```

---

## **Webhook Configuration**

Webhooks are used to listen to Stripe events like payment success, subscription updates, etc. To set up a webhook:

1. Go to the **Webhooks** section in your Stripe dashboard.
2. Add a new webhook with the endpoint URL:  
   `http://localhost:8081/api/webhook/` (Development)
   `https://yourdomain.com/api/webhook/` (Production)
3. Subscribe to the following events:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
   - `invoice.paid`

### **Webhook Security**
- **Signature Verification**: All webhooks are verified using Stripe's signature
- **Secret Validation**: Webhook secrets are validated for each request
- **Event Processing**: Secure event handling with proper error management

---

## **API Endpoints**

### **Subscription Management**
```java
// Create checkout session for subscription
POST /api/payments/checkout/create-checkout-session
{
  "priceId": "price_...",
  "returnUrl": "http://localhost:4200/success"
}

// Get subscription details
GET /api/payments/subscription

// Create customer portal session
POST /api/payments/customer-portal/create
{
  "returnUrl": "http://localhost:4200/account"
}
```

### **Invoice Management**
```java
// Get invoice history
GET /api/payments/invoices/list

// Invoice response structure
{
  "amountDue": 1000,
  "amountPaid": 1000,
  "amountRemaining": 0,
  "status": "paid",
  "currency": "usd",
  "created": 1640995200,
  "invoicePdf": "https://..."
}
```

---

## **User Panel Features**

### **Subscription Management**

Users have access to a **Subscription Panel** where they can:

- **View Subscription Status**: See the current status of their subscription (active, canceled, etc.)
- **Select Plans**: If the user does not have an active subscription, they can view and choose from available plans
- **Manage Subscription**: Users can update their subscription or change plans
- **Billing History**: Access to complete invoice and payment history

### **Customer Portal Integration**

Users can manage their account, update billing details, and more through the **Customer Portal**, which is powered by Stripe's integration. The portal provides:

- **Billing Information Management**: Update payment methods, billing addresses, etc.
- **Subscription Management**: Pause, cancel, or change subscriptions
- **Invoice Management**: Users can access and download past invoices
- **Payment Method Updates**: Add, remove, or update payment methods

All changes made through the **Customer Portal** are synced and applied directly to their Stripe account.

---

## **Webhook Event Handling**

Constellation handles the following Stripe events through webhooks:

### **`checkout.session.completed`**
- **Purpose**: Payment successful, subscription created
- **Actions**: 
  - Update user subscription status
  - Grant access to paid features
  - Send confirmation email
  - Update billing records

### **`customer.subscription.deleted`**
- **Purpose**: Subscription cancelled or expired
- **Actions**:
  - Revoke access to paid features
  - Update user subscription status
  - Send cancellation notification
  - Clean up subscription data

### **`invoice.payment_failed`**
- **Purpose**: Payment attempt failed
- **Actions**:
  - Send payment failure notification
  - Update subscription status
  - Implement retry logic
  - Handle grace period

### **`invoice.paid`**
- **Purpose**: Invoice payment successful
- **Actions**:
  - Update payment records
  - Extend subscription period
  - Send payment confirmation
  - Update user access

---

## **Implementation Details**

### **Service Architecture**
```java
@Service
public class StripeService {
    private final Stripe stripe;
    private final WebhookSecret webhookSecret;
    
    // Subscription creation
    public CheckoutSession createCheckoutSession(CheckoutSessionRequest request) {
        // Implementation details
    }
    
    // Customer portal
    public String createCustomerPortalSession(String customerId, String returnUrl) {
        // Implementation details
    }
}
```

### **Webhook Handler**
```java
@RestController
@RequestMapping("/webhook")
public class WebhookController {
    
    @PostMapping
    public ResponseEntity<String> handleWebhook(
        @RequestHeader("Stripe-Signature") String signature,
        @RequestBody String payload
    ) {
        // Verify webhook signature
        // Process webhook events
        // Return appropriate response
    }
}
```

### **Data Models**
```java
public interface SubscriptionResponse {
    String currentPlan();
    long expiryDate();
    String status();
    long freeTrialExpiryDate();
}

public interface CheckoutSessionRequest {
    String priceId();
    String returnUrl();
}
```

---

## **Security Features**

### **Payment Security**
- **PCI Compliance**: Stripe handles PCI compliance requirements
- **Tokenization**: Sensitive payment data is tokenized
- **Encryption**: All communication is encrypted using TLS
- **Fraud Protection**: Stripe's built-in fraud detection

### **Webhook Security**
- **Signature Verification**: All webhooks are cryptographically verified
- **Secret Validation**: Webhook secrets are validated for each request
- **Event Filtering**: Only authorized events are processed
- **Error Handling**: Secure error handling without information leakage

---

## **Testing and Development**

### **Test Mode**
- **Test Keys**: Use Stripe test keys for development
- **Test Cards**: Stripe provides test card numbers for testing
- **Webhook Testing**: Use Stripe CLI for local webhook testing

### **Stripe CLI Setup**
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local development
stripe listen --forward-to localhost:8081/api/webhook
```

---

## **Production Considerations**

### **Environment Setup**
- **Production Keys**: Use production Stripe keys in production
- **Webhook URLs**: Update webhook endpoints for production domains
- **SSL Requirements**: Ensure HTTPS for all webhook endpoints
- **Monitoring**: Set up webhook monitoring and alerting

### **Scalability**
- **Async Processing**: Webhook events are processed asynchronously
- **Database Optimization**: Efficient database queries for subscription data
- **Caching**: Implement caching for frequently accessed subscription data
- **Load Balancing**: Support for multiple webhook processing instances

---

## **Monitoring and Analytics**

### **Payment Metrics**
- **Subscription Growth**: Track subscription creation and growth
- **Revenue Tracking**: Monitor recurring and one-time revenue
- **Churn Analysis**: Analyze subscription cancellation patterns
- **Payment Success Rates**: Monitor payment success and failure rates

### **Webhook Monitoring**
- **Event Processing**: Track webhook event processing success rates
- **Error Handling**: Monitor webhook processing errors
- **Performance Metrics**: Track webhook processing performance
- **Alerting**: Set up alerts for webhook failures

---

## **Future Enhancements**

### **Planned Features**
- **Multiple Payment Methods**: Support for additional payment methods
- **Advanced Billing**: Complex billing scenarios and proration
- **Tax Management**: Automated tax calculation and collection
- **International Support**: Multi-currency and regional compliance

### **Integration Expansion**
- **Accounting Systems**: Integration with accounting software
- **CRM Integration**: Customer relationship management integration
- **Analytics Platforms**: Enhanced analytics and reporting
- **Mobile Payments**: Mobile-specific payment optimization
