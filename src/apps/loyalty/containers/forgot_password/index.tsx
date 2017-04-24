import * as React from "react"
import styled from "styled-components"

import Button from "../../../../components/buttons/inverted"
import Icon from "../../../../components/icon"
import Input from "../../../../components/input"
import Text from "../../../../components/text"
import TextLink from "../../../../components/text_link"

import colors from "../../../../assets/colors"

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

const Message = styled.div`
   color: ${colors.graySemibold};
   width: 100%;
   text-align: left;
   padding: 10px;
   border: 1px solid ${props => colors.yellowRegular};
   box-shadow: none;
   font-size: 15px;
   text-align: center;
   background-color: ${props => colors.yellowMedium};
   box-sizing: border-box;
 `

interface Props {

}

interface State {
  email: string
  error?: string
  showMessage: boolean
  isEmailValid: boolean
}

class ForgotPasswordForm extends React.Component<Props, any> {
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
    })
  }

  onClickSubmitButton(e) {
    // TODO: send reset email, show error message if failed
    this.setState({
      showMessage: true,
    })
  }

  renderSuccessBox() {
    return this.state.showMessage ? (
      <Message>
        Instructions on how to reset your password have been sent to <b>{this.state.email}</b>
      </Message>
    ) : ""
  }

  render() {
    return (
      <Container>
        <Icon name="logotype" color="black" fontSize="30px" />

        <Text textSize="large" align="center">
          Enter the email address associated<br />with your account.
        </Text>

        {this.renderSuccessBox()}

        <StyledInput
          name="email"
          placeholder="Email"
          onChange={this.handleEmailFieldChange.bind(this)}
          autoFocus
          block
        />
        <Button
          onClick={this.onClickSubmitButton.bind(this)}
          disabled={!this.state.isEmailValid}
          block
        >
            Reset Password
        </Button>

        <Text color={colors.graySemibold} align="center">
          <span>Don't have an account? </span>
          <TextLink color={colors.graySemibold} underline>Sign up</TextLink>.
        </Text>
      </Container>
    )
  }
}

export default ForgotPasswordForm

function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}