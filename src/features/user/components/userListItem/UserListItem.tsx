import classes from "./UserListItem.module.css";
import { UserListItemProps, ButtonToRender } from "../../user.types";
import { Button } from "@material-ui/core";
import {
  sendFriendRequestClicked,
  deleteFriendRequestClicked,
  acceptFriendRequestClicked,
  unlinkUserClicked,
} from "../../userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const UserListItem = ({
  image,
  name,
  userId,
  userItemType,
  requestId,
}: UserListItemProps) => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const buttonToRender = (buttonToRender: ButtonToRender) => {
    switch (buttonToRender) {
      case "ONLY_LINK":
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => dispatch(sendFriendRequestClicked(userId!))}
            className={classes["response-button"]}
          >
            Link up
          </Button>
        );
      case "ONLY_DELETE":
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              requestId && dispatch(deleteFriendRequestClicked(requestId))
            }
            className={classes["response-button"]}
          >
            Delete
          </Button>
        );
      case "LINK_AND_DELETE":
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                requestId && dispatch(acceptFriendRequestClicked(requestId))
              }
              className={classes["response-button"]}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                requestId && dispatch(deleteFriendRequestClicked(requestId))
              }
              className={classes["response-button"]}
            >
              Delete
            </Button>
          </div>
        );
      case "UNLINK":
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => dispatch(unlinkUserClicked(userId!))}
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
    <div className={classes["user-list-item-container"]}>
      <div
        className={classes["user-image-name"]}
        onClick={() =>
          push({
            pathname: "/user-profile",
            search: userId!,
          })
        }
      >
        <img src={image!} alt="users" className={classes["user-image"]} />
        <p className={classes["user-name"]}>{name}</p>
      </div>
      {buttonToRender(userItemType)}
    </div>
  );
};
