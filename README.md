# ND Challenge

Web application for user registration and authentication with session-based authentication.

## Features

### Registration Page

*   User registration with first name, last name, email, and password
*   Client-side and server-side validation
*   Automatic login after successful registration
*   Redirect to home page upon successful registration

### Login Page

*   User authentication with email and password
*   Client-side and server-side validation
*   Session creation upon successful login
*   Redirect to home page upon successful login
*   Link to registration page for new users

### Home Page

*   Displays personalized welcome message with user's first and last name
*   Session persistence across browser refreshes
*   Logout functionality that destroys session and redirects to login page
*   Protected route that requires authentication

## Tech Stack

### Backend

*   Node.js (v18 or higher)
*   Express (^5.2.1)
*   TypeScript (^5.9.3)
*   MongoDB
*   Mongoose (^9.1.6)
*   Zod (^4.3.6) - validation
*   bcrypt (^6.0.0) - password hashing
*   express-session (^1.19.0) - session management
*   connect-mongo (^6.0.0) - MongoDB session store
*   express-rate-limit (^8.2.1) - rate limiting
*   helmet (^8.1.0) - security headers
*   cors (^2.8.6) - CORS configuration

### Frontend

*   React (^19.2.0)
*   TypeScript (^5.0.0)
*   Vite (^5.0.0)
*   React Router (^7.x) - routing
*   TanStack Query (React Query) - data fetching and state management
*   Tailwind CSS - styling

## Project Structure

```
WEBAPP/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files (database, session)
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware (auth, error handling, validation, rate limiting)
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # Express routes
│   │   ├── schemas/          # Zod validation schemas
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions (password hashing)
│   │   └── index.ts          # Application entry point
│   ├── .env.development
│   └── .env.production
└── frontend/
    ├── src/
    │   ├── components/       # Reusable components (ProtectedRoute, PublicRoute, UI components)
    │   ├── context/         # Global context (AuthContext)
    │   ├── features/         # Feature-based modules
    │   │   └── auth/         # Authentication feature
    │   │       ├── api/      # API functions
    │   │       ├── components/ # Auth components (LoginForm, RegisterForm, ErrorBox)
    │   │       ├── hooks/     # React Query hooks
    │   │       └── types/    # Auth type definitions
    │   ├── hooks/            # Custom hooks (useLocalStorage)
    │   ├── lib/              # Utilities (API wrapper, env, utils)
    │   ├── pages/            # Page components (HomePage, LoginPage, RegisterPage)
    │   ├── providers/        # App providers (Router, React Query)
    │   ├── types/            # Global type definitions
    │   └── main.tsx          # Application entry point
    ├── .env.development
    └── .env.production
```

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   MongoDB
*   npm

### Backend Setup

Navigate to backend directory:

```
cd backend
```

Install dependencies:

```
npm install
```

Set up environment variables:

*   Create `.env.development` file for development (or `.env.production` for production)
*   Add the following variables:
    *   `MONGODB_URI` - Your MongoDB connection string (e.g., `mongodb://localhost:27017/nd-challenge`)
    *   `SESSION_SECRET` - A strong, random string for session encryption
    *   `FRONTEND_URL` - Frontend URL (e.g., `http://localhost:5173` for development)
    *   `PORT` - Backend server port (optional, defaults to 8000)

Start MongoDB (if running locally)

Run development server:

```
npm run dev
```

The backend server will run on `http://localhost:8000`

### Frontend Setup

Navigate to frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Set up environment variables:

*   Create `.env.development` file for development (or `.env.production` for production)
*   Add the following variable:
    *   `VITE_API_URL` - Backend API URL (e.g., `http://localhost:8000`)

Run development server:

```
npm run dev
```

The frontend will run on `http://localhost:5173` (or next available port)

## API Documentation

### Registration

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

*   First name and last name are required (client-side and server-side)
*   Email must be valid format (validated on frontend with HTML5 and on backend with Zod regex)
*   Password must be at least 6 characters long (validated on frontend and backend)

**Rate Limiting:** 5 requests per 15 minutes per IP

**Success Response (201):**

