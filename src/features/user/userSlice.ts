import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../useAxios";
import {
  ResponseTemplate,
  AuthenticatedRequestsPayload,
} from "../../Generics.types";
import { warningToast, successToast } from "../../components";
import { UserInitialState } from "./user.types";

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
    } = await axios.get<ResponseTemplate>("/api/friends/top-users", config);
    return data;
  }
);

export const sendFriendRequest = createAsyncThunk(
  "user/send-request",
  async ({ data: linkTo, token }: AuthenticatedRequestsPayload<string>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.post(
      "/api/friends/send-request",
      {
        linkTo: linkTo,
      },
      config
    );
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
    [getTopUsers.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to load top users");
    },
    [sendFriendRequest.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [sendFriendRequest.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      successToast("Friend request sent");
      state.topUsers = state.topUsers.filter(
        ({ userId }) => action.payload.toUser !== userId
      );
    },
    [sendFriendRequest.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to load send friend request");
    },
  },
});

export default userSlice.reducer;
export const { setUserLoading } = userSlice.actions;
