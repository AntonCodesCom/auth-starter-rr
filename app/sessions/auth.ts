import { createCookieSessionStorage } from 'react-router';
import env from '~/env';

export async function getAccessTokenFromRequest(
  request: Request,
): Promise<string | null> {
  const { getAuthSession, authSessionName } = makeAuthSessionUtils();
  const session = await getAuthSession(request.headers.get('Cookie'));
  const token = session.get(authSessionName);
  return token ?? null;
}

/**
 * Auth session factory function.
 *
 * Provides utilities for storing and managing access token in cookies.
 *
 * @see https://github.com/AntonCodesCom/simple-todo-remix/blob/main/app/sessions.ts
 */
export default function makeAuthSessionUtils() {
  const { SESSION_COOKIE_SECRET } = env();
  const authSessionName = 'session';
  const { getSession, commitSession, destroySession } =
    createCookieSessionStorage({
      cookie: {
        name: authSessionName,
        httpOnly: true,
        path: '/',
        // sameSite: isDev ? 'strict' : 'lax', // TODO: env var
        sameSite: 'lax',
        secrets: [SESSION_COOKIE_SECRET],
        // secure: isProd || !allowSessionCookieWithoutHttps,
        secure: true,
        maxAge: 60 * 60 * 12, // 12 hours
      },
    });
  return {
    getAuthSession: getSession,
    commitAuthSession: commitSession,
    destroyAuthSession: destroySession,
    authSessionName,
  };
}
