import React from "react"
import styled, { StyledFunction } from "styled-components"
import request from "superagent"
import Colors from "../../../Assets/Colors"
import { track } from "../../../Utils/track"
import InvertedButton from "../../Buttons/Inverted"
import { borderedInput } from "../../Mixins"
import { EMAIL_REGEX } from "../Constants"
import { Fonts } from "../Fonts"

interface EmailPanelProps {
  signupUrl: string
  tracking?: any
}

interface EmailPanelState {
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

@track()
export class EmailPanel extends React.Component<
  EmailPanelProps,
  EmailPanelState
> {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      error: false,
      submitted: false,
      disabled: false,
      message: "",
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState({ disabled: true })
    if (this.state.value.match(EMAIL_REGEX)) {
      request
        .post(this.props.signupUrl)
        .send({ email: this.state.value })
        .set("accept", "json")
        .end((err, res) => {
          if (err) {
            this.flashMessage("Error. Please try again", true, false)
          } else {
            this.flashMessage("Thank you!", false, true)
            this.props.tracking.trackEvent({
              action: "Click",
              label: "Editorial signup",
            })
          }
        })
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
        <EmailPanelContainer>
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
            <StyledButton disabled={this.state.disabled} onClick={this.onClick}>
              Subscribe
            </StyledButton>
          </Form>
        </EmailPanelContainer>
      )
    }
  }
}

const input: StyledFunction<InputProps & React.HTMLProps<HTMLInputElement>> =
  styled.input
const Input = input`
  ${borderedInput}
  width: 100%;
  border-width: 1px;
  color: ${props => (props.isError ? Colors.redMedium : "black")};
  ${props => (props.isReadOnly ? Fonts.unica("s16") : "")}
`
const EmailPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  width: 100%;
`
const Title = styled.div`
  ${Fonts.unica("s16", "medium")} margin-bottom: 10px;
`
const StyledButton = InvertedButton.extend`
  border-radius: 2px;
  height: 30px;
  width: 80px;
  margin-left: -100px;
  ${Fonts.avantgarde("s11")};
`
const Form = styled.div`
  display: flex;
`
