# Todo Backend API

Express.js backend with TypeScript, PostgreSQL, and comprehensive error handling.

## Stack

- **Node.js 20** + **Express.js**
- **TypeScript** (strict mode)
- **PostgreSQL** with pg driver
- **Zod** for validation
- **Jest** + **Supertest** for testing

## Project Structure

```
src/
├── config/          # Environment and database configuration
├── middleware/      # Express middleware (error handling, logging)
├── utils/           # Helper functions
├── types/           # TypeScript type definitions
├── db/              # Database migrations and schemas
├── __tests__/       # Test files
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

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

# Build for production
npm run build

# Run production build
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/todoapp
CORS_ORIGIN=http://localhost:3000
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Categories (Coming in next commit)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Todos (Coming in next commit)
- `GET /api/todos` - Get todos with filtering and sorting
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Testing

Run tests with coverage:
```bash
npm test
```

Coverage thresholds are set at 70% for branches, functions, lines, and statements.

