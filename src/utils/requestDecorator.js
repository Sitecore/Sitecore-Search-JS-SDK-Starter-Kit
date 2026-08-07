import { jwtDecode } from "jwt-decode";
import TokenService from "../services/TokenService";
const API_URL = import.meta.env.VITE_API_URL;

const CANT_REFRESH_TOKEN_ERROR = "Cant retrieve new token";

// Refreshing authentication tokens before data is fetched.
export async function requestDecorator() {
  try {
    const accessToken = TokenService.getAccessToken();
    if (isTokenExpired(accessToken)) {
      await tryRefreshAccessToken();
    }
  } catch (e) {
  console.error('Error fetching token:', e);
  }
}

// Fetches a fresh access token from the backend.
// Uses the refresh token if we have one, otherwise requests a new access/refresh token pair.
export const tryRefreshAccessToken = async () => {
  try {
    const refreshToken = TokenService.getRefreshToken();
    // We already have a refresh token — exchange it for a new access token.
    if (refreshToken) {
      const res = await fetch(`${API_URL}/sdk-demo-auth/v1/token`,{
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
       if (!res.ok) {
          // Refresh token is no longer valid, clear stored tokens so the app re-authenticates from scratch instead of retrying forever.
          TokenService.clear();
          throw new Error("Refresh failed");
        }
      const data = await res.json();
      TokenService.saveAccessToken(
       data.accessToken,
       data.accessTokenExpiry,
      );
    }
    // Request a new access token and refresh token if no refresh token is available.
    else {
      const res = await fetch(`${API_URL}/sdk-demo-auth/v1/token`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        TokenService.saveAccessToken(
          data.accessToken,
          data.accessTokenExpiry,
        );
        TokenService.saveRefreshToken(
          data.refreshToken,
          data.refreshTokenExpiry
        );
      }
    }
  } catch {
    throw new Error(CANT_REFRESH_TOKEN_ERROR);
  }
}

// Decodes the JWT and checks its expiry, treating a token as expired
// slightly early (10s buffer) to avoid using a token that expires mid-request.
const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  const decodedToken = jwtDecode(token);
  const currentSeconds = Math.floor(Date.now() / 1000);
  const currentSecondsWithBuffer = currentSeconds - 10;
  //Consider expired if we are inside the early-refresh window.
 return decodedToken.exp < currentSecondsWithBuffer;
}
