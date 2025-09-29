import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { Button, Container, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Auth Starter' },
    { name: 'description', content: 'Auth Starter' },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;
  let node: ReactNode | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = '404 Not Found';
      details = 'The requested page could not be found.';
    } else if (error.status === 401) {
      message = '401 Unauthorized';
      details = 'Please log in to perform this action.';
      node = (
        <Button component={Link} to="/login" variant="contained">
          Log In
        </Button>
      );
    } else {
      message = 'Error';
      details = error.statusText || details;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Container component="main" sx={{ pt: 8 }}>
      <Typography component="h1" variant="h4" mb={2}>
        {message}
      </Typography>
      <Typography component="p" mb={2}>
        {details}
      </Typography>
      {node}
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </Container>
  );
}
