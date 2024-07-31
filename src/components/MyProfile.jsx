import React, { useEffect, useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Posts from "./Trainer-Info/PRofilePostCard";
import UpdateProfileModal from "./TrainerMyProfile/UpdateProfileModal";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { UserByID } from "../store/user";
import ClientsTable from "./TrainerMyProfile/clientsRequests";
import TrainerServices from "./TrainerMyProfile/TrainerServices";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProfilePage = () => {
  const [trainer, setTrainer] = useState("");
  const [variant, setVariant] = useState(undefined);
  const [showRequests, setShowRequests] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.user?.token);

  useEffect(() => {
    dispatch(UserByID());
  }, []);

  const user = useSelector((state) => state?.user?.FindUserByID);

  const toggleChallengesAndPosts = () => {
    if (showChallenges) {
      setShowChallenges(false);
      setShowPosts(true);
    } else {
      setShowChallenges(true);
      setShowPosts(false);
    }
  };

  const handleViewRequest = () => {
    setShowRequests(true);
    setShowPosts(false);
    setShowServices(false);
  };

  const handleViewServices = () => {
    setShowServices(true);
    setShowPosts(false);
    setShowRequests(false);
  };
  const handleViewPost = () => {
    setShowRequests(false);
    setShowPosts(true);
    setShowServices(false);
  };

  return (
    <Container
      sx={{
        minHeight: "80vh",
        marginTop: "2rem",
        width: "65rem",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <AspectRatio
            ratio="1"
            sx={{
              margin: "0.5rem  0.5rem 1.5rem 3.6rem",
              height: "12rem",
              width: "12rem",
            }}
          >
            <img
              src={user?.photo}
              loading="lazy"
              alt=""
              style={{
                objectFit: "cover",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </AspectRatio>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Typography fontSize="xl" fontWeight="lg">
              {user?.name}
            </Typography>
            <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
              {user?.email}
            </Typography>
            {user?.role === 1 && (
              <>
                <Typography
                  level="body2"
                  fontWeight="lg"
                  textColor="text.tertiary"
                >
                  Experience: {user?.experience}
                </Typography>
                <Typography
                  level="body2"
                  fontWeight="lg"
                  textColor="text.tertiary"
                >
                  Specialization: {user?.specialization}
                </Typography>
                <Typography
                  level="body2"
                  fontWeight="lg"
                  textColor="text.tertiary"
                >
                  Posts: {user?.posts?.length}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Card
        sx={{
          width: "100%",
          flexWrap: "wrap",
          overflow: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              width: "100%",
              "& > button": { flex: 1 },
            }}
          >
            <Button
              onClick={() => {
                setVariant("solid");
              }}
              sx={{
                background: "black",
                color: "white",
                height: "50px",
                borderRadius: "15px",
                "&:hover": {
                  background: "black",
                },
              }}
            >
              Edit Profile
            </Button>

            {user?.role === 1 ? (
              <>
                <Button
                  onClick={handleViewServices}
                  sx={{
                    color: "white",
                    background: "black",
                    "&:hover": {
                      background: "black",
                    },
                  }}
                >
                  View Services
                </Button>
                {showRequests ? (
                  <Button
                    onClick={handleViewPost}
                    sx={{
                      color: "white",
                      background: "black",
                      "&:hover": {
                        background: "black",
                      },
                    }}
                  >
                    View Post
                  </Button>
                ) : (
                  <Button
                    onClick={handleViewRequest}
                    sx={{
                      color: "white",
                      background: "black",
                      "&:hover": {
                        background: "black",
                      },
                    }}
                  >
                    View Clients
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={toggleChallengesAndPosts}
                sx={{
                  background: "black",
                  color: "white",
                  height: "50px",
                  borderRadius: "15px",

                  "&:hover": {
                    background: "black",
                  },
                }}
              >
                View Posts
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
      {showRequests ? (
        <ClientsTable trainer={user?._id} />
      ) : showServices ? (
        <TrainerServices trainer={user?._id} />
      ) : (
        <Posts />
      )}
      <Modal
        open={variant === "solid"}
        onClose={() => setVariant(undefined)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalDialog>
          <ModalClose onClick={() => setVariant(undefined)} />
          <UpdateProfileModal />
        </ModalDialog>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
