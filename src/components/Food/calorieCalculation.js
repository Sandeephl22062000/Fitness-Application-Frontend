import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { priorFoodCalory } from "../../store/food";
import { useGetTargetNutritionMutation } from "../../api/dietApi";
import { showdetail } from "../../utils/commonFunctions";

const CalorieDetail = () => {
  const [showTrackPage, setShowTrackPage] = useState(false);
  const [Goal, setGoal] = useState("");
  const [Target, setTarget] = useState("");
  const [RequireCalories, setRequireCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const [getTargetNutrition, { isSuccess }] = useGetTargetNutritionMutation();

  const token = useSelector((state) => state?.user?.token);
  const priorMaintainceData = useSelector(
    (state) => state?.food?.priorFoodCaloryvalue
  );

  let maintainceCalory = Number(
    params?.maintainceCalories || priorMaintainceData
  );

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(priorFoodCalory(token));
  }, []);

  const showData = (data) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: 2,
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        {`How much weight do you want to ${data}?`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography>Mention your target in kg/week</Typography>
        {Goal && (
          <FormControl sx={{ marginTop: 2, width: "100%" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "white", fontSize: "1rem" }}
            >
              Target
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="target"
              value={Target}
              onChange={(e) => setTarget(e.target.value)}
              sx={{
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "black",
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            >
              <MenuItem value="0.25">0.25</MenuItem>
              <MenuItem value="0.50">0.50</MenuItem>
              <MenuItem value="0.75">0.75</MenuItem>
              <MenuItem value="1.0">1.0</MenuItem>
            </Select>
          </FormControl>
        )}
        {Target && (
          <Typography
            sx={{
              maxWidth: "80%",
              display: "flex",
              alignItems: "center",
              marginTop: 1,
            }}
          >
            Achieve the particular nutrition value per day
          </Typography>
        )}
      </Box>
    </Box>
  );

  useEffect(() => {
    showdetail(
      Goal,
      Target,
      maintainceCalory,
      setRequireCalories,
      setCarbs,
      setProtein
    );
  }, [Goal, Target, maintainceCalory]);

  const clickHandler = async () => {
    setShowTrackPage(true);
    await getTargetNutrition({
      requireCalories: RequireCalories,
      requireProtein: protein,
      requireCarbs: carbs,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/calculatediet`);
    }
  }, [isSuccess]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        minHeight: { xs: "80vh", sm: "100vh" },
      }}
    >
      <Box
        sx={{
          background: "#1a1a1a",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid red",
          borderRadius: "20px",
          paddingBottom: "2rem",
          padding: "2rem",
          width: "100%",
          maxWidth: "900px",
          boxShadow: "0 4px 8px rgba(255, 0, 0, 0.3)",
        }}
      >
        {maintainceCalory && (
          <Box
            sx={{
              margin: "2rem",
              background: "red",
              color: "white",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}
            >
              Maintenance Calories: {maintainceCalory}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              margin: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "red",
            }}
          >
            Please select your fitness goal
          </Typography>
          <FormControl sx={{ m: 1, minWidth: "60%" }}>
            <InputLabel
              id="demo-simple-select-autowidth-label"
              sx={{ color: "white", fontSize: "1rem" }}
            >
              Goal
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={Goal}
              onChange={(e) => {
                setGoal(e.target.value);
              }}
              fullWidth
              label="Goal"
              sx={{
                borderRadius: "10px",
                backgroundColor: "black",
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            >
              <MenuItem value="Gain">Gain Weight</MenuItem>
              <MenuItem value="Loss">Loss Weight</MenuItem>
              <MenuItem value="Maintain">Maintain Weight</MenuItem>
            </Select>
          </FormControl>
          {Goal && showData(Goal)}
          {Target && (
            <TableContainer
              component={Paper}
              sx={{
                width: "80%",
                marginTop: "2rem",
                backgroundColor: "#1a1a1a",
                borderRadius: "10px",
                border: "1px solid red",
                boxShadow: "0 4px 8px rgba(255, 0, 0, 0.3)",
              }}
            >
              <Table
                sx={{ tableLayout: "fixed", borderRadius: "10px" }}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Calories Requirement:
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {RequireCalories}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Protein Requirement:
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {protein}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Carbs Requirement:
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {carbs}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {Target && (
            <Box
              sx={{
                marginTop: "2rem",
                width: "60%",
              }}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  padding: "0.75rem",
                  borderRadius: "10px",
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#990000",
                  },
                }}
                onClick={clickHandler}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CalorieDetail;
