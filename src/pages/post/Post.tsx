import classes from "./Post.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthSlice, usePostSlice } from "../../app/store";
import { Post as PostType } from "../../features/post/post.types";
import { format } from "timeago.js";
import { IconButton, TextField } from "@material-ui/core";
import { ThumbUpAltTwoTone } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import {
  postLikeButtonClicked,
  postActiveLikedButtonClicked,
} from "../../features/post/postSlice";
import { AddComment } from "@material-ui/icons";

export type RouterState = {
  isUserPost: boolean;
};

export const Post = () => {
  const { search, state } = useLocation();
  const { feedPosts, userPosts } = usePostSlice();
  const { token, userName, image: userImage, userId } = useAuthSlice();
  const postIdToLoad = search.substring(1);
  const dispatch = useDispatch();

  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    if ((state as RouterState).isUserPost) {
      const userPost = userPosts.find(({ postId }) => postId === postIdToLoad);
      if (userPost) setPost(userPost);
    } else {
      const feedPost = feedPosts.find(({ postId }) => postId === postIdToLoad);
      if (feedPost) setPost(feedPost);
    }
  }, [postIdToLoad, feedPosts, userPosts, state]);

  const likeButtonToBeRendered = () => {
    const like = post!.likes.find(({ likeUserId }) => likeUserId === userId);
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
          {post!.likes && post!.likes.length > 0 ? (
            <span className={classes["like-count"]}>{post!.likes.length}</span>
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
                data: post!.postId,
                token: token!,
              })
            )
          }
        >
          {post!.likes && post!.likes.length > 0 ? (
            <span className={classes["like-count"]}>{post!.likes.length}</span>
          ) : null}
          <IconButton aria-label="like">
            <ThumbUpAltTwoTone />
          </IconButton>
        </div>
      );
    }
  };

  return (
    post && (
      <div className={classes["post-page-container"]}>
        {(state as RouterState).isUserPost ? (
          <div className={classes["user-info"]}>
            <img
              src={userImage!}
              alt="Profile"
              className={classes["user-image"]}
            />
            <div className={classes["username-timestamp"]}>
              <p className={classes["username"]}>{userName}</p>
              <p className={classes["timestamp"]}>{format(post.createdAt)}</p>
            </div>
          </div>
        ) : (
          <div className={classes["user-info"]}>
            <img
              src={post.userImage!}
              alt="Profile"
              className={classes["user-image"]}
            />
            <div className={classes["username-timestamp"]}>
              <p className={classes["username"]}>{post.userName!}</p>
              <p className={classes["timestamp"]}>{format(post.createdAt)}</p>
            </div>
          </div>
        )}
        {post.image && (
          <img src={post.image} alt="Post" className={classes["post-image"]} />
        )}{" "}
        <p className={classes["post-content"]}>{post.content}</p>
        {likeButtonToBeRendered()}
        <div>
          <div className={classes["add-comment"]}>
            <TextField
              id="filled-basic"
              label="Filled"
              variant="filled"
              fullWidth
            />
            <IconButton>
              <AddComment />
            </IconButton>
          </div>
        </div>
      </div>
    )
  );
};
