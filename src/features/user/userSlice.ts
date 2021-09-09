import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APP_URL } from "../../axiosUtils";
import axios from "axios";
import { ResponseTemplate } from "../../Generics.types";
import { warningToast, successToast } from "../../components";
import {
  UserInitialState,
  User,
  Request,
  Friend,
  SearchUser,
} from "./user.types";
import defaultImage from "../../assets/profile_image.jpg";

const initialState: UserInitialState = {
  userLoading: false,
  userProfile: null,
  topUsers: [],
  sentRequests: [],
  receivedRequests: [],
  friends: [],
  loadedUser: null,
  searchResult: [],
};

export const getTopUsers = createAsyncThunk("user/get-top-user", async () => {
  const {
    data: { data },
  } = await axios.get<ResponseTemplate>(`${APP_URL}api/friends/top-users`);
  return data;
});

export const getUserfriends = createAsyncThunk("user/friends", async () => {
  const {
    data: { data },
  } = await axios.get(`${APP_URL}api/friends`);
  return data;
});

export const deleteFriendRequestClicked = createAsyncThunk(
  "user/delete-request",
  async (requestId: string) => {
    const {
      data: { data },
    } = await axios.delete(`${APP_URL}api/friends/${requestId}`);
    return data;
  }
);

export const sendFriendRequestClicked = createAsyncThunk(
  "user/send-request",
  async (linkTo: string) => {
    const {
      data: { data },
    } = await axios.post(`${APP_URL}api/friends/send-request`, {
      linkTo: linkTo,
    });
    return data;
  }
);

export const acceptFriendRequestClicked = createAsyncThunk(
  "user/accept-request",
  async (requestId: string) => {
    const {
      data: { data },
    } = await axios.put(`${APP_URL}api/friends/${requestId}`, null);
    return data;
  }
);

export const unlinkUserClicked = createAsyncThunk(
  "user/unlink-user",
  async (userId: string) => {
    const {
      data: { data },
    } = await axios.delete(`${APP_URL}api/friends/unlink/${userId}`);
    return data;
  }
);

export const getUserRequests = createAsyncThunk(
  "user/get-user-requests",
  async () => {
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>(`${APP_URL}api/friends/requests`);
    return data;
  }
);

export const getUserInfo = createAsyncThunk(
  "user/get-user-info",
  async (userId: string) => {
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>(`${APP_URL}api/friends/${userId}`);
    return data;
  }
);

export const searchUserTyped = createAsyncThunk(
  "user/search-user",
  async (userToSearch: string) => {
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>(
      `${APP_URL}api/friends/search/${userToSearch}`
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
      state.topUsers = action.payload.map((user: User) => ({
        ...user,
        image: user.image || defaultImage,
      }));
    },
    [getTopUsers.rejected.toString()]: (state) => {
      state.userLoading = false;
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
    },

    [sendFriendRequestClicked.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [sendFriendRequestClicked.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      successToast("Friend request sent");
      state.topUsers = state.topUsers.filter(
        ({ userId }) => action.payload.toUser !== userId
      );
    },
    [sendFriendRequestClicked.rejected.toString()]: (state) => {
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

    [unlinkUserClicked.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [unlinkUserClicked.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      state.friends = state.friends.filter(
        ({ friendId }) => friendId !== action.payload
      );
      successToast("User unlinked successfully");
    },
    [unlinkUserClicked.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to unlink user please try again later");
    },
    [getUserRequests.rejected.toString()]: (state) => {
      state.userLoading = false;
    },

    [deleteFriendRequestClicked.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [deleteFriendRequestClicked.fulfilled.toString()]: (state, action) => {
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
    [deleteFriendRequestClicked.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to delete request");
    },

    [acceptFriendRequestClicked.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [acceptFriendRequestClicked.fulfilled.toString()]: (state, action) => {
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
    [acceptFriendRequestClicked.rejected.toString()]: (state) => {
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

    [searchUserTyped.pending.toString()]: (state) => {
      state.userLoading = true;
    },
    [searchUserTyped.fulfilled.toString()]: (state, action) => {
      state.userLoading = false;
      state.searchResult = action.payload.map((user: SearchUser) => ({
        ...user,
        searchUserImage: user.searchUserImage || defaultImage,
      }));
    },
    [searchUserTyped.rejected.toString()]: (state) => {
      state.userLoading = false;
      warningToast("Unable to search user");
    },
  },
});

export default userSlice.reducer;
export const { setUserLoading } = userSlice.actions;
