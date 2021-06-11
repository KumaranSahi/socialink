import classes from "./Home.module.css";
import { CreatePost, TopUsers, Post } from "../../components";
import { authSlice, postSlice } from "../../app/store";
import { getUserRequests } from "../../features/user/userSlice";
import { getFeedPosts } from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import defaultProfileImage from "../../assets/profile_image.jpg";

export const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(authSlice);
  const { feedPosts } = useSelector(postSlice);

  useEffect(() => {
    if (token) dispatch(getUserRequests(token));
  }, [token]);

  useEffect(() => {
    if (token) dispatch(getFeedPosts(token));
  }, [token]);

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
              }) => (
                <Post
                  content={content}
                  createdAt={createdAt}
                  postImage={image ? image : null}
                  userImage={userImage ? userImage : defaultProfileImage}
                  userName={userName!}
                  postId={postId}
                  likes={likes}
                  key={postId}
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
