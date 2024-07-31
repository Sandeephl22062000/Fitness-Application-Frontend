import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";

const Food = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const getData = async () => {
    const getData = await axios
      .get(`https://api.api-ninjas.com/v1/nutrition?query=${search}`, {
        "X-Api-Key": process.env.REACT_APP_NINJA_FOOD_API,
      })
      .then((response) => {
        response.json();
      })
      .then((response) => {
        const limitData = response.hits.slice(0, 3);
        setData(limitData);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const clickHandler = () => {
    getData();
  };
  const submitHandler = () => {
    getData();
  };
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <form onSubmit={submitHandler}>
          <TextField
            required
            id="outlined-required"
            value={search}
            label="Search"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            sx={{ bgcolor: "white", padding: "10px", width: "500px" }}
          />

          <Button onClick={clickHandler}>Search</Button>
        </form>
      </Container>
    </div>
  );
};

export default Food;
