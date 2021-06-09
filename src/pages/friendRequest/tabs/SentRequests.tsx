import classes from "./Tabs.module.css";
import { UserListItem } from "../../../components";
import { userSlice } from "../../../app/store";
import { useSelector } from "react-redux";

export const SentRequests = () => {
  const { sentRequests } = useSelector(userSlice);
  return (
    sentRequests.length>0?
     <ul className={classes["request-list"]}>
      {sentRequests.map(({ name, requestId, image }) => (
        <li className={classes["request-list-item"]}>
          <UserListItem
            image={image!}
            name={name}
            requestId={requestId}
            userItemType="ONLY_DELETE"
          />
        </li>
      ))}
    </ul>:
    <div>
      <h1>No pending requests😃</h1>
    </div>
  );
};
