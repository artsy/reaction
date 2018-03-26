import React from "react"

import {
  FormContainer,
  StyledButton,
  StyledInput as Input,
} from "./commonElements"
import { FormComponentType } from "./Types"

const ForgotPasswordForm: FormComponentType = props => {
  const { email } = props
  return (
    <FormContainer>
      We will send it right over 😎
      <Input
        block
        value={email.value}
        error={email.error.length > 0}
        placeholder="Email"
        onBlur={props.handleUpdateInput("email")}
        // errorMessage={email.error}
      />
      <StyledButton>Sign Up</StyledButton>
      <p>
        Go back: {" "}
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

export default ForgotPasswordForm
