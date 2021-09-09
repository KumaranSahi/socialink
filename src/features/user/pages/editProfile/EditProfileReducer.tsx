import { useReducer } from "react";
import { EditProfile, EditProfileAction } from "../../user.types";

export const useEditProfileReducer = () => {
  const initialState: EditProfile = {
    name: "",
    bio: "",
    profileImage: "",
    fileUploadInfo: "",
    privacy: false,
    formTouched: false,
  };

  const editProfileReducer = (
    state: EditProfile,
    action: EditProfileAction
  ) => {
    switch (action.type) {
      case "ADD_NAME":
        return {
          ...state,
          name: action.payload,
          formTouched: true,
        };
      case "ADD_BIO":
        return {
          ...state,
          bio: action.payload,
          formTouched: true,
        };
      case "SET_PRIVACY":
        return {
          ...state,
          privacy: action.payload,
          formTouched: true,
        };
      case "ADD_IMAGE":
        return {
          ...state,
          profileImage: action.payload,
          formTouched: true,
        };
      case "SET_FILE_UPLOAD_INFO":
        return {
          ...state,
          fileUploadInfo: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(editProfileReducer, initialState);

  return {
    ...state,
    editProfileDispatch: dispatch,
  };
};
