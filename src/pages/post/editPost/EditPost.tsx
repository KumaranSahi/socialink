import { TextField, Button } from "@material-ui/core";
import { useAuthSlice, usePostSlice } from "../../../app/store";
import { EditPostProps } from "./EditPost.types";
import { editPostButtonClicked } from "../../../features/post/postSlice";
import { useDispatch } from "react-redux";
import classes from "./EditPost.module.css";

export const EditPost = ({
  postContent,
  setPostContent,
  setEditMode,
  postId,
}: EditPostProps) => {
  const { token } = useAuthSlice();
  const { postLoading } = usePostSlice();
  const dispatch = useDispatch();

  const editPost = () => {
    if (postContent.length > 0)
      dispatch(
        editPostButtonClicked({
          data: {
            content: postContent,
            postId: postId,
          },
          token: token!,
        })
      );
    setEditMode(false);
  };

  return (
    <form onSubmit={editPost} className={classes["edit-post"]}>
      <TextField
        multiline
        rows={4}
        fullWidth
        value={postContent}
        onChange={(event) => setPostContent(event.target.value)}
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={postLoading}
        style={{ height: "3rem" }}
      >
        Post
      </Button>
    </form>
  );
};
