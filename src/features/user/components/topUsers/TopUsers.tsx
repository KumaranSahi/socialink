import classes from "./TopUsers.module.css";
import { getTopUsers } from "../../userSlice";
import { useUserSlice } from "../../../../app/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { UserListItem } from "../";

export const TopUsers = () => {
  const dispatch = useDispatch();
  const { topUsers } = useUserSlice();

  useEffect(() => {
    dispatch(getTopUsers());
  }, [dispatch]);

  return (
    <div className={classes["top-users-container"]}>
      <ul className={classes["top-user-list"]}>
        {topUsers.map(({ name, userId, image }) => (
          <li>
            <UserListItem
              key={userId}
              image={image || null}
              name={name}
              userId={userId}
              userItemType="ONLY_LINK"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
