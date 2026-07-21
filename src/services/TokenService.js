class TokenService {
  static setCookie(name, value, expiresInMs) {
    const expires = new Date(Date.now() + expiresInMs);

    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
  }

  static getCookie(name) {
    const match = document.cookie.match(
      new RegExp("(^|;\\s*)" + name + "=([^;]+)")
    );

    return match ? decodeURIComponent(match[2]) : null;
  }

  static deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  static getAccessToken() {
    return this.getCookie("accessToken");
  }

  static getRefreshToken() {
    return this.getCookie("refreshToken");
  }

  static saveAccessToken(accessToken, accessTokenExpiry) {
    this.setCookie("accessToken", accessToken, accessTokenExpiry);
  }

  static saveRefreshToken(refreshToken, refreshTokenExpiry) {
    this.setCookie("refreshToken", refreshToken, refreshTokenExpiry);
  }

  static clear() {
    this.deleteCookie("accessToken");
    this.deleteCookie("refreshToken");
  }
}

export default TokenService;