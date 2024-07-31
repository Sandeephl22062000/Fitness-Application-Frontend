import { Container, TextField, Typography, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { createServices } from "../store/trainer";
import { useNavigate } from "react-router-dom";

const Createservices = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [duration, setDuration] = useState("");
  const [charges, setCharges] = useState("");
  const [description, setDescription] = useState("");

  const handleAddService = (e) => {
    e.preventDefault();
    dispatch(
      createServices({
        token,
        service: {
          duration,
          description,
          charges,
        },
        addToast,
        navigate,
      })
    );
    setDuration("");
    setCharges("");
    setDescription("");
  };

  const token = useSelector((state) => state?.user?.token);

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ margin: "0.5rem" }}
      >
        Create Services
      </Typography>
      <form>
        <div>
          <Typography variant="h6" gutterBottom>
            Service
          </Typography>
          <TextField
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Charges"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2rem",
          }}
        >
          <Button
            type="button"
            onClick={handleAddService}
            variant="outlined"
            sx={{ color: "black" }}
          >
            Add Service
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Createservices;