```
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**

```
{
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

*   Email must be valid format (validated on frontend with HTML5 and on backend with Zod regex)
*   Password must be at least 6 characters long (validated on frontend and backend)

**Success Response (200):**

```
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

**Rate Limiting:** 5 requests per 15 minutes per IP

### Verify Session

**Endpoint:** `GET /api/auth/verify`

**Authentication:** Required (uses `requireAuth` middleware)

**Success Response (200):**

```
{
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**

```
{
  "errors": [
    {
      "field": null,
      "message": "Not authenticated"
    }
  ]
}
```

### Logout

**Endpoint:** `POST /api/auth/logout`

**Success Response (200):**

```
{
  "message": "Logout successful"
}
```

## Security Features

*   **Helmet** - Sets various HTTP security headers
*   **Rate Limiting** - Prevents brute force attacks (5 requests/15min for auth routes)
*   **Password Hashing** - Uses bcrypt with salt rounds
*   **Session Management** - Secure httpOnly cookies with MongoDB storage
*   **CORS** - Configured for frontend origin
*   **Input Validation** - Zod schema validation for all inputs
*   **Authentication Middleware** - `requireAuth` middleware for protected routes

## Error Handling

All errors follow a standardized format:

```
{
  "errors": [
    {
      "field": "email",
      "message": "Error message here"
    }
  ]
}
```

For validation errors, `field` contains the field name. For general errors, `field` is `null`.

## Authentication Middleware

The application includes a reusable `requireAuth` middleware for protecting routes:

```typescript
import { requireAuth } from '../middleware/auth';

// Apply to any route that requires authentication
router.get('/protected-route', requireAuth, controllerFunction);
```

The middleware:

*   Verifies user session exists
*   Loads user from database
*   Attaches user to `req.user` for use in controllers
*   Returns 401 if not authenticated

**Example usage in controller:**

```typescript
export const protectedController = (req: Request, res: Response) => {
  // req.user is available and typed
  const user = req.user; // { id, firstName, lastName, email }
};
```

## Frontend Architecture

### Authentication Flow

*   **AuthContext** - Manages global user state with localStorage persistence
*   **ProtectedRoute** - Component that verifies authentication before rendering
*   **PublicRoute** - Component that redirects authenticated users away from public pages
*   **React Query Hooks** - `useLogin`, `useRegister`, `useLogout`, `useVerify` for API calls
*   **Session-based Auth** - Uses httpOnly cookies for secure session management

### Frontend Validation

The application implements client-side validation for better user experience:

**Registration Form:**

*   All fields are required (HTML5 validation + custom validation)
*   Email format validation (HTML5 `type="email"`)
*   Password minimum length validation (6 characters)
*   Real-time error display with user-friendly messages

**Login Form:**

*   Email and password are required
*   Email format validation (HTML5 `type="email"`)
*   Password minimum length validation (6 characters)
*   Error handling for invalid credentials

### Protected Routes

Routes can be protected using the `ProtectedRoute` component:

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

// In router configuration
{
  path: "/",
  element: (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  ),
}
```

The `ProtectedRoute` component:

*   Calls `useVerify()` to check session validity
*   Updates `AuthContext` with user data
*   Shows loading state while verifying
*   Redirects to `/login` if not authenticated

### Public Routes

Public routes (like login and register) can be protected using the `PublicRoute` component:

```typescript
import { PublicRoute } from '@/components/PublicRoute';

// In router configuration
{
  path: "/login",
  element: (
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  ),
}
```

The `PublicRoute` component redirects authenticated users to the home page to prevent access to login/register pages when already logged in.

## Development

Backend and frontend run on separate ports during development:

*   Backend: `http://localhost:8000`
*   Frontend: `http://localhost:5173`

Make sure both servers are running for full functionality.

## Application Flow

**Registration:**

*   User fills out registration form (firstName, lastName, email, password)
*   Client-side validation checks all fields and password length
*   On submit, backend validates with Zod schema and Mongoose model
*   User is created in MongoDB, session is created, and user is redirected to home page

**Home Page:**

*   `ProtectedRoute` verifies session by calling `/api/auth/verify`
*   User data is displayed: "Welcome {firstName} {lastName}"
*   User state is persisted in localStorage for browser refresh persistence
*   Logout button destroys session and redirects to login page

**Session Persistence:**

*   User state is stored in localStorage via `useLocalStorage` hook
*   On page refresh, `ProtectedRoute` calls `useVerify()` to validate session
*   If session is valid, user remains logged in

## License

This project is created for assessment purposes.