import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../useAxios";
import {
  ResponseTemplate,
  AuthenticatedRequestsPayload,
} from "../../Generics.types";
import { warningToast, successToast } from "../../components";
import {
  PostState,
  PostData,
  Post,
  CommentData,
  CommentEditData,
  PostEditData,
} from "./post.types";
import defaultImage from "../../assets/profile_image.jpg";

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

export const postLikeButtonClicked = createAsyncThunk(
  "posts/like-post",
  async ({ data: postId, token }: AuthenticatedRequestsPayload<string>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.put<ResponseTemplate>(`/api/likes/${postId}`, null, config);
    return data;
  }
);

export const postEditButtonClicked = createAsyncThunk(
  "posts/edit-post",
  async ({
    data: { content: postContent, postId },
    token,
  }: AuthenticatedRequestsPayload<PostEditData>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.put<ResponseTemplate>(
      `/api/posts/${postId}`,
      {
        content: postContent,
      },
      config
    );
    return data;
  }
);

export const postDeleteButtonClicked = createAsyncThunk(
  "posts/delete-post",
  async ({ data: postId, token }: AuthenticatedRequestsPayload<string>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.delete<ResponseTemplate>(`/api/posts/${postId}`, config);
    return data;
  }
);

export const postActiveLikedButtonClicked = createAsyncThunk(
  "posts/remove-post-like",
  async ({ data: likeId, token }: AuthenticatedRequestsPayload<string>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.delete<ResponseTemplate>(`/api/likes/${likeId}`, config);
    return data;
  }
);

export const addCommentButtonClicked = createAsyncThunk(
  "posts/add-post-comment",
  async ({
    data: { content: commentContent, postId },

    token,
  }: AuthenticatedRequestsPayload<CommentData>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.post<ResponseTemplate>(
      `/api/comments/${postId}`,
      {
        content: commentContent,
      },
      config
    );
    return data;
  }
);

export const editCommentButtonClicked = createAsyncThunk(
  "posts/edit-post-comment",
  async ({
    data: { content: commentContent, commentId },
    token,
  }: AuthenticatedRequestsPayload<CommentEditData>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.put<ResponseTemplate>(
      `/api/comments/${commentId}`,
      {
        content: commentContent,
      },
      config
    );
    return data;
  }
);

