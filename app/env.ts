import envdef from './envdef/envdef';
import type { EnvDefItem } from './envdef/types';

/**
 * @see https://github.com/AntonCodesCom/simple-todo-remix/blob/main/app/env.ts
 */
export function mode() {
  return {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  };
}

const defs: EnvDefItem[] = [
  {
    name: 'BASE_URL',
    default: 'http://localhost:5173',
  },
  {
    name: 'API_URL',
    default: 'http://localhost:3000',
  },
  {
    name: 'SESSION_COOKIE_SECRET',
    nonProdDefault: '__INSECURE__session_cookie_secret_dev',
  },
];

/**
 * @see https://github.com/AntonCodesCom/simple-todo-remix/blob/main/app/env.ts
 */
export default function env() {
  const { BASE_URL, API_URL, SESSION_COOKIE_SECRET } = envdef(defs);
  return {
    baseUrl: BASE_URL,
    apiUrl: API_URL,
    sessionCookieSecret: SESSION_COOKIE_SECRET,
  };
}

const e2eDefs: EnvDefItem[] = [
  {
    name: 'E2E_USERNAME',
  },
  {
    name: 'E2E_PASSWORD',
  },
];

export function envE2E() {
  const { E2E_USERNAME, E2E_PASSWORD } = envdef(e2eDefs);
  return {
    e2eUsername: E2E_USERNAME,
    e2ePassword: E2E_PASSWORD,
  };
}
