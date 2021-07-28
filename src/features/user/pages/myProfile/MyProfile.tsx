import classes from "./MyProfile.module.css";
import { ProfileDetails } from "../../components";
import { getUserPosts } from "../../../post/postSlice";
import { getUserfriends } from "../../userSlice";
import {
  useAuthSlice,
  usePostSlice,
  useUserSlice,
} from "../../../../app/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Post, CreatePost } from "../../../post/components";

export const MyProfile = () => {
  const dispatch = useDispatch();
  const { userName, image: userImage, userId, bio } = useAuthSlice();
  const { userPosts } = usePostSlice();
  const { friends } = useUserSlice();

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserfriends());
  }, [dispatch]);

  return (
    <div className={classes["my-profile-container"]}>
      <ProfileDetails
        bio={bio!}
        image={userImage!}
        userName={userName!}
        friends={friends}
        postCount={userPosts.length}
        friendsCount={friends.length}
        buttonType={{ type: "EDIT_PROFILE" }}
      />
      <CreatePost />
      {userPosts.length > 0 ? (
        userPosts.map(
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
              userImage={userImage!}
              userName={userName!}
              postId={postId}
              isUserPost={true}
              postCommentCount={(comments && comments.length) || 0}
              key={postId}
              likes={likes}
              postUserId={userId!}
              loadUser={false}
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
