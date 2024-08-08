import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Container, Pagination, Stack } from "@mui/material";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "../../utils/axiosInstance";
import { bodyParts } from "../../utils/bodyPartExercises";
import { CapitalLetterCOnversions } from "../../utils/commonFunctions";
export default function BasicSelect() {
  const [muscle, setMuscle] = useState("");
  const [data, setData] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [exercise, setExercise] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [TotalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const clickHandler = async (currentPage) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/exercise/sortedExercises?muscle=${muscle}&difficulty=${difficulty}&page=${currentPage}`
      );
      setTotalPage(data.totalPages);
      setExercise(data.exercises);
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const VideoHandler = (muscleName, exerciseName) => {
    navigate(`/execiseVideos/${exerciseName}/${muscleName}`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    clickHandler(page);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get("/exercise");
      const dataToShow = data.exercises;
      setData(dataToShow.slice(0, 4));
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [exercise]);

  return (
    <>
      <Container sx={{ minHeight: { xm: "80vh", xs: "60vh" } }}>
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            my: 2,
            width: "100%",
          }}
        >
          <FormControl sx={{ width: "27%", margin: "5%", my: 1 }}>
            <InputLabel id="demo-simple-select-label">Muscle</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={muscle}
              label="muscle"
              onChange={(e) => setMuscle(e.target.value)}
            >
              {bodyParts.map(({ name, value }) => {
                return <MenuItem value={name}>{value}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "30%", marginRight: "10%", my: 1 }}>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={difficulty}
              label="difficulty"
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="expert">Expert</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{
              color: "white",
              backgroundColor: "red",
              width: "155px",
              height: "63px",
              fontSize: "19px",
              "&:hover": {
                background: "red",
              },
            }}
            onClick={() => clickHandler(currentPage)}
          >
            Search
          </Button>
        </Box>
        {!isLoading ? (
          <Container sx={{ margin: "4rem 0" }}>
            {exercise?.length > 0
              ? exercise?.map((e) => (
                  <Box style={{ margin: "10px" }}>
                    <Card border="secondary" style={{ width: "100%" }}>
                      <Card.Header>{e.name}</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          Equipment Required :{" "}
                          {CapitalLetterCOnversions(e.equipment)}
                        </Card.Title>
                        <Card.Title>Targeted Muscle : {e.muscle}</Card.Title>
                        <Card.Text>
                          Instruction:
                          <br />
                          {e.instructions}
                        </Card.Text>
                      </Card.Body>
                      <Button
                        sx={{ color: "black" }}
                        onClick={() => VideoHandler(e.name, e.muscle)}
                      >
                        View Video
                      </Button>
                    </Card>
                  </Box>
                ))
              : data?.map((e) => (
                  <Box style={{ margin: "10px" }}>
                    <Card border="secondary" style={{ width: "100%" }}>
                      <Card.Header>{e.name}</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          Equipment Required :{" "}
                          {CapitalLetterCOnversions(e.equipment)}
                        </Card.Title>
                        <Card.Title>
                          Targeted Muscle : {CapitalLetterCOnversions(e.muscle)}
                        </Card.Title>
                        <Card.Text>
                          Instruction:
                          <br />
                          {e.instructions}
                        </Card.Text>
                      </Card.Body>
                      <Button
                        sx={{ color: "black" }}
                        onClick={() => VideoHandler(e.name, e.muscle)}
                      >
                        View Video
                      </Button>
                    </Card>
                  </Box>
                ))}
          </Container>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: { sm: "100vh", xs: "60vh" },
            }}
          >
            <CircularProgress sx={{ color: "black" }} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0 20px 0",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={TotalPage}
              color="primary"
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
