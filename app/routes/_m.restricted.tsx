import { Container, Paper, Typography } from '@mui/material';
import type { Route } from './+types/_m.restricted';
import { getAccessTokenFromRequest } from '~/sessions/auth';
import authFetch from '~/Auth/utils/fetch';

export async function loader({ request }: Route.LoaderArgs) {
  const accessToken = (await getAccessTokenFromRequest(request))!; // force assuming presence
  const data = await authFetch<{ message: string }>({
    accessToken,
    method: 'get',
    pathname: '/restricted',
  });
  return { message: data.message };
}

export default function RouteRestricted({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return (
    <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Restricted Route
      </Typography>
      <Typography component="p">
        Only authenticated users should be able to see this page. Response from
        a restricted server endpoint:
      </Typography>
      <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.900' }}>
        <Typography
          component="pre"
          sx={{ color: 'common.white', fontFamily: 'monospace' }}
        >
          {message}
        </Typography>
      </Paper>
    </Container>
  );
}
