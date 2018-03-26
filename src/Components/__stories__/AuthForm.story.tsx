import { storiesOf } from "@storybook/react"
import React from "react"

import AuthForm from "../Authorization/AuthForm"

storiesOf("Components/Authorization", module)
  .add("Login Mode", () => (
    <AuthForm mode="log_in" handleSubmit={() => alert("submitting!")} />
  ))
  .add("Forgot Password", () => (
    <AuthForm
      mode="forgot_password"
      handleSubmit={() => alert("submitting!")}
    />
  ))
  .add("Register Mode", () => (
    <AuthForm mode="register" handleSubmit={() => alert("submitting!")} />
  ))
