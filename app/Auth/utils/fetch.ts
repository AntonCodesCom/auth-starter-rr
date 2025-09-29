import coreFetch from '~/Core/utils/fetch';
import { type HTMLFormMethod } from 'react-router';
import { HttpException, UnauthorizedException } from '../exceptions';

interface Params {
  accessToken: string;
  pathname: string;
  method: HTMLFormMethod;
}

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
    if (res.status === 401) {
      throw new UnauthorizedException();
    }
    throw new HttpException(`Status code: ${res.status}`);
  }
  if (res.status === 204) {
    return undefined as T;
  }
  const data = await res.json();
  return data as T;
}
