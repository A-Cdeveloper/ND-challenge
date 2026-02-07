# ND Challenge

Web application for user registration and authentication.

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
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── .env.development
│   └── .env.production
└── frontend/
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── context/          # Global context
    │   ├── features/         # Feature-based modules
    │   │   └── auth/         # Authentication feature
    │   │       ├── api/      # API functions
    │   │       ├── hooks/    # React Query hooks
    │   │       └── context/  # Auth context
    │   ├── lib/              # Utilities (API wrapper, env)
    │   ├── pages/            # Page components
    │   └── providers/        # App providers (Router, React Query)
    └── .env                  # Environment variables
```

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   MongoDB
*   npm

### Backend Setup

Navigate to backend directory:

Install dependencies:

Set up environment variables:

*   Copy `.env.development` and `.env.production` files
*   Update `MONGODB_URI` with your MongoDB connection string
*   Add `SESSION_SECRET` with a strong, random string
*   Add `FRONTEND_URL` (e.g., `http://localhost:5173` for development)

Start MongoDB (if running locally)

Run development server:

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

*   Create `.env` file in frontend directory
*   Add `VITE_API_URL=http://localhost:8000` (or your backend URL)

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

*   First name and last name are required
*   Email must be valid format
*   Password must be at least 6 characters long

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

*   **AuthContext** - Manages global user state
*   **ProtectedRoute** - Component that verifies authentication before rendering
*   **React Query Hooks** - `useLogin`, `useRegister`, `useLogout`, `useVerify` for API calls
*   **Session-based Auth** - Uses httpOnly cookies for secure session management

### Protected Routes

Routes can be protected using the `ProtectedRoute` component:

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

// In router configuration
{
  path: "/home",
  element: (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  ),
}
```

## Development

Backend and frontend run on separate ports during development:

*   Backend: `http://localhost:8000`
*   Frontend: `http://localhost:5173`

Make sure both servers are running for full functionality.

## License

This project is created for assessment purposes.

```
npm run dev
```

```
npm install
```

```
cd backend
```