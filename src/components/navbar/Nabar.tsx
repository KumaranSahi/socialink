import classes from "./Navbar.module.css";
import { Avatar } from "./avatar/Avatar";
import { useHistory } from "react-router-dom";
import { SearchBar } from "./searchBar/SearchBar";

export const Navbar = () => {
  const { push } = useHistory();

  return (
    <div className={classes["navbar-container"]}>
      <h1 className={classes["navbar-logo"]} onClick={() => push("/")}>
        SociaLink
      </h1>
      <div className={classes["requests-avatar-container"]}>
        <SearchBar />
        <Avatar />
      </div>
    </div>
  );
};
