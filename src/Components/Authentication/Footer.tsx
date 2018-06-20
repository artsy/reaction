import React from "react"
import styled from "styled-components"

import { SmallText, SmallTextLink } from "./commonElements"

interface Props {
  inline?: boolean
}

const FooterContainer = styled.div`
  display: ${(props: Props) => (props.inline ? "inline" : "flex")};
  flex-direction: column;
`

export const Footer = props => {
  const {
    onFacebookLogin,
    onTwitterLogin,
    handleTypeChange,
    mode,
    inline,
  } = props
  switch (mode) {
    case "login": {
      return (
        <FooterContainer inline={inline}>
          <SmallText>
            {"Log in using "}
            <SmallTextLink onClick={onFacebookLogin}>Facebook</SmallTextLink>
            {" or "}
            <SmallTextLink onClick={onTwitterLogin}>Twitter</SmallTextLink>
            {". "}
          </SmallText>

          <SmallText>
            {" Don’t have an account? "}
            <SmallTextLink onClick={() => handleTypeChange("signup")}>
              Sign up.
            </SmallTextLink>
          </SmallText>
        </FooterContainer>
      )
    }
    case "reset_password": {
      return (
        <FooterContainer inline={inline}>
          <SmallText>
            {"Don’t need to reset? "}
            <SmallTextLink onClick={() => handleTypeChange("login")}>
              Log in
            </SmallTextLink>
            {" or "}
            <SmallTextLink onClick={() => handleTypeChange("signup")}>
              sign up.
            </SmallTextLink>
          </SmallText>
        </FooterContainer>
      )
    }
    default: {
      return (
        <FooterContainer inline={inline}>
          <SmallTextLink onClick={onFacebookLogin}>
            Sign up using Facebook.
          </SmallTextLink>
          <SmallText>
            {" Already have an account? "}
            <SmallTextLink onClick={() => handleTypeChange("login")}>
              Log in.
            </SmallTextLink>
          </SmallText>
        </FooterContainer>
      )
    }
  }
}
