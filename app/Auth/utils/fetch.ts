import coreFetch from '~/Core/utils/fetch';
import { type HTMLFormMethod } from 'react-router';

// params
interface Params {
  accessToken: string;
  pathname: string;
  method: HTMLFormMethod;
}

/**
 *
 * @throws {Response} on 4xx or 5xx backend HTTP response
 */
export default async function authFetch<T = any>({
  accessToken,
  pathname,
  method,
}: Params): Promise<T> {
  const res = await coreFetch(pathname, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Response(res.statusText, { status: res.status });
  }
  if (res.status === 204) {
    return undefined as T;
  }
  const data = await res.json();
  return data as T;
}
