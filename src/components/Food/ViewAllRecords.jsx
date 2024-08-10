import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { Box, Button, Container, Modal } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ModalClose, ModalDialog } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import DeleteRecordsModal from "./deleteRecordModal";
export default function BasicTable() {
  const [data, setData] = useState([]);
  const [variant, setVariant] = React.useState(undefined);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const chartData = [
    { name: "Category A", value: 400, fill: "#8884d8" },
    { name: "Category B", value: 300, fill: "#82ca9d" },
  ];

  const handleClose1 = () => {
    setVariant(undefined);
  };

  const handleDelete = () => {
    setVariant("solid");
  };

  const onDelete = (id) => {
    const updatedData = data.filter((meal) => meal._id !== id);
    setData(updatedData);
  };

  const getuserTrackedDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/trackedrecords",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getuserTrackedDetails();
  }, []);
  return (
    <Container sx={{ minHeight: "90vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem",
        }}
      >
        <h3>View all your Tracked Calories</h3>
      </Box>
      {data?.length > 0 ? (
        data?.map((meals) => (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "15px",
              }}
            >
              <h4>{meals.name}</h4>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h6>{new Date(meals?.createdAt).toLocaleString()}</h6>
                <Button
                  onClick={() => {
                    handleDelete(meals._id);
                  }}
                  sx={{
                    background: "red",
                    color: "white",
                    "&:hover": {
                      background: "red",
                    },
                    margin: "0 1rem",
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
            <Modal
              open={variant === "solid"}
              onClose={() => setVariant(undefined)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ background: "white" }}
            >
              <ModalDialog>
                <Box>
                  <b>Delete Confirmation</b>
                </Box>
                <ModalClose onClick={() => setVariant(undefined)} />
                <DeleteRecordsModal
                  id={meals._id}
                  onDelete={onDelete}
                  onClose={handleClose1}
                />
              </ModalDialog>
            </Modal>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Food Items (100g serving)</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Calories (g)</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Fats (g)</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Carbs (g)</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Proteins (g)</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Quantity (100 g)</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {meals?.items?.map((item) => (
                    <>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell aign="right">{item.name}</TableCell>
                        <TableCell align="right">{item.calories}</TableCell>
                        <TableCell align="right">{item.fat}</TableCell>
                        <TableCell align="right">{item.carbs}</TableCell>
                        <TableCell align="right">{item.protein}</TableCell>
                        <TableCell aign="right">{item.quantity}</TableCell>
                      </TableRow>
                    </>
                  ))}
                  <TableRow
                    title="Total"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Total
                    </TableCell>
                    <TableCell align="right">{meals?.sumCalorie}</TableCell>
                    <TableCell align="right">{meals?.sumFat}</TableCell>
                    <TableCell align="right">{meals?.sumCarbs}</TableCell>
                    <TableCell align="right">{meals?.sumProtein}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "60vh",
            margin: "2rem",
          }}
        >
          <h3 style={{ margin: "1rem" }}>No Tracked Calories to show</h3>
          <h3>Click here to track calories</h3>
          <Link to="/food">
            <Button
              sx={{
                background: "black",
                color: "white",
                margin: "0.2em",
                "&:hover": {
                  background: "black",
                },
              }}
            >
              Track Calory
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
}
