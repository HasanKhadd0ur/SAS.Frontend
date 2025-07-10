export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  tokenInfo: {
    username: string;
    refreshToken: string;
    expiredAt: string;
  };
}
