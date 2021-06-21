import classes from "./EditProfile.module.css";
import { useDispatch } from "react-redux";
import { useAuthSlice } from "../../../../app/store";
import {
  TextField,
  InputLabel,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  Switch,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import { useEditProfileReducer } from "./EditProfileReducer";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  Visibility,
  VisibilityOff,
  Delete,
  PhotoCamera,
} from "@material-ui/icons";
import { successToast, warningToast } from "../../../../components";
import { editProfile } from "../../../auth/authSlice";

export const EditProfile = () => {
  const {
    image,
    userName,
    authLoading,
    bio: currentBio,
    privacy: currentPrivacy,
  } = useAuthSlice();
  const dispatch = useDispatch();
  const {
    editProfileDispatch,
    name,
    bio,
    password,
    privacy,
    fileUploadInfo,
    profileImage,
  } = useEditProfileReducer();

  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    if (userName && userName.length > 0)
      editProfileDispatch({
        type: "ADD_NAME",
        payload: userName,
      });
    editProfileDispatch({
      type: "SET_PRIVACY",
      payload: currentPrivacy,
    });

    if (currentBio && currentBio.length > 0 && currentBio !== "undefined")
      editProfileDispatch({
        type: "ADD_BIO",
        payload: currentBio,
      });

    if (image && image.includes("res.cloudinary.com"))
      editProfileDispatch({
        type: "ADD_IMAGE",
        payload: image,
      });
  }, [userName, currentBio, currentPrivacy, editProfileDispatch, image]);

  const fileUpload = async (file: FileList | null) => {
    const allowedExtensions = new RegExp("^.*(.jpg|.jpeg|.png)");
    if (
      file &&
      allowedExtensions.test(file[0].name.toLowerCase()) &&
      file[0].size <= 4000000
    ) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onloadend = () => {
          editProfileDispatch({
            type: "ADD_IMAGE",
            payload: reader.result! as string,
          });
        };

        successToast("Image uploaded successfully");
      } catch (error) {
        console.log(error);
        warningToast("Unable to upload image");
      }
    } else {
      editProfileDispatch({
        type: "SET_FILE_UPLOAD_INFO",
        payload: "Please upload a .jpg or .png file under 4mb",
      });
    }
  };

  const editProfileSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(
      editProfile({
        bio: bio,
        name: name,
        password: password.length > 0 ? password : null,
        privacy: privacy,
        image: profileImage,
      })
    );
  };

  return (
    <div className={classes["edit-profile-container"]}>
      {profileImage ? (
        <div className={classes["image-container"]}>
          <img
            src={profileImage}
            alt="Profile"
            className={classes["profile-picture"]}
          />
          <IconButton
            className={classes["image-delete-icon"]}
            onClick={() =>
              editProfileDispatch({
                type: "ADD_IMAGE",
                payload: "",
              })
            }
          >
            <Delete />
          </IconButton>
        </div>
      ) : (
        <div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={(event) => fileUpload(event.target.files)}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
            <span className={classes["upload-profile-picture"]}>
              Upload Profile picture
            </span>
          </label>
          {fileUploadInfo && (
            <p className={classes["file-upload-info"]}>{fileUploadInfo}</p>
          )}
        </div>
      )}
      <form
        className={classes["edit-profile-form"]}
        onSubmit={editProfileSubmit}
      >
        <TextField
          label="name"
          value={name}
          fullWidth
          className={classes["edit-form-element"]}
          onChange={(event) =>
            editProfileDispatch({
              type: "ADD_NAME",
              payload: event.target.value,
            })
          }
        />
        <TextField
          label="bio"
          value={bio}
          multiline
          rows={4}
          fullWidth
          className={classes["edit-form-element"]}
          onChange={(event) =>
            editProfileDispatch({
              type: "ADD_BIO",
              payload: event.target.value,
            })
          }
        />
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            className={classes["edit-form-element"]}
            onChange={(event) =>
              editProfileDispatch({
                type: "ADD_PASSWORD",
                payload: event.target.value,
              })
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((state) => !state)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={privacy}
              onClick={() =>
                editProfileDispatch({
                  type: "SET_PRIVACY",
                  payload: !privacy,
                })
              }
            />
          }
          className={classes["edit-form-element"]}
          label="Privacy Mode"
          labelPlacement="start"
        />
        <br />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={authLoading}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};
