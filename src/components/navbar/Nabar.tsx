import classes from "./Navbar.module.css";
import { Avatar } from "./avatar/Avatar";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserSlice } from "../../app/store";

export const Navbar = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const requestClicked = () => {
    push("/requests");
  };

  const { receivedRequests } = useUserSlice();
  return (
    <div className={classes["navbar-container"]}>
      <h1 className={classes["navbar-logo"]} onClick={() => push("/")}>
        SociaLink
      </h1>
      <div className={classes["requests-avatar-container"]}>
        <div className={classes["request"]} onClick={requestClicked}>
          {pathname !== "/requests" && (
            <FontAwesomeIcon
              icon={faUser}
              className={classes["recieved-request-icon"]}
            />
          )}
          {receivedRequests.length > 0 && (
            <span className={classes["recieved-requests"]}>
              {receivedRequests.length}
            </span>
          )}
        </div>
        <Avatar />
      </div>
    </div>
  );
};
