export type Post = {
  image?: string;
  content: string;
  postId: string;
  createdAt: Date;
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
