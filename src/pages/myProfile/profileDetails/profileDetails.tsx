import classes from "./ProfileDetails.module.css";
import { useAuthSlice } from "../../../app/store";
import defaultProfileImage from "../../../assets/profile_image.jpg";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const ProfileDetails = () => {
  const { userName, image, bio } = useAuthSlice();
  const { push } = useHistory();

  return (
    <div className={classes["profile-details-container"]}>
      <img
        src={image ? image : defaultProfileImage}
        alt="Profile"
        className={classes["profile-image"]}
      />
      <div className={classes["name-stats-description-container"]}>
        <div className={classes["name-stats"]}>
          <h1 className={classes["user-name"]}>{userName}</h1>
          <div className={classes["stats-container"]}>
            <p className={classes["stat"]}>
              <span>90</span> posts
            </p>
            <p className={classes["stat"]}>
              <span>90</span> friends
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
      </div>
    </div>
  );
};
