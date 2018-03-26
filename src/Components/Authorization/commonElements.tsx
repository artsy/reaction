import React from "react"
import styled from "styled-components"

import Yup from "yup"
import FacebookButton from "../Buttons/Facebook"
import InvertedButton from "../Buttons/Inverted"
import TwitterButton from "../Buttons/Twitter"
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
  width: 400px;
  height: 500px;
  padding: 15px 20px;
`

const buttonWidth = "100%"

export const StyledFacebookButton = styled(FacebookButton)`
  width: ${buttonWidth};
  background: #4e65b1;
`
export const StyledTwitterButton = styled(TwitterButton)`
  width: ${buttonWidth};
`
export const BlockButton = props => (
  <InvertedButton block>{props.children}</InvertedButton>
)

export const StyledInput = styled(Input)`
  margin-bottom: 10px;
`

export const TOSCheckbox = ({ error, errorMessage, value, ...props }) => (
  <div>
    <Checkbox id="accepted-tos" {...{ error, errorMessage, checked: value }} />
    <label htmlFor="accepted-tos">{props.children}</label>
  </div>
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
