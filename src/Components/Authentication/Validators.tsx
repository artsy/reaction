import Yup from "yup"

const email = Yup.string()
  .email("Please enter a valid email.")
  .required("Please enter a valid email.")

const name = Yup.string().required("Name is required")

const acceptedTermsOfService = Yup.boolean()
  .required("You must agree to our terms to continue.")
  .oneOf([true])

export const RegisterValidator = Yup.object().shape({
  name,
  email,
  password: Yup.string()
    .required("Password required")
    .min(8, "Your password must be at least 8 characters"),
  acceptedTermsOfService,
})

export const ResetPasswordValidator = Yup.object().shape({ email })

export const LoginValidator = Yup.object().shape({
  email,
  password: Yup.string().required("Password required"),
})

export const MobileRegisterValidator = Yup.object().shape({
  email,
  name,
  password: Yup.string()
    .required("Password required")
    .min(8, "Your password must be at least 8 characters"),
  acceptedTermsOfService,
})
