import classes from "./Navbar.module.css";
import { Avatar } from "./avatar/Avatar";
import { useHistory } from "react-router-dom";
import { SearchBar } from "./searchBar/SearchBar";
import { Search, Cancel } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useState } from "react";

export const Navbar = () => {
  const { push } = useHistory();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className={classes["navbar-container"]}>
      <div className={classes["grouping-container"]}>
        {showSearch ? (
          <div className={classes["mobile-searchbar"]}>
            <SearchBar />
          </div>
        ) : (
          <h1 className={classes["navbar-logo"]} onClick={() => push("/")}>
            SociaLink
          </h1>
        )}
        <IconButton
          onClick={() => setShowSearch((state) => !state)}
          className={classes["mobile-search-button"]}
        >
          {showSearch ? <Cancel /> : <Search />}
        </IconButton>
      </div>
      <div className={classes["grouping-container"]}>
        <div className={classes["desktop-searchbar"]}>
          <SearchBar />
        </div>
        <Avatar />
      </div>
    </div>
  );
};
