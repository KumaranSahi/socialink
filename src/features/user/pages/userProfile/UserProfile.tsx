import classes from "./userProfile.module.css";
import { ProfileDetails } from "../../components";
import { useAuthSlice, useUserSlice } from "../../../../app/store";
import { useEffect } from "react";
import { Post } from "../../../post/components";
import { useLocation } from "react-router-dom";
import { getUserInfo } from "../../userSlice";
import { useDispatch } from "react-redux";

export const UserProfile = () => {
  const { loadedUser } = useUserSlice();
  const { token } = useAuthSlice();

  const { search } = useLocation();
  const userToLoad = search.substring(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUserInfo({
        data: userToLoad,
        token: token!,
      })
    );
  }, [userToLoad, dispatch, token]);

    return (
      loadedUser && (
        <div className={classes["user-profile-container"]}>
          <ProfileDetails
            userName={loadedUser!.foundUserName}
            bio={loadedUser!.foundUserBio}
            image={loadedUser!.foundUserImage}
          />
          {loadedUser?.foundUserPrivacy && (
            <h1>Link up with the user to see the posts</h1>
          )}
          {!loadedUser?.foundUserPrivacy &&
          loadedUser!.foundUserPosts.length > 0 ? (
            loadedUser!.foundUserPosts.map(
              ({ content, createdAt, postId, image, likes, postEdited }) => (
                <Post
                  content={content}
                  createdAt={createdAt}
                  postImage={image ? image : null}
                  userImage={loadedUser!.foundUserImage}
                  userName={loadedUser!.foundUserName}
                  postId={postId}
                  isUserPost={true}
                  key={postId}
                  likes={likes}
                  postUserId={postId}
                  postEdited={postEdited}
                />
              )
            )
          ) : (
            <h1>No Posts yet 😐</h1>
          )}
        </div>
      )
    );
};
