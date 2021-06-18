import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../useAxios";
import {
  ResponseTemplate,
  AuthenticatedRequestsPayload,
} from "../../Generics.types";
import { warningToast, successToast } from "../../components";
import { UserInitialState, User, Request, Friend } from "./user.types";
import defaultImage from "../../assets/profile_image.jpg";

const initialState: UserInitialState = {
  userLoading: false,
  userProfile: null,
  topUsers: [],
  sentRequests: [],
  receivedRequests: [],
  friends: [],
  loadedUser: null,
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

export const getUserfriends = createAsyncThunk(
  "user/friends",
  async (token: string) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.get(`/api/friends`, config);
    return data;
  }
);

export const deleteFriendRequest = createAsyncThunk(
  "user/delete-request",
  async ({ data: requestId, token }: AuthenticatedRequestsPayload<string>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.delete(`/api/friends/${requestId}`, config);
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

export const acceptFriendRequest = createAsyncThunk(
  "user/accept-request",
  async ({ data: requestId, token }: AuthenticatedRequestsPayload<string>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.put(`/api/friends/${requestId}`, null, config);
    return data;
  }
);

export const getUserRequests = createAsyncThunk(
  "user/get-user-requests",
  async (token: string) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>("/api/friends/requests", config);
    return data;
  }
);

export const getUserInfo = createAsyncThunk(
  "user/get-user-info",
  async ({ data: userId, token }: AuthenticatedRequestsPayload<string>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>(`/api/friends/${userId}`, config);
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
      state.topUsers = action.payload.map((user: User) => ({
        ...user,
        image: user.image || defaultImage,
      }));
    },
    [getTopUsers.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to load top users");
    },
    [getUserfriends.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [getUserfriends.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      state.friends = action.payload.map((friend: Friend) => ({
        ...friend,
        friendImage: friend.friendImage || defaultImage,
      }));
    },
    [getUserfriends.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to load user friends");
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
      warningToast("Unable to send friend request");
    },
    [getUserRequests.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [getUserRequests.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      state.receivedRequests = action.payload.receivedRequests.map(
        (request: Request) => ({
          ...request,
          image: request.image || defaultImage,
        })
      );
      state.sentRequests = action.payload.sentRequests.map(
        (request: Request) => ({
          ...request,
          image: request.image || defaultImage,
        })
      );
    },
    [getUserRequests.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to load user requests");
    },
    [deleteFriendRequest.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [deleteFriendRequest.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      successToast("Request deleted");
      const deletedRequestId = action.payload;
      state.receivedRequests = state.receivedRequests.filter(
        ({ requestId }) => requestId !== deletedRequestId
      );
      state.sentRequests = state.sentRequests.filter(
        ({ requestId }) => requestId !== deletedRequestId
      );
    },
    [deleteFriendRequest.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to delete request");
    },
    [acceptFriendRequest.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [acceptFriendRequest.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      successToast("Request accepted!");
      const deletedRequestId = action.payload;
      state.receivedRequests = state.receivedRequests.filter(
        ({ requestId }) => requestId !== deletedRequestId
      );
      state.sentRequests = state.sentRequests.filter(
        ({ requestId }) => requestId !== deletedRequestId
      );
    },
    [acceptFriendRequest.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to accept request");
    },
    [getUserInfo.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [getUserInfo.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      state.loadedUser = {
        ...action.payload,
        foundUserImage: action.payload.foundUserImage || defaultImage,
        foundUserFriends: action.payload.foundUserFriends.map(
          (item: Friend) => ({
            ...item,
            friendImage: item.friendImage || defaultImage,
          })
        ),
      };
    },
    [getUserInfo.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to load the user");
    },
  },
});

export default userSlice.reducer;
export const { setUserLoading } = userSlice.actions;
