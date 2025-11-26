# Coding Rules & Guidelines
## General
- **Always take the long term scalable solution.**
- **Always consider the 2nd or 3rd best solution to a problem.**
- **Always think about addressing bugs from a fundamental level.**
- **Always use easily human readable variable names.**
- **Always consider scalability with large input sizes.**
- **Always write code in a way that maximizes type safety and compile-time error detection.**
- **Always import with absolute paths (`@/`) instead of relative paths.**
- **Always use Tailwind CSS variables for theme colors** (e.g. `bg-background` not `dark:bg-black`). Define new semantic variables in `src/index.css` if needed.
- **Never** solve a problem with a quick or "simple" fix.
- **Never** produce a change with a "copy-paste" style snippet as the first approach.
- **Never** attempt a drop-in solution first.
- **Never** address issues, requests, or bugs with shitty hot-fixes.
- **Never** use short variable names less than 4 characters.
- **Never** use emojis in code comments or commit messages.
- **Never** attempt to run code with a terminal command.

## Suggestions
- If tool calls or file edits continue to fail, relinquish control to the user to debug.
- Backwards compatibility is not necessary.
- It is always okay to write code that will require changes across a whole file or even across the whole codebase if the change supports long term dev and readability.
- Writing tests is not necessary unless requested.
- Assume all code will be run on a single thread for simplicity.
- Write code in a style that is easy to navigate with an IDE/VSCode/Jetbrains so devs can cmd+click variables and functions.
- If we are writing code that follows a well documented pattern, design, or package that already exists, let me know so I can conduct more research and see if there are existing solutions that could benefit my code.
- Avoid solutions that rely on try/catch fallback mechanisms. Allow errors to propagate with useful messages so devs can debug.
- Don't add comments describing the action you just performed. Only add comments that describe the code.

## TypeScript
- All variables must be typed.
- Do not just import `*` garbage.
- Try to use classes or enums wherever possible to guarantee structured variables.
- Do not use semicolons.
- Use `#` syntax for private variables in classes.
- For functions, always use `() => {}` syntax unless necessary.

---

# Project Context for AI Assistants

## Overview
This is Bright Xu's personal website, built as an interactive **MacOS-style Desktop Environment** in the browser. It showcases frontend engineering skills through complex UI interactions, animations, and state management.

## Core Architecture
- **Framework:** React 19 + Vite + TypeScript.
- **Styling:** Tailwind CSS v4.
- **State Management:** `zustand` (persisted to localStorage) handles the "OS" state (open windows, active focus, z-index, window positions).
- **Animations:** `framer-motion` drives the drag physics, dock magnification, and window open/close transitions.

## Key Components
- **Desktop (`src/components/os/Desktop.tsx`):** The main container. Handles the background, renders the `MenuBar`, `Dock`, and the layer of `Window` components.
- **Window (`src/components/os/Window.tsx`):** A complex draggable component that mimics an OS window. It handles:
    - Drag constraints (keeping mouse/window within reasonable bounds).
    - Focus management (z-index boosting on click).
    - Minimize/Close actions.
- **Store (`src/store/osStore.ts`):** The brain of the OS. Tracks:
    - `windows`: Map of window IDs to their state (position, size, open/minimized status).
    - `activeWindowId`: Which window is currently focused.
    - `maxZIndex`: Increments to ensure focused windows always appear on top.

## Design Philosophy
- **"Frontend Enthusiast":** The site should feel polished, playful, and technically impressive.
- **Immersive:** It's not just a website; it's a "system". The user interacts with "apps" (About, Projects) rather than scrolling a page.
- **Persistent:** The user's layout (window positions) is saved, so if they refresh, their "desktop" remains as they left it.

## "Oneko" (The Cat)
- A legacy script (`public/cat/oneko.js`) renders a pixel art cat that chases the user's cursor. It is initialized in the `Desktop` component.
