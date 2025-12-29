# Todo App - Production Grade

A full-stack todo application built with modern technologies and best practices.

## Tech Stack

### Backend
- **Node.js** + **Express.js** + **TypeScript**
- **PostgreSQL** database
- **Zod** for validation
- **Jest** for testing

### Frontend
- **React 18** + **TypeScript**
- **Redux Toolkit** + **RTK Query**
- **shadcn/ui** + **Tailwind CSS**
- **Vite** build tool
- **Vitest** for testing

### Infrastructure
- **Docker Compose** for orchestration
- **Multi-stage Docker builds**
- **PostgreSQL 16** with data persistence

## Features

- ✅ Create, read, update, delete todos
- ✅ Organize todos by categories
- ✅ Mark todos as complete/incomplete
- ✅ Filter by status (all/active/completed)
- ✅ Sort by due date or creation date
- ✅ Due date management
- ✅ Responsive design
- ✅ Type-safe with TypeScript
- ✅ Comprehensive testing

## Quick Start

### Prerequisites

- Docker Desktop (or Docker + Docker Compose)
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd amazon-test-todo
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start the application:
```bash
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Database**: localhost:5432

### Development

```bash
# Start all services
npm run dev

# View logs
npm run logs

# Stop services
npm run down

# Stop and remove volumes
npm run down:volumes
```

## Project Structure

```
.
├── backend/              # Express.js API
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
├── frontend/             # React application
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml    # Container orchestration
└── package.json          # Workspace scripts
```

## Documentation

Detailed documentation will be added in subsequent commits.

## License

MIT

