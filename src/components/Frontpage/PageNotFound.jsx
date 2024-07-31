import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import NotFoundPage from "../../images/notfoundimage.png";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
      }}
    >
      <img src={NotFoundPage}></img>
      <Box>
        <Typography>
          Go Back To Home Page
          <span
            style={{ cursor: "pointer", margin: "0.5rem" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <b>Click Here</b>
          </span>
        </Typography>
      </Box>
    </Container>
  );
};

export default PageNotFound;
