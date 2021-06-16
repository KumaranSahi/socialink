import classes from "./Home.module.css";
import { CreatePost, Post } from "../../components";
import { TopUsers } from "../../../user/components";
import { useAuthSlice, usePostSlice } from "../../../../app/store";
import { getUserRequests } from "../../../user/userSlice";
import { getFeedPosts } from "../../../post/postSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const { token } = useAuthSlice();
  const { feedPosts } = usePostSlice();

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
                postUserId,
                postEdited,
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
                  key={postId}
                  postUserId={postUserId!}
                  postEdited={postEdited}
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
