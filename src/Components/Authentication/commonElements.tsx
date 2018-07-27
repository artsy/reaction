import { color } from "@artsy/palette"
import { growAndFadeIn } from "Assets/Animations"
import { garamond, unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
export { Footer } from "./Footer"
export { TermsOfServiceCheckbox } from "./TermsOfServiceCheckbox"
import { Button, ButtonProps } from "Styleguide/Elements/Button"
interface FormProps {
  height?: number
}

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: ${(p: FormProps) => (p.height ? p.height + "px" : "auto")};
`

export const SmallTextLink = styled.a`
  color: ${color("black60")};
  text-decoration: underline;
  cursor: pointer;
  ${unica("s12")};
`

export const SmallText = styled.span`
  margin: 0;
  color: ${color("black60")};
  ${unica("s12")};
  line-height: 2.25em;
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
  color: ${color("red100")};
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
  color: ${color("black60")};
`

export const ForgotPassword = props => (
  <ForgotPasswordLink {...props}>Forgot Password?</ForgotPasswordLink>
)

export const SubmitButton = (props: ButtonProps) => (
  <Button width="100%" size="large" mt={30.0} mb={0.5} {...props}>
    {props.children}
  </Button>
)
