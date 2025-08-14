---
sidebar_position: 11
---

# 📱 Frontend Development Guide

Complete guide for developing with Constellation's Ionic/Angular frontend, including setup, architecture, development workflows, and mobile development.

---

## **🚀 Getting Started**

### **Prerequisites**

Before you begin, make sure your development environment meets the following requirements:

- **Visual Studio Code** (latest version) or **IntelliJ IDEA**
- **Git** (latest version)
- **Node.js 20+** (includes Node Package Manager)
- **Ionic CLI**: `npm install -g @ionic/cli`
- **For Android development**:
  - **Android Studio** (latest version)
- **For iOS development**:
  - **Xcode** (latest version)
  - **Apple Developer Account** (paid account required)

---

## **🏗️ Project Setup**

### **Initial Setup**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run setup script (if available)
npm run setup
```

### **Run the App**
```bash
# Start development server
npm start
# or
npx ionic serve
```

Navigate to **http://localhost:4200/** in your browser to see the app running.

---

## **🏛️ Architecture & Folder Structure**

### **Application Structure**
```
src/app/
├── core/                    # Core services and guards
│   ├── guards/             # Route protection
│   ├── services/           # Shared services
│   ├── interceptors/       # HTTP interceptors
│   └── constants/          # Application constants
├── domains/                 # Feature modules organized by domain
│   ├── auth/               # Authentication domain
│   ├── home/               # Home page domain
│   ├── settings/           # User settings domain
│   ├── tabs/               # Main navigation tabs
│   └── tasks/              # Task management domain
├── shared/                  # Shared components and modules
│   ├── directives/         # Custom directives
│   └── shared.module.ts    # Shared module
├── store/                   # State management with @ngneat/elf
├── widgets/                 # Cross-cutting concerns
│   ├── directives/         # Widget-specific directives
│   └── transloco/          # Internationalization
├── app.component.html       # Root component template
├── app.component.scss       # Root component styles
├── app.component.ts         # Root component
└── routes.ts                # Application routing
```

### **Architecture Principles**

#### **Core Module**
The core folder contains services and guards that are used throughout the application:
- **Authentication Services**: User management and JWT handling
- **Route Guards**: Protection for authenticated routes
- **HTTP Interceptors**: Token management and error handling
- **Constants**: Application-wide constants and configuration

#### **Domain-Driven Design**
The domains folder contains different feature modules, each organized around a specific business domain:
- **Auth Domain**: User authentication and management
- **Home Domain**: Dashboard and main application views
- **Settings Domain**: User preferences and configuration
- **Tasks Domain**: Task management functionality
- **Tabs Domain**: Main navigation and routing

#### **Shared Module**
The shared folder contains commonly used components, directives, and pipes that are shared across the application.

#### **State Management**
The store folder contains the @ngneat/elf store implementation for lightweight state management.

---

## **⚡ Runtime Optimization**

### **OnPush Change Detection**
Change detection is the process of determining if the application state has changed and if any DOM needs to be updated.

Constellation uses the **OnPush change detection strategy** to improve performance:
- **Reduced Change Detection Cycles**: Only runs when inputs change
- **Better Performance**: Significant performance improvements
- **Immutable Data**: Encourages immutable data patterns

### **Angular Standalone APIs**
This application uses the new **standalone APIs** available since Angular 14:
- **Simplified Component Building**: Reduces the need for NgModules
- **Better Tree Shaking**: Improved bundle optimization
- **Modern Angular Patterns**: Follows latest Angular best practices

### **Ionic Components**
Import Ionic components from `@ionic/angular/standalone` instead of `@ionic/angular`:

```typescript
// ✅ Correct import
import { IonButton } from '@ionic/angular/standalone';

// ❌ Incorrect import
import { IonButton } from '@ionic/angular';
```

---

## **⚙️ Configuration**

### **Environment Configuration**
Environment configurations are located in the `src/environments/` folder:

- **`environment.ts`**: Development environment configuration
- **`environment.prod.ts`**: Production environment configuration

#### **Example Environment Configuration**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api',
  frontendHost: 'http://localhost:4200',
  version: {
    major: '1',
    minor: '0',
    patch: '2',
  },
  build: {
    changeset: '1d6f3b3',
  },
  localStorageKeyPrefix: 'constellation_',
};
```

