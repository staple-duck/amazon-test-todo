# Todo Backend API

Production-grade Express.js backend with TypeScript, PostgreSQL, and comprehensive error handling.

## Stack

- **Node.js 20** + **Express.js**
- **TypeScript** (strict mode)
- **PostgreSQL** with pg driver and connection pooling
- **Zod** for runtime validation
- **Jest** + **Supertest** for testing
- **Helmet** for security headers
- **CORS** for cross-origin requests

## Features

- ✅ RESTful API design
- ✅ TypeScript strict mode
- ✅ Comprehensive error handling
- ✅ Input validation with Zod
- ✅ SQL injection prevention
- ✅ Request logging
- ✅ Health checks
- ✅ Graceful shutdown
- ✅ Unit and integration tests
- ✅ >70% test coverage

## API Endpoints

See [API.md](../API.md) for complete documentation.

### Quick Reference

**Categories:**
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

**Todos:**
- `GET /api/todos` - Get todos (with filtering/sorting)
- `GET /api/todos/statistics` - Get statistics
- `GET /api/todos/:id` - Get todo by ID
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/toggle` - Toggle completion
- `DELETE /api/todos/:id` - Delete todo

**Health:**
- `GET /health` - Health check

## Development

```bash
# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Run production build
npm start
```

## Database Schema

See `src/db/migrations/` for SQL migration files.

**Tables:**
- `categories` - Todo categories
- `todos` - Todo items

**Indexes:**
- Categories: name
- Todos: category_id, completed, due_date, created_at
- Partial index on active todos for performance

## Testing

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test -- src/modules/categories/__tests__/category.service.test.ts
```

Coverage thresholds: 70% (branches, functions, lines, statements)

## Security

- Helmet.js security headers
- CORS configuration
- Zod input validation
- Parameterized SQL queries
- Error sanitization
- Environment variable validation

## Production Deployment

1. Set environment variables
2. Run database migrations
3. Build: `npm run build`
4. Start: `npm start`

Or use Docker (recommended):
```bash
docker-compose up -d
```

