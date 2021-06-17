import classes from "./Tabs.module.css";
import { UserListItem } from "../../../components";
import { useUserSlice } from "../../../../../app/store";

export const ReceivedRequests = () => {
  const { receivedRequests } = useUserSlice();
  return receivedRequests.length > 0 ? (
    <ul className={classes["request-list"]}>
      {receivedRequests.map(({ name, requestId, image }) => (
        <li className={classes["request-list-item"]}>
          <UserListItem
            image={image!}
            name={name}
            requestId={requestId}
            userItemType="LINK_AND_DELETE"
          />
        </li>
      ))}
    </ul>
  ) : (
    <div>
      <h1>No requests so far😕</h1>
    </div>
  );
};
