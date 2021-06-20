import { Search } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import classes from "./SearchBar.module.css";
import { useState } from "react";
import debounce from "lodash.debounce";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const SearchBar = () => {
  const searchStyle = useStyles();
  const [userToSearch, setUserToSearch] = useState("");

  const searchTextEntered = (searchText: string) => {
    setUserToSearch(searchText);
    const debouncedSave = debounce(() => console.log(userToSearch), 1000);
    debouncedSave();
  };

  return (
    <div className={classes["search-history-container"]}>
      <div className={searchStyle.search}>
        <div className={searchStyle.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: searchStyle.inputRoot,
            input: searchStyle.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => searchTextEntered(event.target.value)}
          value={userToSearch}
        />
      </div>
      {userToSearch.length > 0 && (
        <div className={classes["search-history"]}></div>
      )}
    </div>
  );
};
