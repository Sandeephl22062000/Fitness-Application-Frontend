import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dietApi = createApi({
  reducerPath: "dietApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    requireCalories: builder.mutation({
      query: (credentials) => ({
        url: "/caloriecalculator/savedetail",
        method: "POST",
        body: credentials,
      }),
    }),
    getTargetNutrition: builder.mutation({
      query: (credentials) => ({
        url: "/gettargetnutrition",
        method: "POST",
        body: credentials,
      }),
    }),
    saveTrackedCalories: builder.mutation({
      query: (credentials) => ({
        url: "/saveTrackedCalories",
        method: "POST",
        body: credentials,
      }),
    }),
    previousData: builder.mutation({
      query: (credentials) => ({
        url: "/updateCalories",
        method: "POST",
        body: credentials,
      }),
    }),
    targetNutrition: builder.query({
      query: () => `/targetnutrients/targetnutritionofuser`,
    }),
  }),
});

export const {
  useRequireCaloriesMutation,
  useGetTargetNutritionMutation,
  useSaveTrackedCaloriesMutation,
  useTargetNutritionQuery,
  usePreviousDataMutation,
} = dietApi;

export { dietApi };
