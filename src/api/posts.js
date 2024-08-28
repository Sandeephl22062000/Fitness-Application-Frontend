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
    addComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `/commentpost/${postId}`,
        method: "POST",
        body: { comment },
      }),
    }),
    addLike: builder.mutation({
      query: ({ postId }) => ({
        url: `/likepost/${postId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostsMutation,
  useAddCommentMutation,
  useAddLikeMutation,
} = postsApi;

export { postsApi };
