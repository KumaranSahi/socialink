import classes from "./LikeList.module.css";
import { Modal } from "../../../../../components";
import { UserListItem } from "../../../../user/components";
import { LikeListProps } from "../../../post.types";
import { useUserSlice } from "../../../../../app/store";

export const LikeList = ({ handleClose, likes, open }: LikeListProps) => {
  const { friends, receivedRequests, sentRequests } = useUserSlice();

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
    const recievedRequest = receivedRequests.find(
      ({ userId }) => userId === likeUserId
    );
    if (recievedRequest)
      return (
        <UserListItem
          image={likeUserImage}
          name={likeUserName}
          requestId={recievedRequest.requestId}
          userId={likeUserId}
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
          userId={likeUserId}
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
