export type Mode = "log_in" | "register" | "forgot_password"

export interface FormField {
  value: string
  error: string
  // dismissed: boolean
}

export interface FormFields {
  name?: FormField
  email?: FormField
  password?: FormField
}

export interface FormProps extends FormFields {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleUpdateInput: (
    key: string
  ) => (event: React.FocusEvent<HTMLInputElement>) => void
  handleChangeMode: (mode: Mode) => (event) => void
}

export type FormComponentType = React.SFC<FormProps>
// Confusing bit here- can't use the type alias format above with a react class?:
// type FormComponentType = React.ComponentClass<FormProps>
//  class LoginForm extends FormComponentType { ... } => ERROR: only refers to a type, but is being used as a value here
