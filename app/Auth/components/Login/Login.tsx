import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useRef, type FormEvent } from 'react';
import { useFetcher } from 'react-router';
import CoreSocialLinks from '~/Core/components/SocialLinks';

export default function AuthLogin() {
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);
  const isLoading = fetcher.state !== 'idle';

  async function handleSubmitSuccess(e: FormEvent) {
    e.preventDefault();
    if (isLoading) {
      // additional guard
      return;
    }
    fetcher.submit(formRef.current, { method: 'post' });
  }

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

          <Typography
            id="authLoginH1"
            component="h1"
            variant="h5"
            sx={{ mb: 3 }}
          >
            Login
          </Typography>

          <Box
            method="post"
            ref={formRef}
            aria-labelledby="authLoginH1"
            component="form"
            sx={{ width: '100%' }}
            onSubmit={handleSubmitSuccess}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Log In
            </Button>
          </Box>
        </Paper>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4, mb: 1 }}
        >
          © {new Date().getFullYear()} Anton Bahurinsky
        </Typography>
        <CoreSocialLinks />
      </Box>
    </Container>
  );
}
