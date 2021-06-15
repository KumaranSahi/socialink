import classes from "./PostOptions.module.css";
import { useState, SyntheticEvent } from "react";
import { MoreVert } from "@material-ui/icons";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { PostOptionsTypes } from "./PostOptions.types";
import { deletePostButtonClicked } from "../../../features/post/postSlice";
import { useHistory } from "react-router-dom";

export const PostOptions = ({
  postContent,
  postId,
  setEditMode,
  setPost,
  token,
}: PostOptionsTypes) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = () => {
    setEditMode(true);
    setPost(postContent);
    handleClose();
  };

  const handleDeleteEdit = () => {
    dispatch(
      deletePostButtonClicked({
        data: postId,
        token: token,
      })
    );
    push("/my-profile");
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes["post-option"]}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem key="Delete" onClick={handleDeleteEdit}>
          Delete
        </MenuItem>
        <MenuItem key="Edit" onClick={handleEditPost}>
          Edit
        </MenuItem>
      </Menu>
    </div>
  );
};
