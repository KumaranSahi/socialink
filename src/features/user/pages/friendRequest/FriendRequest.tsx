import classes from "./FriendRequest.module.css";
import { AppBar, Tabs, Tab, useTheme } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useState, useEffect } from "react";
import { SentRequests } from "./tabs/SentRequests";
import { ReceivedRequests } from "./tabs/ReceivedRequests";
import { useDispatch } from "react-redux";
import { getUserRequests } from "../../userSlice";

export const FriendRequest = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getUserRequests());
  }, [dispatch]);

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <div className={classes["request-container"]}>
      <div>
        <AppBar position="static" color="inherit">
          <Tabs
            value={value}
            onChange={(event, index) => handleChange(index)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Recieved " className={classes["tab-style"]} />
            <Tab label="Sent " className={classes["tab-style"]} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div role="tabpanel" hidden={value !== 0}>
            {value === 0 && <ReceivedRequests />}
          </div>
          <div role="tabpanel" hidden={value !== 1}>
            {value === 1 && <SentRequests />}
          </div>
        </SwipeableViews>
      </div>
    </div>
  );
};
