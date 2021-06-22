import classes from "./Home.module.css";
import { CreatePost, Post } from "../../components";
import { TopUsers, FeedTopUsers } from "../../../user/components";
import {
  useAuthSlice,
  usePostSlice,
  useUserSlice,
} from "../../../../app/store";
import { getUserRequests, getUserfriends } from "../../../user/userSlice";
import { getFeedPosts } from "../../../post/postSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const { feedPosts } = usePostSlice();
  const { topUsers } = useUserSlice();
  const { token } = useAuthSlice();

  useEffect(() => {
    token && dispatch(getUserRequests());
  }, [dispatch, token]);

  useEffect(() => {
    token && dispatch(getFeedPosts());
  }, [dispatch, token]);

  useEffect(() => {
    token && dispatch(getUserfriends());
  }, [dispatch, token]);

  return (
    <div className={classes["homepage"]}>
      <div className={classes["homepage-container"]}>
        <div className={classes["posts-container"]}>
          <CreatePost />
          {topUsers.length > 0 && <FeedTopUsers />}
          {feedPosts.length > 0 ? (
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
            )
          ) : (
            <h1>Link up with people!😃</h1>
          )}
        </div>
        <div className={classes["people-you-may-know-container"]}>
          <TopUsers />
        </div>
      </div>
    </div>
  );
};
