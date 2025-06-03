# Maze Challenge

This project is a maze-solving application written in TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org/) (latest version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

**Install dependencies:**
   ```sh
   npm install
   ```

## Running the App

The main entry point is `index.ts`. To run the app:

```sh
npm start
```

Or, if there is no `start` script, you can run:

```sh
npx ts-node index.ts
```

## Project Structure

- `index.ts` - Main entry point
- `src/` - Source code
  - `exitMaze.ts` - Maze exit logic
  - `data/` - Data models and resources
  - `mapping/` - Mapping utilities
  - `services/` - Maze-related services
