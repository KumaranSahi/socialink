import classes from "./Avatar.module.css";
import { useState, SyntheticEvent } from "react";
import profileImage from "../../../assets/profile_image.jpg";
import { Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUser } from "../../../features/auth/authSlice";

export const Avatar = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { push } = useHistory();
  const dispatch = useDispatch();

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(signoutUser());
    handleClose();
  };

  const handleMyScores = () => {
    push("/my-scores");
    handleClose();
  };

  return (
    <>
      <div className={classes["name-avatar-container"]} onClick={handleClick}>
        {/* <p className={classes["name-container"]}>Hello, {userName}</p> */}
        <p className={classes["name-container"]}>Hello, User</p>
        <div className={classes["avatar-container"]}>
          <img
            // src={image ? image : profileImage}
            src={profileImage}
            className={classes["avatar"]}
            alt="Active avatar"
          />
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMyScores}>My Scores</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
