import classes from "./ProfileDetails.module.css";
import { ProfileDetailProps } from "../../user.types";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { FriendList } from "./friendList/FriendList";
import { useDispatch } from "react-redux";
import {
  sendFriendRequest,
  deleteFriendRequest,
  acceptFriendRequest,
} from "../../userSlice";

export const ProfileDetails = ({
  userName,
  image,
  bio,
  friends,
  postCount,
  friendsCount,
  buttonType,
}: ProfileDetailProps) => {
  const { push } = useHistory();
  const [viewFriends, setViewFriends] = useState(false);
  const dispatch = useDispatch();

  const buttonToRender = () => {
    switch (buttonType.type) {
      case "EDIT_PROFILE":
        return (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => push("/edit-profile")}
          >
            Edit Profile
          </Button>
        );
      case "ACCEPT_AND_DELETE":
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                buttonType.payload &&
                  dispatch(acceptFriendRequest(buttonType.payload));
                push("/");
              }}
              className={classes["response-button"]}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                buttonType.payload &&
                  dispatch(deleteFriendRequest(buttonType.payload));
                push("/");
              }}
              className={classes["response-button"]}
            >
              Delete
            </Button>
          </div>
        );
      case "LINK_UP":
        return (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
              dispatch(sendFriendRequest(buttonType.payload));
              push("/");
            }}
            className={classes["response-button"]}
          >
            Link up
          </Button>
        );
      case "DELETE":
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              buttonType.payload! &&
                dispatch(deleteFriendRequest(buttonType.payload));
              push("/");
            }}
            className={classes["response-button"]}
          >
            Delete
          </Button>
        );
      case "UNLINK":
        return (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            //  onClick={() => {
            //    dispatch(
            //      sendFriendRequest({ data: buttonType.payload!, token: token! })
            //    );
            //    push("/");
            //  }}
            className={classes["response-button"]}
          >
            Unlink
          </Button>
        );
      default:
        return <div></div>;
    }
  };

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
            <p
              className={`${classes["stat"]} ${classes["friend-stat"]}`}
              onClick={() => setViewFriends(true)}
            >
              <span>{friendsCount}</span> friends
            </p>
          </div>
        </div>
        {bio && bio.length > 0 && (
          <p className={classes["profile-description"]}>{bio}</p>
        )}
        {buttonToRender()}
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
