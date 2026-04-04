# CLAUDE.md

## Project Overview

Azure Functions v4 app (Node.js/TypeScript) with Jest unit tests. Implements HTTP-triggered functions with GET/POST endpoints and comprehensive test coverage.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Azure Functions v4 (`@azure/functions`)
- **Testing**: Jest with ts-jest preset
- **Build**: TypeScript compiler (`tsc`)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run watch` | Compile in watch mode |
| `npm run clean` | Remove dist directory |
| `npm run prestart` | Clean and build before starting |
| `npm start` | Start Azure Functions host |
| `npm test` | Run Jest tests |

## Project Structure

- `src/functions/` - Azure Function handlers
- `src/tests/` - Jest test files (`*.test.ts`)
- `src/index.ts` - App entry point (Azure Functions setup)
- `jest.config.ts` - Jest configuration (ts-jest preset, node environment)
- `tsconfig.json` - TypeScript configuration (commonjs, es6 target)

## Skills

- README.md -> /readme
- renovate.json -> /renovate

## Improvement Backlog

- [ ] Create Makefile
- [ ] Create CI workflow
