import classes from "./Post.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthSlice, usePostSlice } from "../../../../app/store";
import { Post as PostType } from "../../post.types";
import { format } from "timeago.js";
import { IconButton, TextField, Button } from "@material-ui/core";
import { ThumbUpAltTwoTone, AddComment } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import {
  postLikeButtonClicked,
  postActiveLikedButtonClicked,
  addCommentButtonClicked,
} from "../../postSlice";
import { Comment } from "../../components";
import { EditPost } from "./editPost/EditPost";
import { PostOptions } from "./postOptions/PostOptions";
import { LikeList } from "./likeList/LikeList";
import { useHistory } from "react-router-dom";

export type RouterState = {
  isUserPost: boolean;
};

export const Post = () => {
  const { search, state } = useLocation();
  const { feedPosts, userPosts } = usePostSlice();
  const { token, userName, image: userImage, userId } = useAuthSlice();
  const postIdToLoad = search.substring(1);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [post, setPost] = useState<PostType | null>(null);
  const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [viewLikes, setViewLikes] = useState(false);

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
              {post.postEdited && (
                <span className={classes["edited-tag"]}>(Edited)</span>
              )}
            </div>
          </div>
        ) : (
          <div
            className={classes["user-info"]}
            onClick={() =>
              push({
                pathname: "/user-profile",
                search: post!.postUserId!,
              })
            }
          >
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
        {(state as RouterState).isUserPost && !editMode && (
          <PostOptions
            postContent={post.content}
            postId={post.postId}
            setEditMode={setEditMode}
            setPost={setPostContent}
            token={token!}
          />
        )}
        {post.image && (
          <img src={post.image} alt="Post" className={classes["post-image"]} />
        )}{" "}
        {editMode ? (
          <EditPost
            postContent={postContent}
            setPostContent={setPostContent}
            setEditMode={setEditMode}
            postId={postIdToLoad}
          />
        ) : (
          <p className={classes["post-content"]}>{post.content}</p>
        )}
        {likeButtonToBeRendered()}
        <Button color="primary" onClick={() => setViewLikes(true)}>
          view likes
        </Button>
        <LikeList
          handleClose={setViewLikes}
          open={viewLikes}
          likes={post.likes}
        />
        <div>
          <div className={classes["add-comment"]}>
            <TextField
              label="Filled"
              variant="filled"
              fullWidth
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <IconButton
              onClick={() => {
                if (comment.length > 0)
                  dispatch(
                    addCommentButtonClicked({
                      data: {
                        content: comment,
                        postId: postIdToLoad,
                      },
                      token: token!,
                    })
                  );
                setComment("");
              }}
            >
              <AddComment />
            </IconButton>
          </div>
          {post.comments && (
            <ul className={classes["comment-list"]}>
              {post.comments.map(
                ({
                  commentContent,
                  commentEdited,
                  commentId,
                  commentUserId,
                  commentUserImage,
                  commentUserName,
                  createdAt,
                }) => (
                  <li key={commentId}>
                    <Comment
                      commentContent={commentContent}
                      commentEdited={commentEdited}
                      commentId={commentId}
                      commentUserId={commentUserId}
                      commentUserImage={commentUserImage}
                      commentUserName={commentUserName}
                      createdAt={createdAt}
                      commentPostId={post.postId}
                    />
                    <hr />
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    )
  );
};
