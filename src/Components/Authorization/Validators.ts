import Yup from "yup"

export const Validators = {
  email: Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email.")
      .required("Please enter a valid email."),
  }),
  name: Yup.object().shape({
    name: Yup.string().required("Name is required"),
  }),
  password: Yup.object().shape({
    password: Yup.string()
      .required("Password required")
      .min(8, "Your password must be at least 8 characters"),
  }),
}
