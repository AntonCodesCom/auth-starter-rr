import type { Route } from "./+types/_index";
import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auth Starter" },
    { name: "description", content: "Auth Starter" },
  ];
}

export default function RouteIndex() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src="/logo.svg" alt="Auth Starter Logo" style={{ marginRight: '1rem', height: 32 }} />
            <Typography variant="h6" component="div">
              Auth Starter
            </Typography>
          </Box>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Auth Starter
        </Typography>
        <Typography paragraph>
          This is a secure authentication starter template built with React Router and Material UI.
          It provides a solid foundation for building authenticated web applications.
        </Typography>
        <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.900' }}>
          <Typography component="pre" sx={{ color: 'common.white', fontFamily: 'monospace' }}>
{`// Example authentication code
const login = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};`}
          </Typography>
        </Paper>
      </Container>

      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', bgcolor: 'grey.100' }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {' Auth Starter. All rights reserved.'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
            <Link href="https://github.com" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
              <GitHub sx={{ mr: 0.5 }} />
              GitHub
            </Link>
            <Link href="https://linkedin.com" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
              <LinkedIn sx={{ mr: 0.5 }} />
              LinkedIn
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
