import classes from "./Avatar.module.css";
import { useState, SyntheticEvent } from "react";
import profileImage from "../../../assets/profile_image.jpg";
import { Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { signoutUser } from "../../../features/auth/authSlice";
import {authSlice} from "../../../app/store"

export const Avatar = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const {userName,image}=useSelector(authSlice)
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

  const myProfileClicked = () => {
    push("/my-scores");
    handleClose();
  };

  return (
    <>
      <div className={classes["name-avatar-container"]} onClick={handleClick}>
        <p className={classes["name-container"]}>Hello, {userName}</p>
        <div className={classes["avatar-container"]}>
          <img
            src={image ? image : profileImage}
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
        <MenuItem onClick={myProfileClicked}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
