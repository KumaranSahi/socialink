import classes from "./Tabs.module.css";
import { UserListItem } from "../../../components";
import { useUserSlice } from "../../../app/store";

export const SentRequests = () => {
  const { sentRequests } = useUserSlice();
  return sentRequests.length > 0 ? (
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
    </ul>
  ) : (
    <div>
      <h1>No pending requests😃</h1>
    </div>
  );
};
