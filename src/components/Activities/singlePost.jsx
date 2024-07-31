import * as React from "react";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import { Container, Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";
import { postByID } from "../../store/post";

const Post = (props) => {
  const token = useSelector((state) => state.user.token);
  const propsPostID = useSelector((state) => state?.post?.postInfoById);
  const [likeCount, setLikeCount] = React.useState(propsPostID?.likes?.length);
  const id = localStorage.getItem("id");
  const [isLiked, setIsLiked] = React.useState(
    propsPostID?.likes?.includes(id) || false
  );
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState([]);
  const dispatch = useDispatch();
  const { postID } = useParams();

  const handleLike = () => {
    const addLike = async () => {
      try {
        const data = await axios.post(
          `/api/post/likepost/${propsPostID?._id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        throw error;
      }
    };

    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
      addLike();
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/post/commentpost/${propsPostID?._id}`,
        {
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newComment = data.success.comments[0];
      setShowComment((prevComments) => [newComment, ...prevComments]);
      setComment("");
    } catch (error) {
      throw error;
    }
  };

  const calculateTime = Math.floor(
    (new Date() - new Date(propsPostID?.createdAt)) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    dispatch(postByID({ id: postID, token }));
    setShowComment(propsPostID?.comments);
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "50%",
          "--Card-radius": (theme) => theme.vars.radius.xs,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
                background:
                  "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              },
            }}
          >
            <Avatar size="sm" src={propsPostID?.postedBy?.photo}></Avatar>
          </Box>
          <Typography fontWeight="lg">
            {propsPostID?.postedBy?.name || props?.name}
          </Typography>
        </CardContent>
        <CardOverflow>
          <AspectRatio>
            {propsPostID?.video && (
              <video
                src={propsPostID?.video}
                controls
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            {!propsPostID?.video && (
              <img
                src={propsPostID?.image}
                alt=""
                loading="lazy"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </AspectRatio>
        </CardOverflow>
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", mx: -1 }}
        >
          <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={handleLike}
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorder />} {likeCount}
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined /> {propsPostID?.comments?.length}
            </IconButton>
          </Box>
        </CardContent>
        <CardContent>
          <Typography sx={{ height: "1.5rem" }}>
            <Link
              component="button"
              color="neutral"
              fontWeight="lg"
              textColor="text.primary"
            >
              {propsPostID?.postedBy?.name}
            </Link>
            {propsPostID?.caption}
          </Typography>

          {showComment
            ?.slice()
            .reverse()
            .map((comment) => (
              <Typography sx={{ height: "1.2rem" }}>
                <b>{comment?.user?.name} </b>
                {comment?.comment}
              </Typography>
            ))}

          <Link
            component="button"
            underline="none"
            fontSize="10px"
            sx={{ color: "text.tertiary", my: 0.5 }}
          >
            <Typography fontSize="sm">
              {calculateTime === 0 ? (
                <Typography
                  color="neutral"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  Today
                </Typography>
              ) : (
                <Typography
                  color="neutral"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  {calculateTime} days ago
                </Typography>
              )}
            </Typography>
          </Link>
        </CardContent>
        <CardOverflow
          sx={{
            pb: "var(--Card-padding)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <form onSubmit={addCommentHandler} style={{ display: "flex" }}>
            <Input
              variant="plain"
              size="sm"
              placeholder="Add a comment…"
              sx={{ flexGrow: 1, "--Input-focusedThickness": "0px" }}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button type="submit" sx={{ ml: 1 }}>
              Post
            </Button>
          </form>
        </CardOverflow>
      </Card>
    </Container>
  );
};

export default Post;
