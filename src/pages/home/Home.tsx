import classes from "./Home.module.css";
import { CreatePost } from "../../components";

export const Home = () => {
  return (
    <div className={classes["homepage"]}>
      <div className={classes["homepage-container"]}>
        <div className={classes["posts-container"]}>
          <CreatePost />
        </div>
        <div className={classes["people-you-may-know-container"]}>
          People you may know
        </div>
      </div>
    </div>
  );
};