---

## **🗄️ Database & Storage**

### **SQLite Integration**
Constellation uses **Capacitor SQLite** for local database functionality:

```typescript
import { CapacitorSQLite } from '@capacitor-community/sqlite';

// Database operations
await CapacitorSQLite.createConnection({
  database: 'constellation',
  version: 1,
});
```

### **Database Migrations**
Database migrations are performed using the **Upgrade Database Version** feature:

```typescript
// Example migration for tasks
await CapacitorSQLite.addUpgradeStatement({
  database: 'tasks',
  upgrade: [
    {
      toVersion: 1,
      statements: [
        `CREATE TABLE tasks (
          id TEXT PRIMARY KEY, 
          title TEXT, 
          description TEXT, 
          dueDate TEXT, 
          createdAt TEXT, 
          updatedAt TEXT
        )`,
      ],
    },
  ],
});
```

---

## **🌍 Internationalization (i18n)**

### **Transloco Configuration**
Constellation uses **Transloco** as the internationalization library:

#### **Configuration**
Configure Transloco in `src/app/widgets/transloco/transloco.module.ts`:

```typescript
@NgModule({
  imports: [
    TranslocoModule,
    TranslocoPersistLangModule.forRoot({
      storage: localStorageStrategy,
    }),
    TranslocoPersistTranslationsModule.forRoot({
      loader: TranslocoLoader,
      storage: localStorageStrategy,
    }),
  ],
  exports: [TranslocoModule],
})
export class TranslocoModule {}
```

#### **Translation Files**
Translations are stored in `src/assets/i18n/`:
- **`en.json`**: English translations
- **`de.json`**: German translations

#### **Usage Examples**
```typescript
// In components
@Component({
  template: `
    <h1>{{ 'auth.signIn.title' | transloco }}</h1>
    <p>{{ 'auth.signIn.description' | transloco }}</p>
  `,
  imports: [TranslocoPipe],
})
export class SignInComponent {}
```

#### **Adding New Languages**
Two steps required to add a new language:

1. **Translation File**: Add new file to `src/assets/i18n/` (e.g., `fr.json`)
2. **Registration**: Add language to `availableLangs` array in transloco module

#### **AI-Powered Translation Generation**
Use ChatGPT to generate translations with this prompt:

```
The following json represents a locale file for English translations:

{
  "message": {
    "emailAlreadyInUse": "The email address is already in use.",
    "invalidEmail": "The email address is invalid."
  }
}

Your task is to generate a json output for German, Spanish and Italian languages following these rules: 
- Keys will be the labels. 
- Values will be the human readable translation for the label.

Attention: Please note that automatically generated translations may contain incorrect information. You should therefore always check them.
```

---

## **📱 Mobile Development**

### **Capacitor Integration**
Constellation uses **Capacitor** for native mobile capabilities:

#### **Platform Setup**
```bash
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

#### **Configuration**
Configure Capacitor in `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'dev.constellation.app',
  appName: 'Constellation',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: false,
      androidIsEncryption: false,
    },
    LiveUpdate: {
      appId: '',
      autoDeleteBundles: true,
      readyTimeout: 10000,
    },
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: false,
    },
  },
};
```

### **Live Update (Capawesome Cloud)**
Constellation supports real-time updates via **Capawesome Cloud**:

#### **Configuration**
1. **App ID**: Configure app ID in Capacitor configuration
2. **Sync Project**: Run `npx cap sync` to apply changes

---

## **💳 In-App Purchases (RevenueCat)**

### **RevenueCat Setup**
Constellation uses **RevenueCat** for in-app purchases:

#### **Setup Steps**
1. **Create RevenueCat Account**: Follow RevenueCat setup instructions
2. **Configure App and Project**: Set up project configuration
3. **Configure Products**: Set up subscription products
4. **Add API Keys**: Add Android and iOS public API keys

#### **Product Display**
The application includes an **Upgrade to Premium** button that:
- Opens the PurchasesModalComponent
- Displays monthly, annual, and lifetime offerings
- Allows users to make or restore purchases
- Only available on Android and iOS

---

## **🔧 Development Workflows**

### **Running the Application**

#### **Browser Development**
```bash
# Run with live reload
npx ionic serve

