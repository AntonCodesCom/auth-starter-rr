import { redirect } from 'react-router';
import type { Route } from './+types/_m._index';
import makeAuthSessionUtils, {
  getAccessTokenFromRequest,
} from '~/sessions/auth';
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
      const { getAuthSession, destroyAuthSession } = makeAuthSessionUtils();
      const cookieHeader = request.headers.get('Cookie');
      const session = await getAuthSession(cookieHeader);
      return redirect('/login', {
        headers: {
          'Set-Cookie': await destroyAuthSession(session),
        },
      });
    }
    throw err; // TODO: e2e
  }
}
