import { FormikProps } from "formik"

export type Mode = "log_in" | "register" | "forgot_password"

export interface InputValues {
  name?: string
  email?: string
  password?: string
  acceptedTermsOfService?: boolean
}

export type SubmitHandler = (
  values: InputValues,
  formikBag: FormikProps<InputValues>
) => void
export interface FormProps {
  values: InputValues
  handleSubmit: SubmitHandler
  handleChangeMode: (mode: Mode) => (event) => void
}

export type FormComponentType = React.SFC<FormProps>
