import * as React from "react";
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
import {
  Container,
  Button,
  MenuItem,
  Menu,
  Modal,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAddCommentMutation, useAddLikeMutation } from "../../api/posts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Post = (props) => {
  const [likeCount, setLikeCount] = React.useState(props?.post?.likes?.length);
  const id = localStorage.getItem("id");
  const [isLiked, setIsLiked] = React.useState(false);
  const [comment, setComment] = useState("");
  const [deleteComment, setDeleteComment] = useState(false);
  const [showComment, setShowComment] = useState([]);
  const [shareModal, setShareModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addComment, { isSuccess }] = useAddCommentMutation();
  const [like] = useAddLikeMutation();

  const addLike = async () => {
    try {
      await like({
        postId: props?.post._id,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prevCount) => prevCount - 1);
      addLike();
    } else {
      setIsLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
      addLike();
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addComment({ postId: props?.post._id, comment });
      const newComment =
        data?.success?.comments[data?.success?.comments.length - 1];
      setShowComment((prevComments) => {
        return [...prevComments, newComment];
      });
    } catch (error) {
      throw error;
    }
  };

  const calculateTime = Math.floor(
    (new Date() - new Date(props?.post?.createdAt)) / (1000 * 60 * 60 * 24)
  );

  const handleClose = () => {
    setShareModal(false);
  };

  const handleOpen = () => {
    setShareModal(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setComment("");
    }
  }, [isSuccess]);

  useEffect(() => {
    setShowComment(
      props.post?.comments?.length > 3
        ? props.post?.comments.slice(0, 3)
        : props.post?.comments
    );
    setIsLiked(
      props.post?.likes?.length
        ? props.post?.likes.some((like) => {
            return like.id === id;
          })
        : false
    );
  }, []);

  // Dropdown handling functions
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShare = () => {
    setShareModal(true);
    handleMenuClose();
    // Implement your share functionality here
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 0 30px 0",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "80%",
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
            <Avatar size="sm" src={props.post?.postedBy?.photo}></Avatar>
          </Box>
          <Typography fontWeight="lg">
            {props.post?.postedBy?.name || props?.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={handleMenuClick}
            sx={{ background: "white", color: "black" }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleShare}>Share</MenuItem>
          </Menu>
        </CardContent>
        <CardOverflow>
          <AspectRatio>
            {props.post?.fileType.includes("video") ? (
              <video
                src={props.post?.signedUrl}
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
            ) : (
              <img
                src={props.post?.signedUrl}
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
              {isLiked ? <FavoriteIcon /> : <FavoriteBorder />}{" "}
              {` ${likeCount}`}
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined sx={{ paddingRight: "0.2rem" }} />{" "}
              {` ${props.post?.comments?.length}`}
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
              style={{ paddingRight: "0.3rem" }}
            >
              {props.post?.postedBy?.name}
            </Link>
            {props.post?.caption}
          </Typography>

          {showComment?.slice().map((comment) => (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ paddingRight: "0.3rem" }}>
                <span style={{ fontWeight: 500 }}>{comment?.user?.name}</span>
                <span> {comment?.comment}</span>
              </span>
              <span style={{ cursor: "pointer" }}>
                <DeleteIcon onClick={() => {}} />
              </span>
            </div>
          ))}

          {props.post?.comments?.length > 3 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  width: "auto",
                }}
                onClick={() => {
                  showComment.length > 3
                    ? setShowComment(props.post?.comments.slice(0, 3))
                    : setShowComment(props.post?.comments);
                }}
              >
                View {showComment.length > 3 ? "Less" : "More"}
              </span>
            </div>
          )}

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
          <form
            onSubmit={addCommentHandler}
            style={{ display: "flex", width: "100%" }}
          >
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
      <Modal
        open={shareModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            background: "white",
            border: "2px solid #000",
            borderRadius: "2rem",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Share
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            <List
              sx={{ width: "100%", maxWidth: 360 }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "37px" }}>
                  <WhatsAppIcon sx={{ color: "green" }} />
                </ListItemIcon>
                <ListItemText primary="Whatsapp" />
              </ListItemButton>
            </List>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default Post;