export const deleteCommentButtonClicked = createAsyncThunk(
  "posts/delete-post-comment",
  async ({ data: commentId, token }: AuthenticatedRequestsPayload<string>) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const {
      data: { data },
    } = await axios.delete<ResponseTemplate>(
      `/api/comments/${commentId}`,
      config
    );
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
      state.postLoading = false;
      successToast("Post added");
    },
    [createPost.rejected.toString()]: (state) => {
      warningToast("Unable to add post please try again later");
      state.postLoading = false;
    },
    [postEditButtonClicked.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [postEditButtonClicked.fulfilled.toString()]: (state, action) => {
      const feedPostIndex = state.feedPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (feedPostIndex !== -1) {
        state.feedPosts[feedPostIndex].content = action.payload.content;
      }
      const userPostIndex = state.userPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (userPostIndex !== -1) {
        state.userPosts[userPostIndex].content = action.payload.content;
      }
      state.postLoading = false;
      successToast("Post editted");
    },
    [postEditButtonClicked.rejected.toString()]: (state) => {
      warningToast("Unable to edit post please try again later");
      state.postLoading = false;
    },
    [postDeleteButtonClicked.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [postDeleteButtonClicked.fulfilled.toString()]: (state, action) => {
      state.feedPosts = state.feedPosts.filter(
        ({ postId }) => postId !== action.payload.postId
      );
      state.userPosts = state.userPosts.filter(
        ({ postId }) => postId !== action.payload.postId
      );
      state.postLoading = false;
      successToast("Post deleted");
    },
    [postDeleteButtonClicked.rejected.toString()]: (state) => {
      warningToast("Unable to delete post please try again later");
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
      warningToast("Unable to load user post please try again later");
      state.postLoading = false;
    },
    [getFeedPosts.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [getFeedPosts.fulfilled.toString()]: (state, action) => {
      state.feedPosts = action.payload.map((post: Post) => ({
        ...post,
        userImage: post.userImage || defaultImage,
      }));
      state.postLoading = false;
    },
    [getFeedPosts.rejected.toString()]: (state) => {
      warningToast("Unable to load feed post please try again later");
      state.postLoading = false;
    },
    [postLikeButtonClicked.pending.toString()]: (state) => {
      state.postLoading = false;
    },
    [postLikeButtonClicked.fulfilled.toString()]: (state, action) => {
      const feedPostIndex = state.feedPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (feedPostIndex !== -1) {
        state.feedPosts[feedPostIndex].likes.push(action.payload.like);
      }
      const userPostIndex = state.userPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (userPostIndex !== -1) {
        state.userPosts[userPostIndex].likes.push(action.payload.like);
      }
      state.postLoading = false;
      successToast("Post liked");
    },
    [postLikeButtonClicked.rejected.toString()]: (state) => {
      warningToast("Unable to like post please try again later");
      state.postLoading = false;
    },
    [postActiveLikedButtonClicked.pending.toString()]: (state) => {
      state.postLoading = false;
    },
    [postActiveLikedButtonClicked.fulfilled.toString()]: (state, action) => {
      const feedPostIndex = state.feedPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (feedPostIndex !== -1) {
        state.feedPosts[feedPostIndex].likes = state.feedPosts[
          feedPostIndex
        ].likes.filter(({ likeId }) => likeId !== action.payload.likeId);
      }
      const userPostIndex = state.userPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (userPostIndex !== -1) {
        state.userPosts[userPostIndex].likes = state.feedPosts[
          userPostIndex
        ].likes.filter(({ likeId }) => likeId !== action.payload.likeId);
      }
      state.postLoading = false;
      successToast("Post liked");
    },
    [postActiveLikedButtonClicked.rejected.toString()]: (state) => {
      warningToast("Unable to remove like please try again later");
      state.postLoading = false;
    },
    [addCommentButtonClicked.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [addCommentButtonClicked.fulfilled.toString()]: (state, action) => {
      state.postLoading = false;
      const feedPostIndex = state.feedPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (feedPostIndex !== -1) {
        state.feedPosts[feedPostIndex].comments.push(action.payload.comment);
      }
      const userPostIndex = state.userPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (userPostIndex !== -1) {
        state.userPosts[userPostIndex].comments.push(action.payload.comment);
      }
      successToast("Comment added");
    },
    [addCommentButtonClicked.rejected.toString()]: (state) => {
      warningToast("Unable to add comment please try again later");
      state.postLoading = false;
    },
    [editCommentButtonClicked.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [editCommentButtonClicked.fulfilled.toString()]: (state, action) => {
      state.postLoading = false;
      const feedPostIndex = state.feedPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (feedPostIndex !== -1) {
        state.feedPosts[feedPostIndex].comments = state.feedPosts[
          feedPostIndex
        ].comments.map((comment) =>
          comment.commentId === action.payload.comment.commentId
            ? action.payload.comment
            : comment
        );
      }
      const userPostIndex = state.userPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (userPostIndex !== -1) {
        state.userPosts[userPostIndex].comments = state.feedPosts[
          userPostIndex
        ].comments.map((comment) =>
          comment.commentId === action.payload.comment.commentId
            ? action.payload.comment
            : comment
        );
      }
      successToast("Comment Edited");
    },
    [editCommentButtonClicked.rejected.toString()]: (state) => {
      warningToast("Unable to edit comment please try again later");
      state.postLoading = false;
    },
    [deleteCommentButtonClicked.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [deleteCommentButtonClicked.fulfilled.toString()]: (state, action) => {
      state.postLoading = false;
      const feedPostIndex = state.feedPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (feedPostIndex !== -1) {
        state.feedPosts[feedPostIndex].comments = state.feedPosts[
          feedPostIndex
        ].comments.filter(
          ({ commentId }) => commentId !== action.payload.commentId
        );
      }
      const userPostIndex = state.userPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (userPostIndex !== -1) {
        state.userPosts[userPostIndex].comments = state.feedPosts[
          userPostIndex
        ].comments.filter(
          ({ commentId }) => commentId !== action.payload.commentId
        );
      }
      successToast("Comment Deleted");
    },
    [deleteCommentButtonClicked.rejected.toString()]: (state) => {
      warningToast("Unable to delete comment please try again later");
      state.postLoading = false;
    },
  },
});

export default postSlice.reducer;
export const { setPostLoading } = postSlice.actions;
