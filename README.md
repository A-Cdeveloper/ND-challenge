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

### Frontend

*   React (^19.2.0)
*   TypeScript (^5.0.0)
*   Vite (^5.0.0)

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

Start MongoDB (if running locally)

Run development server:

The backend server will run on `http://localhost:8000`

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
*   Password must be at least 8 characters with at least one letter and one number

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

## Development

Backend and frontend run on separate ports during development.

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