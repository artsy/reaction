import React from "react"
import * as request from "request"
import styled from "styled-components"
import InvertedButton from "../buttons/inverted"
import { borderedInput } from "../mixins"
import Fonts from "./fonts"

interface EmailSignupProps {
  signupUrl: string
}
interface EmailSignupState {
  value: string
  error: any
  submitted: boolean
}

class EmailSignup extends React.Component<EmailSignupProps, EmailSignupState> {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      error: null,
      submitted: false,
    }
  }

  onClick = () => {
    request.post(
      {
        uri: this.props.signupUrl,
        email: this.state.value,
      },
      (err, response, body) => {
        if (err) {
          this.setState({ error: err })
        }
        this.setState({ error: null, submitted: true })
      }
    )
  }

  onInputChange = e => {
    this.setState({ value: e.target.value, error: null })
  }

  render() {
    return (
      <EmailSignupContainer>
        <Title>Stay up to date with Artsy Editorial</Title>
        <Form>
          <Input
            type="email"
            placeholder="Enter Your Email..."
            onChange={this.onInputChange}
            value={this.state.value}
          />
          <StyledButton onClick={this.onClick}>Subscribe</StyledButton>
        </Form>
      </EmailSignupContainer>
    )
  }
}

const EmailSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
  width: 100%
`
const Title = styled.div`
  ${Fonts.unica("s19", "medium")}
  margin-bottom: 10px;
`
const Input = styled.input`
  ${borderedInput}
  width: 100%;
  border-width: 1px;
`
const StyledButton = InvertedButton.extend`
  border-radius: 2px;
  height: 30px;
  width: 80px;
  margin-left: -100px;
  ${Fonts.avantgarde("s11")}
`
const Form = styled.div`
  display: flex;
`

export default EmailSignup
