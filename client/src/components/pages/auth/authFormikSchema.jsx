import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
  .min(6, "Password too short").required("Required")
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, "Username too short").required('Required'),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
  .min(6, "Password too short").required("Required")
});
