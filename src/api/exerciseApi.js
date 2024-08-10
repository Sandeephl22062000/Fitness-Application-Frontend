import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const exerciseApi = createApi({
  reducerPath: "exerciseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: () => `/exercise`,
    }),
    getSortedExercises: builder.query({
      query: (params) => ({
        url: `/exercise/sortedExercises`,
        params,
      }),
    }),
    getExerciseVideos: builder.query({
      query: ({ exerciseName, muscles, maxResults }) =>
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${exerciseName} ${muscles} workout tutorial&type=video&maxResults=${maxResults}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useGetSortedExercisesQuery,
  useLazyGetSortedExercisesQuery,
  useLazyGetExerciseVideosQuery,
} = exerciseApi;

export { exerciseApi };
