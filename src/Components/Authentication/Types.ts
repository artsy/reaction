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
  onFacebookLogin?: (e: Event) => void
  onTwitterLogin?: (e: Event) => void
}

export interface ModalOptions {
  /**
   * the free string copy of the modal that was triggered.
   */
  copy?: string
  /**
   * the type of modal to display.
   */
  mode?: ModalType
  /**
   * the page path the user is redirected to after successfully
   * login or account creation after onboarding.
   */
  destination?: string
  /**
   * the page path the user is redirected to after successfully
   * login or account creation (skips onboarding).
   */
  redirectTo?: string
  /**
   * the action taken that prompted user to signup or login.
   */
  signupIntent?: string
  /**
   * the page before the page on which the sign up was triggered.
   */
  signupReferer?: string
  /**
   * url path to redirect the user after onboarding
   */
  destination?: string
  /**
   * defines an action to take after the user successfully signs up
   *
   * @example
   * {
   *   action: 'save',
   *   objectId: artwork.id
   * }
   */
  afterSignUpAction?: string
}

export type FormComponentType = React.SFC<FormProps>
