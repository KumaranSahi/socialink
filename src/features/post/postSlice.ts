import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../useAxios";
import { ResponseTemplate } from "../../Generics.types";
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
  loadedUserPosts: [],
};

export const getFeedPosts = createAsyncThunk(
  "post/get-feed-posts",
  async () => {
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>("/api/posts");
    return data;
  }
);

export const createPost = createAsyncThunk(
  "post/create-post",
  async (postData: PostData) => {
    const {
      data: { data },
    } = await axios.post<ResponseTemplate>("/api/posts", postData);
    return data;
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/load-user-posts",
  async () => {
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>("/api/posts/user-posts");
    return data;
  }
);

export const postLikeButtonClicked = createAsyncThunk(
  "posts/like-post",
  async (postId: string) => {
    const {
      data: { data },
    } = await axios.put<ResponseTemplate>(`/api/likes/${postId}`, null);
    return data;
  }
);

export const editPostButtonClicked = createAsyncThunk(
  "posts/edit-post",
  async ({ content: postContent, postId }: PostEditData) => {
    const {
      data: { data },
    } = await axios.put<ResponseTemplate>(`/api/posts/${postId}`, {
      content: postContent,
    });
    return data;
  }
);

export const deletePostButtonClicked = createAsyncThunk(
  "posts/delete-post",
  async (postId: string) => {
    const {
      data: { data },
    } = await axios.delete<ResponseTemplate>(`/api/posts/${postId}`);
    return data;
  }
);

export const postActiveLikedButtonClicked = createAsyncThunk(
  "posts/remove-post-like",
  async (likeId: string) => {
    const {
      data: { data },
    } = await axios.delete<ResponseTemplate>(`/api/likes/${likeId}`);
    return data;
  }
);

export const addCommentButtonClicked = createAsyncThunk(
  "posts/add-post-comment",
  async ({ content: commentContent, postId }: CommentData) => {
    const {
      data: { data },
    } = await axios.post<ResponseTemplate>(`/api/comments/${postId}`, {
      content: commentContent,
    });
    return data;
  }
);

export const editCommentButtonClicked = createAsyncThunk(
  "posts/edit-post-comment",
  async ({ content: commentContent, commentId }: CommentEditData) => {
    const {
      data: { data },
    } = await axios.put<ResponseTemplate>(`/api/comments/${commentId}`, {
      content: commentContent,
    });
    return data;
  }
);

export const deleteCommentButtonClicked = createAsyncThunk(
  "posts/delete-post-comment",
  async (commentId: string) => {
    const {
      data: { data },
    } = await axios.delete<ResponseTemplate>(`/api/comments/${commentId}`);
    return data;
  }
);

export const getLoadedUserPost = createAsyncThunk(
  "posts/get-loaded-user-post",
  async (userId: string) => {
    const {
      data: { data },
    } = await axios.get<ResponseTemplate>(`/api/posts/${userId}`);
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

    [editPostButtonClicked.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [editPostButtonClicked.fulfilled.toString()]: (state, action) => {
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
    [editPostButtonClicked.rejected.toString()]: (state) => {
      warningToast("Unable to edit post please try again later");
      state.postLoading = false;
    },

    [deletePostButtonClicked.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [deletePostButtonClicked.fulfilled.toString()]: (state, action) => {
      state.feedPosts = state.feedPosts.filter(
        ({ postId }) => postId !== action.payload
      );
      state.userPosts = state.userPosts.filter(
        ({ postId }) => postId !== action.payload
      );
      state.postLoading = false;
      successToast("Post deleted");
    },
    [deletePostButtonClicked.rejected.toString()]: (state) => {
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
      const loadedUserPostIndex = state.loadedUserPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (loadedUserPostIndex !== -1) {
        state.loadedUserPosts[loadedUserPostIndex].likes.push(
          action.payload.like
        );
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
        state.userPosts[userPostIndex].likes = state.userPosts[
          userPostIndex
        ].likes.filter(({ likeId }) => likeId !== action.payload.likeId);
      }
      const loadedUserPostIndex = state.loadedUserPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (loadedUserPostIndex !== -1) {
        state.loadedUserPosts[loadedUserPostIndex].likes =
          state.loadedUserPosts[loadedUserPostIndex].likes.filter(
            ({ likeId }) => likeId !== action.payload.likeId
          );
      }
      state.postLoading = false;
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
      const loadedUserPostIndex = state.loadedUserPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (loadedUserPostIndex !== -1) {
        state.loadedUserPosts[loadedUserPostIndex].comments.push(
          action.payload.comment
        );
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
        state.userPosts[userPostIndex].comments = state.userPosts[
          userPostIndex
        ].comments.map((comment) =>
          comment.commentId === action.payload.comment.commentId
            ? action.payload.comment
            : comment
        );
      }
      const loadedUserPostIndex = state.loadedUserPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (loadedUserPostIndex !== -1) {
        state.loadedUserPosts[loadedUserPostIndex].comments =
          state.loadedUserPosts[loadedUserPostIndex].comments.map((comment) =>
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
        state.userPosts[userPostIndex].comments = state.userPosts[
          userPostIndex
        ].comments.filter(
          ({ commentId }) => commentId !== action.payload.commentId
        );
      }
      const loadedUserPostIndex = state.loadedUserPosts.findIndex(
        ({ postId }) => postId === action.payload.postId
      );
      if (loadedUserPostIndex !== -1) {
        state.loadedUserPosts[loadedUserPostIndex].comments =
          state.loadedUserPosts[loadedUserPostIndex].comments.filter(
            ({ commentId }) => commentId !== action.payload.commentId
          );
      }
      successToast("Comment Deleted");
    },
    [deleteCommentButtonClicked.rejected.toString()]: (state) => {
      warningToast("Unable to delete comment please try again later");
      state.postLoading = false;
    },

    [getLoadedUserPost.pending.toString()]: (state) => {
      state.postLoading = true;
    },
    [getLoadedUserPost.fulfilled.toString()]: (state, action) => {
      state.loadedUserPosts = action.payload.map((post: Post) => ({
        ...post,
        userImage: post.userImage || defaultImage,
      }));
      state.postLoading = false;
    },
    [getLoadedUserPost.rejected.toString()]: (state) => {
      warningToast("Unable to load feed post please try again later");
      state.postLoading = false;
    },
  },
});

export default postSlice.reducer;
export const { setPostLoading } = postSlice.actions;
