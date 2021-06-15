import classes from "./Comment.module.css";
import { Comment as CommentTypes } from "../../features/post/post.types";
import { format } from "timeago.js";

export const Comment = ({
  commentUserName,
  commentUserImage,
  commentUserId,
  commentId,
  commentEdited,
  commentContent,
  createdAt,
}: CommentTypes) => {
  return (
    <div>
      <div className={classes["user-info"]}>
        <img
          src={commentUserImage}
          alt="Profile"
          className={classes["user-image"]}
        />
        <div className={classes["username-timestamp"]}>
          <p className={classes["username"]}>{commentUserName}</p>
          <div>
            <p className={classes["timestamp"]}>{format(createdAt)}</p>
            {commentEdited && <span>(Edited)</span>}
          </div>
        </div>
      </div>
      <p className={classes["comment-content"]}>{commentContent}</p>
    </div>
  );
};
