import classes from "./Post.module.css";
import { format } from "timeago.js";
import { PostProps } from "../../post.types";
import { useAuthSlice } from "../../../../app/store";
import {
  postLikeButtonClicked,
  postActiveLikedButtonClicked,
} from "../../postSlice";
import { IconButton } from "@material-ui/core";
import { AddComment, ThumbUpAltTwoTone } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const Post = ({
  userImage,
  userName,
  content,
  postImage,
  createdAt,
  postId,
  isUserPost,
  likes,
  postUserId,
  postEdited,
}: PostProps) => {
  const { token, userId } = useAuthSlice();
  const dispatch = useDispatch();
  const { push } = useHistory();

  const likeButtonToBeRendered = () => {
    const like = likes && likes.find(({ likeUserId }) => likeUserId === userId);
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
      <div
        className={classes["user-info"]}
        onClick={() =>
          push({
            pathname: "/user-profile",
            search: postUserId,
          })
        }
      >
        <img src={userImage} alt="Profile" className={classes["user-image"]} />
        <div className={classes["username-timestamp"]}>
          <p className={classes["username"]}>{userName}</p>
          <p className={classes["timestamp"]}>{format(createdAt)}</p>
          {postEdited && (
            <span className={classes["edited-tag"]}>(Edited)</span>
          )}
        </div>
      </div>
      {postImage && (
        <img
          src={postImage}
          alt="Post"
          className={classes["post-image"]}
          onClick={() =>
            push({
              pathname: "/post",
              search: postId,
              state: { isUserPost: isUserPost },
            })
          }
        />
      )}{" "}
      <p
        className={classes["post-content"]}
        onClick={() =>
          push({
            pathname: "/post",
            search: postId,
            state: { isUserPost: isUserPost },
          })
        }
      >
        {content}
      </p>
      <div className={classes["like-comment"]}>
        {likeButtonToBeRendered()}
        <IconButton
          aria-label="comment"
          onClick={() =>
            push({
              pathname: "/post",
              search: postId,
              state: { isUserPost: isUserPost },
            })
          }
        >
          <AddComment />
        </IconButton>
      </div>
    </div>
  );
};
