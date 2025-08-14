---
sidebar_position: 10
---

# 📱 Frontend Architecture & Development

Constellation's frontend is built with **Ionic** and **Angular**, providing a modern, mobile-first application that works seamlessly across web and mobile platforms.

---

## **Technology Stack**

### **Core Framework**
- **Angular**: 19.1.5 - Latest Angular version with standalone components
- **Ionic**: 8.4.3 - Mobile-first UI framework with native capabilities
- **Capacitor**: 7.0.0 - Native runtime for web apps
- **TypeScript**: Strict mode enabled with comprehensive type checking

### **State Management**
- **@ngneat/elf**: Lightweight state management library
- **@ngneat/query**: Data fetching and caching solution
- **RxJS**: Reactive programming for asynchronous operations

### **Styling & UI**
- **SCSS**: Advanced CSS preprocessing
- **Ionic Components**: Native-feeling UI components
- **CSS Custom Properties**: Dynamic theming system
- **Responsive Design**: Mobile-first responsive layout

---

## **Project Structure**

### **Directory Organization**
```
frontend/
├── src/
│   ├── app/
│   │   ├── core/           # Shared services, guards, interceptors
│   │   ├── domains/        # Feature modules organized by domain
│   │   ├── shared/         # Shared components, directives, modules
│   │   ├── store/          # State management
│   │   └── widgets/        # Cross-cutting concerns
│   ├── assets/             # Static assets and i18n files
│   ├── theme/              # Theme and styling configuration
│   └── environments/       # Environment-specific configuration
├── android/                # Android-specific configuration
├── ios/                    # iOS-specific configuration
├── nginx/                  # Nginx configuration for production
└── scripts/                # Build and deployment scripts
```

### **Domain-Driven Architecture**
```
domains/
├── auth/                   # Authentication domain
│   ├── components/         # Reusable auth components
│   ├── pages/             # Auth pages (sign-in, sign-up, etc.)
│   └── routes.ts          # Auth routing configuration
├── home/                   # Home domain
│   ├── pages/             # Home page components
│   └── routes.ts          # Home routing
├── tasks/                  # Task management domain
│   ├── components/         # Task-related components
│   ├── interfaces/         # Task data models
│   ├── pages/             # Task pages
│   ├── services/          # Task business logic
│   └── routes.ts          # Task routing
├── settings/               # User settings domain
│   ├── components/         # Settings components
│   ├── pages/             # Settings pages
│   ├── pipes/             # Custom pipes
│   ├── services/          # Settings services
│   └── routes.ts          # Settings routing
└── tabs/                   # Main navigation tabs
    ├── pages/              # Tab page components
    ├── services/           # Tab navigation services
    └── routes.ts           # Tab routing configuration
```

---

## **Core Architecture**

### **Core Module**
```typescript
// src/app/core/index.ts
export * from './guards';
export * from './services';
export * from './interceptors';
export * from './constants';
```

#### **Services**
- **AuthService**: Authentication and user management
- **CredentialsService**: Secure credential storage
- **ThemeService**: Theme management and switching
- **RouterService**: Navigation and routing utilities

#### **Guards**
- **authServiceGuard**: Route protection for authenticated users
- **canDeactivateGuard**: Form change protection

#### **Interceptors**
- **authInterceptor**: JWT token management and refresh
- **errorInterceptor**: Global error handling

#### **Constants**
- **QueryParameterKey**: URL parameter constants
- **APP_ROUTES**: Application route definitions
- **ERROR_CODES**: Standard error code constants

### **Shared Module**
```typescript
// src/app/shared/shared.module.ts
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    LetDirective,
  ],
  exports: [...MODULES],
})
export class SharedModule {}
```

#### **Components**
- **LetDirective**: Template context management
- **Custom Components**: Reusable UI components

---

## **State Management**

### **Elf Store Architecture**
```typescript
// src/app/store/settings.repository.ts
const { state, config } = createState(
  withProps<SettingsProperties>({
    mode: Mode.System,
    theme: Theme.Light,
  }),
);

const store = new Store({ name: 'settings', state, config });

@Injectable({ providedIn: 'root' })
export class SettingsRepository {
  public theme$ = store.pipe(select(state => state.theme));
  
  public setTheme(theme: Theme): void {
    store.update(state => ({ ...state, theme }));
  }
}
```

