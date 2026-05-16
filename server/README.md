# GigFlow Backend API

Production-grade Express.js backend for GigFlow lead management system.

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 6.0+
- npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
CORS_ORIGIN=http://localhost:5173
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Leads
- `GET /api/leads` - Get all leads (with filters)
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead (admin only)

## Architecture

### Folder Structure
- `config/` - Database and environment configuration
- `models/` - MongoDB schemas
- `controllers/` - Route handlers
- `services/` - Business logic
- `middleware/` - Express middleware
- `routes/` - API routes
- `validators/` - Input validation
- `types/` - TypeScript type definitions
- `utils/` - Utility functions
- `constants/` - Application constants

## Database

MongoDB collections:
- `users` - User accounts
- `leads` - Lead records

Indexes:
- `users.email` - Unique email index
- `leads.createdBy, leads.createdAt` - Composite index
- `leads.status` - Status filter index
- `leads.source` - Source filter index

## Security

- JWT token authentication
- bcrypt password hashing
- Input validation
- CORS protection
- Role-based access control

## Error Handling

Centralized error handler with consistent response format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (dev only)"
}
```

## Development

```bash
# Run with hot reload
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```
