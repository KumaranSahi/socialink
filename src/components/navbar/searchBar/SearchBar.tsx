import classes from "./SearchBar.module.css";
import { Search } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { searchUserTyped } from "../../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { UserListItem } from "../../../features/user/components";
import { useUserSlice } from "../../../app/store";
import { useLocation } from "react-router-dom";

export const SearchBar = ({ darkMode }: { darkMode: boolean }) => {
  const useStyles = makeStyles((theme) => ({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: darkMode
        ? fade(theme.palette.common.white, 0.15)
        : fade(theme.palette.common.black, 0.15),
      "&:hover": {
        backgroundColor: darkMode
          ? fade(theme.palette.common.white, 0.25)
          : fade(theme.palette.common.black, 0.25),
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

  const searchStyle = useStyles();
  const [userToSearch, setUserToSearch] = useState("");
  const dispatch = useDispatch();
  const { searchResult } = useUserSlice();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/user-profile") setUserToSearch("");
  }, [pathname]);
  /*eslint-disable*/
  const debouncedSearch = useCallback(
    debounce(
      (searchText: string) =>
        searchText.length > 0 && dispatch(searchUserTyped(searchText)),
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
