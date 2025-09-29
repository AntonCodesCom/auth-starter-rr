import env from '~/env';

export default function coreFetch(
  pathname: string,
  requestInit?: RequestInit,
): Promise<Response> {
  const { apiUrl } = env();
  const url = new URL(pathname, apiUrl);
  return fetch(url, {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      'Content-Type': 'application/json',
    },
  });
}
