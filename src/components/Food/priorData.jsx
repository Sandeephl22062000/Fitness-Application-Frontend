import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const PriorInfoModal = ({ open, handleClose, priorDataArray }) => {
  const navigate = useNavigate();
  const data = priorDataArray[priorDataArray.length - 1];
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div" align="center">
          Prior Information
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                <>
                  {" "}
                  <TableRow key={data.id}>
                    <TableCell>Weight</TableCell>
                    <TableCell>{data.weight}</TableCell>
                  </TableRow>
                  <TableRow key={data.id}>
                    <TableCell>Height</TableCell>
                    <TableCell>{data.height}</TableCell>
                  </TableRow>
                  <TableRow key={data.id}>
                    <TableCell>Age</TableCell>
                    <TableCell>{data.age}</TableCell>
                  </TableRow>
                  <TableRow key={data.id}>
                    <TableCell>Gender</TableCell>
                    <TableCell>{data.gender}</TableCell>
                  </TableRow>
                  <TableRow key={data.id}>
                    <TableCell>Activity</TableCell>
                    <TableCell>{data.activity}</TableCell>
                  </TableRow>
                </>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0.5rem",
          }}
        >
          <Button
            onClick={() => {
              navigate("/food/calculateCalories");
            }}
            sx={{
              background: "black",
              color: "white",
              "&:hover": { background: "black" },
            }}
          >
            Use
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PriorInfoModal;
