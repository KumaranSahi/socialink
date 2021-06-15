import { SetStateAction, Dispatch } from "react";

export type CommentOptionsProps = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setComment: Dispatch<SetStateAction<string>>;
  commentUserId: string;
  userId: string;
  commentContent: string;
  commentId: string;
  token: string;
};
