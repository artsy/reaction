import { storiesOf } from "@storybook/react"
import React from "react"

import AuthForm from "../Authorization/AuthForm"

const submit = (values, actions) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 1))
    actions.setSubmitting(false)
  }, 1000)
}

storiesOf("Components/Authorization", module)
  .add("Login Mode", () => <AuthForm mode="log_in" handleSubmit={submit} />)
  .add("Forgot Password", () => (
    <AuthForm mode="forgot_password" handleSubmit={submit} />
  ))
  .add("Register Mode", () => (
    <AuthForm mode="register" handleSubmit={submit} />
  ))
