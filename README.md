# 📝 Production-Grade Todo Application

Modern full-stack todo app demonstrating enterprise-level architecture and best practices.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Node.js](https://img.shields.io/badge/Node.js-20-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue) ![Docker](https://img.shields.io/badge/Docker-ready-blue)

---

## 🚀 Quick Start (One Command)

```bash
docker-compose up --build
```

**That's it!** Open [http://localhost:3000](http://localhost:3000)

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5001/api`
- Database auto-initializes with default categories

**Requirements:** Docker Desktop installed

---

## ✨ Key Features

- **Full CRUD** for todos and categories with real-time updates
- **Advanced filtering** by status, category, date with smart sorting
- **Date & Time picker** with validation (prevents past dates/times)
- **Dark/Light theme** with system preference detection
- **Responsive design** optimized for mobile and desktop
- **Statistics dashboard** with real-time todo metrics
- **Category management** to organize tasks efficiently

## 🏗️ Tech Stack & Architecture

**Frontend**
- React 18 + TypeScript (strict mode)
- Redux Toolkit + RTK Query (state & caching)
- Vite (dev server & bundler)
- shadcn/ui + Tailwind CSS (UI components)
- date-fns (datetime handling)

**Backend**
- Node.js 20 + Express + TypeScript
- PostgreSQL 16 (with connection pooling)
- Zod (runtime validation)
- Jest (testing with 90%+ coverage)
- Helmet + CORS (security)

**DevOps**
- Docker + Docker Compose (containerization)
- Auto-initialization (database migrations on startup)
- Hot-reload enabled (development)
- Health checks (monitoring)

## 📁 Project Structure

Clean architecture with separation of concerns:

```
backend/
├── src/
│   ├── modules/         # Feature-based modules (todos, categories)
│   ├── middleware/      # Error handling, logging, security
│   ├── config/          # Database, environment validation
│   └── db/              # SQL migrations (auto-run on startup)

frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── store/           # Redux + RTK Query (API layer)
│   ├── pages/           # Route-based pages
│   └── lib/             # Utilities (date formatting, helpers)
```

## 🛠️ Development

**Useful Commands:**
```bash
# Fresh start (clean database)
docker-compose down -v && docker-compose up --build

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Run backend tests (inside container)
docker exec todo-backend npm test

# Stop services
docker-compose down
```

**Environment Variables:**
Demo `.env` included for quick start. Default ports:
- Frontend: `3000`
- Backend: `5001` (changed from 5000 to avoid macOS AirPlay conflict)
- PostgreSQL: `5432`

## 💡 Key Implementation Highlights

**Architecture Decisions:**
- **Module-based structure** - Each feature (todos, categories) is self-contained
- **Repository pattern** - Separation of data access from business logic
- **DTOs with validation** - Type-safe API contracts using Zod
- **RTK Query** - Automatic caching, optimistic updates, cache invalidation
- **Auto-migrations** - Database initializes automatically on first Docker run

**Technical Achievements:**
- **Date/Time Picker** - Custom implementation with past-time validation (prevents selecting times that have already passed)
- **Real-time validation** - Frontend validates before submission, backend double-checks
- **Smart defaults** - Time picker suggests next hour for today, 9 AM for future dates
- **Error boundaries** - Graceful error handling with user-friendly messages
- **Optimistic UI** - Instant feedback, rolls back on failure
- **Test coverage** - 90%+ backend coverage, comprehensive service tests

## 📖 API Quick Reference

**Base URL:** `http://localhost:5001/api`

```bash
# Categories
GET    /api/categories           # List all
POST   /api/categories           # Create
PUT    /api/categories/:id       # Update
DELETE /api/categories/:id       # Delete

# Todos
GET    /api/todos                # List with filters (?status=all&categoryId=uuid)
POST   /api/todos                # Create (requires: title, categoryId, optional: dueDate)
PUT    /api/todos/:id            # Update
PATCH  /api/todos/:id/toggle     # Toggle completion
DELETE /api/todos/:id            # Delete
GET    /api/todos/statistics     # Get counts (total, active, completed)

# Health
GET    /health                   # Server health check
```

**Example:**
```bash
# Create todo with datetime
curl -X POST http://localhost:5001/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Team meeting",
    "categoryId": "uuid-here",
    "dueDate": "2025-12-31T14:30:00.000Z"
  }'
```

## 🧪 Testing

**Backend (Jest):**
```bash
docker exec todo-backend npm test
```

**Coverage:** 90%+ on service layer with validation tests for:
- Date/time past validation
- Category existence checks
- CRUD operations
- Error scenarios

## 🔒 Production-Ready Features

- ✅ TypeScript strict mode throughout
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS prevention (input sanitization)
- ✅ CORS configured
- ✅ Helmet security headers
- ✅ Error boundary components
- ✅ Graceful shutdown handling
- ✅ Database connection pooling
- ✅ Environment validation (Zod)
- ✅ Health check endpoints
- ✅ Request logging

---

**Built by [Anton Goncharenko](https://www.linkedin.com/in/anton-goncharenko-023a7288)** • Lead Software Engineer
