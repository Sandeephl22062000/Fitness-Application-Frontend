import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import SummerBg from "../../images/summerBg.webp";
import { useNavigate } from "react-router-dom";

const BackgroundImageContainer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url(${SummerBg})`,
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
            height: { xs: "auto", sm: "140px" },
          }}
        >
          EXERCISES
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
            Discover a wide range of exercises to fuel your fitness journey. Our
            database offers an extensive collection of exercises, complete with
            detailed instructions and video tutorials. Whether you're a beginner
            or a seasoned fitness enthusiast, you'll find exercises tailored to
            your needs.
          </Typography>

          <Button
            onClick={() => {
              navigate("/exercise");
            }}
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
            Exercises
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BackgroundImageContainer;
