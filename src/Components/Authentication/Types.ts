import { FormikProps } from "formik"

export type ModalType = "login" | "signup" | "reset_password"

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
  values?: InputValues
  handleSubmit?: SubmitHandler
  handleTypeChange?: (modalType: ModalType) => (event) => void
}

export type FormComponentType = React.SFC<FormProps>
