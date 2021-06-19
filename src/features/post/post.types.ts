import { SetStateAction, Dispatch } from "react";

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
  loadedUserPosts: Post[];
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

export type CommentOptionsProps = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setComment: Dispatch<SetStateAction<string>>;
  commentUserId: string;
  userId: string;
  commentContent: string;
  commentId: string;
  token: string;
};

export type PostProps = {
  userImage: string;
  userName: string;
  content: string;
  postImage: string | null;
  createdAt: Date;
  postId: string;
  likes: Like[];
  postCommentCount: number;
  isUserPost: boolean;
  postUserId: string;
  postEdited: boolean;
};

export type PostOptionsTypes = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setPost: Dispatch<SetStateAction<string>>;
  postContent: string;
  postId: string;
  token: string;
};

export type EditPostProps = {
  postContent: string;
  setPostContent: Dispatch<SetStateAction<string>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  postId: string;
};

export type LikeListProps = {
  likes: Like[];
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
};
