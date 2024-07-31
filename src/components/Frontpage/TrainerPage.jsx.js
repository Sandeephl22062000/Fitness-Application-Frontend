import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import backgroundImage from "../../images/backGorund.jpg";
import { useNavigate } from "react-router-dom";

const BackgroundImageContainer = () => {
  const navigate = useNavigate();
  const handleTrainer = () => {
    navigate("/trainer");
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: { xs: "60vh", sm: "100vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "10px", sm: "20px" },
      }}
    >
      <Container>
        <Typography
          variant="h2"
          color="red"
          textAlign="right"
          sx={{
            padding: { xs: "10px 0", sm: "20px" },
            fontWeight: 600,
            fontSize: { xs: "1.8rem", sm: "3.75rem" },
            height: { xs: "auto", sm: "30%" },
          }}
        >
          TRAIN WITH THE EXPERTS
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            padding: { xs: "0 10px", sm: "0 20px" },
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            color="white"
            textAlign="right"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            Train with our expert trainers and take your fitness journey to the
            next level. Our experienced trainers are here to guide and motivate
            you every step of the way. With our personalized training programs,
            you'll receive one-on-one attention through chat, video and voice
            calls, and support tailored to your unique needs and goals.
          </Typography>

          <Button
            onClick={handleTrainer}
            sx={{
              padding: { xs: "10px 15px", sm: "20px" },
              color: "white",
              bgcolor: "red",
              width: { xs: "100px", sm: "150px" },
              alignSelf: "flex-end",
              marginTop: { xs: "10px", sm: "20px" },
              "&:hover": { backgroundColor: "darkred" },
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            TRAINER
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BackgroundImageContainer;
