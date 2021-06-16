import classes from "./CommentOptions.module.css";
import { useState, SyntheticEvent } from "react";
import { MoreVert } from "@material-ui/icons";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { deleteCommentButtonClicked } from "../../../postSlice";
import { useDispatch } from "react-redux";
import { CommentOptionsProps } from "../../../post.types";

export const CommentOptions = ({
  commentUserId,
  setComment,
  setEditMode,
  userId,
  commentContent,
  commentId,
  token,
}: CommentOptionsProps) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const dispatch = useDispatch();

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

  const handleDeleteComment = () => {
    dispatch(
      deleteCommentButtonClicked({
        data: commentId,
        token: token,
      })
    );
    handleClose();
  };

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
        <MenuItem key="Delete" onClick={handleDeleteComment}>
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
