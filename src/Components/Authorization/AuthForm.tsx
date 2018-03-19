import React from "react"
import styled from "styled-components"
// import colors from "../../Assets/Colors"

import FacebookButton from "../Buttons/Facebook"
import InvertedButton from "../Buttons/Inverted"
import TwitterButton from "../Buttons/Twitter"
import Input from "../Input"

type Mode = "log_in" | "register" | "forgot_password"

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

  validateField = (fieldName: string, value: string) => {
    return {
      name: val => (val.length > 0 ? "" : "Please enter your name"),
      email: val => (val.indexOf("@") > -1 ? "" : "Please enter your email"),
      password: val =>
        val.length > 6 ? "" : "Password must be 6 characters long",
    }[fieldName](value)
  }

  handleUpdateInput(fieldName: string) {
    return event => {
      console.log("here")
      const { value } = event.target
      const error = this.validateField(fieldName, value)
      this.setState((prevState, props) => {
        const { formFields, ...rest } = prevState
        const newFields = { ...formFields, [fieldName]: { value, error } }
        const newState = { ...rest, formFields: newFields }
        console.log(newState)
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

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {}

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

interface FormField {
  value: string
  error: string
}

interface FormFields {
  name?: FormField
  email?: FormField
  password?: FormField
}

interface FormProps extends FormFields {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleUpdateInput: (
    key: string
  ) => (event: React.FocusEvent<HTMLInputElement>) => void
  handleChangeMode: (mode: Mode) => (event) => void
}

type FormComponentType = React.SFC<FormProps> //only refers to a type, but is being used as a value here

/** class components can't extend type like below but I don't think I need a class so...
type FormComponentType = React.Component<FormProps, any> //only refers to a type, but is being used as a value here
class LoginForm extends React.Component<FormProps, any> {
  // public emailInput: React.ReactHTMLElement
  static defaultProps: Partial<FormProps> = {}
  constructor(props) {
    super(props)
  }

  render() {
    const {
      email,
      password,
      handleUpdateInput,
      handleChangeMode,
      handleSubmit,
     } = this.props
*/
const LoginForm: FormComponentType = props => {
  const {
    email,
    password,
    handleChangeMode,
    handleSubmit,
    handleUpdateInput,
  } = props
  return (
    <FormContainer onSubmit={handleSubmit}>
      <StyledFacebookButton>Log in with Facebook</StyledFacebookButton>
      <StyledTwitterButton />
      <StyledInput
        block
        value={email.value}
        placeholder="Email"
        onChange={handleUpdateInput("email")}
        error={email.error.length > 0}
        errorMessage={email.error}
      />
      <StyledInput
        block
        value={password.value}
        type="password"
        placeholder="Password"
        onChange={handleUpdateInput("password")}
        error={password.error.length > 0}
        errorMessage={password.error}
      />
      <p>
        Uh oh I{" "}
        <a onClick={handleChangeMode("forgot_password")} href="#">
          Forgot My Password
        </a>
      </p>
      <InvertedButton>Log In</InvertedButton>
      <p>
        Don't have an account?{" "}
        <a onClick={handleChangeMode("register")} href="#">
          Sign Up
        </a>
      </p>
    </FormContainer>
  )
}

const RegisterForm: FormComponentType = props => {
  const { email, name, password } = props
  return (
    <FormContainer onSubmit={props.handleSubmit}>
      <StyledInput
        block
        value={name.value}
        placeholder="Name"
        error={name.error.length > 0} // will cause field to turn red
        onChange={props.handleUpdateInput("name")}
        errorMessage={name.error} // errorMessage will cause input to fail on form submission
      />
      <StyledInput
        block
        value={email.value}
        placeholder="Email"
        error={email.error.length > 0}
        onChange={props.handleUpdateInput("email")}
      />
      <StyledInput
        block
        value={password.value}
        type="password"
        placeholder="Password"
        error={password.error.length > 0}
        onChange={props.handleUpdateInput("password")}
        errorMessage={password.error}
      />
      <StyledButton type="submit">Sign Up</StyledButton>
      <StyledFacebookButton>Sign Up Using Facebook</StyledFacebookButton>
      <p>
        Already signed up?{" "}
        <a onClick={props.handleChangeMode("log_in")} href="#">
          Log In
        </a>
      </p>
    </FormContainer>
  )
}

const ForgotPasswordForm: FormComponentType = props => {
  const { email } = props
  return (
    <FormContainer>
      We will send it right over 😎
      <StyledInput
        block
        value={email.value}
        error={email.error.length > 0}
        placeholder="Email"
        onBlur={props.handleUpdateInput("email")}
        errorMessage={email.error}
      />
      <StyledButton>Sign Up</StyledButton>
      <p>
        Wait... I remember it after all.{" "}
        {/* <a onClick={props.handleChangeMode("register")} href="#">
          Sign Up{" "}
        </a>
        or{" "} */}
        <a onClick={props.handleChangeMode("log_in")} href="#">
          Log In
        </a>
      </p>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 500px;
  padding: 15px 20px;
`
const buttonWidth = "100%"
const StyledFacebookButton = styled(FacebookButton)`
  width: ${buttonWidth};
  background: #4e65b1;
`
const StyledTwitterButton = styled(TwitterButton)`
  width: ${buttonWidth};
`
const StyledButton = styled(InvertedButton)`
  width: ${buttonWidth};
`

const StyledInput = styled(Input)`
  margin-bottom: 10px;
`

// export default styled(Message)`
//   color: ${colors.graySemibold};
//   width: 100%;
//   text-align: left;
//   padding: 15px 30px;
//   border: 1px solid
//     ${props => (props.error ? colors.redMedium : colors.yellowMedium)};
//   box-shadow: none;
//   font-size: 15px;
//   text-align: center;
//   background-color: ${props =>
//     props.error ? colors.redRegular : colors.yellowRegular};
//   box-sizing: border-box;
// `
