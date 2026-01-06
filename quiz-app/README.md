# LeetCode Pattern Quiz - Next.js App

A mobile-first web application for learning LeetCode problem patterns through interactive quizzes.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **TanStack Query v5** - Server state management
- **Tailwind CSS v4** - Mobile-first styling

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
quiz-app/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── providers.tsx        # TanStack Query provider
│   └── globals.css          # Global styles & Tailwind config
├── components/
│   ├── quiz/                # Quiz-specific components
│   ├── leaderboard/         # Leaderboard components
│   └── shared/              # Reusable components (Button, Card)
├── hooks/
│   ├── queries/             # TanStack Query hooks
│   ├── mutations/           # Mutation hooks
│   └── ui/                  # UI hooks (useTimer, useLocalStorage)
├── lib/
│   ├── api/                 # API layer
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
└── config/
    └── queryClient.ts       # TanStack Query configuration
```

## Features

### Mobile-First Design
- Optimized for screens 320px and up
- Touch-friendly interactions (44px minimum touch targets)
- Responsive layout that adapts to larger screens

### React Native Ready
- Business logic separated from UI components
- Platform-agnostic custom hooks
- Easy migration path to React Native

### Type Safe
- Full TypeScript coverage
- Strict type checking
- Autocomplete support

## Development Guide

See [CLAUDE.MD](../CLAUDE.MD) for comprehensive development guidelines, best practices, and architectural decisions.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps

1. Implement question data API
2. Create quiz components (QuestionCard, PatternSelector, Timer)
3. Add quiz session management
4. Implement leaderboard functionality
5. Add animations and transitions

## License

MIT
