import * as React from "react"
import styled from "styled-components"

import FacebookButton from "../components/buttons/facebook"
import Button from "../components/buttons/inverted"
import TwitterButton from "../components/buttons/twitter"
import Icon from "../components/icon"
import Input from "../components/input"
import Title from "../components/title"

interface LoginProps extends React.Props<HTMLDivElement> {
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

const StyledInput = styled(Input)`margin: 5px 0`

class Login extends React.Component<LoginProps, LoginState> {
  render() {
    return (
      <LoginContainer>
        <Icon name="logotype" color="black" fontSize="30px" />
        <Title titleSize="small" style={{ textAlign: "center" }}>Welcome back, please log in to your account.</Title>

        <StyledInput placeholder="Email" block />
        <StyledInput placeholder="Password" type="password" block />

        <Button block>Log In</Button>
        
        <FacebookButton block />
        <TwitterButton block />
      </LoginContainer>
    )
  }
}

export default Login

