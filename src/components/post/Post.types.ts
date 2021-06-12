import { Like } from "../../features/post/post.types";

export type PostProps = {
  userImage: string;
  userName: string;
  content: string;
  postImage: string | null;
  createdAt: Date;
  postId: string;
  likes: Like[];
  isUserPost: boolean;
};
