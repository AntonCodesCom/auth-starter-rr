import type { Route } from './+types/login';
import makeAuthSessionUtils, {
  getAccessTokenFromRequest,
} from '~/sessions/auth';
import { redirect } from 'react-router';
import AuthLogin from '~/Auth/components/Login';
import authLoginRequest from '~/Auth/requests/login';
import appConfig from '~/config';

// app config
const { defaultRestrictedRoutePathname } = appConfig;

// loader
export async function loader({ request }: Route.LoaderArgs) {
  const accessToken = await getAccessTokenFromRequest(request);
  if (accessToken) {
    return redirect('/');
  }
}

// action
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));
  const { accessToken } = await authLoginRequest({ username, password });
  if (!accessToken) {
    // triggering the "incorrect credentials" alert
    return { incorrectCredentialsNonce: Date.now() };
  }
  const { getAuthSession, commitAuthSession, authSessionName } =
    makeAuthSessionUtils();
  const cookieHeader = request.headers.get('Cookie');
  const session = await getAuthSession(cookieHeader);
  session.set(authSessionName, accessToken);
  return redirect(defaultRestrictedRoutePathname, {
    headers: {
      'Set-Cookie': await commitAuthSession(session),
    },
  });
}

/**
 * route component
 */
export default function RouteLogin() {
  return <AuthLogin />;
}
