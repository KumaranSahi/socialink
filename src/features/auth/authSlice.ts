import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  UserData,
  SignedInUserInfo,
  SigninUser,
  ChangePassword,
  EditUserData,
} from "./auth.types";
import axios from "../../useAxios";
import { ResponseTemplate } from "../../Generics.types";
import { warningToast, successToast, infoToast } from "../../components";
import defaultImage from "../../assets/profile_image.jpg";

const initialState: AuthState = {
  image: null,
  token: null,
  userId: null,
  userName: null,
  authLoading: false,
  currentPage: "SIGNIN_PAGE",
  bio: null,
  privacy: false,
};

export const editProfile = createAsyncThunk(
  "user/edit-profile",
  async (EditUserData: EditUserData) => {
    const {
      data: { data },
    } = await axios.put<ResponseTemplate>("/api/users/edit", EditUserData);
    return data;
  }
);

export const signUpUser = createAsyncThunk(
  "user/signup",
  async (userData: UserData) => {
    const { data } = await axios.post<ResponseTemplate>(
      "/api/users/signup",
      userData
    );
    return data;
  }
);

export const signinUser = createAsyncThunk(
  "user/signin",
  async (emailAndPassword: SigninUser) => {
    const {
      data: { data },
    } = await axios.post<ResponseTemplate<SignedInUserInfo>>(
      "/api/users/signin",
      emailAndPassword
    );
    return data;
  }
);

export const changePassword = createAsyncThunk(
  "user/change-password",
  async (userData: ChangePassword) => {
    const { data } = await axios.post<ResponseTemplate>(
      "/api/users/password",
      userData
    );
    return data;
  }
);

export const setupAuthHeaderForServiceCalls = (token: string) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = "Bearer " + token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

const authSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    switchPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setUserDetailsAfterReload: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.image = action.payload.image ? action.payload.image : defaultImage;
      state.userName = action.payload.userName;
      state.bio = action.payload.bio;
      state.privacy = action.payload.privacy;
      setupAuthHeaderForServiceCalls(action.payload.token);
    },
    setUserAfterEdit: (state, action) => {
      state.userName = action.payload.userName;
      state.bio = action.payload.bio;
      state.privacy = action.payload.privacy;
    },
    signoutUser: (state) => {
      localStorage.clear();
      state.token = null;
      state.userId = null;
      state.image = null;
      state.userName = null;
    },
  },
  extraReducers: {
    [signUpUser.pending.toString()]: (state) => {
      state.authLoading = true;
    },
    [signUpUser.fulfilled.toString()]: (state) => {
      successToast("User Added Successfully");
      state.currentPage = "SIGNIN_PAGE";
      state.authLoading = false;
    },
    [signUpUser.rejected.toString()]: (state, error) => {
      const errorCode = error.error.message.slice(-3);
      if (errorCode === 409) {
        infoToast("User already exists in socialink");
        infoToast("Please Try loging in");
        state.authLoading = false;
        return;
      }
      warningToast("Failed to add user");
      console.log(error);
      state.authLoading = false;
    },

    [signinUser.pending.toString()]: (state) => {
      state.authLoading = true;
    },
    [signinUser.fulfilled.toString()]: (state, action) => {
      state.authLoading = false;
      const { image, token, userId, userName, bio, privacy } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
      localStorage.setItem("bio", bio);
      localStorage.setItem("privacy", privacy);
      action.payload?.image && localStorage.setItem("image", image);
      const expiresIn = new Date(new Date().getTime() + 24 * 3600000);
      localStorage.setItem("expiresIn", "" + expiresIn);
      state.token = token;
      state.userId = userId;
      state.image = image ? image : defaultImage;
      state.userName = userName;
      state.bio = bio;
      state.privacy = privacy || false;
      setupAuthHeaderForServiceCalls(token);
    },
    [signinUser.rejected.toString()]: (state, error) => {
      warningToast("Invalid username or password");
      console.log(error);
      state.authLoading = false;
    },
    [changePassword.pending.toString()]: (state) => {
      state.authLoading = true;
    },
    [changePassword.fulfilled.toString()]: (state, action) => {
      state.authLoading = false;
      successToast("Password changed successfully");
      state.currentPage = "SIGNIN_PAGE";
    },
    [changePassword.rejected.toString()]: (state, action) => {
      state.authLoading = false;
      warningToast("Unable to change password please try again later");
      console.log(action.error);
    },
    [editProfile.pending.toString()]: (state) => {
      state.authLoading = true;
    },
    [editProfile.fulfilled.toString()]: (state, action) => {
      state.authLoading = false;
      const { name, bio, privacy } = action.payload;
      state.userName = name;
      state.bio = bio;
      state.privacy = privacy;
      localStorage.setItem("userName", name);
      localStorage.setItem("bio", bio);
      localStorage.setItem("privacy", privacy);
      successToast("User details updated");
    },
    [editProfile.rejected.toString()]: (state, action) => {
      state.authLoading = false;
      warningToast("Unable to edit user please try again later");
      console.log(action.error);
    },
  },
});

export default authSlice.reducer;
export const {
  switchPage,
  setAuthLoading,
  setUserDetailsAfterReload,
  signoutUser,
  setUserAfterEdit,
} = authSlice.actions;
