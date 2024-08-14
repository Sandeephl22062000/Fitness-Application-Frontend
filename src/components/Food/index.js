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
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateCalories, priorFoodDetails } from "../../store/food";
import { useToasts } from "react-toast-notifications";
import { useEffect } from "react";
import PriorInfoModal from "./priorData";
import userInputValidation from "../schema/userInputFood";
import { useRequireCaloriesMutation } from "../../api/dietApi";

const UserInput = () => {
  const [requireCalories] = useRequireCaloriesMutation();
  const { addToast } = useToasts();
  const [modalOpen, setModalOpen] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);
  const priorData = useSelector((state) => state?.food?.priorUserDetails);

  const formik = useFormik({
    initialValues: {
      height: "",
      weight: "",
      age: "",
      gender: "",
      activity: "",
    },
    validationSchema: userInputValidation,
    onSubmit: (values, { resetForm }) => {
      requireCalories({
        weight: values.weight,
        height: values.height,
        age: values.age,
        gender: values.gender,
        activity: values.activity,
      });
      resetForm();
      navigate(`/food/calculateCalories`);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(priorFoodDetails(token)).then((result) => {
      setDataAvailable(result.payload);
    });
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {dataAvailable?.data?.length > 0 && (
        <Box sx={{ textAlign: "center", margin: "50px" }}>
          <PriorInfoModal
            open={modalOpen}
            handleClose={closeModal}
            priorDataArray={priorData?.data}
          />
        </Box>
      )}
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
        {/* {!priorData?.data?.length == 0 && ( */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "5rem",
            width: "100%",
            marginBottom: "5rem",
            paddingTop: { xm: "2rem", xs: "4rem" },
          }}
        >
          <Typography>OR</Typography>
          <h4 style={{ textAlign: "center" }}>
            Click here to use your previously submitted data
          </h4>
          <Button
            onClick={openModal}
            sx={{
              color: "white",
              background: "black",
              "&:hover": { background: "black" },
            }}
          >
            Click Here
          </Button>
        </Box>
        {/* )} */}
      </Container>
    </>
  );
};
export default UserInput;
