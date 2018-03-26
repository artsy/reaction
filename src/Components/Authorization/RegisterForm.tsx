import React from "react"

import {
  FormContainer,
  StyledButton,
  StyledFacebookButton,
  StyledInput,
} from "./commonElements"
import { FormComponentType } from "./Types"

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

export default RegisterForm
