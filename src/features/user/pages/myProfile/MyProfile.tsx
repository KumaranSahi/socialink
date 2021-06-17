import classes from "./MyProfile.module.css";
import { ProfileDetails } from "../../components";
import { getUserPosts } from "../../../post/postSlice";
import { useAuthSlice, usePostSlice } from "../../../../app/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Post } from "../../../post/components";

export const MyProfile = () => {
  const dispatch = useDispatch();
  const { token, userName, image: userImage, userId, bio } = useAuthSlice();
  const { userPosts } = usePostSlice();

  useEffect(() => {
    if (token) dispatch(getUserPosts(token));
  }, [token, dispatch]);

  return (
    <div className={classes["my-profile-container"]}>
      <ProfileDetails bio={bio!} image={userImage!} userName={userName!} />
      {userPosts.length > 0 ? (
        userPosts.map(
          ({ content, createdAt, postId, image, likes, postEdited }) => (
            <Post
              content={content}
              createdAt={createdAt}
              postImage={image ? image : null}
              userImage={userImage!}
              userName={userName!}
              postId={postId}
              isUserPost={true}
              key={postId}
              likes={likes}
              postUserId={userId!}
              postEdited={postEdited}
            />
          )
        )
      ) : (
        <h1>No Posts yet 😐</h1>
      )}
    </div>
  );
};
