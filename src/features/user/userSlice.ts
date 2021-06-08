import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../useAxios";
import {
  ResponseTemplate,
  AuthenticatedRequestsPayload,
} from "../../Generics.types";
import { warningToast, successToast } from "../../components";
import { UserInitialState, EditUserData } from "./user.types";
import { setUserAfterEdit } from "../auth/authSlice";

const initialState: UserInitialState = {
  userLoading: false,
  userProfile: null,
  topUsers: [],
};

export const getTopUsers = createAsyncThunk(
  "user/get-top-user",
  async (token: string) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.get("/api/friends/top-users", config);
    return data;
  }
);

const userSlice = createSlice({
  initialState: initialState,
  name: "user",
  reducers: {
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
  extraReducers: {
    [getTopUsers.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [getTopUsers.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      state.topUsers = action.payload;
    },
    [getTopUsers.rejected.toString()]:(state,action)=>{
       state.userLoading = false;
       warningToast("Unable to load top users")
    }
  },
});

export default userSlice.reducer;
export const { setUserLoading } = userSlice.actions;
