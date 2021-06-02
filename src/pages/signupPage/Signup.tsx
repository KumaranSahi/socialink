import classes from "./Singup.module.css";
import { SyntheticEvent, useState } from "react";
import { successToast, warningToast } from "../../components/";
import { useSignupReducer } from "./SignupReducer";
import axios from "axios";
import {
  SigninContainer,
  SignupContainer,
  ConfirmPasswordContainer,
} from "./SignupComponents";
import { SigninPages } from "../../features/auth/auth.types";
import { Button } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

export const Signup = () => {
  // const {
  //   signUpUser,
  //   signInUser,
  //   currentPage,
  //   setCurrentPage,
  //   changePassword,
  //   setAuthLoading,
  //   authLoading,
  //   dispatch,
  // } = useAuth();

  const [authLoading, setAuthLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<SigninPages>("SIGNUP_PAGE");
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
    },
  } = useSignupReducer();

  const validateUserName = () => {
    if (userName.length === 0)
      signupDispatch({ type: "SET_USERNAME_VALID", payload: false });
    else signupDispatch({ type: "SET_USERNAME_VALID", payload: true });
  };

  const validateEmail = () => {
    if (
      email.length > 0 &&
      new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email)
    )
      signupDispatch({ type: "SET_EMAIL_VALID", payload: true });
    else signupDispatch({ type: "SET_EMAIL_VALID", payload: false });
  };

  const fileUpload = async (file: FileList | null) => {
    const allowedExtensions = new RegExp("^.*(.jpg|.jpeg|.png)");
    if (
      file &&
      allowedExtensions.test(file[0].name.toLowerCase()) &&
      file[0].size <= 4000000
    ) {
      try {
        setAuthLoading(true);
        const data = new FormData();
        data.append("file", file[0]);
        data.append("upload_preset", "conclave");
        data.append("cloud_name", "conclave");
        const { data: imageData } = await axios.post(
          "https://api.cloudinary.com/v1_1/conclave/image/upload",
          data
        );
        signupDispatch({
          type: "ADD_IMAGE",
          payload: imageData.url,
        });
        setAuthLoading(false);
        successToast("Image uploaded successfully");
      } catch (error) {
        console.log(error);
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
    validateUserName();
    validateEmail();
    // if (userNameValid && emailValid) {
    //   signUpUser(
    //     {
    //       name: userName,
    //       email: email,
    //       password: password,
    //       image: image,
    //       isAdmin: isAdmin,
    //     },
    //     setAuthLoading,
    //     setCurrentPage
    //   );
    // }
  };

  const signInSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    validateEmail();
    // if (emailValid)
    //   signInUser(
    //     {
    //       email: email,
    //       password: password,
    //     },
    //     dispatch,
    //     setAuthLoading
    //   );
  };

  const changePasswordSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    validateEmail();
    // if (password === confirmPassword) {
    //   changePassword(
    //     {
    //       email: email,
    //       password: password,
    //       confirmPassword: confirmPassword,
    //     },
    //     setAuthLoading
    //   );
    // } else {
    //   warningToast("Passwords do not match");
    // }
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
        {currentPage === "SIGNIN_PAGE" && (
          <Button
            color="primary"
            onClick={() => setCurrentPage("CHANGE_PASSWORD")}
          >
            Forgot Password
          </Button>
        )}
        {currentPage === "SIGNIN_PAGE" ? (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setCurrentPage("SIGNUP_PAGE")}
          >
            New to Socialink? Sign up!
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setCurrentPage("SIGNIN_PAGE")}
          >
            Already have an Account? Sign In!
          </Button>
        )}
      </div>
    </div>
  );
};
