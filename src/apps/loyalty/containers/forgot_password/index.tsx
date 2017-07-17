import fetch from "isomorphic-fetch"
import * as React from "react"
import styled from "styled-components"

import Button from "../../../../components/buttons/inverted"
import Icon from "../../../../components/icon"
import Input from "../../../../components/input"
import Message from "../../../../components/message"
import Text from "../../../../components/text"

const Container = styled.div`
  padding: 20px;
  max-width: 350px;
  margin: 0 auto;
  align-text: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const StyledInput = styled(Input)`
  margin: 5px 0;
  width: 100%;
`

interface Props {
  submitEmailUrl: string
  appToken: string
}

interface State {
  email: string
  error?: boolean
  showMessage: boolean
  isEmailValid: boolean
}

class ForgotPasswordForm extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      showMessage: false,
      isEmailValid: false,
    }
  }

  handleEmailFieldChange(e) {
    const value = e.target.value

    this.setState({
      email: value,
      isEmailValid: validateEmail(value),
      showMessage: false,
    })
  }

  onClickSubmitButton(e) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XAPP-TOKEN": this.props.appToken,
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    }

    return fetch(this.props.submitEmailUrl, options).then(res => {
      if (res.status === 201) {
        this.setState({
          showMessage: true,
          error: false,
        })
      } else if (res.status === 400) {
        // Email Not Found
        this.setState({
          showMessage: true,
          error: true,
        })
      }
    })
  }

  renderMessageBox() {
    const message = this.state.error
      ? <span>No account exists for <b>{this.state.email}</b></span>
      : <span>Instructions on how to reset your password have been sent to <b>{this.state.email}</b></span>

    return this.state.showMessage
      ? <Message error={!!this.state.error}>
          {message}
        </Message>
      : ""
  }

  render() {
    return (
      <Container>
        <Icon name="logotype" color="black" fontSize="30px" />

        <Text textSize="large" align="center">
          Enter the email address associated<br />with your account.
        </Text>

        <div className="message-box">
          {this.renderMessageBox()}
        </div>

        <StyledInput
          name="email"
          placeholder="Email"
          onChange={this.handleEmailFieldChange.bind(this)}
          value={this.state.email}
          autoFocus
          block
        />
        <Button onClick={this.onClickSubmitButton.bind(this)} disabled={!this.state.isEmailValid} block>
          Reset Password
        </Button>
      </Container>
    )
  }
}

export default ForgotPasswordForm

function validateEmail(email) {
  return /^\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
