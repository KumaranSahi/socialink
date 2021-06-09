import classes from "./FriendRequest.module.css";
import { AppBar, Tabs, Tab, useTheme, Box } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useState } from "react";
import { SentRequests } from "./tabs/SentRequests";

export const FriendRequest = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

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
            <Tab label="Recieved " />
            <Tab label="Sent " />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div role="tabpanel" hidden={value !== 0}>
            {value === 0 && <Box p={3}>Recieved Requests</Box>}
          </div>
          <div role="tabpanel" hidden={value !== 1}>
            {value === 1 && <SentRequests />}
          </div>
        </SwipeableViews>
      </div>
    </div>
  );
};
