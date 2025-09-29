import coreFetch from '~/Core/utils/fetch';

interface Params {
  username: string;
  password: string;
}

interface LoginResult {
  accessToken: string | null;
}

export default async function authLoginRequest({
  username,
  password,
}: Params): Promise<LoginResult> {
  const res = await coreFetch('/auth/login', {
    method: 'post',
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!res.ok) {
    return {
      accessToken: null,
    };
  }
  const data = await res.json();
  if (!data.accessToken) {
    throw new Error('Unexpected login endpoint return format.');
  }
  return {
    accessToken: data.accessToken.toString(),
  };
}
