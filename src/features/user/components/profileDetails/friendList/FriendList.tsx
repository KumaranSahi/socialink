import classes from "./FriendList.module.css";
import { Modal } from "../../../../../components";
import { useUserSlice } from "../../../../../app/store";
import { UserListItem } from "../../../../user/components";
import { FriendListProps } from "../../../user.types";

export const FriendList = ({
  friendList,
  handleClose,
  open,
}: FriendListProps) => {
  const { friends, receivedRequests, sentRequests } = useUserSlice();

  const userItemListTypeToRender = ({
    friendUserId,
    friendImage,
    friendName,
  }: {
    friendUserId: string;
    friendName: string;
    friendImage: string;
  }) => {
    if (friends.some(({ friendId }) => friendId === friendUserId))
      return (
        <UserListItem
          image={friendImage!}
          name={friendName}
          userItemType="UNLINK"
          userId={friendUserId}
        />
      );
    const recievedRequest = receivedRequests.find(
      ({ userId }) => userId === friendUserId
    );
    if (recievedRequest)
      return (
        <UserListItem
          image={friendImage}
          name={friendName}
          requestId={recievedRequest.requestId}
          userItemType="LINK_AND_DELETE"
        />
      );
    const sentRequest = sentRequests.find(
      ({ userId }) => userId === friendUserId
    );
    if (sentRequest)
      return (
        <UserListItem
          image={friendImage}
          name={friendName}
          requestId={sentRequest.requestId}
          userItemType="ONLY_DELETE"
        />
      );

    return (
      <UserListItem image={friendImage} name={friendName} userItemType={null} />
    );
  };

  return (
    <Modal handleClose={() => handleClose(false)} open={open}>
      <ul className={classes["friends-list"]}>
        {friendList.map(({ friendId, friendImage, friendName }) => (
          <li key={friendId}>
            {userItemListTypeToRender({
              friendUserId: friendId,
              friendImage: friendImage!,
              friendName,
            })}
          </li>
        ))}
      </ul>
    </Modal>
  );
};
