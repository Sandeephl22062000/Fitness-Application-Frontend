import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const loginUser = createAsyncThunk(
  "/user/loginUser",
  async ({ email, password, addToast, navigate }) => {
    try {
      const { data } = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      const { token } = data;
      localStorage.setItem("id", data.data);
      localStorage.setItem("token", token);
      addToast(data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      navigate("/");
      return token;
    } catch (error) {
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "/user/registerUser",
  async ({ name, photo, email, password, addToast, navigate, role }) => {
    try {
      const response = await axiosInstance.post("/users/register", {
        name,
        email,
        password,
        photo,
        role,
      });
      addToast(response.data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      navigate("/login");
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  }
);

export const UserByID = createAsyncThunk("/user/userDetail", async () => {
  const Userid = localStorage.getItem("id");
  const postData = await axiosInstance.get(`/users/${Userid}`);
  return postData.data.data;
});

export const clientsRequest = createAsyncThunk(
  "/user/clientsRequest",
  async ({ trainerID, token, charges }) => {
    try {
      const response = await axiosInstance.post(
        "/request/getclientsrequest",
        { charges, token, trainerID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getClients = createAsyncThunk(
  "/user/getCleintsRequest",
  async ({ token }) => {
    try {
      const response = await axiosInstance.get("/request/getclientsrequest", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data?.clients;
    } catch (error) {
      throw error;
    }
  }
);

export const searchUserKeyword = createAsyncThunk(
  "/user/searchUser",
  async (search) => {
    const getData = await axiosInstance.get(`/users/searchusers/${search}`);
    return getData.data.data;
  }
);

export const updateUser = createAsyncThunk(
  "/user/updateUserdetail",
  async (details) => {
    const {
      name,
      email,
      specialization,
      experiences,
      Userid,
      token,
      addToast,
    } = details;
    try {
      const postData = await axiosInstance.patch(
        `/users/updatedetails/${Userid}`,
        {
          name,
          email,
          specialization,
          experiences,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${details.token}`,
          },
        }
      );
      addToast(postData.data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      return postData.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    FindUserByID: null,
    loading: false,
    error: null,
    getRequestedClients: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(UserByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserByID.fulfilled, (state, action) => {
        state.loading = false;
        state.FindUserByID = action.payload;
      })
      .addCase(UserByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchUserKeyword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUserKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.SearchUserResult = action.payload;
      })
      .addCase(searchUserKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.loading = false;
        state.getRequestedClients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
export const { setToken } = userSlice.actions;
