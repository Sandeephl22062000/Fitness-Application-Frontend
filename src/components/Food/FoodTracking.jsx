import React, { useState } from "react";
import axios from "axios";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { useEffect } from "react";
import {
  useSaveTrackedCaloriesMutation,
  useTargetNutritionQuery,
} from "../../api/dietApi";

const ExeprmientFoodApi = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [rows, setRows] = useState([]);
  const [sumCalorie, setSumCalorie] = useState(0);
  const [sumFat, setSumFat] = useState(0);
  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);
  const [variant, setVariant] = useState(undefined);
  const [chartProteinData, setChartProteinData] = useState([]);
  const [chartCarbsData, setChartCarbsData] = useState([]);
  const [chartCaloriesData, setChartCaloriesData] = useState([]);
  const [name, setName] = useState("");
  const [TargetProtein, setTargetProtein] = useState(0);
  const [TargetCarbs, setTargetCarbs] = useState(0);
  const [TargetCalories, setTargetCalories] = useState(0);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [optionLoading, setOptionLoading] = useState(false);
  const [saveTrackedCalories] = useSaveTrackedCaloriesMutation();
  const { data: getTargetNutrition } = useTargetNutritionQuery();

  console.log({ optionLoading });

  useEffect(() => {
    setTargetCalories(getTargetNutrition?.data?.requireCalories);
    setTargetCarbs(getTargetNutrition?.data?.requireCarbs);
    setTargetProtein(getTargetNutrition?.data?.requireProtein);
  }, [getTargetNutrition]);

  useEffect(() => {
    const getData = async () => {
      if (search?.length > 0) {
        setOptionLoading(true);

        const { data } = await axios.get(
          `https://trackapi.nutritionix.com/v2/search/instant?query=${search}`,
          {
            headers: {
              "x-app-id": "b8cfb0ea",
              "x-app-key": "dc60bc0aa31a8816eeed1d3e6364719b",
              "x-remote-user-id": "0",
            },
          }
        );

        setAutoCompleteOptions(
          data?.common?.map((detail, index) => {
            return {
              id: index,
              foodName: detail?.food_name,
              foodId: detail?.nix_item_id,
            };
          })
        );
      }
      setOptionLoading(false);
    };
    try {
      getData();
    } catch (error) {
      throw error;
    }
  }, [search]);

  const navigate = useNavigate();

  const clickOptionHandler = async () => {
    try {
      const { data } = await axios.post(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          query: search,
        },
        {
          headers: {
            "x-app-id": "b8cfb0ea",
            "x-app-key": "dc60bc0aa31a8816eeed1d3e6364719b",
            "x-remote-user-id": "0",
          },
        }
      );

      setResult(data?.foods);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (result?.length > 0) AddToTable(result?.length - 1);
  }, [result]);

  const removeItem = (index) => {
    const updatedRows = [...rows];
    const removedItem = updatedRows.splice(index, 1)[0];
    setRows(updatedRows);
    setSumCalorie(sumCalorie - removedItem.calories * removedItem.quantity);
    setSumFat(sumFat - removedItem.fat * removedItem.quantity);
    setSumCarbs(sumCarbs - removedItem.carbs * removedItem.quantity);
    setSumProtein(sumProtein - removedItem.protein * removedItem.quantity);
  };

  const adjustQuantity = (index, quantity) => {
    const updatedRows = [...rows];
    updatedRows[index].quantity = quantity;
    setRows(updatedRows);
    calculateTotals(updatedRows);
  };

  const calculateTotals = (updatedRows) => {
    let newSumCalorie = 0;
    let newSumFat = 0;
    let newSumCarbs = 0;
    let newSumProtein = 0;

    updatedRows.forEach((row) => {
      const calculatedCalorie = row.calories * row.quantity;
      const calculatedFat = row.fat * row.quantity;
      const calculatedCarbs = row.carbs * row.quantity;
      const calculatedProtein = row.protein * row.quantity;

      newSumCalorie += calculatedCalorie;
      newSumFat += calculatedFat;
      newSumCarbs += calculatedCarbs;
      newSumProtein += calculatedProtein;
    });

    setSumCalorie(newSumCalorie);
    setSumFat(newSumFat);
    setSumCarbs(newSumCarbs);
    setSumProtein(newSumProtein);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const AddToTable = (index) => {
    console.log({ index });
    const selectedRow = result[index];

    const newRow = {
      name: selectedRow.food_name,
      calories: selectedRow.nf_calories,
      fat: selectedRow.nf_saturated_fat,
      carbs: selectedRow.nf_total_carbohydrate,
      protein: selectedRow.nf_protein,
      weight: selectedRow.serving_weight_grams,
      quantity: 1,
    };

    setRows([...rows, newRow]);
    calculateTotals([...rows, newRow]);
  };

  const saveTrackedTable = async (e) => {
    e.preventDefault();
    try {
      await saveTrackedCalories({
        name,
        items: rows,
        sumCalorie,
        sumFat,
        sumCarbs,
        sumProtein,
      });
    } catch (error) {
      throw error;
    }
    setVariant(undefined);
  };

  const differenceCalories = Math.max(TargetCalories - sumCalorie, 0);
  const differenceCarbs = Math.max(TargetCarbs - sumCarbs, 0);
  const differenceProtein = Math.max(TargetProtein - sumProtein, 0);

  let chartData = [
    {
      label: "Calories",
      target: TargetCalories,
      differenceData: differenceCalories,
      chartData: chartCaloriesData,
    },
    {
      label: "Protein",
      target: TargetProtein,
      differenceData: differenceProtein,
      chartData: chartProteinData,
    },
    {
      label: "Carbs",
      target: TargetCarbs,
      differenceData: differenceCarbs,
      chartData: chartCarbsData,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const chartCaloriesData = [
      {
        name: "Calories left",
        value: +differenceCalories.toFixed(2),
        fill: "#EA706D",
      },
      {
        name: "Calories taken",
        value: +sumCalorie.toFixed(2),
        fill: "#82ca9d",
      },
    ];
    setChartCaloriesData(chartCaloriesData);
  }, [differenceCalories, sumCalorie]);

  useEffect(() => {
    const updateProteinChart = [
      {
        name: "Protein left",
        value: +differenceProtein.toFixed(2),
        fill: "#8884d8",
      },
      { name: "Protein taken", value: +sumProtein.toFixed(2), fill: "#82ca9d" },
    ];
    setChartProteinData(updateProteinChart);
  }, [differenceProtein, sumProtein]);

  useEffect(() => {
    const chartCarbsData = [
      {
        name: "Carbs left",
        value: +differenceCarbs.toFixed(2),
        fill: "#BB7341",
      },
      { name: "Carbs taken", value: +sumCarbs.toFixed(2), fill: "#82ca9d" },
    ];
    setChartCarbsData(chartCarbsData);
  }, [differenceCarbs, sumCarbs]);

  return (
    <Container>
      <h2
        style={{
          display: "flex",
          alignitems: "center",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        Track Your Daily Calories
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={autoCompleteOptions.map((value) => value.foodName)}
          loading={optionLoading}
          sx={{ width: 300 }}
          style={{ margin: "0 10px", width: "40%", height: "1rem" }}
          onChange={(e, value) => {
            let foodName;
            autoCompleteOptions.forEach((option) => {
              if (option.foodName === value) {
                foodName = option.food_name;
              }
            });
            clickOptionHandler(foodName);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Food Item"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          )}
          ListboxComponent={(props) => (
            <Box {...props}>
              {optionLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              ) : autoCompleteOptions.length === 0 ? (
                "No options found"
              ) : (
                props.children
              )}
            </Box>
          )}
        />
      </div>

      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "60%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Food Items (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">
                  Protein&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">
                  Serving in grams
                </StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      type="number"
                      value={row.quantity}
                      onChange={(e) => adjustQuantity(index, e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">100g</InputAdornment>
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.weight}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => removeItem(index)}>Remove</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <TableRow>
                <StyledTableCell>
                  <b>Total</b>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {sumCalorie.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {sumFat.toFixed(2)}&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell align="right">
                  {sumCarbs.toFixed(2)}&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell align="right">
                  {sumProtein.toFixed(2)}&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <h3 style={{ marginTop: "2rem" }}>Result:</h3>

      <Grid container spacing={2}>
        {chartData?.map((chart) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Paper>
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    Targeted {chart.label}
                    <b style={{ marginLeft: "8px" }}>{chart.target}g</b>
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    Difference in {chart.label}{" "}
                    <b style={{ marginLeft: "8px" }}>
                      {chart.differenceData.toFixed(2)}g
                    </b>
                  </Typography>
                  <PieChart width={350} height={350}>
                    <Pie
                      dataKey="value"
                      data={chart.chartData}
                      cx={180}
                      cy={150}
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </Paper>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
            color: "white",
            height: "50px",
            width: "200px",
            margin: "20px",
            "&:hover": { background: "black" },
          }}
          onClick={() => navigate(`/viewallrecords`)}
        >
          View All Records
        </Button>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              setVariant("outlined");
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              color: "white",
              height: "50px",
              width: "150px",
              margin: "20px 5px",
              "&:hover": { background: "black" },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={variant}
        >
          <ModalClose />
          <form
            onSubmit={saveTrackedTable}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            Give your meal a name
            <TextField
              required
              autoComplete="off"
              id="outlined-required"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label="Meal name"
              type="String"
              sx={{
                width: "100%",
                margin: "8px",
                color: "white",
                label: { color: "white" },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                sx={{
                  background: "black",
                  color: "white",
                  "&:hover": {
                    background: "black",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </Container>
  );
};

export default ExeprmientFoodApi;
