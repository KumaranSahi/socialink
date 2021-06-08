import { Post } from "../post/post.types";

export type User = {
  name: string;
  userId: string;
  bio?: string;
  image?: string;
  privacy: boolean;
  post?: Post[];
};

export type EditUserData = {
  name: string;
  bio: string;
  privacy: boolean;
  password: string | null;
};

export type UserInitialState = {
  topUsers: User[];
  userProfile: User | null;
  userLoading: boolean;
};
