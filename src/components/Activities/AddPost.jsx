import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import storage from "../../utils/firebase";
import "./AddPost.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSelector } from "react-redux";

const AddPost = ({ setNewPost }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [caption, setCaption] = useState("");
  const [variant, setVariant] = useState(undefined);
  const [variant2, setVariant2] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.user.token);

  const photoupload = (event) => {
    setIsLoading(true);
    let file = event.target.files[0];
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = addRef(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setSelectedPhoto(url);
          setIsLoading(false);
        });
      }
    );
  };

  const videoupload = (event) => {
    setIsLoading(true);
    let file = event.target.files[0];
    if (!file) {
      alert("Please upload a video first!");
    }
    const storageRef = addRef(storage, `/videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setSelectedVideo(url);
          setIsLoading(false);
        });
      }
    );
    setIsLoading(false);
  };

  const handlePhotoUpload = (event) => {
    photoupload(event);
  };

  const handleVideoUpload = (event) => {
    videoupload(event);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleCloseModal = () => {
    setVariant2(undefined);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const createPost = async () => {
      const data = await axios.post(
        "api/post/new",
        {
          caption: caption,
          image: selectedPhoto,
          video: selectedVideo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewPost(data?.data?.post);
      setVariant(undefined);
      setCaption("");
      setSelectedPhoto("");
      setSelectedVideo("");
    };
    try {
      createPost();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Container
      sx={{ borderColor: "black", backGround: "grey", margin: "20px 0 20px 0" }}
    >
      <Box
        style={{
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="soft"
          color="neutral"
          onClick={() => {
            setVariant("soft");
          }}
          sx={{
            background: "black",
            color: "white",
            height: "50px",
            margin: "0 30px",
            "&:hover": {
              background: "black",
            },
          }}
        >
          Upload Photo / Video
        </Button>
      </Box>
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={variant}
        >
          <ModalClose />
          <form
            onSubmit={handleFormSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "300px",
                  height: "200px",
                  border: "1px dashed #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: "black" }} />
                ) : selectedPhoto || selectedVideo ? (
                  selectedPhoto ? (
                    <img
                      src={selectedPhoto}
                      alt="Preview"
                      style={{
                        width: "200px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <video
                      src={selectedVideo}
                      controls
                      style={{
                        width: "200px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  )
                ) : (
                  <div>
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        background: "black",
                        color: "white",
                        "&:hover": {
                          background: "black",
                        },
                      }}
                    >
                      Add Photo
                      <input
                        type="file"
                        onChange={handlePhotoUpload}
                        style={{ display: "none" }}
                        accept="image/*"
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        background: "black",
                        color: "white",
                        margin: "0.5rem",
                        "&:hover": {
                          background: "black",
                        },
                      }}
                    >
                      Add Video
                      <input
                        type="file"
                        onChange={handleVideoUpload}
                        style={{ display: "none" }}
                        accept="video/*"
                      />
                    </Button>
                  </div>
                )}
              </Box>
              <TextField
                label="Caption"
                variant="outlined"
                value={caption}
                onChange={handleCaptionChange}
                multiline
                rows={3}
                sx={{ margin: "0.5rem" }}
              />
              <Button
                type="submit"
                sx={{
                  background: "black",
                  color: "white",
                  height: "50px",
                  "&:hover": {
                    background: "black",
                  },
                }}
              >
                Post
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </Container>
  );
};

export default AddPost;
