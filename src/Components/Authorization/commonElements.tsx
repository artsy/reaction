import React from "react"
import styled from "styled-components"

import FacebookButton from "../Buttons/Facebook"
import InvertedButton from "../Buttons/Inverted"
import TwitterButton from "../Buttons/Twitter"
import Input from "../Input"

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
