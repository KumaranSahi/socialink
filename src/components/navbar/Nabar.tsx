import classes from "./Navbar.module.css";
import { Avatar } from "./avatar/Avatar";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const { push } = useHistory();
  return (
    <div className={classes["navbar-container"]}>
      <h1 className={classes["navbar-logo"]} onClick={() => push("/")}>
        SociaLink
      </h1>
      <Avatar />
    </div>
  );
};
