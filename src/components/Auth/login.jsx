import { useFormik } from "formik";
import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "../../images/Google__G__Logo.svg.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useGoogleLogin } from "@react-oauth/google";
import loginValidationSchema from "../schema/loginValidationSchema";
import axiosInstance from "../../utils/axiosInstance";
import { loggedInUser } from "../../features/users/authSlice";
import { useLoginMutation } from "../../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loginUser, { isSuccess, isLoading }] = useLoginMutation();
  const { addToast } = useToasts();

  const DontHaveAccountHandler = () => {
    navigate("/signup");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async ({ email, password }, { resetForm }) => {
      try {
        const { data, error } = await loginUser({
          email,
          password,
        });
        console.log({ data, error, isSuccess });
        if (data?.data) {
          dispatch(loggedInUser({ token: data?.token, user: data?.data }));
          addToast(data?.message, {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
          navigate(location.state?.from || "/");
          resetForm();
        } else if (error?.data) {
          addToast(error.data.message, {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        } else {
          addToast("Network error : Please check your internet connection", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        }
      } catch (error) {
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      }
    },
  });

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    try {
      const { data } = await axiosInstance.post("/users/login", {
        googleAccessToken: tokenResponse.access_token,
      });
      localStorage.setItem("id", data?.data);
      localStorage.setItem("token", data?.token);
      addToast(data?.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      navigate("/");
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      throw error;
    }
  };

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "90%", sm: "80%", md: "60%", lg: "40%" },
        gap: "16px",
        marginTop: "40px",
        marginBottom: "50px",
        padding: "20px",
        minHeight: "75vh",
      }}
    >
      {!isLoading ? (
        <>
          <Typography variant="h5" align="center" sx={{ mt: 4 }}>
            LOGIN
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <TextField
              required
              name="email"
              value={formik.values.email}
              label="Email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ width: "100%", mb: 2 }}
            />
            <TextField
              required
              name="password"
              value={formik.values.password}
              label="Password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ width: "100%", mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Box
                onClick={DontHaveAccountHandler}
                sx={{
                  display: { md: "flex" },
                  cursor: "pointer",
                  marginLeft: "auto",
                }}
              >
                <Typography>Don't have an account?</Typography>
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
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "5rem",
              width: "100%",
              marginBottom: "5rem",
            }}
          >
            <Typography sx={{ marginBottom: "10px" }}>OR</Typography>
            <Button
              sx={{
                width: "100%",
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                margin: "10px",
              }}
              onClick={() => login()}
            >
              <img
                src={GoogleIcon}
                alt="Google"
                style={{ height: "20px", width: "20px", margin: "5px" }}
              />
              Login with Google
            </Button>
          </Box>
        </>
      ) : (
        <CircularProgress sx={{ color: "black" }} />
      )}
    </Container>
  );
};

export default Login;
