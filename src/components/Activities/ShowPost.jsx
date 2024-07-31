import React, { useEffect, useState } from "react";
import { Box, Container, TextField, Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserByID, searchUserKeyword } from "../../store/user";
import { useNavigate } from "react-router-dom";
import AddPost from "./AddPost";
import Posts from "./Posts";

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPost, setNewPost] = useState(null);
  const dispatch = useDispatch();

  const getPost = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/post/posts/all");
      setPosts(response.data.posts);
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      dispatch(searchUserKeyword(search));
    }
  }, [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPost();
  }, []);

  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  return (
    <Box>
      <Container sx={{ minHeight: "100vh" }}>
        <AddPost setNewPost={setNewPost} />
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
