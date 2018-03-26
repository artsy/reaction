import React from "react"

import {
  FormContainer,
  StyledButton,
  StyledFacebookButton,
  StyledInput,
  StyledTwitterButton,
} from "./commonElements"
import { FormComponentType } from "./Types"

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
      <StyledButton>Log In</StyledButton>
      <p>
        Don't have an account?{" "}
        <a onClick={handleChangeMode("register")} href="#">
          Sign Up
        </a>
      </p>
    </FormContainer>
  )
}

export default LoginForm
