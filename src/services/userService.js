import http from './httpService';

export async function register(user) {
  const { data, headers } = await http.post('/users', {
    email: user.username,
    password: user.password,
    name: user.name
  });
  return {
    data,
    token: headers['x-auth-token']
  };
}
