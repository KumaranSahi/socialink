import classes from "./Home.module.css";
import { CreatePost, TopUsers } from "../../components";
import { authSlice } from "../../app/store";
import { getUserRequests } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(authSlice);

  useEffect(() => {
    if (token) dispatch(getUserRequests(token));
  }, [token]);

  return (
    <div className={classes["homepage"]}>
      <div className={classes["homepage-container"]}>
        <div className={classes["posts-container"]}>
          <CreatePost />
        </div>
        <div className={classes["people-you-may-know-container"]}>
          <TopUsers />
        </div>
      </div>
    </div>
  );
};
