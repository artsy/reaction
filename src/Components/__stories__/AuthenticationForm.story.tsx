import { storiesOf } from "@storybook/react"
import React from "react"

import { FormSwitcher } from "../Authentication/Desktop/FormSwitcher"
import { DesktopModal } from "../Authentication/Desktop/Components/DesktopModal"
import { ModalType } from "../Authentication/Types"

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
  .add("Login", () => (
    <DesktopModal show onClose={close}>
      <FormSwitcher type={ModalType.login} handleSubmit={submit} />
    </DesktopModal>
  ))
  .add("Forgot Password", () => (
    <DesktopModal show onClose={close}>
      <FormSwitcher type={ModalType.resetPassword} handleSubmit={submit} />
    </DesktopModal>
  ))
  .add("Sign Up", () => (
    <DesktopModal show onClose={close}>
      <FormSwitcher type={ModalType.signup} handleSubmit={submit} />
    </DesktopModal>
  ))
