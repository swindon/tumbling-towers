# Tumbling Towers

A casual math puzzle game where you stack numbers in ascending order. Don't let the tower tumble!

## Project Overview

Tumbling Towers is a web-based game built with React and TypeScript. The gameplay involves receiving two random digits, which the player can swap to form a two-digit number. This number must then be placed into an empty slot in a tower, ensuring that all numbers in the tower are in ascending order from bottom to top. As levels progress, the tower grows taller, increasing the difficulty.

### Core Mechanics
- **Digit Generation:** Two random digits (0-9) are provided each turn.
- **Swapping:** Players can swap the digits (e.g., '2' and '7' can be 27 or 72).
- **Placement:** Numbers must be placed such that they maintain an ascending sequence.
- **Progression:** Each level adds more blocks to the tower.
- **Game Over:** Occurs when no valid placement can be made with the current digits (in either orientation).

## Technical Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (with `@tailwindcss/vite`)
- **Animations:** [Motion](https://motion.dev/) (formerly Framer Motion)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Planned/Legacy Dependencies:** `three.js`, `express`, `better-sqlite3` (currently present in `package.json` but not used in the main game logic).

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or pnpm

### Commands

| Command | Description |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run lint` | Run TypeScript type checking |
| `npm run preview` | Preview production build |
| `npm run clean` | Remove build artifacts |

## Project Structure

- `src/App.tsx`: Contains the main game logic, state management, and UI components.
- `src/main.tsx`: Application entry point.
- `src/index.css`: Global styles and custom pixel-art utility classes.
- `vite.config.ts`: Vite configuration, including Tailwind and environment variable injection.
- `metadata.json`: Basic project metadata.

## Development Conventions

- **State Management:** Uses React's `useState` and `useEffect` hooks for game state.
- **Styling:** Follows a "Pixel Art" aesthetic. Use custom utility classes like `.pixel-border`, `.pixel-shadow`, and `.font-pixel`.
- **Components:** Logic is currently centralized in `App.tsx` for simplicity, but can be refactored into smaller components in `src/components/` as the project grows.
- **Environment Variables:** The `GEMINI_API_KEY` is injected via Vite for potential future AI integrations. Use a `.env` file for local development.
- **Type Safety:** Ensure all new components and logic are properly typed with TypeScript. Run `npm run lint` to verify.

## Future Roadmap

- [ ] Transition to a full 3D experience using `@react-three/fiber` (dependencies already included).
- [ ] Implement a backend using `express` and `better-sqlite3` for high scores and user profiles.
- [ ] Add more game modes and power-ups (e.g., "Discard" or "Wildcard" digits).
