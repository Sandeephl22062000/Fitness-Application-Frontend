import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import { useDispatch, useSelector } from "react-redux";
import { postByID } from "../../store/post";
import { useEffect } from "react";

import ZoomPost from "../Activities/Posts";
import { Box, Container } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProfilePost(props) {
  const [showPost, setShowPost] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState("");
  const dispatch = useDispatch();
  const posts = props.post;
  const user = useSelector((state) => state?.user?.FindUserByID);
  const post = useSelector((state) => state.post.postInfoById);
  const token = useSelector((state) => state.user.token);
 
  useEffect(() => {
    dispatch(postByID({ id: selectedPost, token }));
  }, [selectedPost]);

  return (
    <Container>
      {!showPost &&
        posts?.map((post) => (
          <Box
            key={post.id}
            sx={{
              height: "50%",
              width: "70%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            onClick={() => {
              setShowPost(true);
              setSelectedPost(post._id);
            }}
          >
            <Card sx={{ width: "20rem", height: "20rem" }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={user?.photo}
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                  >
                    {user?.name[0].toUpperCase()}
                  </Avatar>
                }
                title={user?.name}
                subheader={new Date(post?.createdAt).toLocaleString()}
              />
              <CardMedia
                component="img"
                height="194"
                image={post?.image}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post?.caption}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
    </Container>
  );
}
