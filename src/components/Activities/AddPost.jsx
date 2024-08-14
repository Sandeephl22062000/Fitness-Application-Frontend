import { Container } from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import "./AddPost.css";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useCreatePostsMutation } from "../../api/posts";

const AddPost = ({ refetch }) => {
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [variant, setVariant] = useState(undefined);
  const [variant2, setVariant2] = useState(undefined);
  const [createPost, { isSuccess, isLoading }] = useCreatePostsMutation();

  const uploadMedia = async () => {
    if (!media) {
      console.error("No media file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("file", media);
    formData.append("caption", caption);
    await createPost(formData);

    console.log("it is executed");
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setMedia(file);
  };

  const handleVideoUpload = (event) => {
    uploadMedia(event);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await uploadMedia();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setVariant(undefined);
      refetch();
    }
  }, [isSuccess]);

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
      <Modal
        open={!!variant}
        onClose={() => {
          setPreview(null);
          setVariant(undefined);
        }}
      >
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
                ) : preview ? (
                  media.type.split("/")[0] === "image" ? (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "200px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <video
                      src={preview}
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
