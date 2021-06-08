import classes from "./UserListItem.module.css";
import { UserListItemProps } from "./UserListItem.types";
import { Button } from "@material-ui/core";
import defaultProfileImage from "../../assets/profile_image.jpg";
import { sendFriendRequest } from "../../features/user/userSlice";
import { authSlice } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

export const UserListItem = ({ image, name, userId }: UserListItemProps) => {
  const { token } = useSelector(authSlice);
  const dispatch = useDispatch();
  return (
    <div className={classes["user-list-item-container"]}>
      <div className={classes["user-image-name"]}>
        <img
          src={image ? image : defaultProfileImage}
          alt="users"
          className={classes["user-image"]}
        />
        <p className={classes["user-name"]}>{name}</p>
      </div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => dispatch(sendFriendRequest({ data: userId!, token: token! }))}
      >
        Follow
      </Button>
    </div>
  );
};
