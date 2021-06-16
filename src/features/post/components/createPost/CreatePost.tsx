import classes from "./CreatePost.module.css";
import { TextField, Button, IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { SyntheticEvent, useState } from "react";
import { useAuthSlice, usePostSlice } from "../../../../app/store";
import { useDispatch } from "react-redux";
import { setPostLoading, createPost } from "../../postSlice";
import axios from "../../../../useAxios";
import { Modal, warningToast, successToast } from "../../../../components";

export const CreatePost = () => {
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [openImageErrorModal, setOpenImageErrorModal] = useState(false);
  const [postEmptyModal, setPostEmptyModal] = useState(false);

  const dispatch = useDispatch();
  const { postLoading } = usePostSlice();
  const { token } = useAuthSlice();

  const fileUpload = async (file: FileList | null) => {
    const allowedExtensions = new RegExp("^.*(.jpg|.jpeg|.png)");
    if (
      file &&
      allowedExtensions.test(file[0].name.toLowerCase()) &&
      file[0].size <= 4000000
    ) {
      try {
        dispatch(setPostLoading(true));
        const data = new FormData();
        data.append("file", file[0]);
        data.append("upload_preset", "conclave");
        data.append("cloud_name", "conclave");
        const { data: imageData } = await axios.post(
          "https://api.cloudinary.com/v1_1/conclave/image/upload",
          data
        );
        setImage(imageData.url);
        dispatch(setPostLoading(false));
        successToast("Image uploaded successfully");
      } catch (error) {
        dispatch(setPostLoading(false));
        console.log(error);
        warningToast("Unable to upload image");
      }
    } else {
      setOpenImageErrorModal(true);
    }
  };

  const addPost = (event: SyntheticEvent) => {
    event.preventDefault();
    if (post.length > 0) {
      dispatch(
        createPost({
          data: {
            content: post,
            image: image.length > 0 ? image : undefined,
          },
          token: token!,
        })
      );
      setImage("");
      setPost("");
    } else {
      setPostEmptyModal(true);
    }
  };

  return (
    <div className={classes["create-post-container"]}>
      <form onSubmit={addPost}>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={post}
          onChange={(event) => setPost(event.target.value)}
          label="Whats on your mind?"
          variant="outlined"
        />
        <div className={classes["upload-post-buttons"]}>
          {image ? (
            <img src={image} alt="Post" className={classes["post-picture"]} />
          ) : (
            <>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={(event) => fileUpload(event.target.files)}
              />
              <label htmlFor="contained-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
                <span className={classes["upload-image"]}>Upload</span>
              </label>
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={postLoading}
            style={{ height: "3rem" }}
          >
            Post
          </Button>
        </div>
      </form>
      <Modal open={openImageErrorModal} handleClose={setOpenImageErrorModal}>
        <div className={classes["image-error-model"]}>
          <p>Please upload a .jpg or .png file under 4mb</p>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpenImageErrorModal(false)}
          >
            Ok
          </Button>
        </div>
      </Modal>
      <Modal open={postEmptyModal} handleClose={setPostEmptyModal}>
        <div className={classes["image-error-model"]}>
          <p>Please add a few words for your fans</p>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setPostEmptyModal(false)}
          >
            Ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};