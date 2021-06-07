import classes from "./Post.module.css";
import { format } from "timeago.js";
import { PostProps } from "./Post.types";
import { Button } from "@material-ui/core";
import { ThumbUp,AddComment } from "@material-ui/icons";

export const Post = ({
  userImage,
  userName,
  content,
  postImage,
  createdAt,
  postId,
}: PostProps) => {
  return (
    <div className={classes["post-container"]}>
      <div className={classes["user-info"]}>
        <img src={userImage} alt="Profile" className={classes["user-image"]} />
        <div className={classes["username-timestamp"]}>
          <p className={classes["username"]}>{userName}</p>
          <p className={classes["timestamp"]}>{format(createdAt)}</p>
        </div>
      </div>
      <p className={classes["post-content"]}>{content}</p>
      {postImage && (
        <img src={postImage} alt="Post" className={classes["post-image"]} />
      )}
      <div className={classes["like-comment"]}>
        <Button
          variant="contained"
          color="primary"
          style={{ borderRadius: 0 }}
          startIcon={<ThumbUp />}
          size="large"
          fullWidth
        >
          Like
        </Button>
        <Button
          color="default"
          style={{ borderRadius: 0 }}
          startIcon={<AddComment />}
          size="large"
          fullWidth
        >
          Comment
        </Button>
      </div>
    </div>
  );
};
