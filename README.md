# Auth Starter RR

A starting app for auth-protected solutions.

This is the client-side application built with React Router 7.

The server-side application is available in [this repository](https://github.com/AntonCodesCom/auth-starter-nestjs).

## Getting Started

1.  [Set up](https://github.com/AntonCodesCom/auth-starter-nestjs?tab=readme-ov-file#getting-started) the server-side application.
1.  Clone this repository and change to the project directory in your terminal.
1.  Update the `name`, `version` and `license` fields in the `package.json`.
1.  Update `appName` in the `app/config.ts` file.
1.  Install dependencies:

        npm install

1.  Configure environment variables, see `.env.example` file for instructions.
1.  Start the application in development watch mode:

        npm run dev

The application should now be running on http://localhost:5173 by default.

### Unit tests

Running unit tests (in the watch mode):

```bash
npm test
```

### End-to-end tests

1.  Make sure you have E2E-related environment variables set (see `.env.example`)
2.  Run end-to-end (E2E) tests in the watch mode:

        npm run e2e

## Updating project dependencies

1.  Update the outdated dependencies:

        npm update --save

2.  Run unit and E2E tests to make sure nothing is broken.

## Author

Anton "AntonCodes" Bahurinsky

[antoncodes.com](https://antoncodes.com)
