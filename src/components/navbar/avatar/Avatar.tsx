import classes from "./Avatar.module.css";
import { useState, SyntheticEvent, Dispatch, SetStateAction } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { WbSunny, Brightness2 } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUser } from "../../../features/auth/authSlice";
import { useAuthSlice, useUserSlice } from "../../../app/store";

export const Avatar = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { userName, image } = useAuthSlice();
  const { receivedRequests } = useUserSlice();
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
    push("/my-profile");
    handleClose();
  };

  const requestClicked = () => {
    push("/requests");
    handleClose();
  };

  const themeSelectorToRender = () => {
    return (
      <MenuItem
        onClick={() => {
          setDarkMode((state) => !state);
          handleClose();
        }}
      >
        {darkMode ? (
          <span className={classes["theme-selector"]}>
            {" "}
            <WbSunny /> Light Mode
          </span>
        ) : (
          <span className={classes["theme-selector"]}>
            <Brightness2 /> Dark Mode
          </span>
        )}
      </MenuItem>
    );
  };

  return (
    <>
      <div className={classes["name-avatar-container"]} onClick={handleClick}>
        <p className={classes["name-container"]}>Hello, {userName}</p>
        <div className={classes["avatar-container"]}>
          <img src={image!} className={classes["avatar"]} alt="Active avatar" />
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={requestClicked}>
          Requests{" "}
          {receivedRequests.length > 0 && (
            <span className={classes["recieved-requests"]}>
              {receivedRequests.length}
            </span>
          )}{" "}
        </MenuItem>
        <MenuItem onClick={myProfileClicked}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        {themeSelectorToRender()}
      </Menu>
    </>
  );
};
