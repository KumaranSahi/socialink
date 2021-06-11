import classes from "./MyProfile.module.css";
import { ProfileDetails } from "./profileDetails/ProfileDetails";
import { getUserPosts } from "../../features/post/postSlice";
import { authSlice, postSlice } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Post } from "../../components";
import defaultProfileImage from "../../assets/profile_image.jpg";

export const MyProfile = () => {
  const dispatch = useDispatch();
  const { token, userName, image: userImage } = useSelector(authSlice);
  const { userPosts } = useSelector(postSlice);

  useEffect(() => {
    if (token) dispatch(getUserPosts(token));
  }, [token, dispatch]);


  return (
    <div className={classes["my-profile-container"]}>
      <ProfileDetails />
      {userPosts.length > 0 &&
        userPosts.map(({ content, createdAt, postId, image,likes }) => (
          <Post
            content={content}
            createdAt={createdAt}
            postImage={image ? image : null}
            userImage={userImage ? userImage : defaultProfileImage}
            userName={userName!}
            postId={postId}
            key={postId}
            likes={likes}
          />
        ))}
    </div>
  );
};
