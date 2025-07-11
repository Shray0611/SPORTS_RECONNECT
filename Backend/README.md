# GameOfficialsHub Authentication Backend

A Node.js + Express authentication backend for the GameOfficialsHub sports booking platform.

## Features

- 🔐 JWT-based authentication
- 👥 Role-based access control (official, organizer, admin)
- 🔒 Password hashing with bcrypt
- 🛡️ Protected routes with middleware
- 👑 Hardcoded admin login
- 📊 MongoDB integration with Mongoose

## User Roles

- **Official**: Sports officials who can be booked for events
- **Organizer**: Event organizers who can book officials
- **Admin**: System administrator with full access

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Update `.env` with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/gameofficials
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB

Ensure MongoDB is running on your system.

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### POST `/api/register`

Register a new user (official or organizer only)

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "official"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "role": "official",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "official",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/login`

Login with email and password

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "role": "official",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "official"
  }
}
```

#### Admin Login

Use hardcoded credentials:

- **Email**: `admin@gameofficials.com`
- **Password**: `Admin@123`

**Response:**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "role": "admin",
  "user": {
    "name": "Administrator",
    "email": "admin@gameofficials.com",
    "role": "admin"
  }
}
```

#### GET `/api/me`

Get current user profile (requires authentication)

**Headers:**

```
Authorization: Bearer jwt_token_here
```

### Protected Routes

#### GET `/api/dashboard`

General dashboard (all authenticated users)

#### GET `/api/official/dashboard`

Official dashboard (officials only)

#### GET `/api/organizer/dashboard`

Organizer dashboard (organizers only)

#### GET `/api/admin`

Admin panel (admins only)

#### GET `/api/booking`

Booking management (officials and organizers)

#### GET `/api/management`

Management panel (organizers and admins)

### Health Check

#### GET `/api/health`

Check if server is running

## Authentication

### JWT Token Structure

```json
{
  "userId": "user_id_or_admin",
  "role": "official|organizer|admin",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Using Protected Routes

Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token_here
```

## Role-Based Access Control

### Route Protection Levels

1. **Public Routes**: No authentication required

   - `GET /api/health`
   - `POST /api/register`
   - `POST /api/login`

2. **Authenticated Routes**: Any logged-in user

   - `GET /api/dashboard`
   - `GET /api/me`

3. **Role-Specific Routes**: Specific roles only

   - `GET /api/official/dashboard` (officials only)
   - `GET /api/organizer/dashboard` (organizers only)
   - `GET /api/admin` (admins only)

4. **Multi-Role Routes**: Multiple roles allowed
   - `GET /api/booking` (officials + organizers)
   - `GET /api/management` (organizers + admins)

## Frontend Integration

### JWT Decoding and Role-Based Redirection

After login, decode the JWT token to get the user role and redirect accordingly:

```javascript
// Decode JWT token (frontend)
const token = response.token;
const decoded = jwt_decode(token);

// Redirect based on role
switch (decoded.role) {
  case "official":
    window.location.href = "/official/dashboard";
    break;
  case "organizer":
    window.location.href = "/organizer/dashboard";
    break;
  case "admin":
    window.location.href = "/admin";
    break;
}
```

### Protected Route Guards

Implement route guards in your frontend to prevent unauthorized access:

```javascript
// Check if user has required role
const hasRole = (requiredRole) => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded = jwt_decode(token);
  return decoded.role === requiredRole;
};

// Route guard example
if (!hasRole("admin")) {
  // Redirect to appropriate dashboard or login
  window.location.href = "/login";
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created (registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: 24-hour expiration
- **Role Validation**: Server-side role checking
- **Input Validation**: Comprehensive request validation
- **CORS**: Enabled for frontend integration
- **Error Handling**: Secure error messages

## Development

### Project Structure

```
Backend/
├── models/
│   └── User.js              # User model
├── middleware/
│   └── auth.js              # Authentication middleware
├── routes/
│   ├── auth.js              # Authentication routes
│   └── protected.js         # Protected routes
├── server.js                # Main server file
├── package.json             # Dependencies
├── env.example              # Environment variables template
└── README.md                # This file
```

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

## Testing

### Test Credentials

**Admin Login:**

- Email: `admin@gameofficials.com`
- Password: `Admin@123`

**Test User Registration:**

```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Official",
    "email": "test@example.com",
    "password": "password123",
    "role": "official"
  }'
```

**Test User Login:**

```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## License

ISC
