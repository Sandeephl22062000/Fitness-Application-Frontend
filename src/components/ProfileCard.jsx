import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Post from "./Trainer-Info/ProfilePost";
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProfilePage = (props) => {
  return (
    <Container
      sx={{
        minHeight: "150vh",
        marginTop: "2rem",
        width: "70rem",
      }}
    >
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={3.1}>
          <Card
            sx={{
              height: "200px",
              width: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              marginLeft: "22%",
            }}
          >
            <CardMedia
              image={props.user.photo}
              title="varverv"
              sx={{ height: "100%", width: "100%", borderRadius: "50%" }}
            />
          </Card>
        </Grid>
        <Grid item xs={8.7} sx={{ marginLeft: "15px" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: "2%",
            }}
          >
            <div style={{ margin: "20px 0 0 30px" }}>
              <Typography>
                <b>Name: </b>
                {props.user.name}
              </Typography>
              <Typography>
                <b>Email:</b> {props.user?.email}
              </Typography>
              <Typography>
                <b>Specialization:</b> {props.user?.specialization}
              </Typography>
              <Typography>
                <b>Description:</b>
              </Typography>
              <Typography>
                <b>Experience:</b> {props.user?.experience} years
              </Typography>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Box sx={{ marginLeft: "30px" }}>
                {" "}
                <Button>Send Request</Button>
                <Button>Message</Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.user.posts?.length === 0 ? (
              <Box>
                <Typography sx={{ fontSize: "35px", height: "100%" }}>
                  <div>
                    <b>No Photo posted yet</b>
                  </div>
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  justifyContent: "flex-end",
                  gap: "16px",
                  margin: "4px",
                }}
              >
                <Post post={props.user.posts} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
