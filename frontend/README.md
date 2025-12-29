# Todo Frontend

Production-grade React application with TypeScript, Redux Toolkit, and shadcn/ui.

## Stack

- **React 18** with TypeScript (strict mode)
- **Vite** for blazing fast dev server and builds
- **Redux Toolkit** + **RTK Query** for state management
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful, accessible components
- **React Router** for navigation
- **date-fns** for date utilities
- **Vitest** + **React Testing Library** for testing

## Features

### Core Functionality
- ✅ Full CRUD for todos and categories
- ✅ Real-time updates with RTK Query
- ✅ Smart filtering (status, category)
- ✅ Flexible sorting (due date, creation date)
- ✅ Statistics dashboard
- ✅ Due date tracking with smart formatting
- ✅ Overdue detection and highlighting

### User Experience
- ✅ Dark/Light theme with system preference
- ✅ Responsive design (mobile-first)
- ✅ Loading states with skeleton loaders
- ✅ Toast notifications for all actions
- ✅ Error boundaries
- ✅ Empty states with helpful messages
- ✅ Smooth transitions and animations
- ✅ Hover effects

### Technical
- ✅ TypeScript strict mode
- ✅ Redux Toolkit for state management
- ✅ RTK Query for data fetching and caching
- ✅ Path aliases (@/* for cleaner imports)
- ✅ Type-safe environment variables
- ✅ Optimistic UI updates
- ✅ Automatic cache invalidation
- ✅ Component tests

## Development

```bash
# Install dependencies
npm install

# Run development server (with HMR)
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── categories/      # Category components
│   ├── todos/           # Todo components
│   ├── layout/          # Layout components
│   ├── ui/              # shadcn/ui components
│   └── providers/       # Context providers
├── store/
│   ├── api/             # RTK Query API slices
│   ├── slices/          # Redux slices
│   ├── store.ts         # Store configuration
│   └── hooks.ts         # Typed hooks
├── pages/               # Page components
├── routes/              # Router configuration
├── lib/                 # Utility functions
├── types/               # TypeScript types
└── config/              # App configuration
```

## State Management

### Redux Toolkit + RTK Query

The app uses Redux Toolkit for state management with RTK Query for data fetching.

**API Hooks:**
- `useGetCategoriesQuery` - Fetch categories
- `useCreateCategoryMutation` - Create category
- `useUpdateCategoryMutation` - Update category
- `useDeleteCategoryMutation` - Delete category
- `useGetTodosQuery` - Fetch todos with filters
- `useGetTodoStatisticsQuery` - Fetch statistics
- `useCreateTodoMutation` - Create todo
- `useUpdateTodoMutation` - Update todo
- `useToggleTodoMutation` - Toggle completion
- `useDeleteTodoMutation` - Delete todo

**Features:**
- Automatic caching
- Cache invalidation on mutations
- Loading and error states
- Request deduplication
- Optimistic updates
- Redux DevTools integration

## Accessibility

All components are built with accessibility in mind:
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA attributes
- ✅ Focus management
- ✅ Color contrast compliance
- ✅ Semantic HTML

## Testing

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run specific test
npm test -- TodoCard.test
```

## Browser Support

Modern browsers with ES2020 support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Production Build

```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

Build outputs to `dist/` directory.

