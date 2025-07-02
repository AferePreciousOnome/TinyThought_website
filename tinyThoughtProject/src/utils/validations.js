import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const journalSchema = Yup.object().shape({
  content: Yup.string()
    .min(10, "Entry is too short")
    .required("Please write something about your day"),
});
