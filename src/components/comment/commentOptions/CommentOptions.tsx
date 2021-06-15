import classes from "./CommentOptions.module.css";
import { useState, SyntheticEvent, SetStateAction, Dispatch } from "react";
import { MoreVert } from "@material-ui/icons";
import { Menu, MenuItem, IconButton } from "@material-ui/core";

export type CommentOptionsProps = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setComment: Dispatch<SetStateAction<string>>;
  commentUserId: string;
  userId: string;
  commentContent: string;
};

export const CommentOptions = ({
  commentUserId,
  setComment,
  setEditMode,
  userId,
  commentContent,
}: CommentOptionsProps) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditComment = () => {
    setEditMode(true);
    setComment(commentContent);
    handleClose();
  };

  const handleDeleteComment = () => {};

  const displayEdit = () => commentUserId! === userId!;

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes["comment-option"]}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem key="Delete" onClick={handleClose}>
          Delete
        </MenuItem>
        {displayEdit() && (
          <MenuItem key="Edit" onClick={handleEditComment}>
            Edit
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};
