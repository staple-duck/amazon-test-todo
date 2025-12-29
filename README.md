# Todo App - Production Grade Full-Stack Application

A modern, feature-rich todo application built with industry best practices and production-grade architecture.

![Tech Stack](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Node](https://img.shields.io/badge/Node.js-20-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-ready-blue)

## 🌟 Features

### Core Functionality
- ✅ **Full CRUD Operations** - Create, read, update, and delete todos and categories
- ✅ **Category Management** - Organize todos into custom categories
- ✅ **Due Date Tracking** - Set and track due dates with smart date display
- ✅ **Completion Status** - Mark todos as complete/incomplete with visual feedback
- ✅ **Overdue Detection** - Automatic detection and highlighting of overdue todos

### Advanced Features
- 🔍 **Smart Filtering** - Filter by status (all/active/completed) and category
- 📊 **Sorting** - Sort by due date or creation date (ascending/descending)
- 📈 **Statistics Dashboard** - Real-time counts of total, active, and completed todos
- 🎨 **Dark/Light Theme** - System-aware theme with manual toggle
- 📱 **Responsive Design** - Mobile-first, works on all devices
- ♿ **Accessibility** - WCAG compliant with keyboard navigation and ARIA labels
- ⚡ **Real-time Updates** - Optimistic UI updates with automatic cache invalidation

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- **React 18** - UI library with hooks and modern features
- **TypeScript** - Type safety and better developer experience
- **Redux Toolkit** - State management with RTK Query for data fetching
- **Vite** - Lightning-fast build tool and dev server
- **shadcn/ui** - High-quality, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **date-fns** - Modern date utility library
- **Vitest** - Fast unit testing framework

**Backend:**
- **Node.js 20** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend code
- **PostgreSQL 16** - Relational database
- **Zod** - Runtime type validation
- **Jest** - Testing framework
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

**Infrastructure:**
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PostgreSQL** - Database with persistent volumes
- **Nginx** - Production web server (frontend)

### Project Structure

```
.
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── config/            # Configuration (env, database)
│   │   ├── middleware/        # Express middleware
│   │   ├── modules/           # Feature modules
│   │   │   ├── categories/    # Categories CRUD
│   │   │   └── todos/         # Todos CRUD
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Utility functions
│   │   ├── app.ts             # Express app setup
│   │   └── server.ts          # Server entry point
│   ├── Dockerfile             # Backend container
│   └── package.json
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── categories/    # Category components
│   │   │   ├── todos/         # Todo components
│   │   │   ├── layout/        # Layout components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   └── providers/     # Context providers
│   │   ├── store/             # Redux store
│   │   │   ├── api/           # RTK Query API
│   │   │   └── slices/        # Redux slices
│   │   ├── pages/             # Page components
│   │   ├── lib/               # Utility functions
│   │   ├── types/             # TypeScript types
│   │   └── config/            # App configuration
│   ├── Dockerfile             # Frontend container
│   ├── nginx.conf             # Nginx configuration
│   └── package.json
│
└── docker-compose.yml          # Container orchestration
```

## 🚀 Quick Start

### Prerequisites

- **Docker Desktop** (or Docker + Docker Compose)
- **Git**

That's it! Docker handles all dependencies.

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd amazon-test-todo
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Default values work out of the box. Modify if needed:
   ```env
   POSTGRES_DB=todoapp
   POSTGRES_USER=todouser
   POSTGRES_PASSWORD=todopass
   POSTGRES_PORT=5432
   BACKEND_PORT=5000
   FRONTEND_PORT=3000
   ```

3. **Start the application:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000/api
   - **Database:** localhost:5432

### Development Commands

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Rebuild containers
docker-compose up --build
```

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Categories Endpoints

#### Get All Categories
```http
GET /api/categories
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "Work",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Category
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Work"
}
```

#### Update Category
```http
PUT /api/categories/:id
Content-Type: application/json

{
  "name": "Updated Name"
}
```

#### Delete Category
```http
DELETE /api/categories/:id
```

### Todos Endpoints

#### Get All Todos
```http
GET /api/todos?status=all&categoryId=uuid&sortBy=createdAt&order=desc
```

**Query Parameters:**
- `status`: `all` | `active` | `completed` (default: `all`)
- `categoryId`: UUID (optional)
- `sortBy`: `createdAt` | `dueDate` (default: `createdAt`)
- `order`: `asc` | `desc` (default: `desc`)

#### Create Todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "categoryId": "uuid",
  "dueDate": "2024-12-31T00:00:00.000Z"
}
```

#### Update Todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true
}
```

#### Toggle Todo Completion
```http
PATCH /api/todos/:id/toggle
```

#### Get Statistics
```http
GET /api/todos/statistics
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "total": 10,
    "active": 6,
    "completed": 4
  }
}
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                 # Run all tests
npm run test:watch       # Watch mode
```

### Frontend Tests
```bash
cd frontend
npm test                 # Run all tests
npm run test:ui          # Run with UI
```

## 🔒 Security Features

- ✅ **Helmet.js** - Security headers
- ✅ **CORS** - Configured cross-origin requests
- ✅ **Input Validation** - Zod schema validation
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **XSS Prevention** - Input sanitization
- ✅ **Error Handling** - Safe error messages
- ✅ **TypeScript** - Type safety throughout

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Smart Date Display** - "Today", "Tomorrow", relative dates
- **Color-coded Dates** - Visual cues for due dates
- **Overdue Indicators** - Clear highlighting
- **Loading States** - Skeleton loaders
- **Error Handling** - Toast notifications
- **Empty States** - Helpful messages
- **Hover Effects** - Smooth transitions
- **Keyboard Navigation** - Full accessibility

## 🐳 Docker Configuration

### Services

1. **PostgreSQL** - Database with persistent volume
2. **Backend** - Express API with hot reload
3. **Frontend** - Vite dev server / Nginx in production

### Production Deployment

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Run in production mode
docker-compose up -d
```

## 📊 Database Schema

### Categories Table
```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Todos Table
```sql
CREATE TABLE todos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🛠️ Development Setup (without Docker)

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure DATABASE_URL in .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Configure VITE_API_URL in .env
npm run dev
```

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/todoapp
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Code Quality

- **TypeScript Strict Mode** - Maximum type safety
- **ESLint** - Code linting
- **Prettier-ready** - Code formatting
- **Clean Architecture** - Separation of concerns
- **SOLID Principles** - Maintainable code
- **Comprehensive Comments** - Self-documenting code

## 🚢 Production Considerations

- ✅ Multi-stage Docker builds
- ✅ Nginx for static file serving
- ✅ Database connection pooling
- ✅ Error boundary components
- ✅ Graceful shutdown handling
- ✅ Health check endpoints
- ✅ Request logging
- ✅ Environment variable validation
- ✅ Database migrations ready
- ✅ Bundle optimization

## 📄 License

MIT

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

---

**Production-ready architecture • Type-safe • Fully tested • Docker-ready**
