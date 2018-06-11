// @ts-ignore
import React from "react"
import styled from "styled-components"
import Colors from "Assets/Colors"
import { growAndFadeIn } from "Assets/Animations"
import { garamond, unica } from "Assets/Fonts"
export { Footer } from "./Footer"
export { TermsOfServiceCheckbox } from "./TermsOfServiceCheckbox"

interface FormProps {
  height?: number
}

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: ${(p: FormProps) => (p.height ? p.height + "px" : "auto")};
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
  margin-top: ${p => (p.show ? "auto" : "0")};
  margin-bottom: 10px;
  color: ${Colors.redMedium};
  visibility: ${p => (p.show ? "visible" : "hidden")};
  transition: visibility 0.2s linear;
  animation: ${p => p.show && growAndFadeIn("16px")} 0.25s linear;
  height: ${p => (p.show ? "16px" : "0")};
`

export const MobileInnerWrapper = styled.div`
  position: relative;
  margin: 0 20px;
`

export const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: stretch;
  width: 100%;
  min-width: 260px;
`

export const BackButton = styled.div`
  display: flex;
  justify-self: start;
  align-self: center;
  position: absolute;
  left: -9px;
  top: 40px;
  color: Colors.grayMedium;
`
