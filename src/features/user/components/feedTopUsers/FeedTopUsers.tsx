import { useUserSlice } from "../../../../app/store";
import classes from "./FeedTopUsers.module.css";
import { FeedTopUserItem } from "./FeedTopUserItem/FeedTopUserItem";

export const FeedTopUsers = () => {
  const { topUsers } = useUserSlice();
  return (
    <ul className={classes["feed-top-user-list"]}>
      {topUsers.map(({ userId, image, name }) => (
        <li key={userId}>
          <FeedTopUserItem userId={userId} image={image!} name={name} />
        </li>
      ))}
    </ul>
  );
};
