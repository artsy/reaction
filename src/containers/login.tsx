import * as React from "react"
import styled from "styled-components"

import FacebookButton from "../components/buttons/facebook"
import Button from "../components/buttons/inverted"
import TwitterButton from "../components/buttons/twitter"
import Icon from "../components/icon"
import Input from "../components/input"
import Text from "../components/text"
import TextLink from "../components/text_link"

interface LoginProps extends React.Props<HTMLParagraphElement> {
  form?: {
    url: string,
    csrfToken?: string,
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

class Login extends React.Component<LoginProps, LoginState> {
  render() {
    const form = this.props.form || {url: "/"}

    return (
      <LoginContainer>
        <Icon name="logotype" color="black" fontSize="30px" />
        <Text textSize="large" align="center">
          Welcome back, please log in <br /> to your account.
        </Text>

        <form action={form.url} method="POST" onSubmit={this.props.onSubmit}>
          <StyledInput name="email" placeholder="Email" block />
          <StyledInput name="password" placeholder="Password" type="password" block />

          {form.csrfToken && <input type="hidden" name="_csrf" value={form.csrfToken} />}

          <Button block>Log In</Button>
          <div style={{textAlign: "center"}}>or</div>
          <FacebookButton block />
          <TwitterButton block />
        </form>

        <br />

        <Text align="center">
          <span>Don't have an account? </span>
          <TextLink underline>Sign Up</TextLink>
        </Text>
      </LoginContainer>
    )
  }
}

export default Login
