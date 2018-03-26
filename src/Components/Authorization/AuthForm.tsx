import React from "react"

import ForgotPasswordForm from "./ForgotPasswordForm"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { FormComponentType, FormFields, Mode } from "./Types"

type InputValidator = (val: string) => string

interface Props extends React.HTMLProps<HTMLDivElement> {
  mode: Mode
  signupIntent?: string
  destination?: string
  formFields?: FormFields
}

interface State extends React.HTMLProps<HTMLDivElement> {
  mode?: Mode
  formFields: FormFields
}

class AuthForm extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    signupIntent: "sign_up",
    destination: "/personalize", // ?
    formFields: {
      email: { value: "", error: "" },
      name: { value: "", error: "" },
      password: { value: "", error: "" },
    },
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      mode: this.props.mode,
      formFields: this.props.formFields,
    }
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleChangeMode = this.handleChangeMode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validators = {
    name: val => (val.length > 0 ? "" : "Please enter your name"),
    email: val => (val.indexOf("@") > -1 ? "" : "Please enter your email"),
    password: val =>
      val.length > 6 ? "" : "Password must be 6 characters long",
  }

  validateField = (fieldName: string, value: string) => {
    const validator: InputValidator = this.validators[fieldName] || (() => "")
    return validator(value)
  }

  handleUpdateInput(fieldName: string) {
    return event => {
      const { value } = event.target
      const error = this.validateField(fieldName, value)
      this.setState((prevState, props) => {
        const { formFields, ...rest } = prevState
        const newFields = { ...formFields, [fieldName]: { value, error } }
        const newState = { ...rest, formFields: newFields }
        return newState
      })
    }
  }

  handleChangeMode(newMode: Mode) {
    return event => {
      event.preventDefault()
      this.setState({ mode: newMode })
    }
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    return true
  }

  render() {
    const { formFields } = this.state
    let Form: FormComponentType
    switch (this.state.mode) {
      case "log_in":
        Form = LoginForm
        break
      case "register":
        Form = RegisterForm
        break
      case "forgot_password":
        Form = ForgotPasswordForm
        break
      default:
        throw new Error(`${this.state.mode} mode needs a component`)
    }
    return (
      <div>
        <Form
          {...formFields}
          handleUpdateInput={this.handleUpdateInput}
          handleChangeMode={this.handleChangeMode}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default AuthForm
