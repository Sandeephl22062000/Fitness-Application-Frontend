import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dietApi = createApi({
  reducerPath: "dietApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users`,
  }),
  endpoints: (builder) => ({
    requireCalories: builder.mutation({
      query: (credentials) => ({
        url: "/caloriecalculator/savedetail",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRequireCaloriesMutation } = dietApi;

export { dietApi };
