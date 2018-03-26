export type Mode = "log_in" | "register" | "forgot_password"

export interface FormField {
  value: string
  error: string
  // dismissed: boolean
}

export interface InputValues {
  name?: string
  email?: string
  password?: string
  acceptedTermsOfService?: string
}
export interface InputErrors extends InputValues {}

export interface FormikFormProps {
  values: InputValues
  errors: InputErrors
  handleSubmit: any
  handleChangeMode: (mode: Mode) => (event) => void
}

export type FormComponentType = React.SFC<FormikFormProps>
// Confusing bit here- can't use the type alias format above with a react class?:
// type FormComponentType = React.ComponentClass<FormProps>
//  class LoginForm extends FormComponentType { ... } => ERROR: only refers to a type, but is being used as a value here
