import classes from "./Comment.module.css";
import { Comment as CommentTypes } from "../../post.types";
import { format } from "timeago.js";
import { useState } from "react";
import { useAuthSlice, usePostSlice } from "../../../../app/store";
import { editCommentButtonClicked } from "../../postSlice";
import { useDispatch } from "react-redux";
import { AddComment } from "@material-ui/icons";
import { TextField, IconButton } from "@material-ui/core";
import { CommentOptions } from "./commentOptions/CommentOptions";
import { useHistory } from "react-router-dom";

export interface CommentProps extends CommentTypes {
  commentPostId: string;
}

export const Comment = ({
  commentUserName,
  commentUserImage,
  commentUserId,
  commentId,
  commentEdited,
  commentContent,
  createdAt,
  commentPostId,
}: CommentProps) => {
  const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { userId } = useAuthSlice();
  const { userPosts } = usePostSlice();

  const dispatch = useDispatch();

  const { push } = useHistory();

  const displayOptions = () =>
    commentUserId === userId ||
    userPosts.some(({ postId }) => postId === commentPostId);

  const editComment = () => {
    if (comment.length > 0)
      dispatch(
        editCommentButtonClicked({
          content: comment,
          commentId: commentId,
        })
      );
    setComment("");
    setEditMode(false);
  };

  return (
    <div className={classes["comment-container"]}>
      <div
        className={classes["user-info"]}
        onClick={() =>
          commentUserId &&
          push({
            pathname: "/user-profile",
            search: commentUserId!,
          })
        }
      >
        <img
          src={commentUserImage}
          alt="Profile"
          className={classes["user-image"]}
        />
        <div className={classes["username-timestamp"]}>
          <p className={classes["username"]}>{commentUserName}</p>
          <div>
            <p className={classes["timestamp"]}>{format(createdAt)}</p>
            {commentEdited && (
              <span className={classes["edited-tag"]}>(Edited)</span>
            )}
          </div>
        </div>
      </div>
      {!editMode && displayOptions() && (
        <CommentOptions
          commentUserId={commentUserId}
          setComment={setComment}
          setEditMode={setEditMode}
          userId={userId!}
          commentContent={commentContent}
          commentId={commentId}
        />
      )}
      {editMode && (
        <div className={classes["add-comment"]}>
          <TextField
            label="Filled"
            variant="filled"
            fullWidth
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <IconButton onClick={editComment}>
            <AddComment />
          </IconButton>
        </div>
      )}
      {!editMode && (
        <p className={classes["comment-content"]}>{commentContent}</p>
      )}
    </div>
  );
};
