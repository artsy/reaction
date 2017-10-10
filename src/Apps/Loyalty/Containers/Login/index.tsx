import fetch from "isomorphic-fetch"
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
    baseUrl?: string
    url: string
    csrfToken?: string
    forgotPasswordUrl?: string
    facebookPath?: string
    twitterPath?: string
  }
  onSubmit?: () => void
}

interface LoginState {
  email: string
  password: string
  error?: string
}

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

const ErrorMessage = styled.div`
  color: ${colors.graySemibold};
  width: 100%;
  text-align: left;
  padding: 10px 0px;
  border: 1px solid ${colors.redRegular};
  box-shadow: none;
  font-size: 15px;
  text-align: center;
  background-color: rgba(247, 98, 90, 0.2);
`

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
      error: "",
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
      error: "",
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const options: RequestInit = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        _csrf: this.props.form.csrfToken,
      }),
    }

    fetch(this.props.form.url, options)
      .then(res => {
        if (res.status >= 500) {
          throw new Error(`Failed with status ${res.status}`)
        } else if (res.status === 200) {
          window.analytics.track("Successfully logged in")
          this.redirectTo(`${this.props.form.baseUrl}/inquiries`)
        } else {
          this.setState({
            error: "Invalid email or password",
          })
        }
      })
      .catch(err => {
        if (process.env.NODE_ENV !== "test") {
          console.error(err)
        }
        this.setState({
          error: "Internal Error. Please contact support@artsy.net",
        })
      })
  }

  redirectTo(url: string) {
    window.location.assign(url)
  }

  render() {
    const error = this.state.error
    const form = this.props.form
    const forgotPasswordLink = <TextLink href={form.forgotPasswordUrl}>Forgot?</TextLink>

    return (
      <LoginContainer>
        <Icon name="logotype" color="black" fontSize="30px" />
        <Text textSize="large" align="center">
          Welcome back, please log in <br /> to your account.
        </Text>

        {error && <ErrorMessage className="error">{error}</ErrorMessage>}

        <form action={form.url} method="POST" onSubmit={this.onSubmit}>
          <StyledInput
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            autoFocus
            block
          />
          <StyledInput
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            rightView={forgotPasswordLink}
            type="password"
            block
          />

          <Button block>Log In</Button>
          <StyledOrContainer>
            <StyledOrText>or</StyledOrText>
          </StyledOrContainer>
          <FacebookButton href={form.facebookPath} block />
          <TwitterButton href={form.twitterPath} block />
        </form>

        <br />
      </LoginContainer>
    )
  }
}

export default Login
