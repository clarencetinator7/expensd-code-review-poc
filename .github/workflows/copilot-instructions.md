# GitHub Copilot Development Instructions

## Purpose

This repository uses **GitHub Copilot as a development assistant** to help developers write code that follows the project's coding standards.

Copilot should prioritize the guidelines defined in this repository when generating code suggestions.

These instructions apply during:

- Writing new code
- Refactoring existing code
- Suggesting implementations
- Providing inline improvements during development

This file is **not intended for full pull request reviews**.

For AI-powered PR reviews, refer to:

`/coding-standards/ai/ai-peer-review-guidelines.md`

---

# Coding Standards Location

All coding standards are stored inside the **`coding-standards`** directory.

Structure:

```
coding-standards/
├─ ai/
│  └─ ai-peer-review-guidelines.md
│
├─ general/
│  └─ general-coding-guidelines.md
│
├─ language-specific/
│  └─ typescript-coding-guidelines.md
│
└─ framework-specific/
   └─ react-typescript-guidelines.md
```

When generating code, Copilot should prioritize the following standards depending on the context.

---

# Development Guidelines

## 1. General Coding Guidelines

Always follow:

`coding-standards/general/general-coding-guidelines.md`

These rules apply to all code regardless of language or framework.

---

## 2. Language-Specific Guidelines

When writing **TypeScript**, follow:

`coding-standards/language-specific/typescript-coding-guidelines.md`

These rules override generic guidelines when conflicts exist.

---

## 3. Framework-Specific Guidelines

When writing **React with TypeScript**, follow:

`coding-standards/framework-specific/react-typescript-guidelines.md`

Prefer patterns defined in these guidelines when generating components, hooks, and React architecture.

---

# Code Generation Behavior

When generating code suggestions:

- Follow the **coding standards in the repository**
- Prefer **existing patterns already used in the codebase**
- Generate **readable and maintainable code**
- Prefer **simple solutions over complex abstractions**
- Avoid introducing unnecessary dependencies

---

# Preferred Coding Style

Copilot should prefer:

- Clear and descriptive variable names
- Small and focused functions
- Strong TypeScript typing
- Explicit types when beneficial
- Predictable control flow
- Readable and maintainable code

Avoid:

- Overly complex abstractions
- Premature optimizations
- Unnecessary architectural changes

---

# When Reviewing Code

Copilot may suggest improvements during development.

However, **full code review behavior should follow the rules defined in:**

`coding-standards/ai/ai-peer-review-guidelines.md`

That document defines the process for:

- AI pull request reviews
- Issue detection
- Standards enforcement
- Structured review output

---

# Goal

The goal of these instructions is to make GitHub Copilot act as a **development assistant that helps developers write code correctly the first time**, following the standards defined in this repository.
