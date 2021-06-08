import classes from "./TopUsers.module.css";
import { getTopUsers } from "../../features/user/userSlice";
import { userSlice, authSlice } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { UserListItem } from "../";

export const TopUsers = () => {
  const dispatch = useDispatch();
  const { topUsers } = useSelector(userSlice);
  const { token } = useSelector(authSlice);
  useEffect(() => {
    if (token) dispatch(getTopUsers(token));
  },[]);

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
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
