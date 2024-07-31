import * as React from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import ClientsRequests from "./clientsRequestsTable";

export default function BasicTable() {
  return (
    <Container sx={{ minHeight: "70vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "7rem",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginTop: "10rem", marginBottom: "1rem" }}
        >
          Subscribed Clients
        </Typography>
        <ClientsRequests />
      </Box>
    </Container>
  );
}
