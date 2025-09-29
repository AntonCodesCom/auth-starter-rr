import { type BrowserContext } from '@playwright/test';
import authLoginRequest from '~/Auth/requests/login';
import makeAuthSessionUtils from '~/sessions/auth';
import cookie from 'cookie';

export async function e2eSetAccessTokenIntoSessionCookie({
  context,
  accessToken,
}: {
  context: BrowserContext;
  accessToken: string;
}) {
  const { getAuthSession, commitAuthSession, authSessionName } =
    makeAuthSessionUtils();
  const session = await getAuthSession();
  session.set(authSessionName, accessToken);
  // 'cookie' package is prone to failure; TODO: reconsider
  const cookiesObject = cookie.parse(await commitAuthSession(session));
  await context.addCookies([
    {
      name: authSessionName,
      value: cookiesObject[authSessionName] ?? '',
      domain: 'localhost',
      path: '/',
    },
  ]);
}

export default async function e2eLogInProgrammatically({
  context,
  username,
  password,
}: {
  context: BrowserContext;
  username: string;
  password: string;
}): Promise<{ accessToken: string }> {
  const { accessToken } = await authLoginRequest({
    username,
    password,
  });
  if (!accessToken) {
    throw new Error('Failed to log in.');
  }
  await e2eSetAccessTokenIntoSessionCookie({ context, accessToken });
  return { accessToken };
}
