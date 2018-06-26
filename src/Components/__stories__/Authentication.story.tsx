import { storiesOf } from "@storybook/react"
import Colors from "Assets/Colors"
import React from "react"
import styled from "styled-components"

import {
  Footer,
  TermsOfServiceCheckbox,
} from "../Authentication/commonElements"
import { DesktopModal } from "../Authentication/Desktop/Components/DesktopModal"
import { FormSwitcher } from "../Authentication/FormSwitcher"
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
      <FormSwitcher type={ModalType.login} handleSubmit={submit} options={{}} />
    </DesktopModal>
  ))
  .add("Forgot Password", () => (
    <DesktopModal show onClose={close}>
      <FormSwitcher
        type={ModalType.forgot}
        handleSubmit={submit}
        options={{}}
      />
    </DesktopModal>
  ))
  .add("Sign Up", () => (
    <DesktopModal show onClose={close}>
      <FormSwitcher
        type={ModalType.signup}
        handleSubmit={submit}
        options={{}}
      />
    </DesktopModal>
  ))

storiesOf("Components/Authentication/Mobile", module)
  .add("Login", () => (
    <MobileContainer>
      <FormSwitcher
        type={ModalType.login}
        handleSubmit={submit}
        isMobile
        options={{}}
      />
    </MobileContainer>
  ))
  .add("Forgot Password", () => (
    <MobileContainer>
      <FormSwitcher
        type={ModalType.forgot}
        handleSubmit={submit}
        isMobile
        options={{}}
      />
    </MobileContainer>
  ))
  .add("Sign Up", () => (
    <MobileContainer>
      <FormSwitcher
        type={ModalType.signup}
        handleSubmit={submit}
        isMobile
        options={{}}
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
  .add("Footer - Forgot Password", () => <Footer mode="forgot" />)
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
