import { type EnvDefItem, envdef } from 'envdef';

/**
 * @see https://github.com/AntonCodesCom/simple-todo-remix/blob/main/app/env.ts
 */
export function mode() {
  return {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  };
}

const defs = [
  {
    name: 'API_URL',
    default: 'http://localhost:3000',
  },
  {
    name: 'SESSION_COOKIE_SECRET',
    nonProdDefault: '__INSECURE__session_cookie_secret_dev',
  },
] as const satisfies EnvDefItem[];

/**
 * @see https://github.com/AntonCodesCom/simple-todo-remix/blob/main/app/env.ts
 */
export default function env() {
  const { API_URL, SESSION_COOKIE_SECRET } = envdef(defs);
  return {
    apiUrl: API_URL,
    sessionCookieSecret: SESSION_COOKIE_SECRET,
  };
}

const e2eDefs = [
  {
    name: 'BASE_URL',
    default: 'http://localhost:5173',
  },
  {
    name: 'E2E_USERNAME',
  },
  {
    name: 'E2E_PASSWORD',
  },
] as const satisfies EnvDefItem[];

export function envE2E() {
  const { BASE_URL, E2E_USERNAME, E2E_PASSWORD } = envdef(e2eDefs);
  return {
    BASE_URL,
    E2E_USERNAME,
    E2E_PASSWORD,
  };
}
