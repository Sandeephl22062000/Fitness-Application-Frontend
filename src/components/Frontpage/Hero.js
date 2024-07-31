import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImage from "../../images/heroImages.jpg"; // Import the image
import { Button, Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const HeroSection = styled("section")(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#33475b",
  backgroundImage: `url(${HeroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  [theme.breakpoints.between("sm", "md")]: {
    minHeight: "80vh",
    backgroundSize: "cover",
  },
  [theme.breakpoints.up("md")]: {
    minHeight: "100vh",
    backgroundSize: "cover",
  },
}));

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background:
    "radial-gradient(at center center, rgba(181, 8, 8, 0.38) 0%, rgba(0, 0, 0, 0.6) 100%)",
});

const HeroContent = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  zIndex: 4,
  maxWidth: "1200px",
  position: "relative",
  textAlign: "center",

  [theme.breakpoints.down("sm")]: {
    minHeight: "60vh",
    ".heroText": {
      lineHeight: "1",
      "& h2": {
        fontSize: "1.5rem",
        paddingBottom: "2rem",
      },
      "& h1": {
        fontSize: "3rem",
      },
      "& span": {
        fontSize: "1.1rem",
        padding: "30px 0",
      },
    },
  },
  [theme.breakpoints.between("sm", "md")]: {
    ".heroText": {
      lineHeight: "1",
      "& h2": {
        fontSize: "3rem",
        paddingBottom: "3rem",
      },
      "& h1": {
        fontSize: "5rem",
      },
      "& span": {
        padding: "30px 0",
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    ".heroText": {
      lineHeight: "1",
      "& h2": {
        fontSize: "4rem",
        paddingBottom: "4rem",
      },
      "& h1": {
        fontSize: "9rem",
      },
      "& span": {
        fontSize: "1.3rem",
        padding: "40px 0",
      },
    },
  },
}));

const Hero = () => {
  const navigate = useNavigate();
  const handleRegisterPage = () => {
    navigate("/signup");
  };

  return (
    <HeroSection>
      <Overlay />
      <HeroContent>
        <div className="heroText">
          <Typography variant="h2">BUILD UP YOUR</Typography>
          <Typography variant="h1">BODY SHAPE</Typography>
          <Typography variant="body1">
            Build Your Body and Fitness with Professional Touch
          </Typography>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              padding: "20px",
              color: "white",
              bgcolor: "red",
              width: "150px",
              marginTop: "20px",
              "&:hover": { backgroundColor: "red" },
            }}
            onClick={handleRegisterPage}
          >
            JOIN US
          </Button>
        </Box>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
