import env from '~/env';

export default function coreFetch(
  pathname: string,
  requestInit?: RequestInit,
): Promise<Response> {
  const { API_URL } = env();
  const url = new URL(pathname, API_URL);
  return fetch(url, {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      'Content-Type': 'application/json',
    },
  });
}