### **Query Management**
```typescript
// src/app/domains/tasks/services/task-list-page.service.ts
export class TaskListPageService {
  #client = injectQueryClient();
  #mutation = injectMutation();
  #query = injectQuery();

  public getTasks(): Result<QueryObserverResult<Task[], Error>> {
    return this.#query({
      queryKey: ['tasks'],
      queryFn: () => this.tasksService.getTasks(),
    });
  }

  public deleteTask(): MutationResult<void, Error, string, unknown> {
    return this.#mutation({
      mutationFn: (id: string) => this.tasksService.deleteTask(id),
      onSuccess: () => {
        void this.#client.invalidateQueries({ queryKey: ['tasks'] });
      },
    });
  }
}
```

---

## **Component Architecture**

### **Component Structure**
```typescript
@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss'],
  imports: [
    SharedModule,
    TranslocoPipe,
    // Ionic components
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ComponentName {
  // Public properties first
  public readonly property = this.service.property;
  
  // Private properties
  private unsubscribe = new Subject<void>();
  
  // Constructor
  constructor(
    private readonly service: ServiceName,
  ) {}
  
  // Public methods
  public async onAction(): Promise<void> {
    // Implementation
  }
  
  // Private methods
  private privateMethod(): void {
    // Implementation
  }
}
```

### **Page Components**
```typescript
// Example: Task List Page
export class TaskListPage {
  public readonly tasks = this.taskListPageService.getTasks().result;
  private readonly deleteTask = this.taskListPageService.deleteTask();

  constructor(private readonly taskListPageService: TaskListPageService) {
    addIcons({ trash, add });
  }

  public async onDeleteTask(task: Task): Promise<void> {
    this.deleteTask.mutate(task.id);
  }

  public async onNavigateToTaskUpsertPage(task?: Task): Promise<void> {
    await this.taskListPageService.navigateToTaskUpsertPage(task?.id);
  }
}
```

---

## **Routing Architecture**

### **Route Configuration**
```typescript
// src/app/routes.ts
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./domains/tabs/routes').then(m => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./domains/auth/routes').then(m => m.routes),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
```

### **Lazy Loading**
```typescript
// Domain-specific routes
export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.component').then(m => m.SignInComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.component').then(m => m.SignUpComponent),
  },
];
```

### **Route Guards**
```typescript
export const authServiceGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(CredentialsService).isAuthenticated();
  const router = inject(Router);

  if (isAuthenticated) {
    return true;
  } else {
    void router.navigate(['/auth/sign-in'], {
      queryParams: { ['original_request_uri']: state.url },
      replaceUrl: true,
    });
    return false;
  }
};
```

---

## **Form Handling**

### **Reactive Forms**
```typescript
export class SignInComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthService,
  ) {}

  get f(): any {
    return this.form.controls;
  }

  private initializeForm(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    
    const formValue = this.form.value;
    const loginContext: LoginContext = {
      email: formValue.email,
      password: formValue.password,
      rememberMe: formValue.rememberMe,
    };

    this._authService.login(loginContext, true, '/home').subscribe({
      next: (response: Credentials) => {
        this.hasError = false;
        this.loginResponseMessage = 'Login Successful';
        this.isSubmitted = false;
        this.form.reset();
      },
      error: (error: any) => {
        this.hasError = true;
        this.errorMessage = error?.error?.Description || 'Sorry! Something went wrong!';
      },
    });
  }
}
```

---

## **HTTP Communication**

