import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackgroundImageContainer = () => {
  const navigate = useNavigate();
  const handleActivities = () => {
    navigate("/activities");
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
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
          textAlign="left"
          sx={{
            padding: { xs: "10px 0", sm: "20px" },
            fontWeight: 600,
            fontSize: { xs: "1.8rem", sm: "3.75rem" },
            height: { xs: "auto", sm: "140px" },
          }}
        >
          ACTIVITY FEEDS
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: { xs: "0 10px", sm: "0 20px" },
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            color="white"
            textAlign="left"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            Check out your friend's progress and grow together
          </Typography>
          <Button
            onClick={handleActivities}
            sx={{
              padding: { xs: "10px 15px", sm: "20px" },
              color: "white",
              bgcolor: "red",
              width: { xs: "100px", sm: "150px" },
              alignSelf: "flex-start",
              "&:hover": { backgroundColor: "darkred" },
              marginTop: { xs: "10px", sm: "20px" },
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            FEEDS
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BackgroundImageContainer;
