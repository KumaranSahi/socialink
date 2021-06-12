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
