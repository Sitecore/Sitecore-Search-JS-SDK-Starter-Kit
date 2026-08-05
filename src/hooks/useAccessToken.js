import TokenService from "@/services/TokenService";
import { requestDecorator } from "@/utils/requestDecorator";
import { useCallback, useState } from "react";

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(() => TokenService.getAccessToken());

  const refreshToken = useCallback(async () => {
    try {
      console.log('Refreshing the token...');
      await requestDecorator();
      const token = TokenService.getAccessToken();
      setAccessToken(token);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      setAccessToken(undefined);
    }
  }, [setAccessToken]);

  return { accessToken, refreshToken };
}