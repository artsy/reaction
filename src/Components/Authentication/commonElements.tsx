import { Sans } from "@artsy/palette"
import { growAndFadeIn } from "Assets/Animations"
import Colors from "Assets/Colors"
import { garamond, unica } from "Assets/Fonts"
import { ButtonProps } from "Components/Buttons/Default"
import Button from "Components/Buttons/Inverted"
import React from "react"
import styled from "styled-components"
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
  height: ${p => (p.show ? "auto" : "0")};
`

export const MobileInnerWrapper = styled.div`
  position: relative;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  height: 285px;
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
  top: 35px;
  left: 0;
  cursor: pointer;
`

const ForgotPasswordLink = styled(SmallTextLink)`
  margin-left: auto;
  color: ${Colors.graySemibold};
`

export const ForgotPassword = props => (
  <ForgotPasswordLink {...props}>Forgot Password?</ForgotPasswordLink>
)

export const SubmitButton = styled((props: ButtonProps) => (
  <Button type="submit" block {...props}>
    <Sans size="3t" weight="medium">
      {props.children}
    </Sans>
  </Button>
))`
  margin: auto 0 10px 0;
  text-transform: inherit;
`
