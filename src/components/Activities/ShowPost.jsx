import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddPost from "./AddPost";
import Posts from "./Posts";
import { useGetPostsQuery } from "../../api/posts";

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const { data, isLoading, refetch } = useGetPostsQuery();

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  return (
    <Box>
      <Container sx={{ minHeight: "100vh" }}>
        <AddPost refetch={refetch} />
        {!isLoading ? (
          posts.map((post) => <Posts key={post.id} post={post} />)
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "black" }} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ShowPost;
