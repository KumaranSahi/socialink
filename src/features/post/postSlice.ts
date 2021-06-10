import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../useAxios";
import {
  ResponseTemplate,
  AuthenticatedRequestsPayload,
} from "../../Generics.types";
import { warningToast, successToast } from "../../components";
import { PostState, PostData } from "./post.types";

const initialState: PostState = {
  postLoading: false,
  feedPosts: [],
  userPosts: [],
};

export const getFeedPosts = createAsyncThunk(
  "post/get-feed-posts",
  async (token: string) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>("/api/posts", config);
    return data;
  }
);

export const createPost = createAsyncThunk(
  "post/create-post",
  async ({ data: postData, token }: AuthenticatedRequestsPayload<PostData>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.post<ResponseTemplate>("/api/posts", postData, config);
    return data;
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/load-user-posts",
  async (token: string) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>("/api/posts/user-posts", config);
    return data;
  }
);

export const postSlice = createSlice({
  initialState: initialState,
  name: "post",
  reducers: {
    setPostLoading: (state, action) => {
      state.postLoading = action.payload;
    },
  },
  extraReducers: {
    [createPost.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [createPost.fulfilled.toString()]: (state, action) => {
      state.userPosts.push(action.payload);
      state.feedPosts.push(action.payload);
      state.postLoading = false;
      successToast("Post added");
    },
    [createPost.rejected.toString()]: (state) => {
      warningToast("Unable to add post please try again later");
      state.postLoading = false;
    },
    [getUserPosts.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [getUserPosts.fulfilled.toString()]: (state, action) => {
      state.userPosts = action.payload;
      state.postLoading = false;
    },
    [getUserPosts.rejected.toString()]: (state) => {
      warningToast("Unable to laod user post please try again later");
      state.postLoading = false;
    },
    [getFeedPosts.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [getFeedPosts.fulfilled.toString()]: (state, action) => {
      state.feedPosts = action.payload;
      state.postLoading = false;
    },
    [getFeedPosts.rejected.toString()]: (state) => {
      warningToast("Unable to laod feed post please try again later");
      state.postLoading = false;
    },
  },
});

export default postSlice.reducer;
export const { setPostLoading } = postSlice.actions;
