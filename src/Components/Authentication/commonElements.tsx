import React, { Fragment } from "react"
import styled from "styled-components"

import Colors from "Assets/Colors"
import { garamond, unica } from "Assets/Fonts"
import Checkbox from "../Checkbox"
import Text from "Components/Text"

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px 30px;
  height: 425px;
`

export const TOSCheckbox = ({ error, name, onChange, value, ...props }) => (
  <StyledCheckbox {...{ checked: value, error, onChange, name }}>
    {props.children}
  </StyledCheckbox>
)

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 5px;
`

export const ChangeMode = styled.a`
  color: ${Colors.grayDark};
  ${garamond("s14")};
`

export const SmallTextLink = styled.a`
  color: ${Colors.grayDark};
  text-decoration: underline;
  cursor: pointer;
  ${unica("s12")};
`

export const SmallText = styled(Text)`
  margin: 0px;
  color: ${Colors.grayDark};
  ${unica("s12")};
`

export const Footer = props => {
  const { onFacebookLogin, handleTypeChange, mode } = props
  switch (mode) {
    case "login": {
      return (
        <Fragment>
          <SmallTextLink onClick={onFacebookLogin}>
            Log in using Facebook
          </SmallTextLink>
          <SmallText>
            {"Don't have an account? "}
            <SmallTextLink onClick={handleTypeChange}>Sign up.</SmallTextLink>
          </SmallText>
        </Fragment>
      )
    }
    case "reset_password": {
      return (
        <Fragment>
          <SmallTextLink onClick={onFacebookLogin}>
            Log in using Facebook
          </SmallTextLink>
          <SmallText>
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <SmallTextLink onClick={handleTypeChange}>
              {mode === "login" ? "Sign up." : "Log in."}
            </SmallTextLink>
          </SmallText>
        </Fragment>
      )
    }
    default: {
      return (
        <Fragment>
          <SmallTextLink onClick={onFacebookLogin}>
            Log in using Facebook
          </SmallTextLink>
          <SmallText>
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <SmallTextLink onClick={handleTypeChange}>
              {mode === "login" ? "Sign up." : "Log in."}
            </SmallTextLink>
          </SmallText>
        </Fragment>
      )
    }
  }
}

export const MobileHeader = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
  margin: 20px 0 0;
  ${garamond("s23")};
  font-weight: bold;
`
