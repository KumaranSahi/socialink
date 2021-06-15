export type Post = {
  image?: string;
  content: string;
  postId: string;
  createdAt: Date;
  userName?: string;
  userImage?: string;
  postUserId?: string;
  postEdited: boolean;
  likes: Like[];
  comments: Comment[];
};

export type Like = {
  likeId: string;
  likeUserName: string;
  likeUserImage?: string;
  likeUserId: string;
};

export type Comment = {
  commentId: string;
  commentContent: string;
  commentUserName: string;
  commentUserImage: string;
  commentUserId: string;
  commentEdited: boolean;
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

export type CommentData = {
  content: string;
  postId: string;
};

export type PostEditData = {
  content: string;
  postId: string;
};

export type CommentEditData = {
  content: string;
  commentId: string;
};
