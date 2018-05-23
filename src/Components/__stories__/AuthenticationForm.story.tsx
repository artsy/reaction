import { storiesOf } from "@storybook/react"
import React from "react"

import { AuthenticationForm } from "../Authentication/AuthenticationForm"
import { DesktopModal } from "../Authentication/DesktopModal"

const submit = (values, actions) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 1))
    actions.setSubmitting(false)
  }, 1000)
}

const close = () => {
  return
}

storiesOf("Components/Authentication/Desktop", module)
  .add("Login Mode", () => (
    <DesktopModal show onClose={close}>
      <AuthenticationForm type="login" handleSubmit={submit} />
    </DesktopModal>
  ))
  .add("Forgot Password", () => (
    <DesktopModal show onClose={close}>
      <AuthenticationForm type="reset_password" handleSubmit={submit} />
    </DesktopModal>
  ))
  .add("Register Mode", () => (
    <DesktopModal show onClose={close}>
      <AuthenticationForm type="signup" handleSubmit={submit} />
    </DesktopModal>
  ))
