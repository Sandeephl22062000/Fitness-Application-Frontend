import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

import { Link, useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);
  const [trainer, setTrainer] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [specialization, setSpecialization] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const navigate = useNavigate();
  const submithandler = async (e) => {
    try {
      setLoading(true);
      if (!search) {
        return;
      }
      const { data } = await axios.get(`/api/trainer/${search}/${page}`);
      setTotalPage(data.totalPages);
      setSearchResult(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrainerDetail = async () => {
    try {
      const { data } = await axios.get(`/api/trainer/${page}`);
      setTrainer(data.data);
      setTotalPage(data.totalPages);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getTrainerDetail();
  }, [page]);

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleExperienceLevelChange = (event) => {
    setExperienceLevel(event.target.value);
  };

  const searchFilter = async () => {
    try {
      console.log("searchStarted");
      const response = await axios.get(
        `/api/trainer/search/${specialization}/${experienceLevel}`
      );
      console.log(response?.data?.data);
      setFilteredSearch(response.data.data);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchFilter(specialization, experienceLevel);
  };
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      submithandler();
    } else {
      setSearchResult(trainer);
    }
  }, [search, trainer]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          minHeight: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <form
            onSubmit={(e) => {
              submithandler(e);
            }}
          >
            <TextField
              autoComplete="off"
              sx={{ bgcolor: "white", width: "30rem" }}
              fullWidth={true}
              id="search"
              name="search"
              label="search trainer"
              placeholder="Name or Email"
              onChange={handleInputChange}
            />

            <Button
              sx={{
                background: "black",
                color: "white",
                width: "7rem",
                height: "3rem",
                margin: "0.3rem 0 0 0.5rem",
              }}
              onClick={submithandler}
              variant="contained"
              type="submit"
            >
              Search
            </Button>
          </form>
        </Box>

        <Typography>OR</Typography>
        <Typography>Filter your search</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {" "}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContentL: "center",
              alignItems: "center",
              margin: "0.3rem",
            }}
          >
            <FormControl sx={{ margin: "1rem" }}>
              <InputLabel id="specialization-label">Specialization</InputLabel>
              <Select
                labelId="specialization-label"
                id="specialization"
                value={specialization}
                onChange={handleSpecializationChange}
                label="Specialization"
                sx={{ bgcolor: "white", width: "10rem" }}
              >
                <MenuItem value="cardio">Cardio </MenuItem>
                <MenuItem value="weightGaining">Weight gaining</MenuItem>
                <MenuItem value="weightLoss">Weight loss</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ margin: "1rem" }}>
              <InputLabel id="experience-level-label">Experience</InputLabel>
              <Select
                labelId="experience-level-label"
                id="experience-level"
                value={experienceLevel}
                onChange={handleExperienceLevelChange}
                label="Experience"
                sx={{ bgcolor: "white", width: "10rem" }}
              >
                <MenuItem value="beginner">Beginner Level</MenuItem>
                <MenuItem value="intermediate">Intermediate level</MenuItem>
                <MenuItem value="advance">Advance level</MenuItem>
                <MenuItem value="expert">Expert level</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "black",
                color: "white",
                "&:hover": {
                  background: "black",
                  color: "white",
                },
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          {!isLoading ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
              {filteredSearch.length > 0
                ? filteredSearch?.map((trainer) => (
                    <Card
                      sx={{
                        width: 350,
                        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            src={trainer?.photo}
                            aria-label="recipe"
                          >
                            {trainer?.name[0].toUpperCase()}
                          </Avatar>
                        }
                        title={trainer.name}
                      />
                      <CardMedia
                        component="img"
                        height="194"
                        image={trainer.photo}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Email:{trainer.email}
                          <br />
                          specification:{trainer?.specialization}
                        </Typography>
                      </CardContent>
                      <CardActions
                        disableSpacing
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          sx={{
                            backgroundColor: "black",
                            color: "white",
                            "&:hover": {
                              background: "black",
                            },
                            textDecoration: "none",
                          }}
                          onClick={() => {
                            navigate(`/trainer/${trainer._id}`);
                          }}
                        >
                          View Profile
                        </Button>
                      </CardActions>
                    </Card>
                  ))
                : searchResult?.map((trainer) => (
                    <Card
                      sx={{
                        width: 350,
                        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            src={trainer?.photo}
                            aria-label="recipe"
                          >
                            {trainer?.name[0].toUpperCase()}
                          </Avatar>
                        }
                        title={trainer.name}
                      />
                      <CardMedia
                        component="img"
                        height="194"
                        image={trainer.photo}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Email:{trainer.email}
                          <br />
                          specification:{trainer?.specialization}
                        </Typography>
                      </CardContent>
                      <CardActions
                        disableSpacing
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          sx={{
                            backgroundColor: "black",
                            color: "white",
                            "&:hover": {
                              background: "black",
                            },
                            textDecoration: "none",
                          }}
                          onClick={() => {
                            navigate(`/trainer/${trainer._id}`);
                          }}
                        >
                          View Profile
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
            </Box>
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
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
  );
};

export default SearchInput;
