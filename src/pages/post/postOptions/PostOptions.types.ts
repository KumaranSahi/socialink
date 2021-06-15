import { SetStateAction, Dispatch } from "react";

export type PostOptionsTypes = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setPost: Dispatch<SetStateAction<string>>;
  postContent: string;
  postId: string;
  token: string;
};
