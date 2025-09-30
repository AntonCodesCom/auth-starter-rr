import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

export default function RouteLogin() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            component="img"
            src="/logo.svg"
            alt="App Logo"
            sx={{
              height: 64,
              mb: 2,
            }}
          />

          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign In
          </Typography>

          <Box component="form" sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} Anton Bahurinsky
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
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
      </Box>
    </Container>
  );
}
