import { useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import storage from "../../utils/firebase";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useToasts } from "react-toast-notifications";
import profileImage from "../../images/Profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleIcon from "../../images/Google__G__Logo.svg.webp";
import { registerUser, setToken } from "../../store/user";
import { useDispatch } from "react-redux";
import signupValidationSchema from "../schema/schema";
import { useRegisterMutation } from "../../api/authApi";

const Signup = () => {
  const [images, setImages] = useState("");
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const photoupload = (event) => {
    let file = event.target.files[0];
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = addRef(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImages(url);
        });
      }
    );
  };

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    console.log("tokenResponse", tokenResponse);
    const { data } = await axios.post(
      "http://localhost:8000/api/users/register",
      {
        googleAccessToken: tokenResponse.access_token,
      }
    );
    const { token, id } = data;
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    dispatch(setToken(token));
    navigate("/");
    addToast(data?.message, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  };

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values, { resetForm }) => {
      register({
        name: values.fullName,
        email: values.email,
        password: values.password,
        photo: images,
        role: 0,
      });
      dispatch(
        registerUser({
          name: values.fullName,
          email: values.email,
          password: values.password,
          photo: images,
          role: 0,
          addToast,
          navigate,
        })
      );
      resetForm();
    },
  });

  return (
    <>
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        REGISTER AS USER
      </Typography>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ width: "100%" }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            {!images ? (
              <Avatar
                src={profileImage}
                alt="Preview"
                sx={{ width: 150, height: 150 }}
              />
            ) : (
              <Avatar
                src={images}
                alt="Preview"
                sx={{ width: 150, height: 150 }}
              />
            )}
          </Box>
          <TextField
            required
            name="photo"
            type="file"
            onChange={photoupload}
            sx={{ width: "100%", mb: 2 }}
          />
          <TextField
            required
            name="fullName"
            label="Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            sx={{ width: "100%", mb: 2 }}
          />
          <TextField
            required
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ width: "100%", mb: 2 }}
          />
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ width: "100%", mb: 2 }}
          />
          <TextField
            required
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={{ width: "100%", mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box
              onClick={() => {
                navigate("/login");
              }}
              sx={{
                display: { md: "flex" },
                cursor: "pointer",
                marginLeft: "auto",
              }}
            >
              <Typography>Already have an account?</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Button
              type="submit"
              sx={{
                backgroundColor: "red",
                color: "white",
                width: "40%",
                py: 2,
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            mb: 4,
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            OR
          </Typography>
          <Button
            sx={{
              width: "80%",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
            onClick={() => login()}
          >
            <img
              src={GoogleIcon}
              alt="Google"
              style={{ height: 20, width: 20, marginRight: 8 }}
            />
            Signup with Google
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
