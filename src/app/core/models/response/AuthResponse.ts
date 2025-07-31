export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  roles:{name:string}[]
  tokenInfo: {
    username: string;
    refreshToken: string;
    expiredAt: string;
    accessToken:string;
  };
}

export interface User {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: {name:string}[]
}