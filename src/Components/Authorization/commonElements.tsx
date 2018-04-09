import React from "react"
import styled from "styled-components"

import Yup from "yup"
import FacebookButton from "../Buttons/Facebook"
import InvertedButton from "../Buttons/Inverted"
import Colors from "../../Assets/Colors"

import Checkbox from "../Checkbox"
import Input from "../Input"

export const inputValidators = {
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .required("Password required")
    .min(8, "Your password must be at least 8 characters"),
  acceptedTermsOfService: Yup.boolean().required(
    "You must agree to our terms to continue."
  ),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
}

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
  font-size: 12px;

  &:hover:not(:disabled) {
    background: #fff;
  }
`

export const BlockButton = props => (
  <InvertedButton block>{props.children}</InvertedButton>
)

export const StyledInput = styled(Input)`
  margin-bottom: 10px;
`

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
