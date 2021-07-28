import classes from "./SingupComponent.module.css";
import {
  TextField,
  Button,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ConfirmPasswordContainerProps } from "../signup.types";
import { useState } from "react";

export const ConfirmPasswordContainer = ({
  email,
  password,
  confirmPassword,
  authLoading,
  changePasswordSubmit,
  signupDispatch,
  passwordValid,
}: ConfirmPasswordContainerProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <h1>Change Password:</h1>
      <form
        className={classes["signup-container"]}
        onSubmit={changePasswordSubmit}
      >
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
                onClick={() => setShowPassword((state: boolean) => !state)}
                onMouseDown={(event) => event.preventDefault()}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {!passwordValid && (
          <p className={classes["error-text"]}>
            Password should be atleast 8 characters with atleast 1 number
          </p>
        )}
        <Input
          type={showConfirmPassword ? "text" : "password"}
          className={classes["edit-form-element"]}
          value={confirmPassword}
          required={true}
          onChange={(event) =>
            signupDispatch({
              type: "ADD_CONFIRM_PASSWORD",
              payload: event.target.value,
            })
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() =>
                  setShowConfirmPassword((state: boolean) => !state)
                }
                onMouseDown={(event) => event.preventDefault()}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {!passwordValid && (
          <p className={classes["error-text"]}>
            Password should be atleast 8 characters with atleast 1 number
          </p>
        )}
        {/* <TextField
          label="Confirm Password"
          type="password"
          required
          fullWidth
          value={confirmPassword}
          onChange={(event) =>
            signupDispatch({
              type: "ADD_CONFIRM_PASSWORD",
              payload: event.target.value,
            })
          }
        /> */}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={authLoading}
        >
          Change Password
        </Button>
      </form>
    </>
  );
};
