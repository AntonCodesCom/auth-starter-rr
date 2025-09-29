/**
 * @see https://github.com/AntonCodesCom/simple-todo-remix/blob/main/app/env.ts
 */
export function mode() {
  return {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  };
}

/**
 * @see https://github.com/AntonCodesCom/simple-todo-remix/blob/main/app/env.ts
 */
export default function env() {
  return {
    baseUrl: process.env.BASE_URL || 'http://localhost:5173',
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    sessionCookieSecret:
      process.env.SESSION_COOKIE_SECRET ||
      '__INSECURE__session_cookie_secret_dev',
  };
}

export function envE2E() {
  return {
    e2eUsername: process.env.E2E_USERNAME ?? '',
    e2ePassword: process.env.E2E_PASSWORD ?? '',
  };
}
