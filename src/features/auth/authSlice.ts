import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  UserData,
  SignedInUserInfo,
  SigninUser,
  ChangePassword,
} from "./auth.types";
import axios from "../../useAxios";
import { ResponseTemplate } from "../../Generics.types";
import { warningToast, successToast, infoToast } from "../../components";

const initialState: AuthState = {
  image: null,
  token: null,
  userId: null,
  userName: null,
  authLoading: false,
  currentPage: "SIGNIN_PAGE",
};

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
      const { image, token, userId, userName } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
      action.payload?.image && localStorage.setItem("image", image);
      const expiresIn = new Date(new Date().getTime() + 3600000);
      localStorage.setItem("expiresIn", "" + expiresIn);
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
  },
});

export default authSlice.reducer;
export const { switchPage, setAuthLoading } = authSlice.actions;
