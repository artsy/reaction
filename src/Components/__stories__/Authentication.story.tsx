import { storiesOf } from "@storybook/react"
import Colors from "Assets/Colors"
import React from "react"
import styled from "styled-components"

import {
  Footer,
  TermsOfServiceCheckbox,
} from "../../Components/Authentication/commonElements"
import { MobileLoginForm } from "../../Components/Authentication/Mobile/LoginForm"
import { MobileResetPasswordForm } from "../../Components/Authentication/Mobile/ResetPasswordForm"
import { MobileSignUpForm } from "../../Components/Authentication/Mobile/SignUpForm"
import { DesktopModal } from "../Authentication/Desktop/Components/DesktopModal"
import { FormSwitcher } from "../Authentication/Desktop/FormSwitcher"
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
  .add("Reset Password", () => (
    <DesktopModal show onClose={close}>
      <FormSwitcher type={ModalType.resetPassword} handleSubmit={submit} />
    </DesktopModal>
  ))
  .add("Sign Up", () => (
    <DesktopModal show onClose={close}>
      <FormSwitcher type={ModalType.signup} handleSubmit={submit} />
    </DesktopModal>
  ))

storiesOf("Components/Authentication/Mobile", module)
  .add("Login", () => (
    <MobileContainer>
      <MobileLoginForm
        values={{}}
        handleSubmit={() => null}
        handleTypeChange={() => mode => null}
      />
    </MobileContainer>
  ))
  .add("Reset Password", () => (
    <MobileContainer>
      <MobileResetPasswordForm
        values={{}}
        handleSubmit={() => null}
        handleTypeChange={() => mode => null}
      />
    </MobileContainer>
  ))
  .add("Sign Up", () => (
    <MobileContainer>
      <MobileSignUpForm
        values={{}}
        handleSubmit={() => null}
        handleTypeChange={() => mode => null}
      />
    </MobileContainer>
  ))

storiesOf("Components/Authentication/Common Elements", module)
  .add("Footer - Signup", () => (
    <div>
      <Footer mode="signup" />
      <br />
      <Footer mode="signup" inline />
    </div>
  ))
  .add("Footer - Login", () => (
    <div>
      <Footer mode="login" />
      <br />
      <Footer mode="login" inline />
    </div>
  ))
  .add("Footer - Reset Password", () => <Footer mode="reset_password" />)
  .add("TermsOfServiceCheckbox", () => (
    <TermsOfServiceCheckbox
      error={null}
      name="accepted_terms_of_service"
      onChange={() => null}
      onBlur={() => null}
      value={false}
    />
  ))

const MobileContainer = styled.div`
  border: 1px solid ${Colors.grayRegular};
  display: flex;
  width: 320px;
  height: 460px;
  margin: 0 auto;
  align-self: center;
  justify-content: center;

  form {
    width: 100%;
  }
`
