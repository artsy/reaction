import * as React from "react"
import styled from "styled-components"

import FacebookButton from "../../../../components/buttons/facebook"
import Button from "../../../../components/buttons/inverted"
import TwitterButton from "../../../../components/buttons/twitter"
import Icon from "../../../../components/icon"
import Input from "../../../../components/input"
import Text from "../../../../components/text"
import TextLink from "../../../../components/text_link"

import colors from "../../../../assets/colors"
import * as fonts from "../../../../assets/fonts"

interface LoginProps extends React.Props<HTMLParagraphElement> {
  form?: {
    url: string,
    csrfToken?: string,
    facebookPath?: string,
    twitterPath?: string,
  },
  onSubmit?: () => void
}

interface LoginState {}

const LoginContainer = styled.div`
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

const StyledOrContainer = styled.div`
  position: relative;
  text-align: center;
`
const StyledOrText = styled.div`
  background-color: white;
  display: inline-block;
  z-index: 100;
  padding: 10px;
  ${fonts.primary.style}
  font-size: 11px;
  &:before {
    content: '';
    position: absolute;
    bottom: 50%;
    left: 0;
    right: 0;
    border-bottom: 1px solid ${colors.grayRegular};
    z-index: -1;
  }
`

class Login extends React.Component<LoginProps, LoginState> {
  render() {
    const form = this.props.form || {url: "/login"}

    return (
      <LoginContainer>
        <Icon name="logotype" color="black" fontSize="30px" />
        <Text textSize="large" align="center">
          Welcome back, please log in <br /> to your account.
        </Text>

        <form action={form.url} method="POST" onSubmit={this.props.onSubmit}>
          <StyledInput name="email" placeholder="Email" autoFocus block />
          <StyledInput name="password" placeholder="Password" type="password" block />

          {form.csrfToken && <input type="hidden" name="_csrf" value={form.csrfToken} />}

          <Button block>Log In</Button>
          <StyledOrContainer>
            <StyledOrText>or</StyledOrText>
          </StyledOrContainer>
          <FacebookButton href={form.facebookPath} block />
          <TwitterButton href={form.twitterPath} block />
        </form>

        <br />

        <Text color={colors.graySemibold} align="center">
          <span>Don't have an account? </span>
          <TextLink color={colors.graySemibold} underline>Sign up</TextLink>.
        </Text>
      </LoginContainer>
    )
  }
}

export default Login
