import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { priorFoodCalory } from "../../store/food";
import axios from "axios";
import backgroundImage from "../../images/foodSectionBackground.jpg";

const CalorieDetail = () => {
  const [showTrackPage, setShowTrackPage] = useState(false);
  const [Goal, setGoal] = useState("");
  const [Target, setTarget] = useState("");
  const [RequireCalories, setRequireCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.user?.token);
  const priorMaintainceData = useSelector(
    (state) => state?.food?.priorFoodCaloryvalue
  );
  const Calories = useSelector((state) => state?.food?.calculateFoodCalories);

  let maintainceCalory;
  if (Calories === 0) {
    maintainceCalory = priorMaintainceData;
  } else {
    maintainceCalory = Calories;
  }

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
      }}
    >
      <div>{`How much Weight do you want to ${data}?`}</div>
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
          <FormControl sx={{ marginTop: 2 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Target
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              label="target"
              value={Target}
              placeholder="target"
              onChange={(e) => {
                setTarget(e.target.value);
              }}
              autoWidth
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
            sx={{ maxWidth: "80%", display: "flex", alignItems: "center" }}
          >{`Please try to maintain the following nutrition value per day`}</Typography>
        )}
      </Box>
    </Box>
  );

  const showdetail = () => {
    if (Goal === "Gain") {
      const calculatedCalories = (Target * 7700) / 7 + maintainceCalory;
      const calculatedCarbs = (maintainceCalory * 0.65) / 4;
      const calculatedProtein = (maintainceCalory * 0.2) / 4;
      setRequireCalories(calculatedCalories.toFixed(2));
      setCarbs(calculatedCarbs.toFixed(2));
      setProtein(calculatedProtein.toFixed(2));
    } else if (Goal === "Loss") {
      const calculatedCalories =
        (maintainceCalory - Target * 7700) / 7 + maintainceCalory;
      const calculatedCarbs = (maintainceCalory * 0.45) / 4;
      const calculatedProtein = (maintainceCalory * 0.15) / 4;
      setRequireCalories(calculatedCalories.toFixed(2));
      setCarbs(calculatedCarbs.toFixed(2));
      setProtein(calculatedProtein.toFixed(2));
    } else {
      setRequireCalories(maintainceCalory);
      const calculatedCarbs = (maintainceCalory * 0.55) / 4;
      const calculatedProtein = (maintainceCalory * 0.17) / 4;
      setCarbs(calculatedCarbs.toFixed(2));
      setProtein(calculatedProtein.toFixed(2));
    }
    return;
  };

  useEffect(() => {
    showdetail();
  }, [showdetail]);

  const clickHandler = () => {
    setShowTrackPage(true);
    const sendResponse = async () => {
      try {
        const data = await axios.post(
          "http://localhost:8000/api/users/gettargetnutrition",
          {
            requireCalories: RequireCalories,
            requireProtein: protein,
            requireCarbs: carbs,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        throw error;
      }
    };
    sendResponse();
    navigate(`/calculatediet`);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#c9c7c7",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid black",
            paddingBottom: "2rem",
            width: "100%",
          }}
        >
          {maintainceCalory && (
            <Box
              sx={{
                margin: "2rem",
              }}
            >
              <Typography
                sx={{
                  margin: "1rem",
                  fintWeight: "300",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                According to the Details provided your Maintaince Calory is{" "}
                {maintainceCalory}
              </Typography>
              <Typography sx={{ margin: "1rem" }}>
                Please select your fitness goal,and according know your body
                nutrition requirements
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80% ",
            }}
          >
            <FormControl sx={{ m: 1, width: "30%" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Goal
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={Goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                }}
                autoWidth
                label="Goal"
              >
                <MenuItem value="Gain">Gain Weight</MenuItem>
                <MenuItem value="Loss">Loss Weight</MenuItem>
                <MenuItem value="Maintain">Maintain Weight</MenuItem>
              </Select>
            </FormControl>
            {Goal === "Gain" ? (
              showData("Gain")
            ) : Goal === "Loss" ? (
              showData("Loss")
            ) : (
              <Typography></Typography>
            )}
            {Target && (
              <TableContainer
                component={Paper}
                sx={{
                  width: "60%",
                  marginTop: "1rem",
                }}
              >
                <Table
                  sx={{ tableLayout: "fixed" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Calories Requirement:
                      </TableCell>
                      <TableCell align="right">{RequireCalories}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Protein Requirement:
                      </TableCell>
                      <TableCell align="right">{protein}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Carbohydrates Requirement:
                      </TableCell>
                      <TableCell align="right">{carbs}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {Target && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "center",
                }}
              >
                <Button
                  onClick={clickHandler}
                  sx={{
                    background: "black",
                    color: "white",
                    marginTop: "10px",
                    height: "60px",
                    width: "200px",
                    margin: "0.5rem",
                    "&:hover": {
                      background: "black",
                    },
                  }}
                >
                  Track Calories
                </Button>
                <Button
                  onClick={() => {
                    navigate("/dietprovider");
                  }}
                  sx={{
                    background: "black",
                    color: "white",
                    marginTop: "10px",
                    height: "60px",
                    width: "200px",
                    margin: "0.5rem",
                    "&:hover": {
                      background: "black",
                    },
                  }}
                >
                  Personalized Diet
                </Button>
              </Box>
            )}
          </Box>
        </div>
      </Box>
    </>
  );
};
export default CalorieDetail;
