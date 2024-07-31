import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TrainerById } from "../../store/trainer";

const PRofilePostCard = (props) => {
  const user = useSelector((state) => state?.trainer?.trainerInfoById);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [showImagesOnly, setShowImagesOnly] = useState(false);
  const [showVideosOnly, setShowVideosOnly] = useState(false);

  useEffect(() => {
    dispatch(TrainerById(id));
  }, []);

  const handleImageButtonClick = () => {
    setShowImagesOnly(true);
    setShowVideosOnly(false);
  };

  const handleVideoButtonClick = () => {
    setShowImagesOnly(false);
    setShowVideosOnly(true);
  };

  const filterPostsByMediaType = (post) => {
    if (showVideosOnly) {
      return post?.video;
    } else {
      return post?.image;
    }
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <Button
          onClick={handleImageButtonClick}
          sx={{
            background: "black",
            color: "white",
            margin: "1rem",
            width: "9rem",
            height: "3rem",
            "&:hover": {
              background: "black",
            },
          }}
        >
          Image
        </Button>
        <Button
          onClick={handleVideoButtonClick}
          sx={{
            background: "white",
            color: "black",
            border: "2px solid black",
            width: "9rem",
            height: "3rem",
          }}
        >
          Video
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: "2rem" }}>
        {user?.posts
          ?.filter(filterPostsByMediaType)
          .slice()
          .reverse()
          .map((post) => (
            <>
              <Card
                sx={{ width: "19.0rem", margin: "0.5rem", cursor: "pointer" }}
                onClick={() => {
                  navigate(`/post/${post._id}`);
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      src={user?.photo}
                      sx={{ bgcolor: "red" }}
                      aria-label="recipe"
                    >
                      R
                    </Avatar>
                  }
                  title={user?.name}
                  subheader={new Date(post?.createdAt).toLocaleString()}
                />
                {post?.image && (
                  <CardMedia
                    component="img"
                    height="250"
                    image={post?.image}
                    alt="Image"
                  />
                )}
                {post?.video && (
                  <CardMedia
                    component="video"
                    height="250"
                    src={post?.video}
                    alt="Video"
                    controls
                  />
                )}
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post?.caption}
                  </Typography>
                </CardContent>
              </Card>
            </>
          ))}
      </Box>
    </Container>
  );
};

export default PRofilePostCard;
