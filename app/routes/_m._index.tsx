import { redirect } from 'react-router';
import type { Route } from './+types/_m._index';
import { getAccessTokenFromRequest } from '~/sessions/auth';

export async function loader({ request }: Route.LoaderArgs) {
  const accessToken = await getAccessTokenFromRequest(request);
  if (!accessToken) {
    return redirect('/login');
  }
  return redirect('/restricted');
}
