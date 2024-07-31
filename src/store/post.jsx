import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";
const initialPost = {
  postInfoById: null,
};

export const postByID = createAsyncThunk("/post/postDetail", async (data) => {
  try {
    const postData = await axios.get(
      `http://localhost:8000/api/post/post/detail/${data.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return postData.data.post;
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState: initialPost,

  extraReducers: (builder) => {
    builder
      .addCase(postByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postByID.fulfilled, (state, action) => {
        state.loading = false;
        state.postInfoById = action.payload;
      })
      .addCase(postByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
