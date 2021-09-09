import classes from "./userProfile.module.css";
import { ProfileDetails } from "../../components";
import { usePostSlice, useUserSlice } from "../../../../app/store";
import { useEffect } from "react";
import { Post } from "../../../post/components";
import { useLocation } from "react-router-dom";
import { getUserInfo } from "../../userSlice";
import { getLoadedUserPost } from "../../../post/postSlice";
import { MyProfileButton } from "../../user.types";
import { useDispatch } from "react-redux";

export const UserProfile = () => {
  const { loadedUser, receivedRequests, sentRequests, friends } =
    useUserSlice();
  const { loadedUserPosts } = usePostSlice();

  const { search } = useLocation();
  const userToLoad = search.substring(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(userToLoad));
  }, [userToLoad, dispatch]);

  useEffect(() => {
    dispatch(getLoadedUserPost(userToLoad));
  }, [userToLoad, dispatch]);

  const buttonToRender = (): MyProfileButton => {
    if (friends.some(({ friendId }) => loadedUser?.foundUserId === friendId)) {
      return { type: "UNLINK", payload: loadedUser!.foundUserId };
    }
    const pendingRecievedRequest = receivedRequests.find(
      ({ userId }) => loadedUser?.foundUserId === userId
    );
    if (pendingRecievedRequest) {
      return {
        type: "ACCEPT_AND_DELETE",
        payload: pendingRecievedRequest.requestId,
      };
    }
    const pendingSentRequest = sentRequests.find(
      ({ userId }) => userId === loadedUser?.foundUserId
    );
    if (pendingSentRequest) {
      return {
        type: "DELETE",
        payload: pendingSentRequest.requestId,
      };
    }
    return { type: "LINK_UP", payload: loadedUser!.foundUserId };
  };
  console.log(loadedUser && loadedUser.friend.friendStatus === "FRIEND");
  return (
    loadedUser && (
      <div className={classes["user-profile-container"]}>
        <ProfileDetails
          userName={loadedUser!.foundUserName}
          bio={loadedUser!.foundUserBio}
          image={loadedUser!.foundUserImage}
          postCount={loadedUser!.foundUserPostCount}
          friends={loadedUser!.foundUserFriends || null}
          friendsCount={loadedUser!.foundUserFriendsCount}
          buttonType={buttonToRender()}
        />
        {loadedUser &&
          loadedUser.friend.friendStatus !== "FRIEND" &&
          loadedUser.foundUserPrivacy && (
            <h1>Link up with the user to see the posts</h1>
          )}
        {(!loadedUser?.foundUserPrivacy ||
          loadedUser.friend.friendStatus === "FRIEND") &&
        loadedUserPosts.length > 0 ? (
          loadedUserPosts.map(
            ({
              content,
              createdAt,
              postId,
              image,
              likes,
              postEdited,
              comments,
            }) => (
              <Post
                content={content}
                createdAt={createdAt}
                postImage={image ? image : null}
                userImage={loadedUser!.foundUserImage}
                userName={loadedUser!.foundUserName}
                postId={postId}
                isUserPost={false}
                key={postId}
                likes={likes}
                postCommentCount={comments.length}
                postUserId={postId}
                loadUser={false}
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
