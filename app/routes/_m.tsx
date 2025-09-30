import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { Outlet } from 'react-router';
import type { Route } from './+types/_m';
import { UnauthorizedException } from '~/Auth/exceptions';

export default function RouteLayoutMain() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img
              src="/logo.svg"
              alt="Auth Starter Logo"
              style={{ marginRight: '1rem', height: 32 }}
            />
            <Typography variant="h6" component="div">
              Auth Starter
            </Typography>
          </Box>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      <main>
        <Outlet />
      </main>

      <Box
        component="footer"
        sx={{ py: 3, px: 2, mt: 'auto', bgcolor: 'grey.100' }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {' Auth Starter. All rights reserved.'}
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}
          >
            <Link
              href="https://github.com/AntonCodesCom"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <GitHub sx={{ mr: 0.5 }} />
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/antoncodes"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <LinkedIn sx={{ mr: 0.5 }} />
              LinkedIn
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (error instanceof UnauthorizedException) {
    throw new Response('Unauthorized', { status: 401 });
  }
  throw error;
}
