# Auth Starter RR

A starting app for auth-protected solutions.

This is the client-side application built with React Router 7.

The server-side application is available in [this repository](https://github.com/AntonCodesCom/auth-starter-nestjs).

## Getting Started

1.  [Set up](https://github.com/AntonCodesCom/auth-starter-nestjs?tab=readme-ov-file#getting-started) the server-side application.
2.  Clone this repository and change to the project directory in your terminal.
3.  Update the `name`, `version` and `license` fields in the `package.json`.
4.  Install dependencies:

        npm install

5.  Configure environment variables, see `.env.example` file for instructions.
6.  Start the application in development watch mode:

        npm run dev

The application should now be running on http://localhost:5173 by default.

### Unit tests

Running unit tests (in the watch mode):

```bash
npm test
```

### End-to-end tests

Running end-to-end (E2E) tests in the watch mode:

```bash
npm run e2e
```

## Updating project dependencies

1. Update the outdated dependencies:

   npm update --save

2. Run unit and E2E tests to make sure nothing is broken.

## Author

Anton "AntonCodes" Bahurinsky

[antoncodes.com](https://antoncodes.com)
