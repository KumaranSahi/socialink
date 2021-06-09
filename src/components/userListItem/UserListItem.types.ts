export type UserListItemProps = {
  name: string;
  image: string | null;
  userId?: string;
  requestId?: string;
  userItemType: ButtonToRender;
};

export type ButtonToRender = "ONLY_LINK" | "ONLY_DELETE" | "LINK_AND_DELETE";
