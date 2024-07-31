import * as Yup from "yup";
const validationSchema = Yup.object({
  fullName: Yup.string().min(2).max(25).required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password does not match"),
});

export default validationSchema;
