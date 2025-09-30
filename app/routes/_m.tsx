import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, Outlet } from 'react-router';
import type { Route } from './+types/_m';
import { UnauthorizedException } from '~/Auth/exceptions';
import CoreSocialLinks from '~/Core/components/SocialLinks';

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
          <Button component={Link} to="/logout" color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <Outlet />
      </main>

      <Box
        component="footer"
        textAlign="center"
        sx={{ py: 3, px: 2, mt: 'auto', bgcolor: 'grey.100' }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mb={1}
          >
            {'Copyright © '}
            {new Date().getFullYear()}
            {' Anton Bahurinsky'}
          </Typography>
          <CoreSocialLinks />
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
