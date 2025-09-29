import { redirect } from 'react-router';
import type { Route } from './+types/_m._index';
import { getAccessTokenFromRequest } from '~/sessions/auth';
import authFetch from '~/Auth/utils/fetch';
import { UnauthorizedException } from '~/Auth/exceptions';

export async function loader({ request }: Route.LoaderArgs) {
  const accessToken = await getAccessTokenFromRequest(request);
  if (!accessToken) {
    return redirect('/login');
  }
  try {
    await authFetch({
      accessToken,
      pathname: '/auth/verify',
      method: 'post',
    });
    return redirect('/restricted');
  } catch (err) {
    if (err instanceof UnauthorizedException) {
      return redirect('/login'); // TODO: clear auth cookie
    }
    throw err;
  }
}
