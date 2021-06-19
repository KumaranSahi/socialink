import classes from "./ProfileDetails.module.css";
import { ProfileDetailProps } from "../../user.types";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { FriendList } from "./friendList/FriendList";

export const ProfileDetails = ({
  userName,
  image,
  bio,
  friends,
  postCount,
  friendsCount,
}: ProfileDetailProps) => {
  const { push } = useHistory();
  const [viewFriends, setViewFriends] = useState(false);

  return (
    <div className={classes["profile-details-container"]}>
      <img src={image} alt="Profile" className={classes["profile-image"]} />
      <div className={classes["name-stats-description-container"]}>
        <div className={classes["name-stats"]}>
          <h1 className={classes["user-name"]}>{userName}</h1>
          <div className={classes["stats-container"]}>
            <p className={classes["stat"]}>
              <span>{postCount}</span> posts
            </p>
            <p className={`${classes["stat"]} ${classes["friend-stat"]}`} onClick={()=>setViewFriends(true)}>
              <span>{friendsCount}</span> friends
            </p>
          </div>
        </div>
        {bio && bio.length > 0 && (
          <p className={classes["profile-description"]}>{bio}</p>
        )}
        <Button
          variant="outlined"
          fullWidth
          onClick={() => push("/edit-profile")}
        >
          Edit Profile
        </Button>
        {friends && (
          <FriendList
            handleClose={setViewFriends}
            open={viewFriends}
            friendList={friends}
          />
        )}
      </div>
    </div>
  );
};
