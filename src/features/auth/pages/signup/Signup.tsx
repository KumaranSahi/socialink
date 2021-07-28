import classes from "./Singup.module.css";
import { SyntheticEvent } from "react";
import { successToast, warningToast } from "../../../../components";
import { useSignupReducer } from "./SignupReducer";
import {
  SigninContainer,
  SignupContainer,
  ConfirmPasswordContainer,
} from "../../components";
import { SigninPages } from "../../auth.types";
import { Button } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import {
  signUpUser,
  signinUser,
  switchPage,
  changePassword,
  setAuthLoading,
} from "../../authSlice";
import { useDispatch } from "react-redux";
import { useAuthSlice } from "../../../../app/store";

export const Signup = () => {
  const dispatch = useDispatch();
  const { authLoading, currentPage } = useAuthSlice();
  const {
    dispatch: signupDispatch,
    state: {
      confirmPassword,
      email,
      emailValid,
      fileUploadInfo,
      image,
      password,
      userName,
      userNameValid,
      DOB,
      DOBValid,
      passwordValid,
    },
  } = useSignupReducer();

  const validateUserName = (userName: string) => {
    if (userName.length === 0) {
      signupDispatch({ type: "SET_USERNAME_VALID", payload: false });
      return false;
    }
    signupDispatch({ type: "SET_USERNAME_VALID", payload: true });
    return true;
  };

  const validateEmail = (email: string) => {
    if (
      email.length > 0 &&
      new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email)
    ) {
      signupDispatch({ type: "SET_EMAIL_VALID", payload: true });
      return true;
    }
    signupDispatch({ type: "SET_EMAIL_VALID", payload: false });
    return false;
  };

  const validatePassword = (password: string) => {
    if (
      password.length > 0 &&
      new RegExp("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$").test(password)
    ) {
      signupDispatch({ type: "SET_PASSWORD_VALID", payload: true });
      return true;
    }
    signupDispatch({ type: "SET_PASSWORD_VALID", payload: false });
    return false;
  };

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
          signupDispatch({
            type: "ADD_IMAGE",
            payload: reader.result! as string,
          });
        };

        successToast("Image uploaded successfully");
      } catch (error) {
        console.log(error);
        dispatch(setAuthLoading(false));
        warningToast("Unable to upload image");
      }
    } else {
      signupDispatch({
        type: "SET_FILE_UPLOAD_INFO",
        payload: "Please upload a .jpg or .png file under 4mb",
      });
    }
  };

  const addDob = (date: MaterialUiPickersDate) => {
    const DOB = date as Date;
    if (new Date().getFullYear() - DOB.getFullYear() >= 13) {
      signupDispatch({
        type: "ADD_DOB",
        payload: DOB,
      });
      signupDispatch({
        type: "SET_DOB_VALID",
        payload: true,
      });
    } else {
      signupDispatch({
        type: "SET_DOB_VALID",
        payload: false,
      });
    }
  };

  const signUpSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      validateUserName(userName) &&
      validateEmail(email) &&
      validatePassword(password) &&
      DOBValid
    ) {
      console.log({
        name: userName,
        email: email,
        password: password,
        image: image,
        DOB: DOB,
      });
      dispatch(
        signUpUser({
          name: userName,
          email: email,
          password: password,
          image: image,
          DOB: DOB,
        })
      );
    }
  };

  const signInSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (validateEmail(email))
      dispatch(
        signinUser({
          email: email,
          password: password,
        })
      );
  };

  const changePasswordSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      password === confirmPassword &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      dispatch(
        changePassword({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        })
      );
    } else {
      warningToast("Passwords do not match");
    }
  };

  const updateGuestCredentials = () => {
    signupDispatch({
      type: "ADD_EMAIL",
      payload: "testuser@test.com",
    });
    signupDispatch({
      type: "ADD_PASSWORD",
      payload: "testuser1",
    });
    dispatch(switchPage("SIGNIN_PAGE"));
  };

  const pageToRender = (currentPage: SigninPages) => {
    switch (currentPage) {
      case "SIGNUP_PAGE":
        return (
          <SignupContainer
            image={image}
            fileUpload={fileUpload}
            fileUploadInfo={fileUploadInfo}
            signUpSubmit={signUpSubmit}
            authLoading={authLoading}
            signupDispatch={signupDispatch}
            email={email}
            emailValid={emailValid}
            password={password}
            userName={userName}
            userNameValid={userNameValid}
            dob={DOB}
            dobValid={DOBValid}
            addDob={addDob}
            passwordValid={passwordValid}
          />
        );
      case "SIGNIN_PAGE":
        return (
          <SigninContainer
            signInSubmit={signInSubmit}
            signupDispatch={signupDispatch}
            email={email}
            emailValid={emailValid}
            password={password}
            authLoading={authLoading}
          />
        );
      case "CHANGE_PASSWORD":
        return (
          <ConfirmPasswordContainer
            authLoading={authLoading}
            changePasswordSubmit={changePasswordSubmit}
            confirmPassword={confirmPassword}
            email={email}
            password={password}
            signupDispatch={signupDispatch}
            passwordValid={passwordValid}
          />
        );
      default:
        return (
          <SignupContainer
            image={image}
            fileUpload={fileUpload}
            fileUploadInfo={fileUploadInfo}
            signUpSubmit={signUpSubmit}
            authLoading={authLoading}
            signupDispatch={signupDispatch}
            email={email}
            emailValid={emailValid}
            password={password}
            userName={userName}
            dob={DOB}
            dobValid={DOBValid}
            addDob={addDob}
            userNameValid={userNameValid}
            passwordValid={passwordValid}
          />
        );
    }
  };

  return (
    <div className={classes["signup-page-container"]}>
      <div className={classes["about-box"]}>
        <h1 className={classes["about-heading"]}>SociaLink</h1>
        <p className={classes["about-text"]}>
          A place to meet your kinda people!
        </p>
      </div>
      <div className={classes["signin-signup-container"]}>
        {pageToRender(currentPage)}
        <Button color="primary" onClick={updateGuestCredentials}>
          Sign-in as guest
        </Button>
        <br />
        {currentPage === "SIGNIN_PAGE" && (
          <Button
            color="primary"
            onClick={() => dispatch(switchPage("CHANGE_PASSWORD"))}
          >
            Forgot Password
          </Button>
        )}
        {currentPage === "SIGNIN_PAGE" ? (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => dispatch(switchPage("SIGNUP_PAGE"))}
          >
            New to Socialink? Sign up!
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => dispatch(switchPage("SIGNIN_PAGE"))}
          >
            Already have an Account? Sign In!
          </Button>
        )}
      </div>
    </div>
  );
};
