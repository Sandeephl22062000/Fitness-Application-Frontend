import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialFood = {
  calculateFoodCalories: 0,
  priorUserDetails: {},
  loading: false,
  priorFoodCaloryvalue: 0,
  foodNutritions: null,
  deletedRecord: "",
};

export const calculateCalories = createAsyncThunk(
  "/food/foodDetail",
  async (data) => {
    const { weight, height, age, gender, activity, token, addToast } = data;
    console.log(weight, height, age, gender, activity);
    const sendData = await axios.post(
      "http://localhost:8000/api/users/caloriecalculator/savedetail",
      {
        weight,
        height,
        age,
        gender,
        activity,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    addToast(sendData.data.message, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    return sendData.data.data;
  }
);

export const priorFoodDetails = createAsyncThunk(
  "/food/priorFoodDetail",
  async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/updateCalories",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const priorFoodCalory = createAsyncThunk(
  "/food/priorFoodCalory",
  async (token) => {
    try {
      console.log("Vzdfvdrvzdfvfz");
      const response = await axios.post(
        "http://localhost:8000/api/users/getMaintainceCalory",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      return data?.maintainceCalory;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateNutritionValue = createAsyncThunk(
  "/food/updatenutritionvalue",
  async ({ token, requireCalories, requireProtein, requireCarbs }) => {
    try {
      console.log("Vzdfvdrvzdfvfz");
      const response = await axios.put(
        "http://localhost:8000/api/users/updatenutritionvalue",
        {
          requireCalories,
          requireProtein,
          requireCarbs,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      return data?.maintainceCalory;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCaloryTracked = createAsyncThunk(
  "/food/deleteCaloryTracked",
  async ({ token, recordID }) => {
    try {
      console.log("Vzdfvdrvzdfvfz");
      const response = await axios.delete(
        `http://localhost:8000/api/users/deletetrackedmeal/${recordID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return recordID;
    } catch (error) {
      console.log(error);
    }
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState: initialFood,
  reducers: {
    foodNutritionData: (state, action) => {
      state.foodNutritions = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateCalories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateCalories.fulfilled, (state, action) => {
        state.loading = false;
        state.calculateFoodCalories = action.payload;
      })
      .addCase(calculateCalories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(priorFoodDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(priorFoodDetails.fulfilled, (state, action) => {
        state.loading = false;

        state.priorUserDetails = action.payload;
      })
      .addCase(priorFoodDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(priorFoodCalory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(priorFoodCalory.fulfilled, (state, action) => {
        state.loading = false;

        state.priorFoodCaloryvalue = action.payload;
      })
      .addCase(priorFoodCalory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateNutritionValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNutritionValue.fulfilled, (state, action) => {
        state.loading = false;
        state.foodNutritions = action.payload;
      })
      .addCase(updateNutritionValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCaloryTracked.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCaloryTracked.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedRecord = action.payload;
      })
      .addCase(deleteCaloryTracked.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { foodNutritionData } = foodSlice.actions;
export default foodSlice.reducer;
