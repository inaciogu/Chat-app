import jwtDecode from 'jwt-decode';

export default function isValidToken(token: string) {
  if (token) {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  }
  return false;
}
