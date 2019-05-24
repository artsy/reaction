import { storiesOf } from "@storybook/react"
import Colors from "Assets/Colors"
import React, { Component, Fragment } from "react"
import styled from "styled-components"
import Button from "../Buttons/Default"

import {
  Footer,
  TermsOfServiceCheckbox,
} from "../Authentication/commonElements"
import { ModalManager } from "../Authentication/Desktop/ModalManager"
import { FormSwitcher } from "../Authentication/FormSwitcher"
import { ModalType } from "../Authentication/Types"

const submit = (values, actions) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 1))
    actions.setSubmitting(false)
  }, 1000)
}

const boundedSubmit = (type, options, values, actions) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 1))
    actions.setSubmitting(false)
  }, 1000)
}

class ModalContainer extends Component<any> {
  private manager: ModalManager | null

  componentDidMount() {
    setTimeout(this.onClick, 500)
  }

  onClick = () => {
    this.manager.openModal(this.props.options)
  }

  render() {
    return (
      <Fragment>
        <Button onClick={this.onClick}>Open Modal</Button>
        <ModalManager
          ref={ref => (this.manager = ref)}
          submitUrls={{
            login: "/login",
            signup: "/signup",
            forgot: "/forgot",
          }}
          handleSubmit={boundedSubmit}
        />
      </Fragment>
    )
  }
}

storiesOf("Components/Authentication/Desktop", module)
  .add("Login", () => <ModalContainer options={{ mode: ModalType.login }} />)
  .add("Forgot Password", () => (
    <ModalContainer options={{ mode: ModalType.forgot }} />
  ))
  .add("Sign Up", () => <ModalContainer options={{ mode: ModalType.signup }} />)

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
      <Footer mode={"signup" as ModalType} />
      <br />
      <Footer mode={"signup" as ModalType} inline />
    </div>
  ))
  .add("Footer - Login", () => (
    <div>
      <Footer mode={"login" as ModalType} />
      <br />
      <Footer mode={"login" as ModalType} inline />
    </div>
  ))
  .add("Footer - Forgot Password", () => (
    <Footer mode={"forgot" as ModalType} />
  ))
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
