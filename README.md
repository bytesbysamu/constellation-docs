# 🌟 Constellation Documentation

Official documentation for the Constellation SaaS Platform - a modern, scalable application built with Spring Boot and Ionic/Angular.

## 📚 What is Constellation?

Constellation is a comprehensive SaaS platform featuring:

- **🔐 Authentication & Security**: JWT-based auth with OAuth2 integration
- **💳 Payment Processing**: Stripe integration for subscriptions
- **📧 Email System**: SendGrid integration with templates
- **🤖 AI Integration**: Ollama for local AI models
- **📱 Mobile-First**: Ionic/Angular with Capacitor
- **🏗️ Modern Architecture**: Domain-driven design with Spring Boot 3.2.12

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Build for GitHub Pages
npm run build:gh-pages
```

## 📖 Documentation Structure

- **Getting Started**: Quick setup and running instructions
- **Project Architecture**: System design and structure overview
- **Development Setup**: Complete development environment guide
- **Frontend Architecture**: Ionic/Angular implementation details
- **Frontend Development**: Complete development workflow guide
- **Authentication**: Security and user management
- **Payments**: Stripe integration and subscription management
- **Email System**: SendGrid integration and templates
- **Theming**: Design system and theme management
- **Deployment**: Production deployment guide
- **CI/CD**: Continuous integration and deployment

## 🏗️ Architecture

Constellation follows a **monorepo architecture** with clear separation:

```
constellation/
├── backend/          # Spring Boot backend application
├── frontend/         # Ionic/Angular frontend application
└── docs/            # This documentation repository
```

### Technology Stack

**Backend**
- Spring Boot 3.2.12 + Java 21
- PostgreSQL + Flyway migrations
- Spring Security + JWT + OAuth2
- Stripe + SendGrid integrations
- Ollama AI integration

**Frontend**
- Angular 19.1.5 + Ionic 8.4.3
- Capacitor 7.0.0 for mobile
- @ngneat/elf for state management
- Transloco for internationalization

## 🔧 Development

### Contributing to Documentation

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** locally with `npm start`
5. **Submit** a pull request

### Documentation Guidelines

- Use clear, concise language
- Include code examples where helpful
- Keep technical accuracy as priority
- Follow existing structure and style
- Test all links and code snippets

### Local Testing

```bash
# Start development server
npm start

# Build and test production build
npm run build
npm run serve
```

## 🚀 Deployment

### GitHub Pages

This repository is configured for GitHub Pages deployment:

1. **Enable GitHub Pages** in repository settings
2. **Set source** to GitHub Actions
3. **Push** to main branch triggers automatic deployment

### Manual Deployment

```bash
# Build for production
npm run build:gh-pages

# Deploy to GitHub Pages (when ready)
npm run deploy
```

**Note**: This repository uses a simplified workflow that only builds and tests. Manual deployment gives you control over when documentation changes go live.

### Custom Domain

To use a custom domain (e.g., `docs.constellation.dev`):

1. Add CNAME record pointing to `constellation.github.io`
2. Configure in GitHub Pages settings
3. Update `docusaurus.config.ts` baseUrl if needed

## 📁 Repository Structure

```
constellation-docs/
├── docs/                    # Documentation markdown files
├── src/                     # Docusaurus source files
├── static/                  # Static assets (images, etc.)
├── docusaurus.config.ts     # Docusaurus configuration
├── sidebars.ts             # Documentation navigation
└── package.json            # Dependencies and scripts
```

## 🤝 Contributing

We welcome contributions to improve the documentation!

### Areas for Improvement

- **Technical Accuracy**: Fix any inaccuracies or outdated information
- **Content Clarity**: Improve explanations and examples
- **New Sections**: Add missing documentation areas
- **Code Examples**: Enhance or add code snippets
- **Visual Elements**: Improve diagrams and screenshots

### Getting Help

- **Issues**: Report bugs or request features
- **Discussions**: Ask questions and share ideas
- **Pull Requests**: Submit improvements and fixes

## 📄 License

This documentation is part of the Constellation project and follows the same license terms.

## 🔗 Links

- **Live Documentation**: [https://constellation.dev](https://constellation.dev)
- **Main Repository**: [https://github.com/constellation/constellation](https://github.com/constellation/constellation)
- **Issues**: [https://github.com/constellation/constellation-docs/issues](https://github.com/constellation/constellation-docs/issues)
- **Discussions**: [https://github.com/constellation/constellation-docs/discussions](https://github.com/constellation/constellation-docs/discussions)

---

**Constellation Documentation** - Building the future of SaaS applications with comprehensive, developer-friendly documentation. 🚀
