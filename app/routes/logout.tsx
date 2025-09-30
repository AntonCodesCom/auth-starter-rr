import { redirect } from 'react-router';
import type { Route } from './+types/logout';
import makeAuthSessionUtils from '~/sessions/auth';

export async function loader({ request }: Route.LoaderArgs) {
  const { getAuthSession, destroyAuthSession } = makeAuthSessionUtils();
  const cookieHeader = request.headers.get('Cookie');
  const session = await getAuthSession(cookieHeader);
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroyAuthSession(session),
    },
  });
}
