import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../store/user";

const ClientsRequests = () => {
  const token = useSelector((state) => state?.user?.token);
  const clients = useSelector((state) => state?.user?.getRequestedClients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients({ token }));
  }, []);
  return (
    <Container>
      {clients?.length > 0 ? (
        <Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Subscribed Date</TableCell>
                  <TableCell>Users Name</TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      Packages
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients?.map((request) => (
                  <TableRow
                    key={request._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Typography sx={{ margin: "10px" }}>
                          {new Date(request?.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Avatar src={request?.user?.photo}></Avatar>
                        <Typography sx={{ margin: "10px" }}>
                          {request?.user?.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "row",
                        }}
                      >
                        {request?.charges}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "8rem",
          }}
        >
          No Clients Subscribed
        </Box>
      )}
    </Container>
  );
};

export default ClientsRequests;
