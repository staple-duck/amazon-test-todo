# Todo Frontend

Modern React application built with Vite, TypeScript, and shadcn/ui.

## Stack

- **React 18** with TypeScript
- **Vite** for blazing fast dev server and builds
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful, accessible components
- **React Router** for navigation
- **Vitest** for testing
- **Redux Toolkit** (coming in next commit)

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components (Header, Footer)
│   ├── providers/       # Context providers (Theme)
│   └── ErrorBoundary.tsx
├── pages/               # Page components
├── routes/              # Router configuration
├── lib/                 # Utility functions
├── config/              # App configuration
├── test/                # Test setup
├── App.tsx              # Main App component
└── main.tsx             # Entry point
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Features

- ✅ Dark/Light theme with system preference support
- ✅ Responsive design (mobile-first)
- ✅ Error boundary for graceful error handling
- ✅ Path aliases (@/* for cleaner imports)
- ✅ Type-safe environment variables
- ✅ Toast notifications (Sonner)
- ✅ Accessible UI components (Radix UI)
- ✅ Modern CSS with Tailwind
- ✅ Testing setup with Vitest

## Accessibility

All UI components are built on Radix UI primitives, ensuring:
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management

## Browser Support

Modern browsers with ES2020 support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

