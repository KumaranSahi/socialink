import classes from "./profileDetails.module.css";
import { useSelector } from "react-redux";
import { authSlice } from "../../../app/store";
import defaultProfileImage from "../../../assets/profile_image.jpg";
import { Button } from "@material-ui/core";

export const ProfileDetails = () => {
  const { userName, image } = useSelector(authSlice);

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
              <span>90</span> followers
            </p>
            <p className={classes["stat"]}>
              <span>90</span> following
            </p>
          </div>
        </div>
        <p className={classes["profile-description"]}>
          Description will show up here
        </p>
        <Button variant="outlined" fullWidth>
          Edit Profile
        </Button>
      </div>
    </div>
  );
};
