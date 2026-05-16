# GigFlow Frontend

Modern React + TypeScript dashboard for GigFlow lead management system.

## Getting Started

### Prerequisites
- Node.js 18+
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
```

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── layouts/          # Layout components
├── hooks/            # Custom React hooks
├── services/         # API services
├── store/            # Zustand stores
├── types/            # TypeScript interfaces
├── utils/            # Utility functions
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Components

### UI Components
- `Button` - Action button
- `Input` - Text input field
- `Select` - Dropdown select
- `Modal` - Modal dialog
- `Card` - Card container
- `Loading` - Loading spinner
- `EmptyState` - Empty state display
- `Toast` - Toast notifications

### Domain Components
- `LeadsTable` - Leads table display
- `LeadForm` - Lead create/edit form
- `Pagination` - Pagination controls

### Pages
- `LoginPage` - User login
- `RegisterPage` - User registration
- `DashboardPage` - Main dashboard with leads management

## State Management

### Zustand Stores
- `authStore` - Authentication state (user, token)
- `leadStore` - Leads state (leads, filters, pagination)

## Custom Hooks

- `useAuth()` - Authentication operations
- `useToast()` - Toast notifications
- `useDebounce()` - Debounced values
- `useDebouncedValue()` - Debounced value with effect

## Features

### Authentication
- Register new user
- Login with email/password
- Protected routes
- Token persistence
- Auto logout on token expiry

### Lead Management
- Create leads
- Update leads
- Delete leads (admin only)
- View leads with pagination
- Filter by status, source
- Search by name/email
- Sort by date
- Export to CSV

### UI/UX
- Responsive design
- Form validation
- Error handling
- Loading states
- Empty states
- Toast notifications
- Modal dialogs

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Styling

TailwindCSS for styling with custom theme configuration.

## API Integration

Axios-based API client with:
- Request interceptors for auth token
- Response interceptors for error handling
- Auto logout on 401
- Centralized configuration

## Performance

- Component code splitting
- Lazy loading routes
- Debounced search
- Optimized re-renders
- Image optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
