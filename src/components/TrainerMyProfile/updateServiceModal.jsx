import { Box, Button, Container, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { editServices } from "../../store/trainer";
import { useDispatch, useSelector } from "react-redux";

const UpdateServiceModal = ({ id, onClose }) => {
  const [charges, setCharges] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const token = useSelector((state) => state?.user?.token);
  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(editServices({ id, token, charges, duration, description }));
    onClose();
  };
  return (
    <Container sx={{ width: "60%" }}>
      {" "}
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Charges"
          value={charges}
          onChange={(e) => setCharges(e.target.value)}
          sx={{ margin: "0.5rem" }}
          fullWidth
          required
        />
        <TextField
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          sx={{ margin: "0.5rem" }}
          fullWidth
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ margin: "0.5rem" }}
          fullWidth
          required
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{ background: "black", color: "white", margin: "1rem" }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default UpdateServiceModal;
