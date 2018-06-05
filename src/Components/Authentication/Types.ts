import { FormikProps } from "formik"

export enum ModalType {
  login = "login",
  signup = "signup",
  resetPassword = "reset_password",
}

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
  handleTypeChange?: (modalType: ModalType) => void
}

export interface ModalOptions {
  copy?: string
  signupIntent?: string
  redirectUrl?: string
  mode?: ModalType
  signupReferer?: string
}

export type FormComponentType = React.SFC<FormProps>
