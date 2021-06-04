import { createSlice } from "@reduxjs/toolkit";
// import axios from "../../useAxios";
// import { ResponseTemplate } from "../../Generics.types";
// import { warningToast, successToast, infoToast } from "../../components";
import { PostState } from "./post.types";

const initialState: PostState = {
  postLoading: false,
};

export const postSlice = createSlice({
  initialState: initialState,
  name: "post",
  reducers: {
    setPostLoading: (state, action) => {
      state.postLoading = action.payload;
    },
  },
});

export default postSlice.reducer;
export const { setPostLoading } = postSlice.actions;
