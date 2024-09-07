![Screenshot 2024-09-07 151523](https://github.com/user-attachments/assets/0f06c8dd-e546-4ddc-ae9f-98857190446b)
![Screenshot 2024-09-07 151407](https://github.com/user-attachments/assets/50072531-b1a7-4018-a311-a24ec1c85692)

# Urban Harmony
This project was developed as the final exam for the Start2Impact University Angular course. 
It is a frontend application designed to work as a management tool for citizens, enabling them to submit and manage their ideas or reports. 

Below there are the guidelines covering the project structure, the core features, and finally, instructions for setting up the project locally with a quick initial setup.

## Technologies
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.
- NgRx
- RxJs
  
### API
- GO REST (https://gorest.co.in/)
  
## Project structure

The project is organized into three main modules: core, features, and shared, following Angular project conventions. All modules are loaded using lazy loading to optimize performance and reduce initial load time.

## Modules

- Core: contains essential components, services and configurations that are required throughout the application;
- Features: houses the primary functionality of the application, including components, services, and routes related to specific features. Each feature is encapsulated within its own module;
- Shared: includes reusable components and directives that are shared across multiple modules;

## Pages

The `pages` directory, stored within multiple modules, contains components that represent entire views within the application. The main views are:

- Landing page: The introductory page of the application.
- Login: The user login view.
- Registration: The user registration view.
- Users List: Displays the list of users.
- User Details: Shows detailed information for a specific user.
- Posts List: Displays the list of posts.
- Error Views: Handles different error states like Forbidden, Not Found or Network Error.

## State Management

- Local Stores: used for managing the state related to users list, userDetails, posts list, pagination.
User and Post module have their own local store to handle state specific to that module, and use Pagination state stored in the shared module.

## User Authentication

### 1- Login
The user logs into the platform by entering a valid email address associated with a registered user and his 'Go Rest' token, which acts as the password. The application then stores the token in localStorage to perform subsequent HTTP request.

The login process involves searching for users in the API based on the provided email. Since email addresses are unique, the API returns an array with the user as the first and only element. If the email is valid and exists in the system, the user's data is saved in localStorage, and the user is authenticated and authorized to access the platform.

### 2- Registration
To obtain a valid email, the user must first complete the registration process. At this stage, the user has not yet provided their personal `Go Rest token`. To handle this, the project includes a folder named `environment`, containing a valid API key used solely for the registration API request.

When the new user form is submitted, the registration request is intercepted, and the bearer token from the `environment` file is set. This is necessary because the user is not yet logged in, and without a token in localStorage, an unauthorized error would occur. This approach ensures the registration process can be completed without authentication issues.

## HTTP Interceptors

### - Authorization Bearer Token

All data manipulation requests `(POST, PUT, PATCH, and DELETE)` to the `Go Rest API` require an `authorization token`. The authInterceptor handles this by intercepting all HTTP requests and adding the bearer token to the request headers. 

### - App Loading Status

The `networkInterceptor` manages the application's loading state during API requests. Each request contains an `X-Spinner-ID` header, which the interceptor captures and passes to the `LoadingService`. This ensures that only the spinner related to the current request is displayed, managing the loading state needed to handle the user interface while waiting for responses.

### - Notification

Thanks to the `SnackbarMessageService`, messages after http responses are displayed to notice user what's happening.

### - Pagination

The `paginationHeadersInterceptor`, captures pagination details from the response headers of API requests. This interceptor extracts key parameters such as the current page, items per page, total pages, and total items from the response headers (`x-pagination-*`). These values are then normalized and dispatched to the store via the `setPagination` action, updating the `PaginationState`. Components that require pagination data retrieve it directly from the store, ensuring that the user interface accurately reflects the current pagination state.

## Services

### - Data Management
- UsersService
- PostsService
- CommentsService

### - Helpers
- ApisHelperService
- AuthenticationService
- DialogHandlerService
- FormValidationService
- IconsService
- LoadingService
- SnackbarMessageService

## Users and Posts list

### Search

Components are subscribed to the pagination state object and use local variables to perform requests with the current pagination values. Search functionality is delayed using `RxJs`’s `debounceTime` function, set to approximately 1 second. This delay prevents excessive requests and allows the user to type their desired search string without unpleasant interruptions.

`For users, in addition to text-based search, filters for gender and status can be applied.`
`For posts, the search is solely by title.`

## Routes

The application's routing is organized to provide a clear and modular structure, leveraging Angular's lazy loading and route guards to manage access and load components efficiently.

### App Routing

The primary routes configuration in the AppRouting module defines the main entry points of the application:
- `/`: Redirects to the HomeComponent.
- `/app`: Loads the features module. Access is protected by RouteGuardService.
- `/auth`: Loads the authentication module.
- Wildcard Route: Redirects any undefined paths to the error handling module

### Authentication Routing

The authentication module manages routes related to user login and registration:

- `/auth/login`: Displays the login page, protected by LoginGuardService.
- `/auth/registration`: Displays the registration page.
- Default Route: Redirects to the login page.

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

Set `production` property to `false` in `environment.development.ts`;

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g c component-name --path=src/app/path-to-folder` to generate a new component. You can also use `ng g directive|pipe|service|class|guard|interface|enum|module` etc.

You can verify if the generation is working correctly and will be placed in the right location by adding `--dry-run` to the command. If you prefer not to create the test spec file, add `--skip-tests` to your command.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
The application has unit tests covering over 60% of its codebase.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
