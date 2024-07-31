import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import parse from "react-html-parser";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/joy/CircularProgress";
import { useEffect } from "react";

const IntelligentDiet = () => {
  const [response, setResponse] = useState("");
  const [foodType, setFoodTypes] = useState("");
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const foodData = useSelector((state) => state?.food);
  const [parseResponse, setParseResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("foodFdata", foodData);

  const res = async () => {
    setIsLoading(true);
    console.log(calories, carbs, protein, foodType);
    const resp = await axios.post(
      "http://localhost:8000/api/users/intelligentdiet",
      {
        foodType,
        calories: calories,
        protein: protein,
        carbs: carbs,
      }
    );
    setParseResponse(parse(resp?.data?.choices[0].message?.content));
    setIsLoading(false);
  };
  console.log(setParseResponse);
  const sendRequest = () => {
    console.log(foodType);
    res();
  };
  const token = useSelector((state) => state?.user?.token);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/targetnutrients/targetnutritionofuser",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
      setCalories(data?.data?.requireCalories);
      setCarbs(data?.data?.requireCarbs);
      setProtein(data?.data?.requireProtein);
    };
    getData();
  }, []);
  console.log(parseResponse);
  return (
    <Container sx={{ minHeight: "80vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        {" "}
        <Box sx={{ width: "60%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Food Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="foodType"
              value={foodType}
              label="Food type"
              onChange={(e) => {
                setFoodTypes(e.target.value);
              }}
            >
              <MenuItem value={"Vegeterian"}>Vegeterian</MenuItem>
              <MenuItem value={"Non-Vegeterian"}>Non-Vegeterian</MenuItem>
              <MenuItem value={"Vegan"}>Vegan</MenuItem>
              <MenuItem value={"Eggiterian"}>Eggiterian</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          sx={{
            background: "black",
            color: "white",
            width: "100px",
            marginLeft: "1rem",
            "&:hover": {
              background: "black",
            },
          }}
          onClick={sendRequest}
        >
          Submit
        </Button>
      </Box>
      <Container sx={{ width: "100%" }}>
        {!isLoading ? (
          <Box>{parseResponse}</Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress color="neutral" size="lg" />
            <Typography
              variant="h6"
              fontSize="xl"
              sx={{ mb: 0.5, textAlign: "center" }}
            >
              Please wait patiently! We are diligently preparing your
              personalized diet plan to ensure it is perfect and tailored
              specifically to your needs.
            </Typography>
          </Box>
        )}
      </Container>
      {/* {parseResponse?.Breakfast.map((meal) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem",
          }}
        >
          <MealCard meal={meal} />
        </Box>
      ))}
      {parseResponse?.MorningSnacks.map((meal) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",

            margin: "1rem",
          }}
        >
          <Typography>Breakfast</Typography>
          <MealCard meal={meal} />
        </Box>
      ))}
      {parseResponse?.Lunch.map((meal) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",

            margin: "1rem",
          }}
        >
          <Typography>Lunch</Typography>
          <MealCard meal={meal} />
        </Box>
      ))}
      {parseResponse?.EveningSnacks.map((meal) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            margin: "1rem",
          }}
        >
          <Typography>Evening Snacks</Typography>

          <MealCard meal={meal} />
        </Box>
      ))}
      {parseResponse?.Dinner.map((meal) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            margin: "1rem",
          }}
        >
          <MealCard meal={meal} />
        </Box>
      ))} */}
    </Container>
  );
};

export default IntelligentDiet;
