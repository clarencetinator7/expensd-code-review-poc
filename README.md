# Expense Manager - Copilot Code Review Demo

A proof-of-concept expense tracker app used to test and demonstrate **GitHub Copilot's code review capabilities**.

This app serves as a realistic codebase for evaluating how Copilot can assist with code reviews, identify issues, and provide intelligent feedback during the review process.

## What's Inside

- Full-featured React app with expense and category management
- Clean architecture with reusable components and custom hooks
- Type-safe code using TypeScript (no `any` types)
- Zustand for state management with localStorage persistence
- Tailwind CSS for styling

## Tech Stack

React 19 | TypeScript 5 | Vite 7 | Zustand | Tailwind CSS

## Getting Started

```bash
npm install
npm run dev      # Start dev server
npm run build    # Build for production
```

## Purpose

This demo app is designed for testing GitHub Copilot's code review features. It includes:

- Multiple interdependent components and hooks for realistic review scenarios
- Various patterns (custom hooks, reusable components, state management) to review
- Type-safe patterns without relying on `any` types
- Real-world CRUD operations and form handling

Perfect for evaluating Copilot's ability to review code quality, suggest improvements, and catch potential issues.
