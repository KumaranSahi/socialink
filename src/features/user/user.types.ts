import { Post } from "../post/post.types";

export type User = {
  name: string;
  userId: string;
  bio?: string;
  image: string | null;
  privacy: boolean;
  post?: Post[];
};

export type UserInitialState = {
  topUsers: User[];
  userProfile: User | null;
  userLoading: boolean;
  sentRequests: Request[];
  recievedRequests: Request[];
};

export type Request = {
  requestId: string;
  userId: string;
  name: string;
  image: string | null;
};

export type EditProfile = {
  name: string;
  bio: string;
  privacy: boolean;
  password: string;
  formTouched: boolean;
};

export type EditProfileAction =
  | { type: "ADD_NAME"; payload: string }
  | { type: "ADD_BIO"; payload: string }
  | { type: "ADD_PASSWORD"; payload: string }
  | { type: "SET_PRIVACY"; payload: boolean };

export type UserListItemProps = {
  name: string;
  image: string | null;
  userId?: string;
  requestId?: string;
  userItemType: ButtonToRender;
};

export type ButtonToRender = "ONLY_LINK" | "ONLY_DELETE" | "LINK_AND_DELETE";
