import { Container, Paper, Typography } from "@mui/material";

export default function RouteIndex() {
  return (
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
  )
}
