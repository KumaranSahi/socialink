import classes from "./LikeList.module.css";
import { Modal } from "../../../../../components";
import { UserListItem } from "../../../../user/components";
import { LikeListProps } from "../../../post.types";
import { useUserSlice } from "../../../../../app/store";

export const LikeList = ({ handleClose, likes, open }: LikeListProps) => {
  const { friends, recievedRequests, sentRequests } = useUserSlice();

  const userItemListTypeToRender = ({
    likeUserId,
    likeUserName,
    likeUserImage,
  }: {
    likeUserId: string;
    likeUserName: string;
    likeUserImage: string;
  }) => {
    if (friends.some(({ friendId }) => friendId === likeUserId))
      return (
        <UserListItem
          image={likeUserImage!}
          name={likeUserName}
          userItemType="UNLINK"
          userId={likeUserId}
        />
      );
    const recievedRequest = recievedRequests.find(
      ({ userId }) => userId === likeUserId
    );
    if (recievedRequest)
      return (
        <UserListItem
          image={likeUserImage}
          name={likeUserName}
          requestId={recievedRequest.requestId}
          userItemType="LINK_AND_DELETE"
        />
      );
    const sentRequest = sentRequests.find(
      ({ userId }) => userId === likeUserId
    );
    if (sentRequest)
      return (
        <UserListItem
          image={likeUserImage}
          name={likeUserName}
          requestId={sentRequest.requestId}
          userItemType="ONLY_DELETE"
        />
      );

    return (
      <UserListItem
        image={likeUserImage}
        name={likeUserName}
        userItemType={null}
      />
    );
  };

  return (
    <Modal handleClose={() => handleClose(false)} open={open}>
      <ul className={classes["likes-list"]}>
        {likes.map(({ likeUserId, likeUserName, likeUserImage }) => (
          <li key={likeUserId}>
            {userItemListTypeToRender({
              likeUserId,
              likeUserImage: likeUserImage!,
              likeUserName,
            })}
          </li>
        ))}
      </ul>
    </Modal>
  );
};
