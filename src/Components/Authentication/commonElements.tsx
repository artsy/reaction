import React from "react"
import styled from "styled-components"

import Colors from "Assets/Colors"
import { garamond, unica } from "Assets/Fonts"
import Checkbox from "../Checkbox"

export { Footer } from "./Footer"

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

export const SmallTextLink = styled.a`
  color: ${Colors.black30};
  text-decoration: underline;
  cursor: pointer;
  ${unica("s12")};
`

export const SmallText = styled.span`
  margin: 0px;
  color: ${Colors.black30};
  ${unica("s12")};
`

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
