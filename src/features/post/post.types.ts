export type Post = {
  image?: string;
  content: string;
  postId: string;
  createdAt: Date;
  userName?: string;
  userImage?: string;
  likes: Like[];
};

export type Like = {
  likeId: string;
  likeUserName: string;
  likeUserImage?: string;
  likeUserId: string;
};

export type PostState = {
  postLoading: boolean;
  userPosts: Post[];
  feedPosts: Post[];
};

export type PostData = {
  content: string;
  image: string | undefined;
};
