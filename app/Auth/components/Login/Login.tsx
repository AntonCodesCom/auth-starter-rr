import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useFetcher } from 'react-router';
import CoreFooter from '~/Core/components/Footer';

export const authLoginIncorrectCredentialsLabel =
  'Incorrect username or password.';

export default function AuthLogin() {
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);
  const isLoading = fetcher.state !== 'idle';

  // snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  function openSnackbar() {
    setSnackbarOpen(true);
  }
  function closeSnackbar() {
    setSnackbarOpen(false);
  }

  // useEffect(() => {
  //   console.log(fetcher.data)
  // })

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
              // autoFocus
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

        <Box mb={4} />
        <CoreFooter />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
          aria-labelledby="authLoginIncorrectCredentialsAlertLabel"
        >
          <span id="authLoginIncorrectCredentialsAlertLabel">
            {authLoginIncorrectCredentialsLabel}
          </span>
        </Alert>
      </Snackbar>
    </Container>
  );
}
