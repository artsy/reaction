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

/**
 * ModalOptions Description
 *
 * copy: the free string copy of the modal that was triggered.
 *
 * mode: the type of modal to display.
 *
 * redirectUrl: the page path the user is redirected to after successfully
 * login or account creation (skips onboarding).
 *
 * signupIntent: the action taken that prompted user to signup or login.
 *
 * signupReferer: the page before the page on which the sign up was triggered.
 *
 */

export interface ModalOptions {
  copy?: string
  mode?: ModalType
  redirectUrl?: string
  signupIntent?: string
  signupReferer?: string
}

export type FormComponentType = React.SFC<FormProps>
