import { Dispatch, SetStateAction } from "react";

export type EditPostProps = {
  postContent: string;
  setPostContent: Dispatch<SetStateAction<string>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  postId: string;
};
