import { useReducer } from "react";
import { SignupInitialState, SignupAction } from "./Signup.types";

export const useSignupReducer = () => {
  const initialState: SignupInitialState = {
    userName: "",
    userNameValid: true,
    email: "",
    emailValid: true,
    password: "",
    confirmPassword: "",
    image: "",
    fileUploadInfo: "",
    DOB: new Date(),
    DOBValid: true,
  };

  const signupReducer = (state: SignupInitialState, action: SignupAction) => {
    switch (action.type) {
      case "ADD_USERNAME":
        return {
          ...state,
          userName: action.payload,
        };
      case "SET_USERNAME_VALID":
        return {
          ...state,
          userNameValid: action.payload,
        };
      case "ADD_EMAIL":
        return {
          ...state,
          email: action.payload,
        };
      case "SET_EMAIL_VALID":
        return {
          ...state,
          emailValid: action.payload,
        };
      case "ADD_PASSWORD":
        return {
          ...state,
          password: action.payload,
        };
      case "ADD_CONFIRM_PASSWORD":
        return {
          ...state,
          confirmPassword: action.payload,
        };
      case "ADD_IMAGE":
        return {
          ...state,
          image: action.payload,
        };
      case "SET_FILE_UPLOAD_INFO":
        return {
          ...state,
          fileUploadInfo: action.payload,
        };
      case "ADD_DOB":
        return {
          ...state,
          DOB: action.payload,
        };
      case "SET_DOB_VALID":
        return {
          ...state,
          DOBValid:action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(signupReducer, initialState);

  return {
    state,
    dispatch,
  };
};
