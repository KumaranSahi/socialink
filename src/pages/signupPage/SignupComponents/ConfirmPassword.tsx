import classes from "../Singup.module.css";
import { TextField, Button } from "@material-ui/core";
import { ConfirmPasswordContainerProps } from "../Signup.types";

export const ConfirmPasswordContainer = ({
  email,
  password,
  confirmPassword,
  authLoading,
  changePasswordSubmit,
  signupDispatch,
}: ConfirmPasswordContainerProps) => {
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
          variant="outlined"
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
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required
          value={password}
          onChange={(event) =>
            signupDispatch({
              type: "ADD_PASSWORD",
              payload: event.target.value,
            })
          }
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
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
        />
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
