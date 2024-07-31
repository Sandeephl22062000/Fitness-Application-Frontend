import * as yup from "yup";

const userInputValidation = yup.object().shape({
  height: yup.number().required("Height is required"),
  weight: yup.number().required("Weight is required"),
  age: yup.number().required("Age is required"),
  gender: yup.string().required("Gender is required"),
  activity: yup.string().required("Activity is required"),
});

export default userInputValidation;
