import classes from "./SearchBar.module.css";
import { Search } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { searchUserTyped } from "../../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { SearchSpinner } from "./searchSpinner/SearchSpinner";
import { UserListItem } from "../../../features/user/components";
import { useUserSlice } from "../../../app/store";
import { useLocation } from "react-router-dom";

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
  const dispatch = useDispatch();
  const { searchResult, userLoading } = useUserSlice();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/user-profile") setUserToSearch("");
  }, [pathname]);

  const debouncedSearch = useCallback(
    debounce(
      (searchText: string) => dispatch(searchUserTyped(searchText)),
      1000
    ),
    []
  );

  const searchTextEntered = (searchText: string) => {
    setUserToSearch(searchText);
    debouncedSearch(searchText);
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
        <div className={classes["search-history"]}>
          {userLoading && <SearchSpinner />}
          <ul className={classes["search-result-list"]}>
            {searchResult.map(
              ({ searchUserId, searchUserImage, searchUserName }) => (
                <li>
                  <UserListItem
                    image={searchUserImage}
                    name={searchUserName}
                    userId={searchUserId}
                    userItemType={null}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
