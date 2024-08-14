import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/post`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts/all",
    }),
    createPosts: builder.mutation({
      query: (credentials) => ({
        url: "/new",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostsMutation } = postsApi;

export { postsApi };
