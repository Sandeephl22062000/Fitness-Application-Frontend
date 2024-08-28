import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import userInputValidation from "../schema/userInputFood";
import {
  usePreviousDataMutation,
  useRequireCaloriesMutation,
} from "../../api/dietApi";

const UserInput = () => {
  const [requireCalories, { data, isSuccess, isLoading }] =
    useRequireCaloriesMutation();
  const [previousData, { data: previouslyAddedData }] =
    usePreviousDataMutation();
  const navigate = useNavigate();
  const previousDataArray =
    previouslyAddedData?.data[previouslyAddedData?.data.length - 1];

  const formik = useFormik({
    initialValues: {
      height: "",
      weight: "",
      age: "",
      gender: "",
      activity: "",
    },
    validationSchema: userInputValidation,
    onSubmit: async (values, { resetForm }) => {
      const data = await requireCalories({
        weight: values.weight,
        height: values.height,
        age: values.age,
        gender: values.gender,
        activity: values.activity,
      });
    },
  });

  useEffect(() => {
    formik.setValues({
      height: previousDataArray?.height || "",
      weight: previousDataArray?.weight || "",
      age: previousDataArray?.age || "",
      gender: previousDataArray?.gender || "",
      activity: previousDataArray?.activity || "",
    });
  }, [previousDataArray]);

  useEffect(() => {
    window.scrollTo(0, 0);
    previousData();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/food/calculateCalories/${data?.data}`);
      formik.setValues({
        height: "",
        weight: "",
        age: "",
        gender: "",
        activity: "",
      });
    }
  }, [isSuccess]);

  return (
    <>
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Provide your details to calculate your Calories requirement
      </Typography>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ width: "100%" }}
        >
          <TextField
            required
            id="outlined-required"
            name="height"
            value={formik.values.height}
            label="Height in cm"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.height && Boolean(formik.errors.height)}
            helperText={formik.touched.height && formik.errors.height}
            sx={{ width: "100%", margin: "8px" }}
          />
          <TextField
            required
            id="outlined-disabled"
            name="weight"
            value={formik.values.weight}
            label="Weight in kg"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
            sx={{ width: "100%", margin: "8px" }}
          />
          <TextField
            required
            id="outlined-disabled"
            name="age"
            value={formik.values.age}
            label="Age"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
            sx={{ width: "100%", margin: "8px" }}
          />
          <FormControl sx={{ width: "100%", margin: "8px" }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              name="gender"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.gender}
              label="Gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%", margin: "8px" }}>
            <InputLabel id="demo-simple-select-label">Activity</InputLabel>
            <Select
              name="activity"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.activity}
              label="Activity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.activity && Boolean(formik.errors.activity)}
              helperText={formik.touched.activity && formik.errors.activity}
            >
              <MenuItem value="Sedentary">
                Sedentary: little or no Exercise
              </MenuItem>
              <MenuItem value="Light">Light: exercise 1-3 times/week</MenuItem>
              <MenuItem value="Moderate">
                Moderate: exercise 4-5 times/week
              </MenuItem>
              <MenuItem value="VeryActive">
                Very Active: exercise 6-7 times/week
              </MenuItem>
              <MenuItem value="ExtraActive">
                Extra Active: very intense exercise daily, or physical job
              </MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "red",
                "&:hover": { background: "red" },
                width: "120px",
                height: "40px",
                fontSize: "15px",
                marginTop: "10px",
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};
export default UserInput;
