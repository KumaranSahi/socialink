import classes from "../Singup.module.css";
import { TextField, Button } from "@material-ui/core";
import { SigninContainerProps } from "../Signup.types";

export const SigninContainer = ({
  signInSubmit,
  signupDispatch,
  email,
  emailValid,
  password,
  authLoading,
}: SigninContainerProps) => {
  return (
    <>
      <h1>Sign In:</h1>
      <form className={classes["signup-container"]} onSubmit={signInSubmit}>
        <div>
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
          {!emailValid && (
            <p className={classes["error-text"]}>Please enter a valid email</p>
          )}
        </div>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(event) =>
            signupDispatch({
              type: "ADD_PASSWORD",
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
          Sign In
        </Button>
      </form>
    </>
  );
};
