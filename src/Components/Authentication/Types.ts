import { FormikProps } from "formik"

export enum ModalType {
  login = "login",
  signup = "signup",
  forgot = "forgot",
}

export interface InputValues {
  name?: string
  email?: string
  password?: string
  accepted_terms_of_service?: boolean
}

export type SubmitHandler = (
  values: InputValues,
  formikBag: FormikProps<InputValues>
) => void

export interface FormProps {
  /**
   * any global error that comes from an external data source
   * (e.g. server)
   */
  contextModule?: string
  error?: string
  values?: InputValues
  handleSubmit?: SubmitHandler
  handleTypeChange?: (modalType: ModalType) => void
  intent?: string
  onFacebookLogin?: (e: Event) => void
  onTwitterLogin?: (e: Event) => void
  onBackButtonClicked?: (e: Event) => void
}

interface AfterSignUpAction {
  action: "save" | "follow" | "editorialSignup"
  objectId?: string
  kind?: "artist" | "artworks" | "gene" | "profile" | "show"
}

export interface ModalOptions {
  /**
   * the subtitle of the form
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
  intent?: string
  /**
   * the page before the page on which the sign up was triggered.
   */
  signupReferer?: string
  /**
   * defines an action to take after the user successfully signs up
   *
   * @example
   * {
   *   action: 'save',
   *   objectId: artwork.id
   * }
   */
  afterSignUpAction?: AfterSignUpAction
  /*
   * the location where the modal was triggered.
   */
  contextModule?: string
  /**
   * the type of action that triggered the modal (eg: click, timed)
   */
  trigger?: string
  /**
   * the number of seconds before a modal was triggered
   */
  triggerSeconds?: number
}

export type FormComponentType =
  | React.SFC<FormProps>
  | React.ComponentClass<FormProps>
