import classes from "../Singup.module.css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff, PhotoCamera } from "@material-ui/icons";
import { SignupContainerProps } from "../Signup.types";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useState } from "react";

export const SignupContainer = ({
  image,
  fileUpload,
  fileUploadInfo,
  email,
  emailValid,
  password,
  userName,
  userNameValid,
  signUpSubmit,
  authLoading,
  signupDispatch,
  addDob,
  dob,
  dobValid,
}: SignupContainerProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <h1>Sign Up:</h1>
      <form className={classes["signup-container"]} onSubmit={signUpSubmit}>
        {image ? (
          <img
            src={image}
            alt="Profile"
            className={classes["profile-picture"]}
          />
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
        <div>
          <TextField
            label="Username"
            required
            fullWidth
            value={userName}
            onChange={(event) =>
              signupDispatch({
                type: "ADD_USERNAME",
                payload: event.target.value,
              })
            }
          />
          {!userNameValid && (
            <p className={classes["error-text"]}>
              Please enter a valid user name
            </p>
          )}
        </div>
        <div>
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(event) =>
              signupDispatch({
                type: "ADD_EMAIL",
                payload: event.target.value,
              })
            }
          />
          {!emailValid && (
            <p className={classes["error-text"]}>Please enter a valid email</p>
          )}
        </div>
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            className={classes["edit-form-element"]}
            value={password}
            required={true}
            onChange={(event) =>
              signupDispatch({
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
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={dob}
              onChange={addDob}
              fullWidth
              required
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          {!dobValid && (
            <p className={classes["error-text"]}>
              You should be above the age of 13 to open an account
            </p>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={authLoading}
        >
          Sign up!
        </Button>
      </form>
    </>
  );
};
