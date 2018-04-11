import Yup from "yup"

export const Validators = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .required("Password required")
    .min(8, "Your password must be at least 8 characters"),
  acceptedTermsOfService: Yup.boolean().required(
    "You must agree to our terms to continue."
  ),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
})
