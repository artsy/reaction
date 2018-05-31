import React from "react"
import styled from "styled-components"

import FacebookButton from "../Buttons/Facebook"
import Colors from "Assets/Colors"
import { garamond } from "Assets/Fonts"
import Checkbox from "../Checkbox"

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px 30px;
  height: 425px;
`

const buttonWidth = "100%"

export const GrayFacebookButton = FacebookButton.extend.attrs({
  color: Colors.grayDark,
})`
  width: ${buttonWidth};
  background: #fff;
  color: ${Colors.grayDark};
  margin-top: 0;
  font-size: 12px;

  div {
    margin: 0px;
  }

  span {
    margin-left: 5px;
  }

  &:hover:not(:disabled) {
    background: #fff;
  }
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
