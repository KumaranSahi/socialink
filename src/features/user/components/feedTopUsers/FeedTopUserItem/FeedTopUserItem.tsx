import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { sendFriendRequestClicked } from "../../../userSlice";
import classes from "./FeedTopUserItem.module.css";
import { useDispatch } from "react-redux";

export const FeedTopUserItem = ({
  userId,
  image,
  name,
}: {
  userId: string;
  image: string;
  name: string;
}) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  return (
    <div className={classes["user-item-container"]}>
      <img
        src={image}
        alt="profile"
        className={classes["user-image"]}
        onClick={() =>
          push({
            pathname: "/user-profile",
            search: userId,
          })
        }
      />
      <p
        className={classes["user-name"]}
        onClick={() =>
          push({
            pathname: "/user-profile",
            search: userId,
          })
        }
      >
        {name}
      </p>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => dispatch(sendFriendRequestClicked(userId))}
        className={classes["response-button"]}
      >
        Link up
      </Button>
    </div>
  );
};
