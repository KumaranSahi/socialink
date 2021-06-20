import classes from "./Home.module.css";
import { CreatePost, Post } from "../../components";
import { TopUsers } from "../../../user/components";
import { usePostSlice } from "../../../../app/store";
import { getUserRequests, getUserfriends } from "../../../user/userSlice";
import { getFeedPosts } from "../../../post/postSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const { feedPosts } = usePostSlice();

  useEffect(() => {
    dispatch(getUserRequests());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeedPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserfriends());
  }, [dispatch]);

  return (
    <div className={classes["homepage"]}>
      <div className={classes["homepage-container"]}>
        <div className={classes["posts-container"]}>
          <CreatePost />
          {feedPosts.length > 0 &&
            feedPosts.map(
              ({
                content,
                createdAt,
                postId,
                image,
                userImage,
                userName,
                likes,
                postUserId,
                postEdited,
                comments,
              }) => (
                <Post
                  content={content}
                  createdAt={createdAt}
                  postImage={image ? image : null}
                  userImage={userImage!}
                  userName={userName!}
                  postId={postId}
                  likes={likes}
                  isUserPost={false}
                  postCommentCount={comments.length}
                  key={postId}
                  postUserId={postUserId!}
                  postEdited={postEdited}
                  loadUser={true}
                />
              )
            )}
        </div>
        <div className={classes["people-you-may-know-container"]}>
          <TopUsers />
        </div>
      </div>
    </div>
  );
};
