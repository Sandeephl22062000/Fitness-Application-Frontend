import React, { useEffect, useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Posts from "./TrainerProfilePostCard";
import axios from "axios";
import Viewplans from "../Trainer-Info/viewPlans";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProfilePage = () => {
  const [trainer, setTrainer] = useState("");
  const [showServices, setShowServices] = useState(false);
  const [post, showPost] = useState([]);
  const params = useParams();
  const id = params.id;
  const handleShowServices = () => {
    setShowServices(true);
    showPost(false);
  };
  const handleShowPost = () => {
    setShowServices(false);
    showPost(true);
  };
  const trainerDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/trainer/trainerDetail/${id}`
      );
      setTrainer(data?.data);
      showPost(data?.data?.posts);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    trainerDetail();
  }, []);

  return (
    <Container
      sx={{
        marginTop: "5rem",
        marginBottom: "5rem",
        width: "66rem",
        background: "#DFE1E1",
        borderRadius: "2rem",
      }}
    >
      <Box>
        <Grid container spacing={4}>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AspectRatio
              ratio="1"
              sx={{
                margin: "0.5rem  0.5rem 1.5rem 3.6rem",
                height: "12rem",
                width: "12rem",
              }}
            >
              <img
                src={trainer?.photo}
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
                {trainer?.name}
              </Typography>
              <Typography
                level="body2"
                fontWeight="lg"
                textColor="text.tertiary"
              >
                {trainer?.email}
              </Typography>
              <Typography
                level="body2"
                fontWeight="lg"
                textColor="text.tertiary"
              >
                Experience: {trainer?.experience}
              </Typography>
              <Typography
                level="body2"
                fontWeight="lg"
                textColor="text.tertiary"
              >
                Specialization: {trainer?.specialization}
              </Typography>
              <Typography
                level="body2"
                fontWeight="lg"
                textColor="text.tertiary"
              >
                Posts: {trainer?.posts?.length}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "80%",
              flexWrap: "wrap",
              overflow: "auto",
              display: "flex",
              alignItems: "center",
              background: "#DFE1E1",
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
                  variant="outlined"
                  color="neutral"
                  onClick={handleShowServices}
                >
                  Services
                </Button>
                <Button
                  variant="solid"
                  sx={{
                    background: "black",
                    color: "white",
                    "&:hover": {
                      background: "black",
                    },
                  }}
                  onClick={handleShowPost}
                >
                  Post
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {post &&
        (trainer?.posts?.length > 0 ? (
          <Posts />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
            }}
          >
            <Typography sx={{ height: "50px" }}>No Post yet</Typography>
          </Box>
        ))}
      {showServices && <Viewplans trainerID={trainer?._id} />}
    </Container>
  );
};

export default ProfilePage;
