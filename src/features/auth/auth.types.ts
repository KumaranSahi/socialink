export type SigninPages = "SIGNIN_PAGE" | "SIGNUP_PAGE" | "CHANGE_PASSWORD";

export type AuthState = {
  userId: string | null;
  userName: string | null;
  image?: string | null;
  token: string | null;
  bio: string | null;
  privacy: boolean;
  authLoading: boolean;
  currentPage: SigninPages;
};

export type UserData = {
  name: string;
  email: string;
  password: string;
  image?: string;
  DOB: Date;
};

export type SignedInUserInfo = {
  token: string;
  userName: string;
  expiresIn: Date;
  image?: string;
  userId: string;
};

export type SigninUser = {
  email: string;
  password: string;
};

export type ChangePassword = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type EditUserData = {
  name: string;
  bio: string;
  privacy: boolean;
  password: string | null;
};