### **HTTP Interceptor**
```typescript
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const credentialsService = inject(CredentialsService);
  const refreshTokenSubject = new BehaviorSubject<string | null>(null);
  let isRefreshing = false;

  const handle401Error = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
  ): Observable<HttpEvent<unknown>> => {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenSubject.next(null);

      const credentials = credentialsService.getCredentials();
      const token = credentials?.refreshToken;

      if (token) {
        return authService.refreshToken(token).pipe(
          switchMap((response: JwtResponse) => {
            isRefreshing = false;
            authService.storeCredentialsFromJwtResponse(
              response,
              credentialsService.rememberPassword(),
            );
            refreshTokenSubject.next(response.accessToken);
            return next(addAuthorizationHeader(request, response.accessToken));
          }),
          catchError(error => {
            isRefreshing = false;
            authService.logout();
            return throwError(() => error);
          }),
        );
      }
    }
    return next(request);
  };

  if (request.url.startsWith(environment.apiUrl + '/api')) {
    const token = credentialsService.getCredentials()?.accessToken;
    let authRequest = request;

    if (token) {
      authRequest = addAuthorizationHeader(request, token);
    }

    return next(authRequest).pipe(
      catchError(error => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !request.url.includes('/refresh')
        ) {
          return handle401Error(authRequest, next);
        }
        return throwError(() => error);
      }),
    );
  }

  return next(request);
};
```

---

## **Mobile Features**

### **Capacitor Integration**
```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'dev.ionstarter.angularsqlite.demo',
  appName: 'angular-sqlite-starter',
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

### **Platform Services**
- **StatusBarService**: Status bar theming and configuration
- **SplashScreenService**: Splash screen management
- **CapacitorEdgeToEdgeService**: Edge-to-edge display support
- **LiveUpdateService**: App update management

---

## **Internationalization**

### **Transloco Integration**
```typescript
// src/app/widgets/transloco/transloco.module.ts
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

### **Translation Usage**
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

---

## **Build Configuration**

### **Angular Configuration**
```json
{
  "schematics": {
    "@schematics/angular:component": {
      "style": "scss",
      "standalone": true,
      "changeDetection": "OnPush"
    }
  },
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:application",
      "options": {
        "outputPath": {
          "base": "www",
          "browser": ""
        },
        "styles": [
          "src/global.scss",
          "src/theme/variables.scss"
        ]
      }
    }
  }
}
```

### **Docker Configuration**
```dockerfile
# Multi-stage build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/www /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
```

---

## **Development Workflow**

### **Local Development**
```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
npm run build

# Run tests
npm test

# Lint and format
npm run lint
npm run fmt
```

### **Mobile Development**
```bash
# Add platforms
npx cap add android
npx cap add ios

# Sync changes
npx cap sync

# Open in native IDEs
npx cap open android
npx cap open ios
```

---

## **Testing Strategy**

### **Unit Testing**
- **Jasmine**: Testing framework
- **Karma**: Test runner
- **Component Testing**: Isolated component testing
- **Service Testing**: Service method testing

### **E2E Testing**
- **Cypress**: End-to-end testing
- **User Flow Testing**: Complete user journey testing
- **Cross-browser Testing**: Multi-browser compatibility

---

## **Performance Optimization**

### **Change Detection**
- **OnPush Strategy**: Default change detection strategy
- **Pure Pipes**: Efficient data transformation
- **TrackBy Functions**: Optimized list rendering
- **Lazy Loading**: Code splitting and lazy loading

### **Bundle Optimization**
- **Tree Shaking**: Unused code removal
- **Code Splitting**: Route-based code splitting
- **Minification**: Production code optimization
- **Gzip Compression**: Response compression

---

## **Security Features**

### **Frontend Security**
- **Route Guards**: Authentication-based route protection
- **HTTP Interceptors**: Secure token management
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: Cross-site scripting prevention
- **CSRF Protection**: Cross-site request forgery protection

---

## **Future Enhancements**

### **Planned Features**
- **PWA Support**: Progressive web app capabilities
- **Offline Support**: Offline-first functionality
- **Advanced Animations**: Enhanced user experience
- **Performance Monitoring**: Real-time performance tracking

### **Technology Upgrades**
- **Angular 20**: Latest Angular version
- **Ionic 9**: Enhanced mobile capabilities
- **Capacitor 8**: Improved native integration
- **Advanced State Management**: Enhanced state management patterns
