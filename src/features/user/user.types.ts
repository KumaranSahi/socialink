import { Post } from "../post/post.types";

export type User = {
  name: string;
  userId: string;
  bio?: string;
  image: string | null;
  privacy: boolean;
  post?: Post[];
};

export type Friend = {
  friendId: string;
  friendName: string;
  friendImage: string;
};

export type UserInitialState = {
  topUsers: User[];
  userProfile: User | null;
  userLoading: boolean;
  sentRequests: Request[];
  receivedRequests: Request[];
  friends: Friend[];
  loadedUser: LoadedUser | null;
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

export type ButtonToRender =
  | "ONLY_LINK"
  | "ONLY_DELETE"
  | "LINK_AND_DELETE"
  | "UNLINK"
  | null;

export type ProfileDetailProps = {
  userName: string;
  image: string;
  bio: string;
  postCount: number;
  friends: Friend[] | null;
  friendsCount?: number;
};

export type FriendStatus =
  | "FRIEND"
  | "SENT_REQUEST_PENDING"
  | "RECEIVED_REQUEST_PENDING"
  | "STRANGER";

export type LoadedUser = {
  foundUserId: string;
  foundUserName: string;
  foundUserImage: string;
  foundUserBio: string;
  foundUserPosts: Post[];
  foundUserPostCount: number;
  foundUserPrivacy: boolean;
  foundUserFriends: Friend[];
  foundUserFriendsCount: number;
  friend: {
    friendStatus: FriendStatus;
    requestId?: string;
  };
};