# Run with specific port
npx ionic serve --port 4201
```

#### **Mobile Development**
```bash
# Android with live reload
npx ionic cap run android --livereload --external --open

# iOS with live reload
npx ionic cap run ios --livereload --external --open
```

### **Available Scripts**
```json
{
  "scripts": {
    "start": "Starts the local development server",
    "build": "Builds the app for production (output in www folder)",
    "build:docker": "Builds for Docker deployment",
    "lint": "Lints the code",
    "fmt": "Formats the code",
    "test": "Runs unit tests",
    "e2e": "Runs end-to-end tests"
  }
}
```

---

## **🚀 Deployment & CI/CD**

### **Version Management**
```bash
# Create new version (on main branch)
npm run release

# Push changes and tags
git push --follow-tags origin main
```

### **CI/CD Pipelines**
Constellation includes several CI/CD pipelines:

#### **CI Pipeline**
- **Trigger**: Every push to repository
- **Purpose**: Build and test the application
- **Jobs**: Build, test, lint, format

#### **Release Pipeline**
- **Trigger**: New version creation
- **Purpose**: Publish app updates
- **Targets**: Web deployment, app stores

#### **Configuration**
Enable jobs by setting environment variables:
- **`ENABLE_JOB_BUILD_WEB`**: Web app build
- **`ENABLE_JOB_BUILD_ANDROID`**: Android app build
- **`ENABLE_JOB_BUILD_IOS`**: iOS app build
- **`ENABLE_JOB_LINT`**: Code linting
- **`ENABLE_JOB_TEST`**: Testing
- **`ENABLE_JOB_DEPLOY_WEB`**: Web deployment

---

## **🧪 Testing**

### **Unit Testing**
```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testNamePattern="ComponentName"
```

### **E2E Testing**
```bash
# Run end-to-end tests
npm run e2e

# Run E2E tests in specific browser
npm run e2e -- --browser=chrome
```

### **Linting & Formatting**
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run fmt
```

---

## **🔍 Performance Optimization**

### **Bundle Optimization**
- **Code Splitting**: Route-based code splitting
- **Tree Shaking**: Remove unused code
- **Lazy Loading**: Load components on demand
- **Minification**: Production code optimization

### **Runtime Performance**
- **OnPush Change Detection**: Reduce change detection cycles
- **Pure Pipes**: Efficient data transformation
- **TrackBy Functions**: Optimized list rendering
- **Memory Management**: Proper subscription cleanup

---

## **🐛 Troubleshooting**

### **Common Issues**

#### **Build Issues**
```bash
# Clear cache
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Angular version compatibility
ng version
```

#### **Mobile Issues**
```bash
# Sync Capacitor project
npx cap sync

# Clean and rebuild
npm run build
npx cap sync

# Check platform-specific issues
npx cap doctor
```

#### **Database Issues**
```bash
# Reset database
npx cap run android --reset
npx cap run ios --reset
```

---

## **📚 Additional Resources**

- **[Frontend Architecture](frontend-architecture.md)**: Detailed architecture overview
- **[Development Setup](development-setup.md)**: Complete development environment setup
- **[Project Structure](project-structure-overview.md)**: System design and architecture
- **[Authentication Guide](auth.md)**: Security and user management
- **[Deployment Guide](deployment.md)**: Production deployment instructions

---

## **🎯 Best Practices**

### **Code Organization**
- **Domain-Driven Design**: Organize by business domains
- **Single Responsibility**: Each component has one purpose
- **Dependency Injection**: Use Angular's DI system
- **Type Safety**: Leverage TypeScript for better code quality

### **Performance**
- **OnPush Strategy**: Use OnPush change detection
- **Lazy Loading**: Implement route-based lazy loading
- **Memory Management**: Properly manage subscriptions
- **Bundle Optimization**: Minimize bundle size

### **Testing**
- **Unit Tests**: Test individual components and services
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user flows
- **Test Coverage**: Maintain good test coverage

---

**Happy Frontend Development! 🚀** Your Constellation frontend is now ready for building amazing mobile-first applications.
