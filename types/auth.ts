export interface AuthUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface LoginResponse {
  message: string;
  data: {
    user: AuthUser;
    token: string;
    refreshToken: string;
  };
}

export interface RefreshResponse {
  message: string;
  data: {
    token: string;
  };
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}
