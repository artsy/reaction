import React from "react"
import styled from "styled-components"

import FacebookButton from "../Buttons/Facebook"
import InvertedButton from "../Buttons/Inverted"
import Colors from "../../Assets/Colors"

import Checkbox from "../Checkbox"

// FIXME: Are these being used?
export const inputValidators = {}
export const StyledFacebookButton = FacebookButton

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px 15px;
`

const buttonWidth = "100%"

export const GrayFacebookButton = FacebookButton.extend.attrs({
  color: Colors.grayDark,
})`
  width: ${buttonWidth};
  background: #fff;
  color: ${Colors.grayDark};
  margin-top: 0;
  padding: 0 20px;
  font-size: 12px;

  &:hover:not(:disabled) {
    background: #fff;
  }
`

export const BlockButton = props => (
  <InvertedButton block>{props.children}</InvertedButton>
)

export const TOSCheckbox = ({ error, errorMessage, value, ...props }) => (
  <Checkbox {...{ error, errorMessage, checked: value }}>
    {props.children}
  </Checkbox>
)

interface ModeSelectorProps {
  handleClick: any
}

const ModeSelector: React.SFC<ModeSelectorProps> = props => (
  <a onClick={props.handleClick} href="#">
    {props.children}
  </a>
)

export const ChangeMode = styled(ModeSelector)`
  color: green;
`
