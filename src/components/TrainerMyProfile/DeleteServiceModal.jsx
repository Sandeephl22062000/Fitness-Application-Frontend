import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { deleteServices } from "../../store/trainer";
import { useDispatch, useSelector } from "react-redux";

const DeleteServiceModal = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);
  const deleteHandler = () => {
    dispatch(deleteServices({ id, token }));
    onClose();
  };
  return (
    <Box>
      <Typography sx={{ marginTop: "0.8rem" }}>
        Are you sure you want to delete this service?
      </Typography>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginRight: 1 }}
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={deleteHandler}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteServiceModal;
