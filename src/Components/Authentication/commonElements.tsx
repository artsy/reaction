import React from "react"
import styled from "styled-components"

import Colors from "Assets/Colors"
import { growAndFadeIn } from "Assets/Animations"
import { garamond, unica } from "Assets/Fonts"
import Checkbox from "../Checkbox"
import Text from "../Text"

export { Footer } from "./Footer"

interface FormProps {
  height?: number
}

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: ${(props: FormProps) =>
    props.height ? props.height + "px" : "auto"};
`

export const TOSCheckbox = ({ error, name, onChange, value, ...props }) => (
  <StyledCheckbox {...{ checked: value, error, onChange, name }}>
    {props.children}
  </StyledCheckbox>
)

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 5px;
  align-items: flex-start;
`

export const TOSText = styled(Text)`
  margin: 0 0 0 5px;
`

export const SmallTextLink = styled.a`
  color: ${Colors.black30};
  text-decoration: underline;
  cursor: pointer;
  ${unica("s12")};
`

export const SmallText = styled.span`
  margin: 0;
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

export const Error = styled.div.attrs<{ show: boolean }>({})`
  ${unica("s12")};
  margin-top: ${p => (p.show ? "10px" : "0")};
  margin-bottom: 10px;
  color: ${Colors.redMedium};
  visibility: ${p => (p.show ? "visible" : "hidden")};
  transition: visibility 0.2s linear;
  animation: ${p => p.show && growAndFadeIn("16px")} 0.25s linear;
  height: ${p => (p.show ? "16px" : "0")};
`
