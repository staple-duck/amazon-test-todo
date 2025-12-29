# API Documentation

Base URL: `http://localhost:5000/api`

## Table of Contents
- [Categories](#categories)
- [Todos](#todos)
- [Error Handling](#error-handling)
- [Data Models](#data-models)

---

## Categories

### Get All Categories

Retrieve all categories sorted by name.

**Endpoint:** `GET /api/categories`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Work",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Category by ID

Retrieve a specific category.

**Endpoint:** `GET /api/categories/:id`

**Parameters:**
- `id` (UUID) - Category ID

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Work",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Category

Create a new category.

**Endpoint:** `POST /api/categories`

**Request Body:**
```json
{
  "name": "Work"
}
```

**Validation:**
- `name`: Required, 1-100 characters, unique

**Response:** `201 Created`
```json
{
  "status": "success",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Work",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Category

Update an existing category.

**Endpoint:** `PUT /api/categories/:id`

**Parameters:**
- `id` (UUID) - Category ID

**Request Body:**
```json
{
  "name": "Updated Work"
}
```

**Validation:**
- `name`: Required, 1-100 characters, unique

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Updated Work",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Delete Category

Delete a category.

**Endpoint:** `DELETE /api/categories/:id`

**Parameters:**
- `id` (UUID) - Category ID

**Response:** `204 No Content`

**Notes:**
- Cannot delete a category that has associated todos
- Will return `400 Bad Request` if category has todos

---

## Todos

### Get All Todos

Retrieve todos with optional filtering and sorting.

**Endpoint:** `GET /api/todos`

**Query Parameters:**
- `status` - Filter by status: `all` | `active` | `completed` (default: `all`)
- `categoryId` - Filter by category UUID (optional)
- `sortBy` - Sort field: `createdAt` | `dueDate` (default: `createdAt`)
- `order` - Sort order: `asc` | `desc` (default: `desc`)

**Examples:**
```
GET /api/todos?status=active&sortBy=dueDate&order=asc
GET /api/todos?categoryId=550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "dueDate": "2024-12-31T00:00:00.000Z",
      "categoryId": "550e8400-e29b-41d4-a716-446655440000",
      "categoryName": "Personal",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Todo Statistics

Get counts of total, active, and completed todos.

**Endpoint:** `GET /api/todos/statistics`

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

### Get Todo by ID

Retrieve a specific todo.

**Endpoint:** `GET /api/todos/:id`

**Parameters:**
- `id` (UUID) - Todo ID

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "dueDate": "2024-12-31T00:00:00.000Z",
    "categoryId": "550e8400-e29b-41d4-a716-446655440000",
    "categoryName": "Personal",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Todo

Create a new todo.

**Endpoint:** `POST /api/todos`

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "categoryId": "550e8400-e29b-41d4-a716-446655440000",
  "dueDate": "2024-12-31T00:00:00.000Z"
}
```

**Validation:**
- `title`: Required, 1-200 characters
- `description`: Optional, max 2000 characters
- `categoryId`: Required, valid UUID, category must exist
- `dueDate`: Optional, ISO 8601 datetime, cannot be in the past

**Response:** `201 Created`

### Update Todo

Update an existing todo.

**Endpoint:** `PUT /api/todos/:id`

**Parameters:**
- `id` (UUID) - Todo ID

**Request Body:** (all fields optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "categoryId": "550e8400-e29b-41d4-a716-446655440000",
  "dueDate": "2024-12-31T00:00:00.000Z"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "dueDate": "2024-12-31T00:00:00.000Z",
    "categoryId": "550e8400-e29b-41d4-a716-446655440000",
    "categoryName": "Personal",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### Toggle Todo Completion

Toggle the completion status of a todo.

**Endpoint:** `PATCH /api/todos/:id/toggle`

**Parameters:**
- `id` (UUID) - Todo ID

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "completed": true,
    ...
  }
}
```

### Delete Todo

Delete a todo.

**Endpoint:** `DELETE /api/todos/:id`

**Parameters:**
- `id` (UUID) - Todo ID

**Response:** `204 No Content`

---

## Error Handling

All errors follow a consistent format:

### Validation Error (400)
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

### Not Found (404)
```json
{
  "status": "error",
  "message": "Todo not found"
}
```

### Conflict (409)
```json
{
  "status": "error",
  "message": "A category with this name already exists"
}
```

### Server Error (500)
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## Data Models

### Category
```typescript
interface Category {
  id: string;                    // UUID
  name: string;                  // 1-100 characters, unique
  createdAt: string;             // ISO 8601 datetime
  updatedAt: string;             // ISO 8601 datetime
}
```

### Todo
```typescript
interface Todo {
  id: string;                    // UUID
  title: string;                 // 1-200 characters
  description: string | null;    // Max 2000 characters
  completed: boolean;            // Default: false
  dueDate: string | null;        // ISO 8601 datetime
  categoryId: string;            // UUID, references Category
  categoryName?: string;         // Joined from Category
  createdAt: string;             // ISO 8601 datetime
  updatedAt: string;             // ISO 8601 datetime
}
```

### Todo Statistics
```typescript
interface TodoStatistics {
  total: number;                 // Total count of todos
  active: number;                // Count of incomplete todos
  completed: number;             // Count of completed todos
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding rate limiting middleware.

## Authentication

Currently no authentication is required. For production use, implement JWT-based authentication.

## CORS

CORS is configured to allow requests from `http://localhost:3000` by default. Update `CORS_ORIGIN` environment variable for production.

