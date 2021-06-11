import classes from "./Post.module.css";
import { format } from "timeago.js";
import { PostProps } from "./Post.types";
import { authSlice } from "../../app/store";
import {
  postLikeButtonClicked,
  postActiveLikedButtonClicked,
} from "../../features/post/postSlice";
import { IconButton } from "@material-ui/core";
import { AddComment, ThumbUpAltTwoTone } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

export const Post = ({
  userImage,
  userName,
  content,
  postImage,
  createdAt,
  postId,
  likes,
}: PostProps) => {
  const { token, userId } = useSelector(authSlice);
  const dispatch = useDispatch();

  const likeButtonToBeRendered = () => {
    const like = likes.find(({ likeUserId }) => likeUserId === userId);
    if (like) {
      return (
        <div
          className={`${classes["post-like"]} ${classes["post-liked"]}`}
          onClick={() =>
            dispatch(
              postActiveLikedButtonClicked({
                data: like.likeId,
                token: token!,
              })
            )
          }
        >
          {likes && likes.length > 0 ? (
            <span className={classes["like-count"]}>{likes.length}</span>
          ) : null}
          <IconButton aria-label="like">
            <ThumbUpAltTwoTone />
          </IconButton>
        </div>
      );
    } else {
      return (
        <div
          className={classes["post-like"]}
          onClick={() =>
            dispatch(
              postLikeButtonClicked({
                data: postId,
                token: token!,
              })
            )
          }
        >
          {likes && likes.length > 0 ? (
            <span className={classes["like-count"]}>{likes.length}</span>
          ) : null}
          <IconButton aria-label="like">
            <ThumbUpAltTwoTone />
          </IconButton>
        </div>
      );
    }
  };

  return (
    <div className={classes["post-container"]}>
      <div className={classes["user-info"]}>
        <img src={userImage} alt="Profile" className={classes["user-image"]} />
        <div className={classes["username-timestamp"]}>
          <p className={classes["username"]}>{userName}</p>
          <p className={classes["timestamp"]}>{format(createdAt)}</p>
        </div>
      </div>
      {postImage && (
        <img src={postImage} alt="Post" className={classes["post-image"]} />
      )}{" "}
      <p className={classes["post-content"]}>{content}</p>
      <div className={classes["like-comment"]}>
        {likeButtonToBeRendered()}
        <IconButton aria-label="like">
          <AddComment />
        </IconButton>
      </div>
    </div>
  );
};
