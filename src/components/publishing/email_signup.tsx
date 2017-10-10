import React from "react"
import * as request from "request"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../assets/colors"
import InvertedButton from "../buttons/inverted"
import { borderedInput } from "../mixins"
import { emailRegex } from "./constants"
import Fonts from "./fonts"

interface EmailSignupProps {
  signupUrl: string
}

interface EmailSignupState {
  value: string
  error: boolean
  submitted: boolean
  disabled: boolean
  message: string
}

interface InputProps {
  isError: boolean
  isReadOnly: boolean
}

class EmailSignup extends React.Component<EmailSignupProps, EmailSignupState> {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      error: false,
      submitted: false,
      disabled: false,
      message: "",
    }
  }

  onClick = () => {
    this.setState({ disabled: true })
    if (this.state.value.match(emailRegex)) {
      request.post(
        {
          uri: this.props.signupUrl,
          body: { email: this.state.value },
          json: true,
        },
        err => {
          if (err) {
            this.flashMessage("Error. Please try again", true, false)
          } else {
            this.flashMessage("Thank you!", false, true)
          }
        }
      )
    } else {
      this.flashMessage("Invalid Email... Please try again", true, false)
    }
  }

  flashMessage = (message, error, submitted) => {
    this.setState({ message, error })
    setTimeout(() => {
      this.setState({ message: "", disabled: false, error: false, submitted })
    }, 2000)
  }

  onInputChange = e => {
    this.setState({ value: e.target.value, error: null })
  }

  render() {
    if (this.state.submitted) {
      return <div />
    } else {
      return (
        <EmailSignupContainer>
          <Title>Stay up to date with Artsy Editorial</Title>
          <Form>
            <Input
              type="email"
              placeholder="Enter Your Email..."
              onChange={this.onInputChange}
              value={this.state.message || this.state.value}
              readOnly={this.state.message.length > 0}
              isError={this.state.error}
              isReadOnly={this.state.message.length > 0}
            />
            <StyledButton disabled={this.state.disabled} onClick={this.onClick}>Subscribe</StyledButton>
          </Form>
        </EmailSignupContainer>
      )
    }
  }
}

const input: StyledFunction<InputProps & React.HTMLProps<HTMLInputElement>> = styled.input
const Input = input`
  ${borderedInput}
  width: 100%;
  border-width: 1px;
  color: ${props => (props.isError ? Colors.redMedium : "black")};
  ${props => (props.isReadOnly ? Fonts.unica("s16") : "")}
`
const EmailSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  width: 100%;
  margin-bottom: 40px;
`
const Title = styled.div`
  ${Fonts.unica("s19", "medium")}
  margin-bottom: 10px;
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
