import classes from "./EditProfile.module.css";
import { useDispatch } from "react-redux";
import { useAuthSlice } from "../../app/store";
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
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { editProfile } from "../../features/auth/authSlice";

export const EditProfile = () => {
  const {
    image,
    userName,
    token,
    authLoading,
    bio: currentBio,
    privacy: currentPrivacy,
  } = useAuthSlice();
  const dispatch = useDispatch();
  const { editProfileDispatch, name, bio, password, privacy } =
    useEditProfileReducer();

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

    if (currentBio && currentBio.length > 0)
      editProfileDispatch({
        type: "ADD_BIO",
        payload: currentBio,
      });
  }, []);

  const editProfileSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(
      editProfile({
        data: {
          bio: bio,
          name: name,
          password: password.length > 0 ? password : null,
          privacy: privacy,
        },
        token: token!,
      })
    );
  };

  return (
    <div className={classes["edit-profile-container"]}>
      <img src={image!} alt="Profile" className={classes["profile-picture"]} />
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
