import classes from "./MyProfile.module.css";
import { ProfileDetails } from "./profileDetails/profileDetails";

export const MyProfile = () => {
  return (
    <div className={classes["my-profile-container"]}>
      <ProfileDetails />
    </div>
  );
};
