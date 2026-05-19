# Tumbling Towers 🧱

A casual math puzzle game where you stack numbers in ascending order. Don't let the tower tumble!

[![Play Now](https://img.shields.io/badge/Play_Now-Live_Demo-success?style=for-the-badge&logo=github)](https://swindon.github.io/tumbling-towers/)

![Pixel Art Style](https://img.shields.io/badge/Style-Pixel_Art-facc15?style=flat-square&logoColor=black)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38b2ac?style=flat-square&logo=tailwind-css)

## 🎮 How to Play

1. You are dealt two random digits (0-9) each turn.
2. Swap them to form a two-digit number (e.g., `2` and `7` can be `27` or `72`).
3. Place the number in an empty block in the tower.
4. **Rule:** Numbers MUST be in ascending order from bottom to top.
5. If you can't place either combination, the tower tumbles! **GAME OVER**.
6. Fill all blocks to clear the level and advance to a taller tower.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Language:** TypeScript

*Note: The project includes dependencies for Three.js (`@react-three/fiber`) and a SQLite backend (`better-sqlite3`, `express`) for future expansions.*

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (LTS recommended) and your preferred package manager (`npm`, `pnpm`, or `yarn`) installed.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd tumbling-towers
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000` (or the port specified in your terminal).

## 📜 Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Locally preview the production build.
- `npm run lint` - Runs TypeScript type checking.
- `npm run clean` - Removes the `dist` folder.

## ☕ Support

If you like this project, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-facc15?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/scottwindon)

## 👨‍💻 Author

Created by [Scott](https://github.com/swindon).
