# UsersBmt

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Project structure

The project is organized into three main modules: core, features, and shared, following Angular project conventions. All modules are loaded using lazy loading to optimize performance and reduce initial load time.

## Modules

- Core: contains essential components, services and configurations that are required throughout the application;
- Features: houses the primary functionality of the application, including components, services, and routes related to specific features. Each feature is encapsulated within its own module;
- Shared: includes reusable components and directives that are shared across multiple modules;

## State Management

- Local Stores: used for managing the state related to users and posts list, and pagination.
User and Post module have their own local store to handle state specific to that module, and use Pagination state stored in the shared module.

## User Authentication

### 1- Login
The user logs into the platform by entering a valid email address associated with a registered user and his 'Go Rest' token, which acts as the password. The application then stores the token in localStorage to perform subsequent HTTP request.

The login process involves searching for users in the API based on the provided email. Since email addresses are unique, the API returns an array with the user as the first and only element. If the email is valid and exists in the system, the user's data is saved in localStorage, and the user is authenticated and authorized to access the platform.

### 2- Registration
To obtain a valid email, the user must first complete the registration process. At this stage, the user has not yet provided their personal 'Go Rest' token. To handle this, the project includes a folder named environment, containing a valid API key used solely for the registration API request.

When the new user form is submitted, the registration request is intercepted, and the bearer token from the environment file is set. This is necessary because the user is not yet logged in, and without a token in localStorage, an unauthorized error would occur. This approach ensures the registration process can be completed without authentication issues.

## HTTP Interceptors

### 1- Authorization Bearer Token

All data manipulation requests (POST, PUT, PATCH, and DELETE) to the Go Rest API require an authorization token. The authInterceptor handles this by intercepting all HTTP requests and adding the bearer token to the request headers. 

### 2- App Loading Status

The networkInterceptor manages the application's loading state during API requests. Each request contains an 'X-Spinner-ID' header, which the interceptor captures and passes to the LoadingService. This ensures that only the spinner related to the current request is displayed, managing the loading state needed to handle the user interface while waiting for responses.

## Routes

The application's routing is organized to provide a clear and modular structure, leveraging Angular's lazy loading and route guards to manage access and load components efficiently.

### App Routing

The primary routes configuration in the AppRouting module defines the main entry points of the application:
- `/`: Redirects to the HomeComponent.
- `/app`: Loads the features module with lazy loading. Access is protected by RouteGuardService.
- `/auth`: Loads the authentication module with lazy loading.
- Wildcard Route: Redirects any undefined paths to the error handling module

### Features Routing

The features module's routing handles sub-routes for various features of the application:

- `/app/users`: Loads the user module.
- `/app/posts`: Loads the post module.
- `/app/errors`: Loads the errors module.
- Default Route: Redirects to users as the default sub-route.

### User Routing

The user module handles routes related to user-related views:

- `/app/users`: Displays the list of users.
- `/app/users/:id`: Displays details for a specific user.

### Post Routing

The post module manages routes for post-related views:

- `/app/posts`: Displays a list of posts.

### Error Routing

The errors module shows error views based on different HTTP error responses:

- `/app/errors/401`: Shows the Forbidden error page.
- `/app/errors/404`: Shows the Not Found error page.
- `/app/errors/500`: Shows the Network Error page.
- Default Route: Redirects to the 404 Not Found page.

### Authentication Routing

The authentication module manages routes related to user login and registration:

- `/auth/login`: Displays the login page, protected by LoginGuardService.
- `/auth/registration`: Displays the registration page.
- Default Route: Redirects to the login page.

## Quick start

Run `npm install` to install all dependencies. 

## Environmnent

Create a folder named `environment` within the src directory. Inside this folder, add two files: `environment.development.ts` and `environment.ts`.

In both files, include the following object:

```bash
export const environment = {
    production: true,
    go_rest_token: 'your-go-rest-token'
};
```

Set `production` property to false in `environment.development.ts`;

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g c component-name --path=src/app/path-to-folder` to generate a new component. You can also use `ng g directive|pipe|service|class|guard|interface|enum|module` etc.

You can verify if the generation is working correctly and will be placed in the right location by adding `--dry-run` to the command. If you prefer not to create the test spec file, add `--skip-tests` to your command.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
